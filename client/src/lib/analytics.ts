/*
 * Analytics helpers: cookie consent and lead conversion events.
 *
 * The trackers themselves are bootstrapped in client/index.html so they start
 * before React loads. That script exposes window.ftConsent, which this module
 * calls when the visitor answers the cookie banner.
 */

export const CONSENT_KEY = "freshtrax_cookie_consent";

/** Window event that reopens the cookie banner (dispatched by the footer link). */
export const COOKIE_SETTINGS_EVENT = "freshtrax:cookie-settings";

export function openCookieSettings(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

export type LeadSource = "blueprint" | "book_call" | "contact";

/**
 * Google Ads conversion labels, one per lead source.
 *
 * Leave a label empty to skip the direct Ads conversion for that source.
 * GA4 still records `generate_lead`, which you can import into Google Ads
 * as a conversion instead (Ads > Goals > Conversions > Import > GA4).
 * To get a label: Google Ads > Goals > Conversions > New conversion action >
 * Website > "Use Google tag" and copy the part after "AW-18115161423/".
 */
const GOOGLE_ADS_ID = "AW-18115161423";
const GOOGLE_ADS_LABELS: Record<LeadSource, string> = {
  blueprint: "",
  book_call: "",
  contact: "",
};

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
  ftConsent?: { grant: () => void; deny: () => void };
};

function w(): AnalyticsWindow | undefined {
  return typeof window === "undefined" ? undefined : (window as AnalyticsWindow);
}

export function getStoredConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setConsent(accepted: boolean): void {
  try {
    localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "declined");
  } catch {
    /* storage blocked: the choice applies to this page view only */
  }
  const consent = w()?.ftConsent;
  if (accepted) consent?.grant();
  else consent?.deny();
}

/**
 * Report a successful lead to GA4, Google Ads and Meta.
 * Call only after the server confirmed the submission.
 * Consent Mode and the Meta consent state decide what is actually sent.
 */
export function trackLead(source: LeadSource, details: Record<string, string> = {}): void {
  const win = w();
  if (!win) return;
  try {
    win.gtag?.("event", "generate_lead", { lead_source: source, ...details });
    const label = GOOGLE_ADS_LABELS[source];
    if (label) {
      win.gtag?.("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}` });
    }
    win.fbq?.("track", "Lead", { content_name: source, ...details });
    win.clarity?.("event", `lead_${source}`);
  } catch (error) {
    console.warn("Lead tracking failed:", error);
  }
}
