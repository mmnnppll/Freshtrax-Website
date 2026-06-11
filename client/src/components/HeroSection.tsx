/*
 * Design: Dark Matter Industrial — Hero Section
 * Full-width hero with cinematic demo video as visual centerpiece.
 * Asymmetric two-column layout: headline left, demo video right (9:16 vertical).
 * CTA: "Get the 8-Month ROI Blueprint"
 */
import { motion } from "framer-motion";
import { Download, CalendarDays, Volume2, VolumeX } from "lucide-react";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";
import { useBookCall } from "@/contexts/BookCallContext";
import { useState, useRef, useEffect } from "react";

const HERO_BG = "/images/shoe-sanitization-kiosk-hero.webp";
const DEMO_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/openart-enhanced_1776890114044_1e2c34a5_6aa45cb4.mp4";

export default function HeroSection() {
  const { openModal } = useLeadCapture();
  const { openBookCall } = useBookCall();
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: only load + play the video when its container
  // enters the viewport. On initial page load the video has no src,
  // so the browser never downloads it — the hero BG img is the LCP element.
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !video.src) {
          video.src = DEMO_VIDEO;
          video.play().catch(() => {});
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={HERO_BG} alt="Freshtrax footwear sanitization kiosk background" className="w-full h-full object-cover" />
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

            {/* Headline — H1 is keyword-targeted for SEO; revenue claim is H2 for conversion */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="w-0.5 h-4 bg-orange-500 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-400 font-body">
                The Shoe Sanitization Kiosk for Fitness and Sports Venues
              </span>
            </motion.h1>

            {/* Revenue claim — visually primary */}
            <motion.h2
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="font-display font-bold text-5xl md:text-6xl leading-tight mb-4 text-white"
            >
              Make up to{" "}
              <span className="text-orange-500">$36,830/year</span>
              <br />
              per kiosk.
            </motion.h2>

            {/* Earnings disclosure — visible, not fine print */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-white/55 text-sm mb-6 font-body"
            >
              Optimistic case (30 cycles/day). Typical owner projects $24,237/year.
            </motion.p>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/70 text-lg mb-8 leading-relaxed font-body"
            >
              Freshtrax — a self-service footwear sanitization kiosk. It eliminates bacteria and odor from athletic shoes in 90 seconds.
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-body"
              >
                <Download size={18} />
                Get my Free ROI Blueprint
              </button>
              <button
                onClick={openBookCall}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-300 font-body"
              >
                <CalendarDays size={16} />
                Book a call
              </button>
            </motion.div>


          </div>

          {/* Right: Demo Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <div ref={containerRef} className="relative w-full max-w-[280px] sm:max-w-[300px]">
              {/* Glow behind video */}
              <div className="absolute -inset-8 bg-orange-500/[0.06] rounded-full blur-[80px]" />
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl aspect-[9/16]">
                {/* Static img overlay — this is the LCP element.
                    Preloaded via <link rel="preload"> in index.html so it
                    paints in ~1s. Fades out once the video has a real frame. */}
                <img
                  src={HERO_BG}
                  alt="Freshtrax footwear sanitization kiosk"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: videoReady ? 0 : 1,
                    transition: "opacity 0.4s ease",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                  fetchPriority="high"
                />
                {/* Video — src injected by IntersectionObserver when visible.
                    No src on initial load = browser never downloads it = fast LCP. */}
                <video
                  ref={videoRef}
                  muted={isMuted}
                  loop
                  playsInline
                  onCanPlay={() => setVideoReady(true)}
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
                  className="absolute bottom-4 right-4 p-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ zIndex: 2 }}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
