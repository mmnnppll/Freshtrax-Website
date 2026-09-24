/*
 * Social Proof Section — Live Pilot Venue
 * West Coast Badminton Academy, Richmond, BC.
 * Facts only — no testimonial until we have a real, attributable quote
 * (FTC posture: same reason the fabricated product rating was removed).
 */
import { motion } from "framer-motion";
import { MapPin, CalendarCheck } from "lucide-react";
import LazyVideo from "./LazyVideo";

// Re-encoded copy of badminton-pilot.mp4 (12.6 MB -> 3.6 MB, same resolution).
const PILOT_VIDEO = "/badminton-pilot-mobile.mp4";
const PILOT_POSTER = "/images/pilot/badminton-pilot-poster.webp";
const PILOT_PHOTO = "/images/pilot/wcb-kiosk-install.jpg";

export default function PilotSection() {

  return (
    <section className="py-16 md:py-24 border-t border-white/5" aria-label="Venue partner results">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Real Venues. Real Results.
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            See It In Action
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-orange-500/[0.06] rounded-2xl blur-[40px]" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black">
              <LazyVideo
                src={PILOT_VIDEO}
                poster={PILOT_POSTER}
                iconSize={16}
                className="w-full h-auto aspect-[480/848] object-cover"
              />
            </div>
          </motion.div>

          {/* Live pilot photo + facts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Real install photo */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src={PILOT_PHOTO}
                alt="Freshtrax kiosk installed at West Coast Badminton Academy in Richmond, BC"
                loading="lazy"
                className="w-full h-72 object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5 pt-12">
                <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
                  <MapPin size={13} className="text-orange-500" />
                  <span>West Coast Badminton Academy · Richmond, BC</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/60 text-xs mt-1">
                  <CalendarCheck size={11} />
                  <span>Live since April 22, 2026 — our first pilot venue</span>
                </div>
              </div>
            </div>

            {/* Real numbers from the pilot */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-orange-500 mb-1">160+</p>
                <p className="text-white/60 text-sm">Cycles run at pilot</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-orange-500 mb-1">90s</p>
                <p className="text-white/60 text-sm">Full sanitization cycle</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-orange-500 mb-1">Zero</p>
                <p className="text-white/60 text-sm">Staff required</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
