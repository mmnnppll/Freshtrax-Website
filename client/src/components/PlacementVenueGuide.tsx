import { motion } from "framer-motion";
import { Dumbbell, Users, MapPin, Zap } from "lucide-react";

const tier1Venues = [
  "Fitness centers and CrossFit boxes",
  "Pickleball clubs (fastest-growing sports venue category in North America)",
  "Tennis and racquet clubs",
  "Martial arts studios",
  "Indoor cycling and boutique fitness studios",
  "Multisport complexes and recreation centers",
];

const placementCriteria = [
  "300+ active members visiting multiple times per week",
  "Members who invest in performance gear and wellness",
  "Space near the entry, exit, or shoe change area",
  "Owner or manager open to member wellness amenities",
];

export default function PlacementVenueGuide() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Where Freshtrax Belongs</h2>
          <p className="text-xl text-white/60 max-w-3xl">
            Freshtrax is a kiosk business built for fitness centers and sports venues where athletic footwear is worn daily. The best placements share three things: recurring members, high per-visit engagement, and a culture of performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Tier 1 Venues */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Dumbbell className="w-8 h-8 text-orange-500" />
              <h3 className="text-2xl font-bold">Tier 1 Venues</h3>
            </div>
            <div className="space-y-3">
              {tier1Venues.map((venue, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <p className="text-white/80">{venue}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What Makes a Great Placement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-orange-500" />
              <h3 className="text-2xl font-bold">What Makes a Great Placement</h3>
            </div>
            <div className="space-y-3">
              {placementCriteria.map((criterion, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                >
                  <Zap className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80">{criterion}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-lg"
        >
          <p className="text-white/80">
            <span className="font-semibold text-orange-400">Not sure if your target venue qualifies?</span> We review every placement with you as part of the operator onboarding process. If your venue has the fundamentals, we'll help you secure it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
