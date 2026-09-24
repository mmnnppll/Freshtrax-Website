const { createCrmLead } = require('./utils/notion-crm');
const {
  json, parseBody, clean, isValidEmail, isBot, isRateLimited, escapeHtml, sendNotification,
} = require('./utils/lead-helpers');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (isRateLimited(event, 'booking')) {
    return json(429, { success: false, error: 'Too many submissions. Please try again in a few minutes.' });
  }

  const body = parseBody(event);
  if (!body) {
    return json(400, { success: false, error: 'Invalid request' });
  }

  // Honeypot filled: answer like a success so the bot moves on.
  if (isBot(body)) {
    console.warn('Booking form: honeypot triggered, submission dropped');
    return json(200, { success: true, message: 'Qualifier sent' });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const venueType = clean(body.venueType, 60);
  const traffic = clean(body.traffic, 60);
  const reason = clean(body.reason, 200);

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
    venueType,
    source: 'website_booking_call',
    stage: 'warm_outreach',
    nextAction: 'Watch for calendar booking; chase if none in 48h',
    notes: `Daily foot traffic: ${traffic}. #1 goal: ${reason || 'not selected'}.`,
  });

  const emailSent = await sendNotification({
    from: 'Freshtrax Leads <noreply@getfreshtrax.com>',
    replyTo: email,
    subject: `Booking qualifier: ${name} — ${venueType}`,
    html: `
      <h2>Book-a-Call Qualifier</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Venue type:</strong> ${escapeHtml(venueType)}</p>
      <p><strong>Daily foot traffic:</strong> ${escapeHtml(traffic)}</p>
      <p><strong>#1 goal:</strong> ${escapeHtml(reason || 'Not selected')}</p>
      <p>They were handed the calendar link after submitting — watch for the booking confirmation.</p>
      ${crmSaved ? '' : '<p><strong>Note:</strong> the Notion CRM write failed for this lead. Add it manually.</p>'}
    `,
  });

  // The lead is safe if it landed in either place.
  if (!crmSaved && !emailSent) {
    console.error('Booking form: lead was not saved to CRM or email', { email });
    return json(500, { success: false, error: 'Failed to send qualifier' });
  }
  return json(200, { success: true, message: 'Qualifier sent' });
};
