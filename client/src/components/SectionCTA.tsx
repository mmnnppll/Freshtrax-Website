/*
 * SectionCTA — Reusable inline CTA component for each section.
 * Renders a compact, styled download prompt with icon and button.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Download, ArrowRight, FileText } from "lucide-react";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";
import type { LeadOffer } from "@/components/LeadCaptureModal";

interface SectionCTAProps {
  offer: LeadOffer;
  /** Visual variant */
  variant?: "inline" | "card" | "banner";
  /** Optional custom button text override */
  buttonText?: string;
  className?: string;
}

export default function SectionCTA({
  offer,
  variant = "inline",
  buttonText,
  className = "",
}: SectionCTAProps) {
  const { openModal } = useLeadCapture();
  const { ref, isInView } = useInView({ threshold: 0.05 });

  if (variant === "banner") {
    return (
      <div ref={ref} className={className}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl border border-orange-500/15 bg-gradient-to-r from-orange-500/[0.06] via-orange-500/[0.03] to-transparent p-6 md:p-8"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/[0.05] rounded-full blur-[60px]" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                <FileText size={22} className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-white mb-1">
                  {offer.headline}
                </h4>
                <p className="text-white/40 text-sm font-body max-w-md leading-relaxed">
                  {offer.description.split(".")[0]}.
                </p>
              </div>
            </div>
            <button
              onClick={() => openModal(offer)}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center gap-2 font-body shrink-0 whitespace-nowrap"
            >
              <Download size={16} />
              {buttonText || offer.ctaText}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div ref={ref} className={className}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-white/[0.06] bg-[#111]/40 backdrop-blur-sm p-6 text-center hover:border-orange-500/15 transition-all duration-500"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
            <FileText size={22} className="text-orange-500" />
          </div>
          <h4 className="font-display font-semibold text-base text-white mb-2">
            {offer.headline}
          </h4>
          <p className="text-white/35 text-sm font-body mb-5 leading-relaxed">
            {offer.description.split(".")[0]}.
          </p>
          <button
            onClick={() => openModal(offer)}
            className="w-full px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-body"
          >
            {buttonText || offer.ctaText}
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    );
  }

  // Default: inline
  return (
    <div ref={ref} className={className}>
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        onClick={() => openModal(offer)}
        className="group flex items-center gap-3 px-5 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 hover:bg-orange-500/[0.04] transition-all duration-300"
      >
        <Download size={16} className="text-orange-500 shrink-0" />
        <span className="text-white/70 group-hover:text-white text-sm font-body transition-colors">
          {buttonText || offer.ctaText}
        </span>
        <ArrowRight size={14} className="text-white/30 group-hover:text-orange-500 transition-colors ml-auto" />
      </motion.button>
    </div>
  );
}
