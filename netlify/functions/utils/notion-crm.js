/*
 * Notion CRM writer — creates a lead record in the Freshtrax CRM database
 * so every website lead exists in two places (email + CRM).
 *
 * Requires NOTION_API_KEY in the Netlify environment, and the integration
 * must be connected to the CRM database in Notion.
 *
 * Never throws: a Notion outage must not break lead emails. Callers fire
 * this and move on; failures are logged for the function log.
 */

const NOTION_CRM_DB_ID = process.env.NOTION_CRM_DB_ID || '3d394b2fe19b472bbb2d3673be2e73bf';

// Website venue ids → CRM "Venue Type" select options
const VENUE_TYPE_MAP = {
  gym: 'gym',
  pickleball: 'pickleball',
  tennis: 'tennis',
  climbing: 'bouldering',
  arena: 'arena',
  other: 'other',
};

/**
 * @param {object} lead
 * @param {string} lead.name        Contact person
 * @param {string} lead.email
 * @param {string} [lead.phone]
 * @param {string} [lead.venueType] Website venue id (gym, pickleball, ...)
 * @param {string} [lead.venueName] Venue/company name if known
 * @param {string} lead.source      CRM Source option, e.g. "website_blueprint"
 * @param {string} lead.stage       CRM Stage option, e.g. "blueprint_sent"
 * @param {string} lead.nextAction
 * @param {string} [lead.notes]
 */
async function createCrmLead(lead) {
  if (!process.env.NOTION_API_KEY) {
    console.warn('NOTION_API_KEY not set — skipping CRM write');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const title = lead.venueName || `${lead.name}${lead.venueType ? ` (${lead.venueType})` : ''}`;

  const properties = {
    Venue: { title: [{ text: { content: title } }] },
    Name: { rich_text: [{ text: { content: lead.name || '' } }] },
    Source: { select: { name: lead.source } },
    Stage: { select: { name: lead.stage } },
    'Next Action': { rich_text: [{ text: { content: lead.nextAction || '' } }] },
    'Last Contact Date': { date: { start: today } },
  };
  if (lead.email) properties.Email = { email: lead.email };
  if (lead.phone) properties.Phone = { phone_number: lead.phone };
  if (lead.venueType) {
    properties['Venue Type'] = {
      select: { name: VENUE_TYPE_MAP[lead.venueType] || 'other' },
    };
  }
  if (lead.notes) {
    properties.Notes = { rich_text: [{ text: { content: lead.notes.slice(0, 2000) } }] };
  }

  try {
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_CRM_DB_ID },
        properties,
      }),
    });
    if (!res.ok) {
      console.error('Notion CRM write failed:', res.status, await res.text());
    }
  } catch (error) {
    console.error('Notion CRM write error:', error);
  }
}

module.exports = { createCrmLead };
