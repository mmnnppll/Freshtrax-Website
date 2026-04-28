import { motion } from "framer-motion";
import { Zap, TrendingUp, Users, Lock } from "lucide-react";

const founderBenefits = [
  { icon: Lock, title: "$79/month platform fee, locked for life", desc: "Standard rate is $99/month. Your rate never changes." },
  { icon: TrendingUp, title: "100% revenue retention", desc: "Freshtrax takes only a 5% revenue share, no royalties." },
  { icon: Zap, title: "Priority placement support", desc: "Dedicated support from the Freshtrax team to secure your Tier 1 venue." },
  { icon: Users, title: "Direct access to founding operator network", desc: "Connect with other early operators as the category builds in your market." },
];

const founderComparison = [
  { scenario: "Conservative (10/day)", standard: "$11,862", founder: "$12,480", diff: "+$618" },
  { scenario: "Base (20/day)", standard: "$24,273", founder: "$25,550", diff: "+$1,277", highlight: true },
  { scenario: "Optimistic (30/day)", standard: "$36,953", founder: "$38,900", diff: "+$1,947" },
];

export default function FoundersClubDetails() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-block px-4 py-1 bg-orange-500/20 rounded-full text-orange-400 text-sm font-semibold mb-4">
            Limited Opportunity
          </div>
          <h2 className="text-4xl font-bold mb-4">Founder's Club: First 20 Operators Only</h2>
          <p className="text-xl text-white/60 max-w-3xl">
            The first 20 operators to join Freshtrax lock in terms that will not be available once the market is established. This is not a limited-time sale. It is a structural advantage for early movers.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {founderBenefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-lg hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Icon className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-white/70 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dollar Impact Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">What the Fee Waiver Means in Dollars</h3>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 py-4 text-left font-semibold text-white/90">Scenario</th>
                    <th className="px-6 py-4 text-left font-semibold text-white/90">Year 1 Net (Standard)</th>
                    <th className="px-6 py-4 text-left font-semibold text-orange-400">Year 1 Net (Founder)</th>
                    <th className="px-6 py-4 text-left font-semibold text-green-400">Founder Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {founderComparison.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-white/5 ${
                        row.highlight
                          ? "bg-orange-500/10"
                          : idx % 2 === 0
                          ? "bg-white/2"
                          : "bg-white/5"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-white/90">{row.scenario}</td>
                      <td className="px-6 py-4 text-white/70">{row.standard}</td>
                      <td className="px-6 py-4 text-orange-400 font-semibold">{row.founder}</td>
                      <td className="px-6 py-4 text-green-400 font-semibold">{row.diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Urgency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-gradient-to-r from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-lg text-center"
        >
          <p className="text-lg font-semibold text-white mb-2">Slots are first-come, first-served.</p>
          <p className="text-white/70">There is no waitlist.</p>
        </motion.div>
      </div>
    </section>
  );
}
