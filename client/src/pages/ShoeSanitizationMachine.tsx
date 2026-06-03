import { motion } from "framer-motion";
import { ArrowRight, Zap, Wind, Droplets, Thermometer, Clock, CheckCircle, Building2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, createWebPageSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";

const venues = [
  {
    name: "Pickleball Clubs",
    desc: "Members play in court shoes for 1–2 hours at a time, multiple times per week. Enclosed venues, high-frequency players, and a hygiene-conscious demographic make this the highest-fit placement type.",
  },
  {
    name: "Gyms & Fitness Studios",
    desc: "Members spend 45–90 minutes in enclosed training shoes on treadmills, weight floors, and functional training areas. High-rep, high-sweat sessions build up bacteria and odor fast.",
  },
  {
    name: "Badminton & Squash Centers",
    desc: "Regulars return weekly with the same pair of court shoes. Our pilot Freshtrax deployment was at a badminton facility — members adopted it within the first week with zero staff push.",
  },
  {
    name: "Indoor Tennis Centers",
    desc: "Players invest in dedicated court shoes worn for long rallies and lateral movement. A 90-second sanitization cycle fits naturally into the pre- or post-court routine.",
  },
  {
    name: "Indoor Soccer Facilities",
    desc: "Turf shoes worn during intense, high-sweat matches accumulate bacteria quickly. With players rotating through multiple sessions per week, turnover is high and the need is consistent.",
  },
  {
    name: "Volleyball Clubs",
    desc: "Indoor volleyball players wear specialized court shoes for every session. High lateral movement means elevated sweat and rapid bacteria buildup between visits.",
  },
  {
    name: "Basketball Courts",
    desc: "Whether recreational leagues or dedicated training facilities, basketball players log serious time in enclosed, high-sweat footwear — often multiple sessions per week.",
  },
  {
    name: "Handball Courts",
    desc: "Fast-paced, court-shoe-dependent sport with a dedicated regular player base. Shared court environments make footwear hygiene a genuine concern.",
  },
  {
    name: "Dodgeball & Court Sports Leagues",
    desc: "Recreational leagues with regular weekly players in dedicated footwear — often underserved on facility hygiene amenities. Freshtrax is a visible differentiator.",
  },
  {
    name: "Bouldering & Climbing Gyms",
    desc: "Climbing shoes are notorious for odor due to the combination of sweat, enclosed fit, and rubber materials. Members are gear-conscious and already spend on performance equipment.",
  },
];

const technologies = [
  {
    title: "UVC Light",
    icon: Zap,
    desc: "Steel rods emit UV-C light at 250–270nm — disrupting microbial DNA and RNA to deactivate bacteria, fungi, viruses, and biofilm on contact.",
    evidence: "Torres-Teran et al., 2023 (ICHE) — 91–95% bioburden reduction.",
    image: "/images/ssm/uvc-feature.png",
  },
  {
    title: "Ozone",
    icon: Wind,
    desc: "Generated at the top of the chamber, ozone circulates throughout the shoe interior, reaching every seam, lace, and insole pocket — breaking down odor molecules at the molecular level.",
    evidence: "Gupta & Simkovich, 2022 (JAPMA) — effective against dermatophytes responsible for athlete's foot.",
    image: "/images/ssm/ozone-activated.jpg",
  },
  {
    title: "Antimicrobial Vapor",
    icon: Droplets,
    desc: "Dispersed through vents in the steel rods, the vapor penetrates fabric fibers and internal surfaces, reaching areas UV and ozone alone can't access.",
    evidence: "Safe formulation used in medical-grade sanitization protocols.",
    image: "/images/ssm/antimicrobial-fog-feature.png",
  },
  {
    title: "Heat",
    icon: Thermometer,
    desc: "Applied throughout the cycle to accelerate sanitization and eliminate residual moisture — the primary fuel for odor and bacterial growth.",
    evidence: "Thermal drying removes the moisture environment that bacteria and fungi depend on.",
    image: "/images/ssm/inside-chamber-steel-rods.png",
  },
];

const specs = [
  { label: "Dimensions", value: '28.5" W × 26.5" D × 71" H' },
  { label: "Power", value: "110V standard outlet" },
  { label: "Cycle Time", value: "Under 90 seconds" },
  { label: "Consumables", value: "Antimicrobial vapor (supplied by Freshtrax)" },
  { label: "Mobility", value: "Mounted on casters" },
  { label: "Payment", value: "Apple Pay, Google Pay, cards, cash" },
  { label: "Pricing Tiers", value: "Basic Fresh ($3.65) / Max Fresh ($4.35)" },
  { label: "Monitoring", value: "Real-time operator dashboard" },
  { label: "Lead Time", value: "6–7 months (built to order)" },
];

const faqs = [
  {
    q: "How is this different from spray sanitizers or UV cabinets?",
    a: "Spray stations require staff and leave chemical residue. UV cabinets typically take 10–30 minutes and only treat the exterior. Freshtrax treats the inside of the shoe — where bacteria and odor actually live — in under 90 seconds with no staff involvement.",
  },
  {
    q: "Is it effective against athlete's foot and nail fungus?",
    a: "Yes. The UVC and ozone combination targets the dermatophytes responsible for tinea pedis (athlete's foot) and onychomycosis (nail fungus), based on peer-reviewed clinical research. Freshtrax is working toward full FDA classification.",
  },
  {
    q: "What does the machine look like? Will it fit my venue?",
    a: 'The kiosk stands 71" tall with a 28.5" × 26.5" footprint and sits on casters for easy repositioning. It\'s designed to sit near entryways, locker room corridors, or beside shoe racks. We\'ll confirm placement on the call.',
  },
  {
    q: "What about maintenance?",
    a: "Freshtrax handles it remotely. The dashboard flags issues in real time. Most are resolved without anyone visiting your facility. Quarterly system checks and scheduled maintenance cycles are included.",
  },
  {
    q: "How long until I receive the machine after ordering?",
    a: "6–7 months from order confirmation. The machine is built to order, not off-the-shelf. That lead time isn't wasted — Freshtrax works with you during that window to identify and secure your venue placement so you're ready to generate revenue from day one.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-6 text-left font-semibold text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
      >
        <span>{q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-orange-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-6" : "max-h-0"}`}
      >
        <p className="px-6 text-white/70 leading-relaxed">{a}</p>
      </div>
    </motion.div>
  );
}

export default function ShoeSanitizationMachine() {
  return (
    <>
      <SEOHead
        title="Shoe Sanitization Machine for Gyms & Sports Venues | Freshtrax"
        description="Freshtrax is the shoe sanitization machine built for fitness venues. UVC, ozone, and antimicrobial vapor eliminate odor and bacteria in 90 seconds. Zero staff required."
        canonicalUrl="https://getfreshtrax.com/shoe-sanitization-machine"
        ogTitle="Shoe Sanitization Machine for Gyms & Sports Venues | Freshtrax"
        ogDescription="Freshtrax eliminates odor and bacteria from athletic footwear in 90 seconds using UVC light, ozone, antimicrobial vapor, and heat."
        ogImage="https://getfreshtrax.com/images/ssm/kiosk-black-bg-01.jpg"
      />
      {/* WebPage schema */}
      <SchemaMarkup
        schema={createWebPageSchema({
          title: "Shoe Sanitization Machine for Gyms & Sports Venues | Freshtrax",
          description: "Freshtrax is the shoe sanitization machine built for fitness venues. UVC, ozone, and antimicrobial vapor eliminate odor and bacteria in 90 seconds.",
          url: "https://getfreshtrax.com/shoe-sanitization-machine",
          image: "https://getfreshtrax.com/images/ssm/kiosk-black-bg-01.jpg",
          datePublished: "2026-06-01",
          dateModified: "2026-06-01",
        })}
      />
      {/* Product schema intentionally omitted — price not public, handled globally in index.html */}
      {/* BreadcrumbList schema */}
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://getfreshtrax.com/" },
          { name: "Shoe Sanitization Machine", url: "https://getfreshtrax.com/shoe-sanitization-machine" },
        ])}
      />
      {/* FAQPage schema — enables rich snippets in SERP */}
      <SchemaMarkup
        schema={createFAQSchema([
          {
            question: "How is this different from spray sanitizers or UV cabinets?",
            answer: "Spray stations require staff and leave chemical residue. UV cabinets typically take 10–30 minutes and only treat the exterior. Freshtrax treats the inside of the shoe — where bacteria and odor actually live — in under 90 seconds with no staff involvement.",
          },
          {
            question: "Is it effective against athlete's foot and nail fungus?",
            answer: "Yes. The UVC and ozone combination targets the dermatophytes responsible for tinea pedis (athlete's foot) and onychomycosis (nail fungus), based on peer-reviewed clinical research. Freshtrax is working toward full FDA classification.",
          },
          {
            question: "What does the machine look like? Will it fit my venue?",
            answer: "The kiosk stands 71 inches tall with a 28.5 by 26.5 inch footprint and sits on casters for easy repositioning. It fits near entryways, locker room corridors, or beside shoe racks. Placement is confirmed on the partner call.",
          },
          {
            question: "What about maintenance?",
            answer: "Freshtrax handles maintenance remotely. The dashboard flags issues in real time. Most are resolved without anyone visiting your facility. Quarterly system checks and scheduled maintenance cycles are included.",
          },
          {
            question: "How long until I receive the machine after ordering?",
            answer: "6 to 7 months from order confirmation. The machine is built to order, not off-the-shelf. Freshtrax works with you during that window to identify and secure your venue placement so you are ready to generate revenue from day one.",
          },
        ])}
      />

      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
        <ParticleField />
        <Navbar />

        <main className="flex-1" role="main">

          {/* ── HERO ── */}
          <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="/images/ssm/kiosk-black-bg-01.jpg"
                alt="Freshtrax shoe sanitization machine — front view at a sports venue"
                className="w-full h-full object-cover opacity-30"
                width={1200}
                height={800}
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            <div className="container relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-sm text-orange-400 font-medium mb-6">
                  <Zap size={14} />
                  90-Second Cycle · Zero Staff Required
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                  The Shoe Sanitization Machine Built for{" "}
                  <span className="text-orange-500">Fitness and Sports Venues</span>
                </h1>
                <p className="text-xl text-white/70 mb-8 leading-relaxed">
                  If your members wear the same athletic shoes every session, those shoes are accumulating bacteria, fungi, and odor between visits. Freshtrax eliminates it — in 90 seconds, without a single staff member.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.open("https://calendar.app.google/YWP7rF8gFUXgfMRCA", "_blank")}
                    className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  >
                    Book a 30-Minute Call
                    <ArrowRight size={18} />
                  </button>
                  <Link
                    href="/how-it-works"
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    See How It Works
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── STAT BAR ── */}
          <section className="border-t border-b border-white/5 py-8">
            <div className="container">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { stat: "90s", label: "Full cycle" },
                  { stat: "4-Stage", label: "Sanitization process" },
                  { stat: "91–95%", label: "Bioburden reduction*" },
                  { stat: "0", label: "Staff required" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <p className="text-3xl font-bold text-orange-500">{item.stat}</p>
                    <p className="text-sm text-white/50 mt-1">{item.label}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-white/30 text-center mt-4">*Torres-Teran et al., 2023, ICHE</p>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section className="py-24 border-t border-white/5">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">The Technology</p>
                <h2 className="text-4xl font-bold mb-4">Four Stages. One 90-Second Cycle.</h2>
                <p className="text-white/60 text-lg max-w-2xl">
                  Every stage targets a different threat — together they eliminate odor, bacteria, fungi, and moisture from the inside out.{" "}
                  <Link href="/how-it-works" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">
                    See the full science →
                  </Link>
                </p>
              </motion.div>

              <div className="space-y-16">
                {technologies.map((tech, idx) => {
                  const Icon = tech.icon;
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 }}
                      className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center`}
                    >
                      <div className={isEven ? "" : "md:order-2"}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                            <Icon className="text-orange-500" size={20} />
                          </div>
                          <span className="text-sm font-semibold text-orange-500 uppercase tracking-widest">Stage {idx + 1}</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-4">{tech.title}</h3>
                        <p className="text-white/70 leading-relaxed mb-4">{tech.desc}</p>
                        <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                          <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-1">Clinical Evidence</p>
                          <p className="text-sm text-white/60">{tech.evidence}</p>
                        </div>
                      </div>
                      <div className={isEven ? "" : "md:order-1"}>
                        <img
                          src={tech.image}
                          alt={`${tech.title} stage of the Freshtrax shoe sanitization machine`}
                          className="w-full h-72 object-cover rounded-xl border border-white/10"
                          loading="lazy"
                          width={600}
                          height={288}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── VENUE FIT ── */}
          <section className="py-24 border-t border-white/5 bg-white/[0.01]">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Venue Fit</p>
                <h2 className="text-4xl font-bold mb-4">Which Venues Get the Most from a Shoe Sanitization Machine</h2>
                <p className="text-white/60 text-lg max-w-2xl">
                  The common factor: members wear dedicated athletic footwear for extended sessions and their feet sweat in those shoes. That sweat is what feeds bacteria and drives odor over time.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {venues.map((venue, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/5 border border-white/10 hover:border-orange-500/30 rounded-xl p-6 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Building2 size={18} className="text-orange-500 shrink-0" />
                      <h3 className="font-semibold text-lg">{venue.name}</h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{venue.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-10 text-white/40 text-sm text-center max-w-xl mx-auto"
              >
                Not sure if your venue is the right fit? Book a 30-minute call and we'll tell you honestly.
              </motion.p>
            </div>
          </section>

          {/* ── MACHINE + SPECS ── */}
          <section className="py-24 border-t border-white/5">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="/images/ssm/product-dimensions.png"
                    alt="Freshtrax shoe sanitization machine dimensions: 28.5 inches wide, 26.5 inches deep, 71 inches tall, on casters"
                    className="w-full max-w-sm mx-auto"
                    loading="lazy"
                    width={400}
                    height={600}
                  />
                </motion.div>

                {/* Specs */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Machine Specs</p>
                  <h2 className="text-4xl font-bold mb-8">Built for Commercial Venues</h2>
                  <div className="space-y-4">
                    {specs.map((spec, i) => (
                      <div key={i} className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                        <span className="text-white/50 text-sm shrink-0">{spec.label}</span>
                        <span className="text-white font-medium text-sm text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={16} className="text-orange-500" />
                      <p className="text-sm font-semibold text-orange-400">No plumbing. No installation.</p>
                    </div>
                    <p className="text-sm text-white/50">Plug into a standard 110V outlet and it's ready to go.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── OWN A MACHINE ── */}
          <section className="py-24 border-t border-white/5 bg-gradient-to-b from-orange-500/5 to-transparent">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Ownership</p>
                  <h2 className="text-4xl font-bold mb-6">Own a Machine at Your Venue</h2>
                  <p className="text-white/70 leading-relaxed mb-6">
                    The most common path: you purchase a Freshtrax kiosk and place it in your own facility or a partner venue. Your members pay per use. Revenue accrues to you — without adding a single staff hour.
                  </p>
                  <p className="text-white/70 leading-relaxed mb-8">
                    If you're a venue owner who wants a kiosk without purchasing equipment upfront, we offer a limited venue partnership model for high-traffic locations. That conversation starts with a 30-minute call.
                  </p>
                  <button
                    onClick={() => window.open("https://calendar.app.google/YWP7rF8gFUXgfMRCA", "_blank")}
                    className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  >
                    Book a 30-Minute Call
                    <ArrowRight size={18} />
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Founders Club card */}
                  <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/30 rounded-xl p-8 relative">
                    <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      FOUNDERS CLUB
                    </div>
                    <h3 className="text-2xl font-bold mb-2">First 20 Owners</h3>
                    <p className="text-white/60 text-sm mb-6">Founding slots close permanently once filled.</p>
                    <div className="space-y-4">
                      {[
                        { label: "Platform Fee", value: "$79/mo — locked for life" },
                        { label: "Service Fee", value: "$0 permanently on Machine 1" },
                        { label: "Territory", value: "Exclusivity in your zone" },
                        { label: "Support", value: "Priority + quarterly strategy calls" },
                      ].map((row, i) => (
                        <div key={i} className="flex items-start justify-between gap-4">
                          <span className="text-white/50 text-sm shrink-0">{row.label}</span>
                          <span className="text-sm font-semibold text-right flex items-center gap-1">
                            <CheckCircle size={14} className="text-green-400 shrink-0" />
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <Link
                        href="/owners"
                        className="text-orange-400 hover:text-orange-300 text-sm font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        See full financial projections
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── SLOGAN BREAK ── */}
          <section className="border-t border-white/5 py-24 bg-gradient-to-br from-[#0a0a0a] via-orange-950/20 to-[#0a0a0a] relative overflow-hidden">
            {/* Subtle radial glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div className="w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-3xl" />
            </div>
            <div className="container relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-6">Freshtrax</p>
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                  Leave your mark,
                  <br />
                  <span className="text-orange-500">not your smell.</span>
                </h2>
              </motion.div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-24 border-t border-white/5">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
                <h2 className="text-4xl font-bold mb-4">Common Questions</h2>
                <p className="text-white/60 text-lg">Everything you need to know before booking a call.</p>
              </motion.div>

              <div className="max-w-3xl space-y-3">
                {faqs.map((faq, idx) => (
                  <FAQItem key={idx} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ── */}
          <section className="py-24 border-t border-white/5">
            <div className="container text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Bring Freshtrax to Your Venue?
                </h2>
                <p className="text-xl text-white/60 mb-8">
                  It takes 30 minutes to find out if your venue is the right fit — and whether ownership or a venue partnership makes more sense for you.
                </p>
                <button
                  onClick={() => window.open("https://calendar.app.google/YWP7rF8gFUXgfMRCA", "_blank")}
                  className="px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  Book Your Partner Call
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
