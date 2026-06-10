/*
 * BlueprintScrollTrigger — opens the ROI Blueprint lead-capture modal once
 * when the visitor scrolls past 60% of the page. Renders nothing.
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
const TRIGGER_DEPTH = 0.6;

export default function BlueprintScrollTrigger() {
  const { openModal } = useLeadCapture();

  useEffect(() => {
    if (localStorage.getItem(CAPTURED_KEY)) return;
    const lastShown = Number(localStorage.getItem(SHOWN_KEY) || 0);
    if (Date.now() - lastShown < COOLDOWN_MS) return;

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      if (scrollHeight <= window.innerHeight) return;
      const depth = (window.scrollY + window.innerHeight) / scrollHeight;
      if (depth >= TRIGGER_DEPTH) {
        window.removeEventListener("scroll", onScroll);
        localStorage.setItem(SHOWN_KEY, String(Date.now()));
        openModal(OFFERS.roiBlueprint);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openModal]);

  return null;
}
