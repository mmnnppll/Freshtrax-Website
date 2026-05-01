import { motion } from "framer-motion";

const financialData = [
  { label: "Revenue per cycle", value: "$3.65 (Refresh) / $4.35 (Max Fresh)" },
  { label: "Operating cost per cycle", value: "$0.55 (power, consumables, Credit Card fees)" },
  { label: "Net per cycle", value: "$3.25/cycle (standard) | $3.45/cycle (founding machine)" },
  { label: "Base scenario (20 cycles/day)", value: "$2,019/month net" },
  { label: "Optimistic (30 cycles/day)", value: "$3,067/month net" },
  { label: "Year 1 net (base)", value: "$24,237" },
  { label: "Year 2 cumulative net (base)", value: "$45,554" },
  { label: "Cash-on-cash return Year 1", value: "290%" },
  { label: "Platform fee (standard owners)", value: "$99/month (dashboard, device monitoring, antimicrobial liquid alerts)" },
  { label: "Revenue split", value: "95% to owner / 5% to Freshtrax on standard machines. Founding owners: $79/month platform fee, locked for life. 0% service fee on founding machine — permanently." },
  { label: "Delivery timeline", value: "6 to 7 months from order confirmation" },
];

export default function DetailedFinancials() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">The Numbers, Unfiltered</h2>
          <p className="text-xl text-white/60 max-w-3xl">
            Here is every number that matters, with nothing hidden.
          </p>
        </motion.div>

        {/* Financial Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-lg border border-white/10"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {financialData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-white/5 ${
                      idx % 2 === 0 ? "bg-white/2" : "bg-white/5"
                    } hover:bg-white/10 transition-colors duration-300`}
                  >
                    <td className="px-6 py-4 font-semibold text-white/90 w-1/3">
                      {row.label}
                    </td>
                    <td className="px-6 py-4 text-white/70">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 bg-orange-500/10 border-l-4 border-orange-500 rounded-lg"
        >
          <p className="text-white/80">
            <span className="font-semibold text-orange-400">For the full month-by-month projection</span> across all three scenarios, download the ROI Blueprint below. The Blueprint gives you the complete financial picture including acquisition cost, payback timeline, and Year 2 projections in one place, so you can evaluate the opportunity with complete information.
          </p>
        </motion.div>

        {/* Comparison Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { title: "Conservative", cycles: "10/day", net: "$11,645", color: "from-blue-500" },
            { title: "Base Case", cycles: "20/day", net: "$24,237", color: "from-orange-500", highlight: true },
            { title: "Optimistic", cycles: "30/day", net: "$36,830", color: "from-green-500" },
          ].map((scenario, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className={`p-6 rounded-lg border ${
                scenario.highlight
                  ? "bg-gradient-to-br from-orange-500/20 to-orange-500/5 border-orange-500/30"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <p className="text-sm text-white/60 mb-2">{scenario.title}</p>
              <p className="text-lg font-semibold mb-3">{scenario.cycles}</p>
              <p className="text-3xl font-bold text-green-400">{scenario.net}</p>
              <p className="text-xs text-white/50 mt-2">Year 1 net profit</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
