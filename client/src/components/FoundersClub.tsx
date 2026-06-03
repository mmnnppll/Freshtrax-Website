/*
 * Design: Dark Matter Industrial — Founder's Club
 * Premium card with orange border accent. Real product photo on right.
 * CTAs: "Claim your founder slot" + "Download ROI blueprint" — both trigger lead capture.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Check, ArrowRight, Download } from "lucide-react";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";

const MACHINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/Freshtraxmachineinuse_fb5b8d19.jpg";

const benefits = [
  "$79/month platform fee (vs. $99 regular)",
  "0% service fee on your founding machine, permanently",
  "Territory exclusivity in your market",
  "Lifetime priority support & quarterly strategy calls",
  "Exclusive machine pricing (see Blueprint PDF)",
];

export default function FoundersClub() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const { openModal } = useLeadCapture();

  return (
    <section id="founders" className="relative py-16 md:py-24" ref={ref}>
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-sm">
          {/* Orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-orange-500/10 rounded-full blur-[100px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="p-8 md:p-10 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="text-orange-500 text-xs font-mono uppercase tracking-[0.2em] mb-3 block">
                  Exclusive Opportunity
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2 leading-tight">
                  Founder's Club
                </h2>
                <p className="text-orange-500/80 font-body text-base mb-1">
                  First 20 owners only
                </p>
                <p className="text-white/90 font-display font-semibold text-lg mb-5">
                  Lock in exclusive pricing before launch.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/40 text-sm font-body mb-5 max-w-md leading-relaxed"
              >
                Founding partners lock in exclusive terms before the market is established.
                First 20 owners lock in a $79/month platform fee for life, 0% service fee on their founding machine — permanently — and territory exclusivity. Download the Blueprint PDF for complete machine pricing details.
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2.5 mb-7"
              >
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-orange-500" />
                    </div>
                    <p className="text-white/70 text-sm font-body">{benefit}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="https://calendar.app.google/YWP7rF8gFUXgfMRCA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-body"
                >
                  Book a call with us
                  <ArrowRight size={16} />
                </a>
                <button
                  className="px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/70 hover:text-white font-medium text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-body"
                  onClick={() => openModal(OFFERS.roiBlueprint)}
                >
                  <Download size={16} />
                  Get the 8-Month ROI Blueprint
                </button>
              </motion.div>
            </div>

            {/* Right: Machine Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:flex relative items-center justify-center overflow-hidden"
            >
              <img
                src={MACHINE_IMG}
                alt="Freshtrax Kiosk Machine In Use"
                className="w-full h-full object-cover max-h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111]/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
