/*
 * Design: Dark Matter Industrial — Market Opportunity
 * Clean bento grid with consistent card heights.
 * CTA: "See the $1B Market Breakdown"
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

import { OFFERS } from "@/contexts/LeadCaptureContext";

const opportunities = [
  {
    stat: "$1B",
    label: "addressable market",
    description:
      "Self-service hygiene kiosk projected to reach $1B in 2025 — nearly untouched in Western markets.",
    span: "md:col-span-2",
    featured: true,
  },
  {
    stat: "85.6M+",
    label: "target audience (US & CA)",
    description:
      "Fitness centers, pickleball hubs, tennis clubs, and sports centers are the ideal Tier 1 placement venues.",
    span: "md:col-span-1",
    featured: false,
  },
  {
    stat: "Zero",
    label: "direct competition",
    description:
      "Inspired by proven Asian models. No comparable automated footwear hygiene product exists in North America.",
    span: "md:col-span-1",
    featured: false,
  },
  {
    stat: "$3.65–$4.35",
    label: "proven consumer behavior",
    description:
      "Athletes invest in performance. Footwear hygiene is the natural, obvious next spend — per use.",
    span: "md:col-span-2",
    featured: false,
  },
];

export default function MarketOpportunity() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.05 });
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.05 });

  return (
    <section id="market" className="relative py-16 md:py-24">
      <div className="container relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span className="text-orange-500 text-xs font-mono uppercase tracking-[0.2em]">
              Market Opportunity
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-5xl text-white max-w-2xl leading-tight"
          >
            Leave your mark,{" "}
            <span className="text-orange-500">not your smell</span>
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.label}
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${opp.span} group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#111]/40 backdrop-blur-sm p-6 hover:border-orange-500/20 transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {opp.featured && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/[0.06] rounded-full blur-3xl" />
              )}

              <div className="relative z-10">
                <p className="font-mono text-2xl md:text-3xl font-bold text-white mb-1">
                  {opp.stat}
                </p>
                <p className="text-orange-500/80 text-sm font-body font-medium mb-3">
                  {opp.label}
                </p>
                <p className="text-white/40 text-sm font-body leading-relaxed">
                  {opp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
