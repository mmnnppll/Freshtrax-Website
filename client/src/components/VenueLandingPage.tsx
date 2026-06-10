/**
 * VenueLandingPage — reusable template for all venue-specific landing pages.
 * Pass a VenueConfig object to customise copy, stats, and SEO.
 */
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Users, Shield, ArrowRight, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createWebPageSchema } from "@/components/SchemaMarkup";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";
import { useBookCall } from "@/contexts/BookCallContext";

export interface VenueConfig {
  // SEO
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  // Page copy
  venueName: string;          // e.g. "Pickleball Clubs"
  venueSlug: string;          // e.g. "pickleball-clubs"
  headline: string;           // H1
  subheadline: string;        // one sentence below H1
  problemIntro: string;       // paragraph — the hygiene problem at this venue
  // Three venue-specific benefits (icon label + description)
  benefits: { title: string; description: string }[];
  // Three stats shown in the stats row
  stats: { value: string; label: string }[];
  // Why venue operators love it
  operatorReasons: { title: string; description: string }[];
  // FAQ items
  faqs: { q: string; a: string }[];
}

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/hero-bg-ECzbAorEHV8DYBJU9NrUhH.webp";

export default function VenueLandingPage({ config }: { config: VenueConfig }) {
  const { openModal } = useLeadCapture();
  const { openBookCall } = useBookCall();

  return (
    <>
      <SEOHead
        title={config.seoTitle}
        description={config.seoDescription}
        canonicalUrl={config.canonicalUrl}
        ogTitle={config.seoTitle}
        ogDescription={config.seoDescription}
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={createWebPageSchema({
        title: config.seoTitle,
        description: config.seoDescription,
        url: config.canonicalUrl,
      })} />

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={HERO_BG}
              alt={`Freshtrax shoe sanitization kiosk for ${config.venueName}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-transparent" />
          </div>

          <div className="container relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="w-0.5 h-4 bg-orange-500 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-400 font-body">
                Freshtrax for {config.venueName}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-5 text-white"
            >
              {config.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed font-body max-w-2xl"
            >
              {config.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => openModal(OFFERS.roiBlueprint)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-body"
              >
                Get the Free ROI Blueprint
                <ArrowRight size={16} />
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
        </section>

        {/* ── STATS ROW ────────────────────────────────────────────────────── */}
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="container py-10">
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
              {config.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p className="text-3xl font-bold text-orange-500 font-display mb-1">{stat.value}</p>
                  <p className="text-white/55 text-sm font-body">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM ──────────────────────────────────────────────────── */}
        <section className="container py-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-4 font-body">The Problem</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
              Shared courts and mats create a hygiene challenge
            </h2>
            <p className="text-white/65 text-lg leading-relaxed font-body">
              {config.problemIntro}
            </p>
          </motion.div>
        </section>

        {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
        <section className="bg-white/[0.02] border-y border-white/10">
          <div className="container py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3 font-body">How Freshtrax Helps</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                Medical-grade sanitization. 90 seconds.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {config.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/[0.04] border border-white/10 rounded-xl p-6"
                >
                  <CheckCircle size={22} className="text-orange-500 mb-4" />
                  <h3 className="font-semibold text-white text-lg mb-2 font-display">{benefit.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-body">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOR VENUE OPERATORS ──────────────────────────────────────────── */}
        <section className="container py-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3 font-body">For Venue Operators</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              A revenue-generating amenity. Zero staff required.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.operatorReasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-6 bg-white/[0.03] border border-white/10 rounded-xl"
              >
                <TrendingUp size={20} className="text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1 font-display">{reason.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-body">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        {config.faqs.length > 0 && (
          <section className="bg-white/[0.02] border-y border-white/10">
            <div className="container py-20 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3 font-body">FAQ</p>
                <h2 className="font-display font-bold text-3xl text-white">Common questions</h2>
              </motion.div>
              <div className="space-y-6">
                {config.faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="border-b border-white/10 pb-6"
                  >
                    <p className="font-semibold text-white mb-2 font-display">{faq.q}</p>
                    <p className="text-white/60 text-sm leading-relaxed font-body">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="container py-24 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              Ready to bring Freshtrax to your {config.venueName.toLowerCase()}?
            </h2>
            <p className="text-white/60 mb-8 font-body">
              Get the full ROI Blueprint or book a 20-minute call to see if your venue qualifies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openModal(OFFERS.roiBlueprint)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg font-body"
              >
                Get the Free ROI Blueprint
              </button>
              <button
                onClick={openBookCall}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-300 font-body"
              >
                <CalendarDays size={16} />
                Book a call
              </button>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}
