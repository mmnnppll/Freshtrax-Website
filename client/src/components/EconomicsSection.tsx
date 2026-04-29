/*
 * Design: Dark Matter Industrial — Economics Section
 * Clean 4-column metric cards with glass-morphism.
 * CTA: "Get My Free Revenue Estimate"
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

import { OFFERS } from "@/contexts/LeadCaptureContext";

const metrics = [
  {
    label: "Revenue per cycle",
    value: "$3.65–$4.35",
    sub: "Basic / Max Fresh",
    accent: false,
  },
  {
    label: "Net per cycle",
    value: "$3.10–$3.90",
    sub: "After $0.55 op. cost",
    accent: false,
  },
  {
    label: "Revenue model",
    value: "Passive",
    sub: "Zero staff involvement",
    accent: true,
  },
];

export default function EconomicsSection() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.05 });
  const { ref: cardsRef, isInView: cardsInView } = useInView({ threshold: 0.05 });

  return (
    <section id="economics" className="relative py-16 md:py-24">
      <div className="container">
        {/* Section label + heading */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span className="text-orange-500 text-xs font-mono uppercase tracking-[0.2em]">
              Unit Economics
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-5xl text-white mb-3 max-w-3xl leading-tight"
          >
            Fully automated hygiene asset
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-base font-body max-w-2xl mb-10"
          >
            Freshtrax is the only medical-grade shoe sanitization kiosk built for North American fitness venues.
            Owners acquire the asset once and earn predictable recurring revenue with zero staff involvement.
          </motion.p>
        </div>

        {/* Metrics grid */}
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-xl p-5 md:p-6 transition-all duration-500 ${
                metric.accent
                  ? "bg-orange-500/[0.08] border border-orange-500/20 hover:border-orange-500/40"
                  : "bg-[#111]/60 backdrop-blur-sm border border-white/[0.06] hover:border-orange-500/20"
              }`}
            >
              <p className="text-white/40 text-[11px] font-body uppercase tracking-wide mb-3 relative z-10">
                {metric.label}
              </p>
              <p className={`font-mono text-xl md:text-2xl font-bold relative z-10 ${
                metric.accent ? "text-orange-500" : "text-white"
              }`}>
                {metric.value}
              </p>
              <p className="text-white/40 text-xs font-body mt-1.5 relative z-10">
                {metric.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
