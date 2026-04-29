/*
 * Design: Dark Matter Industrial — Financial Projections
 * Tabbed scenarios with animated bar chart and count-up numbers.
 * CTA: "Roadmap to $10,000 MRR"
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import SectionCTA from "@/components/SectionCTA";
import { OFFERS } from "@/contexts/LeadCaptureContext";

interface Scenario {
  label: string;
  cyclesPerDay: number;
  dailyNet: number;
  monthlyNet: number;
  annualNet: number;
  year2Cumulative: number;
  roiMonths: number;
  cashOnCash: number;
}

const scenarios: Scenario[] = [
  {
    label: "Conservative — 10/day",
    cyclesPerDay: 10,
    dailyNet: 35,
    monthlyNet: 1050,
    annualNet: 12775,
    year2Cumulative: 25550,
    roiMonths: 7.5,
    cashOnCash: 163,
  },
  {
    label: "Base — 20/day",
    cyclesPerDay: 20,
    dailyNet: 70,
    monthlyNet: 2100,
    annualNet: 25550,
    year2Cumulative: 51100,
    roiMonths: 3.7,
    cashOnCash: 325,
  },
  {
    label: "Optimistic — 30/day",
    cyclesPerDay: 30,
    dailyNet: 105,
    monthlyNet: 3150,
    annualNet: 38325,
    year2Cumulative: 76650,
    roiMonths: 2.5,
    cashOnCash: 488,
  },
];

// Machine cost is confidential - available in the Blueprint PDF
// const MACHINE_COST = 7850;

export default function FinancialProjections() {
  const [activeTab, setActiveTab] = useState(1);
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.05 });
  const { ref: chartRef, isInView: chartInView } = useInView({ threshold: 0.05 });
  const scenario = scenarios[activeTab];

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    cumulative: scenario.monthlyNet * (i + 1),
  }));

  return (
    <section id="projections" className="relative py-16 md:py-24">
      <div className="container">
        {/* Section header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span className="text-orange-500 text-xs font-mono uppercase tracking-[0.2em]">
              Financial Projections
            </span>
          </motion.div>

          {/* Scenario Selection Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <p className="text-white/80 text-base font-body font-semibold">
              Select a scenario:
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {scenarios.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-300 ${
                  activeTab === i
                    ? "bg-orange-500 text-white"
                    : "bg-white/[0.04] text-white/50 hover:text-white/80 hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Stats grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8"
          >
            <StatCard label="Daily net revenue" value={`$${scenario.dailyNet}`} sub="After operating costs" />
            <StatCard label="Monthly net revenue" value={`$${scenario.monthlyNet.toLocaleString()}`} sub="30-day estimate" />
            <StatCard label="Annual net revenue" value={`$${scenario.annualNet.toLocaleString()}`} sub="365-day estimate" />
            <StatCard label="Year 2 cumulative" value={`$${scenario.year2Cumulative.toLocaleString()}`} sub="Net after machine cost recouped" />
            <StatCard label="ROI timeline" value={`${scenario.roiMonths} mo`} sub="Full capital recovery" highlight />
            <StatCard label="Cash-on-cash return" value={`${scenario.cashOnCash}%`} sub="Year 1 net / machine cost" highlight />
          </motion.div>
        </AnimatePresence>

        {/* Chart */}
        <div ref={chartRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={chartInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-[#111]/40 backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 md:p-6 mb-8"
          >
            <h3 className="text-white/60 text-sm font-body mb-6">
              Cumulative net revenue over 12 months
            </h3>

            <div className="flex items-end gap-1.5 md:gap-2.5 h-48 md:h-64">
              {monthlyData.map((d, i) => {
                const maxVal = monthlyData[11].cumulative * 1.2;
                const heightPct = (d.cumulative / maxVal) * 100;
                const isPastBreakeven = true; // Always show green since we're not comparing to machine cost

                return (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full"
                  >
                    <span className="text-[9px] md:text-xs font-mono text-white/40 h-4">
                      ${(d.cumulative / 1000).toFixed(1)}k
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={chartInView ? { height: `${heightPct}%` } : { height: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                      className={`w-full rounded-t-md transition-colors ${
                        isPastBreakeven
                          ? "bg-gradient-to-t from-green-600 to-green-500"
                          : "bg-gradient-to-t from-white/10 to-white/20"
                      }`}
                    />
                    <span className="text-[9px] md:text-xs font-mono text-white/30 h-4">
                      M{d.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-green-500" />
                <span className="text-white/40 text-xs font-body">
                  Bars show cumulative net revenue growth month-over-month.
                </span>
              </div>
              <p className="text-white/30 text-[11px] font-body leading-relaxed">
                Gross revenue projections before platform fee and service fee. Modeled on blended avg. revenue of $4.00/cycle ($3.65 + $4.35 blended), after $0.55 operating cost per cycle. Net figures vary by ownership tier — see the ROI Blueprint for full net projections.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA: Get the 8-Month ROI Blueprint */}
        <SectionCTA offer={OFFERS.roiBlueprint} variant="banner" />
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-4 md:p-5 rounded-xl border transition-all duration-300 ${
        highlight
          ? "bg-orange-500/[0.06] border-orange-500/20"
          : "bg-white/[0.02] border-white/[0.06]"
      }`}
    >
      <p className="text-white/40 text-[11px] font-body uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className={`font-mono text-lg md:text-2xl font-bold ${highlight ? "text-orange-500" : "text-white"}`}>
        {value}
      </p>
      <p className="text-white/30 text-[11px] font-body mt-1">{sub}</p>
    </div>
  );
}
