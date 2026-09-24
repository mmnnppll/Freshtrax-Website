/*
 * MobileStickyCTA — bottom action bar for phones on the long sales pages.
 * Appears once the visitor scrolls past the hero and hides again near the
 * footer (which has its own CTAs). Hidden from md breakpoint up.
 */
import { useEffect, useState } from "react";
import { CalendarDays, Download } from "lucide-react";
import { useBookCall } from "@/contexts/BookCallContext";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";

const SHOW_AFTER_PX = 600;
const HIDE_NEAR_BOTTOM_PX = 500;

export default function MobileStickyCTA() {
  const { openBookCall } = useBookCall();
  const { openModal } = useLeadCapture();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const bottom = window.scrollY + window.innerHeight;
      const nearFooter = bottom > document.documentElement.scrollHeight - HIDE_NEAR_BOTTOM_PX;
      setVisible(window.scrollY > SHOW_AFTER_PX && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex gap-2">
        <button
          onClick={() => openModal(OFFERS.roiBlueprint)}
          tabIndex={visible ? 0 : -1}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3 border border-white/20 text-white text-sm font-semibold rounded-lg font-body whitespace-nowrap"
        >
          <Download size={15} />
          Blueprint
        </button>
        <button
          onClick={openBookCall}
          tabIndex={visible ? 0 : -1}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg font-body whitespace-nowrap"
        >
          <CalendarDays size={15} />
          Book a 30-Minute Call
        </button>
      </div>
    </div>
  );
}
