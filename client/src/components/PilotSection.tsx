/*
 * Social Proof Section — Live Venue
 * Badminton Sports Center, Richmond, BC
 */
import { motion } from "framer-motion";
import { Quote, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const PILOT_VIDEO = "/badminton-pilot.mp4";

export default function PilotSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="py-24 border-t border-white/5" aria-label="Venue partner results">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
              <video
                ref={videoRef}
                src={PILOT_VIDEO}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-auto object-cover"
              />
              {/* Mute toggle */}
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                  }
                }}
                className="absolute bottom-4 right-4 p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-300 shadow-lg"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Quote card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative">
              <Quote className="w-8 h-8 text-orange-500 mb-4 opacity-80" />
              <blockquote className="text-white text-xl font-medium leading-relaxed mb-6">
                "Badminton is high-intensity; the odor shouldn't be. Our members
                are obsessed with these kiosks. A total game changer for my
                courts."
              </blockquote>
              <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-sm">BC</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Venue Owner</p>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs mt-0.5">
                    <MapPin size={11} />
                    <span>Badminton Sports Center · Richmond, BC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting stat */}
            <div className="grid grid-cols-2 gap-4">
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
