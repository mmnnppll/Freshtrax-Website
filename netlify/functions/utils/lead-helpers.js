/*
 * Shared helpers for the website lead endpoints (contact, blueprint,
 * book-a-call): request parsing, input cleaning, spam filtering, HTML
 * escaping and the Resend email call.
 */

const NOTIFY_TO = 'getfreshtrax@gmail.com';

// Hidden form field that real visitors never see or fill. Bots that fill
// every input will populate it, and those submissions are dropped quietly.
const HONEYPOT_FIELD = 'website';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

/** Parse the JSON body. Returns null when it is missing or malformed. */
function parseBody(event) {
  try {
    const body = JSON.parse(event.body || '');
    return body && typeof body === 'object' && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

/** Coerce to a trimmed string and cap its length. */
function clean(value, max = 200) {
  if (value === undefined || value === null) return '';
  return String(value).trim().slice(0, max);
}

function isValidEmail(email) {
  return email.length <= 254 && EMAIL_RE.test(email);
}

function isBot(body) {
  return clean(body[HONEYPOT_FIELD]) !== '';
}

/*
 * Best-effort rate limit: at most RATE_LIMIT submissions per client IP per
 * RATE_WINDOW_MS, per endpoint. State lives in the function instance's memory,
 * so it resets on cold starts and is not shared between parallel instances.
 * It stops a single script hammering a form; it is not a hard guarantee.
 */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map(); // key -> array of timestamps

function clientIp(event) {
  const h = event.headers || {};
  return (
    h['x-nf-client-connection-ip'] ||
    (h['x-forwarded-for'] || '').split(',')[0].trim() ||
    'unknown'
  );
}

/** Returns true when this request is over the limit (and records it otherwise). */
function isRateLimited(event, endpoint, now = Date.now()) {
  const key = `${endpoint}:${clientIp(event)}`;
  const recent = (hits.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Keep memory bounded on long-lived instances.
  if (hits.size > 5000) hits.clear();
  return false;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Strip line breaks so user input cannot add lines to an email subject. */
function oneLine(value) {
  return String(value).replace(/[\r\n]+/g, ' ');
}

/**
 * Send the internal notification email through Resend.
 * Never throws. Resolves to true when Resend accepted the message.
 */
async function sendNotification({ from, subject, html, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping notification email');
    return false;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: NOTIFY_TO,
        reply_to: replyTo,
        subject: oneLine(subject),
        html,
      }),
    });
    if (!res.ok) {
      console.error('Resend send failed:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('Resend send error:', error);
    return false;
  }
}

module.exports = {
  json,
  parseBody,
  clean,
  isValidEmail,
  isBot,
  isRateLimited,
  escapeHtml,
  sendNotification,
};
