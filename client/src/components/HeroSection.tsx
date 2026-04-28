/*
 * Design: Dark Matter Industrial — Hero Section
 * Full-width hero with cinematic demo video as visual centerpiece.
 * Asymmetric two-column layout: headline left, demo video right (9:16 vertical).
 * CTA: "Get the 8-Month ROI Blueprint"
 */
import { motion } from "framer-motion";
import { Download, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";
import { useState, useRef } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/hero-bg-ECzbAorEHV8DYBJU9NrUhH.webp";
const DEMO_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/openart-enhanced_1776890114044_1e2c34a5_6aa45cb4.mp4";

export default function HeroSection() {
  const { openModal } = useLeadCapture();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={HERO_BG} alt="Freshtrax footwear sterilization kiosk background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-start">
          {/* Left: Copy */}
          <div className="max-w-xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-0.5 h-12 bg-orange-500 mt-1 shrink-0" />
                <div>
                  <p className="text-white/60 text-xl font-body">Zero staff, zero inventory,</p>
                  <p className="text-white font-bold text-xl font-body">zero competition.</p>
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display font-bold text-5xl md:text-6xl leading-tight mb-6 text-white"
            >
              Make{" "}
              <span className="text-orange-500">$38,325/year</span>
              <br />
              from a single machine.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/70 text-lg mb-8 leading-relaxed font-body"
            >
              Freshtrax — a self-service footwear sterilization kiosk. It eliminates bacteria and odor from athletic shoes in 90 seconds.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={() => openModal(OFFERS.roiBlueprint)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-body"
              >
                <Download size={18} />
                Get the 8-Month ROI Blueprint
              </button>
              <a
                href="#projections"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-300 font-body"
              >
                View the numbers
                <ArrowRight size={16} />
              </a>
            </motion.div>


          </div>

          {/* Right: Demo Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[300px]">
              {/* Glow behind video */}
              <div className="absolute -inset-8 bg-orange-500/[0.06] rounded-full blur-[80px]" />
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl aspect-[9/16]">
                <video
                  ref={videoRef}
                  src={DEMO_VIDEO}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Unmute Button */}
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                    }
                  }}
                  className="absolute bottom-4 right-4 p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX size={18} />
                  ) : (
                    <Volume2 size={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
