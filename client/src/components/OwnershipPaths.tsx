/*
 * Ownership Paths — /owners page.
 * Answers the #1 visitor confusion from user feedback: you do NOT need to
 * own a venue to own a Freshtrax. Two explicit paths, same machine.
 */
import { motion } from "framer-motion";
import { Building2, Briefcase, Check, ArrowRight, CalendarDays } from "lucide-react";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";
import { useBookCall } from "@/contexts/BookCallContext";

const PATHS = [
  {
    icon: Building2,
    badge: "Path 1",
    title: "I own or run a venue",
    points: [
      "Add zero-staff revenue to space you already pay for",
      "Members get a hygiene amenity they actually notice",
      "Machine works your floor 24/7 — no scheduling, no inventory",
    ],
  },
  {
    icon: Briefcase,
    badge: "Path 2",
    title: "I don't own a venue (yet)",
    points: [
      "Buy the kiosk, place it inside a partner venue on a rev-share",
      "We help with venue targeting, pitch materials, and deal structure",
      "Run it as a low-touch side business — most owners keep their day job",
    ],
  },
];

export default function OwnershipPaths() {
  const { openModal } = useLeadCapture();
  const { openBookCall } = useBookCall();

  return (
    <section className="py-20 border-t border-white/5" aria-label="Ownership paths">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            You Don&apos;t Need to Own a Gym to Own a Freshtrax
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Two ways in. Same machine, same economics — the only difference is
            whose floor it stands on.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {PATHS.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <path.icon size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">{path.badge}</p>
                  <h3 className="text-white font-bold text-xl">{path.title}</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {path.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-white/65 text-sm font-body leading-relaxed">
                    <Check size={15} className="text-orange-500 mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => openModal(OFFERS.roiBlueprint)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 font-body"
          >
            Get the Free ROI Blueprint
            <ArrowRight size={16} />
          </button>
          <button
            onClick={openBookCall}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-300 font-body"
          >
            <CalendarDays size={16} />
            Talk through your path
          </button>
        </motion.div>
      </div>
    </section>
  );
}
