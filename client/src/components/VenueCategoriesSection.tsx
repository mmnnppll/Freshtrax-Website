/*
 * Venue Categories — homepage strip.
 * Broad market framing built on the venue-fit rule ("athletes who sweat in
 * their shoes"), with deep links into the venue SEO pages. The category
 * buckets stay wide on purpose — narrow keyword targeting lives on the
 * dedicated landing pages, not here.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Dumbbell, Target, Volleyball, Mountain, Sparkles, ArrowRight, Briefcase } from "lucide-react";
import { useBookCall } from "@/contexts/BookCallContext";

const CATEGORIES = [
  {
    icon: Dumbbell,
    title: "Gym / Fitness Center",
    description: "Training gyms, boxes, HIIT studios, and fitness centers — anywhere members log sweaty sessions in the same pair of trainers.",
    links: [{ label: "Training boxes →", href: "/crossfit-gyms" }],
  },
  {
    icon: Target,
    title: "Racket & Court Sports",
    description: "Dedicated court shoes worn 60–90+ minutes per session. The strongest fit in our network — and where our pilot runs today.",
    links: [
      { label: "Pickleball →", href: "/pickleball-clubs" },
      { label: "Tennis →", href: "/tennis-clubs" },
      { label: "Badminton →", href: "/badminton-centers" },
    ],
  },
  {
    icon: Volleyball,
    title: "Indoor Team Sports",
    description: "Indoor soccer, volleyball, basketball, dodgeball, handball — high-sweat sessions, dedicated footwear, regular player bases.",
    links: [],
  },
  {
    icon: Mountain,
    title: "Climbing & Bouldering",
    description: "Rental shoe odor is the oldest joke in climbing. Freshtrax retires it — and your community notices.",
    links: [{ label: "Climbing gyms →", href: "/bouldering-gyms" }],
  },
];

export default function VenueCategoriesSection() {
  const { openBookCall } = useBookCall();

  return (
    <section id="venues" className="py-20 border-t border-white/5" aria-label="Venue types">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Built for Your Venue
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            If your athletes sweat in their shoes,
            <br />
            <span className="text-orange-500">Freshtrax fits.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl font-body">
            Court shoes, turf shoes, training shoes — worn hard, session after
            session. That&apos;s where Freshtrax earns its floor space.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col"
            >
              <cat.icon className="w-7 h-7 text-orange-500 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{cat.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed font-body mb-4 flex-1">
                {cat.description}
              </p>
              {cat.links.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {cat.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Your venue? */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-5"
        >
          <button
            onClick={openBookCall}
            className="text-left bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-xl p-6 transition-colors group"
          >
            <Sparkles className="w-6 h-6 text-orange-500 mb-3" />
            <h3 className="text-white font-semibold text-lg mb-1">
              Don&apos;t see your venue?
            </h3>
            <p className="text-white/55 text-sm font-body">
              If your athletes pass the sweat test, we should talk.{" "}
              <span className="text-orange-400 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Book a 30-minute call <ArrowRight size={13} />
              </span>
            </p>
          </button>

          {/* Entrepreneur path */}
          <Link
            href="/owners"
            className="block bg-gradient-to-br from-orange-500/15 to-orange-500/5 hover:from-orange-500/20 border border-orange-500/25 rounded-xl p-6 transition-colors group"
          >
            <Briefcase className="w-6 h-6 text-orange-500 mb-3" />
            <h3 className="text-white font-semibold text-lg mb-1">
              Don&apos;t own a venue? You can still own a Freshtrax.
            </h3>
            <p className="text-white/55 text-sm font-body">
              Many owners place their kiosk in a partner venue — we help with
              targeting, pitching, and rev-share.{" "}
              <span className="text-orange-400 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                See how ownership works <ArrowRight size={13} />
              </span>
            </p>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
