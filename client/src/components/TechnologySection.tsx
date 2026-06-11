/*
 * Design: Dark Matter Industrial — Technology Section
 * 3-column card grid with technology images. Clean, balanced layout.
 * CTA: "Download the Hidden Pathogens Report"
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Sun, Wind, Droplets, ArrowRight } from "lucide-react";
import { Link } from "wouter";

import { OFFERS } from "@/contexts/LeadCaptureContext";

const UVC_IMG = "/images/uvc-light-shoe-sanitization.jpg";
const OZONE_IMG = "/images/ozone-shoe-sanitization-cycle.webp";
const ANTIMICROBIAL_IMG = "/images/antimicrobial-fog-shoe-sanitization.jpg";

const technologies = [
  {
    step: 1,
    icon: Sun,
    title: "UVC Light",
    description:
      "Destroys bacteria and fungi at the cellular level — not masking odors, eliminating them.",
    image: UVC_IMG,
  },
  {
    step: 2,
    icon: Wind,
    title: "Ozone Treatment",
    description:
      "Deep penetration into material fibres neutralises odour-causing compounds at the source.",
    image: OZONE_IMG,
  },
  {
    step: 3,
    icon: Droplets,
    title: "Antimicrobial Vapor",
    description:
      "Near-Nanometer 360° antimicrobial vapor, removes bacteria + infusing shoes with fresh scent.",
    image: ANTIMICROBIAL_IMG,
  },
];

export default function TechnologySection() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.05 });
  const { ref: cardsRef, isInView: cardsInView } = useInView({ threshold: 0.05 });

  return (
    <section id="technology" className="relative py-16 md:py-24">
      <div className="container">
        {/* Section header */}
        <div ref={headerRef} className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span className="text-orange-500 text-xs font-mono uppercase tracking-[0.2em]">
              Technology
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-5xl text-white mb-3 max-w-2xl leading-tight"
          >
            Three layers of <span className="text-orange-500">medical-grade</span> protection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-base font-body max-w-xl"
          >
            Proven sanitization technologies, delivering clinical-level hygiene in a fully automated, consumer-facing format.
          </motion.p>
        </div>

        {/* 3-column card grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 30 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-[#111]/60 backdrop-blur-sm border border-white/[0.06] rounded-xl overflow-hidden hover:border-orange-500/20 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={tech.image}
                  alt={tech.title}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                    tech.step === 2 ? "object-top" : ""
                  }`}
                />
                {/* Step number overlay */}
                <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-orange-500/90 flex items-center justify-center">
                  <span className="text-white text-xs font-mono font-bold">{tech.step}</span>
                </div>
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111] to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <tech.icon size={18} className="text-orange-500" />
                  <h3 className="font-display font-bold text-lg text-white">{tech.title}</h3>
                </div>
                <p className="text-white/40 text-sm font-body leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/shoe-sanitization-machine"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors"
          >
            Learn more about our shoe sanitization machine
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
