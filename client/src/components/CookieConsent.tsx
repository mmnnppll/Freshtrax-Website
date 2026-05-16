import { useState, useEffect } from "react";

const CONSENT_KEY = "freshtrax_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111] border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-sm text-white/70 max-w-2xl">
        We use cookies and similar technologies to analyze traffic, personalize content, and serve targeted ads (including via Meta and Google). By clicking{" "}
        <span className="text-white font-medium">Accept</span>, you consent to our use of cookies.{" "}
        <a href="/privacy" className="underline underline-offset-2 text-white/50 hover:text-white transition-colors">
          Privacy Policy
        </a>
      </p>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={decline}
          className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2 rounded-md border border-white/10 hover:border-white/30"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="text-sm font-medium bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
