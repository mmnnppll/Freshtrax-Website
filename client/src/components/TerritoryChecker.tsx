/*
 * Design: Dark Matter Industrial — Territory Checker
 * Centered CTA with input field and urgency messaging.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { MapPin, ArrowRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function TerritoryChecker() {
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.05 });

  const handleCheck = () => {
    if (!query.trim()) {
      toast.error("Please enter a city or zip code.");
      return;
    }
    setChecked(true);
    toast.success(`Territory check for "${query}" submitted. We'll be in touch within 24 hours.`);
  };

  return (
    <section id="territory" className="relative py-16 md:py-24" ref={ref}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-orange-500 text-xs font-mono uppercase tracking-[0.2em] mb-3 block">
              Territory Availability
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
              Check territory
            </h2>
            <p className="text-white/40 text-sm font-body mb-8 max-w-lg mx-auto leading-relaxed">
              Tier 1 locations — gyms, pickleball hubs, tennis clubs, and arenas — are being
              claimed now. Enter your city or zip code to check availability.
            </p>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative max-w-md mx-auto mb-5"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="relative flex items-center bg-[#111]/80 border border-white/[0.08] rounded-xl overflow-hidden group-focus-within:border-orange-500/30 transition-colors duration-300">
                <MapPin size={18} className="text-white/30 ml-4 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setChecked(false);
                  }}
                  placeholder="Enter city or zip code"
                  className="flex-1 bg-transparent text-white placeholder:text-white/30 px-3 py-3.5 text-sm font-body outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                />
                <button
                  onClick={handleCheck}
                  className="px-5 py-3.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold font-body transition-colors duration-300 flex items-center gap-2"
                >
                  Check
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Warning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-white/30 text-xs font-body"
          >
            <AlertTriangle size={12} />
            <span>Territories are first-come, first-served. Once claimed, they're locked.</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
