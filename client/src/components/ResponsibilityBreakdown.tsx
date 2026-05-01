import { motion } from "framer-motion";
import { Zap, CheckCircle } from "lucide-react";

const freshtraxHandles = [
  "Machine production and delivery",
  "Remote monitoring and diagnostics",
  "Technical maintenance and servicing",
  "Software updates",
  "Owner support and placement guidance",
  "Consumable restocking (where applicable)",
];

const youHandle = [
  "Secure the venue placement",
  "Receive your machine at delivery",
  "Position the kiosk at the venue",
  "Collect your revenue",
];

export default function ResponsibilityBreakdown() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Your Only Job Is Collecting Revenue</h2>
          <p className="text-xl text-white/60 max-w-3xl">
            Freshtrax was built to operate without you. Here is the full breakdown of who does what.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Freshtrax Handles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-8 h-8 text-orange-500" />
              <h3 className="text-2xl font-bold">Freshtrax Handles</h3>
            </div>
            <div className="space-y-4">
              {freshtraxHandles.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <p className="text-white/80">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* You Handle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold">You Handle</h3>
            </div>
            <div className="space-y-4">
              {youHandle.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <p className="text-white/80">{item}</p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: youHandle.length * 0.05 }}
                className="flex items-start gap-3 pt-2 border-t border-green-500/20 mt-4"
              >
                <p className="text-lg font-semibold text-green-400">That is it.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            This is truly passive income. Your role is placement and collection. Everything else—from machine health to software updates to technical support—is on us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
