/*
 * CityLanding — local SEO landing pages, route /gyms/:city.
 * City data lives in data/cities.ts; prerender.ts generates static HTML and
 * sitemap entries from the same list so pages can never go missing.
 */
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createWebPageSchema, createFAQSchema } from "@/components/SchemaMarkup";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";
import { useBookCall } from "@/contexts/BookCallContext";
import { getCityBySlug, type City } from "@/data/cities";

const HERO_BG = "/images/shoe-sanitization-kiosk-hero.webp";
const PILOT_PHOTO = "/images/pilot/wcb-kiosk-install.jpg";

function createCityLocalBusinessSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Freshtrax",
    url: `https://getfreshtrax.com/gyms/${city.slug}/`,
    image: "https://getfreshtrax.com/images/freshtrax-logo-black.png",
    description: `Self-service shoe sanitization kiosks for ${city.name} fitness and sports venues`,
    priceRange: "$$$",
    areaServed: [
      { "@type": "City", name: city.name },
      { "@type": "Country", name: "Canada" },
    ],
  };
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-lg bg-white/[0.03]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-white font-semibold text-sm md:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`text-orange-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="px-5 pb-5 text-white/60 text-sm leading-relaxed font-body">{a}</p>
      )}
    </div>
  );
}

export default function CityLanding() {
  const [, params] = useRoute("/gyms/:city");
  const city = params?.city ? getCityBySlug(params.city) : undefined;
  const { openModal } = useLeadCapture();
  const { openBookCall } = useBookCall();

  if (!city) return <NotFound />;

  return (
    <>
      <SEOHead
        title={city.seoTitle}
        description={city.seoDescription}
        canonicalUrl={`https://getfreshtrax.com/gyms/${city.slug}/`}
        ogTitle={city.seoTitle}
        ogDescription={city.seoDescription}
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={createCityLocalBusinessSchema(city)} />
      <SchemaMarkup schema={createWebPageSchema({
        title: city.seoTitle,
        description: city.seoDescription,
        url: `https://getfreshtrax.com/gyms/${city.slug}/`,
      })} />
      <SchemaMarkup schema={createFAQSchema(
        city.faqs.map((f) => ({ question: f.q, answer: f.a }))
      )} />

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={HERO_BG}
              alt={`Freshtrax shoe sanitization kiosks in ${city.name}, ${city.province}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/50" />
          </div>
          <div className="container relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <MapPin size={13} className="text-orange-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-400 font-body">
                Freshtrax · {city.name}, {city.province}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-display font-bold text-4xl md:text-5xl leading-tight mb-5"
            >
              {city.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 text-lg mb-8 leading-relaxed font-body"
            >
              {city.intro}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4"
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
                Book a call
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="container py-10">
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
              {[
                { value: "90s", label: "Full sanitization cycle" },
                { value: "$2,019–$3,067", label: "Monthly net (20–30 cycles/day)" },
                { value: "Zero", label: "Staff required" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold text-orange-500 font-display mb-1">{stat.value}</p>
                  <p className="text-white/55 text-xs md:text-sm font-body">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCAL MARKET ── */}
        <section className="container py-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-4 font-body">
              The {city.name} venue scene
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 leading-tight">
              Built for how {city.name} trains
            </h2>
            <p className="text-white/65 text-lg leading-relaxed font-body mb-8">
              {city.venueScene}
            </p>
            <div className="flex flex-wrap gap-3">
              {city.venueHighlights.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className="px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-sm font-semibold transition-colors"
                >
                  {v.label} →
                </Link>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── LOCAL PROOF ── */}
        <section className="bg-white/[0.02] border-y border-white/10">
          <div className="container py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden border border-white/10"
              >
                <img
                  src={PILOT_PHOTO}
                  alt="Freshtrax pilot kiosk at West Coast Badminton Academy in Richmond, BC"
                  loading="lazy"
                  className="w-full h-64 object-cover object-top"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
                  Live in the Lower Mainland
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  See a real machine before you decide
                </h2>
                <p className="text-white/60 font-body leading-relaxed mb-5">
                  Our pilot kiosk has run 160+ cycles at West Coast Badminton
                  Academy in Richmond since April 22, 2026. {city.name} venues
                  can visit, run a cycle, and inspect the machine in person.
                </p>
                <button
                  onClick={openBookCall}
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors"
                >
                  Arrange a pilot visit <ArrowRight size={14} />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="container py-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Freshtrax in {city.name} — common questions
          </h2>
          <div className="space-y-3">
            {city.faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-white/5">
          <div className="container py-20 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Put a Freshtrax on your {city.name} floor
            </h2>
            <p className="text-white/60 text-lg font-body mb-8">
              Whether you run a venue or want us to help you place a machine in
              one, it starts with the numbers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openModal(OFFERS.roiBlueprint)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 font-body"
              >
                Get the Free ROI Blueprint
                <ArrowRight size={16} />
              </button>
              <button
                onClick={openBookCall}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-300 font-body"
              >
                <CalendarDays size={16} />
                Book a 30-minute call
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
