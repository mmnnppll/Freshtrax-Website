import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";

// Canonical Founding Machine math — must stay in sync with Hero,
// FinancialProjections, DetailedFinancials, and the Blueprint:
// 10 cycles → $11,645/yr · 20 → $24,237/yr · 30 → $36,830/yr
const NET_PER_CYCLE_FOUNDER = 3.45; // $4.00 avg revenue − $0.55 operating cost, 0% service fee
const NET_PER_CYCLE_STANDARD = 3.25; // after 5% service fee on gross
const FEE_FOUNDER = 79; // locked for life
const FEE_STANDARD = 99;
const DAYS_PER_MONTH = 30.4; // matches published monthly figures ($970 / $2,019 / $3,067)

const SCENARIO_MARKS = [
  { cycles: 10, label: "Conservative" },
  { cycles: 20, label: "Typical" },
  { cycles: 30, label: "Optimistic" },
];

function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export default function ROICalculator() {
  const { openModal } = useLeadCapture();
  const [cycles, setCycles] = useState(20);
  const [isFounder, setIsFounder] = useState(true);

  const netPerCycle = isFounder ? NET_PER_CYCLE_FOUNDER : NET_PER_CYCLE_STANDARD;
  const platformFee = isFounder ? FEE_FOUNDER : FEE_STANDARD;
  const dailyNet = cycles * netPerCycle;
  const monthlyNet = cycles * netPerCycle * DAYS_PER_MONTH - platformFee;
  const annualNet = cycles * netPerCycle * 365 - platformFee * 12;

  const scenarioLabel =
    cycles < 15 ? "Conservative territory" : cycles < 25 ? "Base case territory" : "Optimistic territory";

  return (
    <section id="roi-calculator" className="py-20 border-t border-white/5" aria-label="ROI Calculator">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Run Your Own Numbers</h2>
          <p className="text-xl text-white/60 max-w-3xl">
            Drag the slider to your venue&apos;s daily traffic. Every figure is net — after
            operating costs and the platform fee.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-lg border border-white/10 bg-white/5 p-6 md:p-10"
        >
          {/* Slider */}
          <div className="mb-10">
            <div className="flex items-end justify-between mb-6">
              <p className="text-sm uppercase tracking-wider text-white/60">Cycles per day</p>
              <div className="text-right">
                <p className="text-5xl font-bold text-orange-500 leading-none">{cycles}</p>
                <p className="text-xs text-white/50 mt-1">{scenarioLabel}</p>
              </div>
            </div>
            <Slider
              value={[cycles]}
              onValueChange={([v]) => setCycles(v)}
              min={5}
              max={30}
              step={1}
              aria-label="Cycles per day"
              className="[&_[data-slot=slider-range]]:bg-orange-600 [&_[data-slot=slider-thumb]]:border-orange-600"
            />
            <div className="relative mt-3 h-5 text-xs text-white/50">
              {SCENARIO_MARKS.map((mark) => (
                <button
                  key={mark.cycles}
                  type="button"
                  onClick={() => setCycles(mark.cycles)}
                  className={`absolute whitespace-nowrap hover:text-orange-400 transition-colors ${
                    mark.cycles === 30 ? "-translate-x-full" : "-translate-x-1/2"
                  } ${cycles === mark.cycles ? "text-orange-400 font-semibold" : ""}`}
                  style={{ left: `${((mark.cycles - 5) / 25) * 100}%` }}
                >
                  {mark.cycles} · {mark.label}
                </button>
              ))}
            </div>
          </div>

          {/* Founder toggle */}
          <div className="mb-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isFounder}
                onChange={(e) => setIsFounder(e.target.checked)}
                className="w-4 h-4 accent-orange-500"
              />
              <span className="text-sm text-white/80 font-semibold">
                {isFounder ? "Founder's Club Member" : "Regular Owner"}
              </span>
            </label>
            <p className="text-xs text-orange-500/80 mt-2">
              {isFounder
                ? "Platform fee: $79/mo locked for life | Service fee: 0% on founding machine — permanently"
                : "Platform fee: $99/mo | Service fee: 5% of revenue"}
            </p>
          </div>

          {/* Live results */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-white/60 mb-2">Daily net</p>
              <p className="text-3xl font-bold">{`$${dailyNet.toFixed(2)}`}</p>
            </div>
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-white/60 mb-2">Monthly net</p>
              <p className="text-3xl font-bold">{formatUSD(monthlyNet)}</p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
              <p className="text-sm text-white/60 mb-2">Year 1 net</p>
              <p className="text-3xl font-bold text-green-400">{formatUSD(annualNet)}</p>
            </div>
          </div>

          {/* Assumptions + disclosure */}
          <p className="text-sm text-white/50 mb-2">
            Gross revenue: $4.00/cycle (blended average) | Operating cost: $0.55/cycle |
            Net per cycle: {`$${netPerCycle.toFixed(2)}`}
          </p>
          <p className="text-sm text-white/50 mb-8">
            Projections, not guarantees. The typical owner projects $24,237/year (20
            cycles/day). Actual results depend on venue traffic and member engagement.
          </p>

          {/* Blueprint CTA */}
          <button
            onClick={() => openModal(OFFERS.roiBlueprint)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
          >
            Get the payback timeline in the full Blueprint
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
