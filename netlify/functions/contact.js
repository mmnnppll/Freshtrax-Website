const { createCrmLead } = require('./utils/notion-crm');
const {
  json, parseBody, clean, isValidEmail, isBot, escapeHtml, sendNotification,
} = require('./utils/lead-helpers');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = parseBody(event);
  if (!body) {
    return json(400, { success: false, error: 'Invalid request' });
  }

  // Honeypot filled: answer like a success so the bot moves on.
  if (isBot(body)) {
    console.warn('Contact form: honeypot triggered, submission dropped');
    return json(200, { success: true, message: 'Message sent successfully' });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const phone = clean(body.phone, 40);
  const company = clean(body.company, 160);
  const inquiryType = clean(body.inquiryType, 80);
  const message = clean(body.message, 5000);

  if (!name || !email || !phone || !message) {
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
    venueName: company,
    source: 'website_contact_form',
    stage: 'warm_outreach',
    nextAction: 'Reply within 1 business day',
    notes: `Inquiry type: ${inquiryType}. Message: ${message}`,
  });

  const emailSent = await sendNotification({
    from: 'Freshtrax Contact <noreply@getfreshtrax.com>',
    replyTo: email,
    subject: `New Contact Form Submission: ${name} - ${inquiryType}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Company/Venue:</strong> ${escapeHtml(company || 'Not provided')}</p>
      <p><strong>Inquiry Type:</strong> ${escapeHtml(inquiryType)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>Please respond within 1 business day.</em></p>
      ${crmSaved ? '' : '<p><strong>Note:</strong> the Notion CRM write failed for this lead. Add it manually.</p>'}
    `,
  });

  // The lead is safe if it landed in either place.
  if (!crmSaved && !emailSent) {
    console.error('Contact form: lead was not saved to CRM or email', { email });
    return json(500, { success: false, error: 'Failed to send message' });
  }
  return json(200, { success: true, message: 'Message sent successfully' });
};
