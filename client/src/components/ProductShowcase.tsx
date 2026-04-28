/*
 * Design: Dark Matter Industrial — Product Showcase
 * Displays kiosk interior, machine in use, and sanitization video
 * with balanced layout and smooth transitions.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const KIOSK_INTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/openart-image_1771456842184_fa9c46ac_1771456842195_6473f454_7665cf28.png";
const MACHINE_IN_USE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/Freshtraxmachineinuse_7c511678.jpg";
const SANITIZATION_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/SantizationPromotionVideo_c7a4d6b5.mp4";

export default function ProductShowcase() {
  const { ref, isInView } = useInView();

  return (
    <section id="product" className="relative py-24 md:py-32" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-orange-500 text-xs font-mono uppercase tracking-[0.2em] mb-4 block">
            The Asset
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight max-w-2xl">
            Freshtrax in <span className="text-orange-500">action</span>
          </h2>
        </motion.div>

        {/* Three-column showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Kiosk Interior */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-orange-500/30 transition-colors duration-300"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={KIOSK_INTERIOR}
                alt="Freshtrax Kiosk Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 md:p-6">
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Interior Chamber
              </h3>
              <p className="text-white/50 text-sm font-body">
                Three-layer sterilization system with UVC, ozone, and antimicrobial vapor working in perfect harmony.
              </p>
            </div>
          </motion.div>

          {/* Machine in Use */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-orange-500/30 transition-colors duration-300"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={MACHINE_IN_USE}
                alt="Freshtrax Machine in Use"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 md:p-6">
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Full Kiosk
              </h3>
              <p className="text-white/50 text-sm font-body">
                Sleek, modern design with touchscreen interface and intuitive user experience for seamless operation.
              </p>
            </div>
          </motion.div>

          {/* Sanitization Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-orange-500/30 transition-colors duration-300"
          >
            <div className="aspect-square overflow-hidden bg-black/50 flex items-center justify-center group">
              <video
                src={SANITIZATION_VIDEO}
                controls
                className="w-full h-full object-cover"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23000'/%3E%3C/svg%3E"
              />
            </div>
            <div className="p-4 md:p-6">
              <h3 className="font-display font-bold text-lg text-white mb-2">
                90-Second Cycle
              </h3>
              <p className="text-white/50 text-sm font-body">
                Watch the complete sanitization process with all three sterilization technologies working together.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-24 text-center"
        >
          <p className="text-white/60 text-sm md:text-base font-body mb-6">
            Ready to bring Freshtrax to your venue?
          </p>
          <a
            href="#founders"
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-orange-500 hover:bg-orange-600 text-white font-display font-bold rounded-lg transition-colors duration-300"
          >
            Claim Your Founder Slot
          </a>
        </motion.div>
      </div>
    </section>
  );
}
