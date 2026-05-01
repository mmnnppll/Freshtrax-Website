import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Home, MapPin, Zap } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Submit Your Interest",
    description: "Fill out the form or download the ROI Blueprint. We'll follow up within 24 hours to confirm your placement intent and answer any questions.",
    icon: Zap,
  },
  {
    num: "2",
    title: "Secure Your Slot",
    description: "Founding owner slots are limited to 20. Once you confirm, your position is reserved. First 20 owners lock in the $79/month platform rate.",
    icon: CheckCircle,
  },
  {
    num: "3",
    title: "We Place Your Order",
    description: "Once your order is confirmed, we engage our manufacturing partner to begin production of your unit. Each machine is built to order.",
    icon: Package,
  },
  {
    num: "4",
    title: "Production & Shipping",
    description: "Total delivery time is approximately 6 to 7 months from order confirmation. Your machine ships directly to your door. You'll receive a tracking number to monitor your shipment. Some units ship by sea freight.",
    icon: Truck,
  },
  {
    num: "5",
    title: "Delivery to Your Doorstep",
    description: "Your Freshtrax kiosk arrives fully assembled and ready for placement. No complex installation. Plug in, position, and you are operational.",
    icon: Home,
  },
  {
    num: "6",
    title: "Placement & Go-Live",
    description: "We guide you through securing your first venue placement and going live. Revenue starts the day your machine goes live.",
    icon: MapPin,
  },
];

export default function AcquisitionProcess() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works: From Interest to Revenue</h2>
          <p className="text-xl text-white/60 max-w-3xl">
            Getting started with Freshtrax is straightforward. Here is exactly what the process looks like from your first inquiry to your first dollar of revenue.
          </p>
        </motion.div>

        {/* Timeline visualization */}
        <div className="space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex gap-6"
              >
                {/* Step number and connector */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-lg flex-shrink-0">
                    {step.num}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-1 h-20 bg-gradient-to-b from-orange-500/50 to-orange-500/10 mt-2" />
                  )}
                </div>

                {/* Step content */}
                <div className="pb-6 flex-1">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-orange-500/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-3">
                      <Icon className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-white/70 ml-10">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Important note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-orange-500/10 border-l-4 border-orange-500 rounded-lg"
        >
          <p className="text-white/80">
            <span className="font-semibold text-orange-400">Delivery Timeline Note:</span> The 6 to 7 month lead time reflects our custom manufacturing process. This is not off-the-shelf inventory. Your machine is made to order. Use this window to secure your venue placement so you are ready to go live the day your unit arrives.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
