const { createCrmLead } = require('./utils/notion-crm');
const {
  json, parseBody, clean, isValidEmail, isBot, isRateLimited, escapeHtml, sendNotification,
} = require('./utils/lead-helpers');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (isRateLimited(event, 'blueprint')) {
    return json(429, { success: false, error: 'Too many submissions. Please try again in a few minutes.' });
  }

  const body = parseBody(event);
  if (!body) {
    return json(400, { success: false, error: 'Invalid request' });
  }

  // Honeypot filled: answer like a success so the bot moves on.
  if (isBot(body)) {
    console.warn('Blueprint form: honeypot triggered, submission dropped');
    return json(200, { success: true, message: 'Notification sent' });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const businessType = clean(body.businessType, 60);
  const phone = clean(body.phone, 40);
  const offer = clean(body.offer, 120);
  const readyIn30 = body.readyIn30 === true;

  if (!name || !email) {
    return json(400, { success: false, error: 'Missing required fields' });
  }
  if (!isValidEmail(email)) {
    return json(400, { success: false, error: 'Invalid email address' });
  }

  // CRM record first — survives even if the email send fails
  const crmSaved = await createCrmLead({
    name,
    email,
    phone,
    venueType: businessType,
    source: 'website_blueprint',
    stage: 'blueprint_sent',
    nextAction: 'Follow up on Blueprint download',
    notes: `Offer: ${offer}. Ready in 30 days: ${readyIn30 ? 'Yes' : 'No'}.`,
  });

  const emailSent = await sendNotification({
    from: 'Freshtrax Leads <noreply@getfreshtrax.com>',
    replyTo: email,
    subject: `New Lead: ${name} - ${businessType}`,
    html: `
      <h2>New Lead Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Business Type:</strong> ${escapeHtml(businessType)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong>Ready in 30 days:</strong> ${readyIn30 ? 'Yes' : 'No'}</p>
      <p><strong>Offer:</strong> ${escapeHtml(offer)}</p>
      <p><strong>Downloaded PDF:</strong> Yes</p>
      ${crmSaved ? '' : '<p><strong>Note:</strong> the Notion CRM write failed for this lead. Add it manually.</p>'}
    `,
  });

  // The lead is safe if it landed in either place.
  if (!crmSaved && !emailSent) {
    console.error('Blueprint form: lead was not saved to CRM or email', { email });
    return json(500, { success: false, error: 'Failed to send notification' });
  }
  return json(200, { success: true, message: 'Notification sent' });
};
