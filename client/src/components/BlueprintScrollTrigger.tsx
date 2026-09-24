/*
 * BlueprintScrollTrigger — opens the ROI Blueprint lead-capture modal once
 * per visit. Renders nothing.
 *
 * When it fires:
 *  - after the visitor has read past the Founder's Club section
 *    (element matching `afterSelector`), so the prompt never covers the
 *    pilot proof or pricing sections; or
 *  - on desktop exit intent (cursor leaves through the top of the window),
 *    after the visitor has been on the page for 10 seconds.
 * If `afterSelector` isn't on the page, it falls back to 60% scroll depth.
 *
 * Frequency rules:
 *  - never for visitors who already submitted a lead form (ft_lead_captured)
 *  - at most once every 7 days per browser (ft_blueprint_prompt_at)
 */
import { useEffect } from "react";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";

const SHOWN_KEY = "ft_blueprint_prompt_at";
const CAPTURED_KEY = "ft_lead_captured";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const FALLBACK_DEPTH = 0.6;
const EXIT_INTENT_MIN_MS = 10_000;

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export default function BlueprintScrollTrigger({ afterSelector }: { afterSelector?: string }) {
  const { openModal } = useLeadCapture();

  useEffect(() => {
    if (readStorage(CAPTURED_KEY)) return;
    const lastShown = Number(readStorage(SHOWN_KEY) || 0);
    if (Date.now() - lastShown < COOLDOWN_MS) return;

    const mountedAt = Date.now();
    let fired = false;

    const fire = () => {
      if (fired) return;
      fired = true;
      cleanup();
      try {
        localStorage.setItem(SHOWN_KEY, String(Date.now()));
      } catch {
        /* storage blocked — still show once this visit */
      }
      openModal(OFFERS.roiBlueprint);
    };

    const onScroll = () => {
      const anchor = afterSelector ? document.querySelector(afterSelector) : null;
      if (anchor) {
        // Fire once the anchor section has mostly scrolled out of view
        if (anchor.getBoundingClientRect().bottom < window.innerHeight * 0.5) fire();
        return;
      }
      const scrollHeight = document.documentElement.scrollHeight;
      if (scrollHeight <= window.innerHeight) return;
      const depth = (window.scrollY + window.innerHeight) / scrollHeight;
      if (depth >= FALLBACK_DEPTH) fire();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return;
      if (Date.now() - mountedAt < EXIT_INTENT_MIN_MS) return;
      fire();
    };

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer) document.addEventListener("mouseout", onMouseOut);
    return cleanup;
  }, [openModal, afterSelector]);

  return null;
}
