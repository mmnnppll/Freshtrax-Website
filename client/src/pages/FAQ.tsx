import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createWebPageSchema, createFAQSchema } from "@/components/SchemaMarkup";

const faqs = [
  {
    category: "Product & Technology",
    questions: [
      {
        q: "How does Freshtrax actually work?",
        a: "Freshtrax uses a three-stage sanitization process: UVC light (bacteria elimination), ozone (odor elimination), and antimicrobial vapor. The entire cycle takes 90 seconds and eliminates bacteria, fungi, and odor at the root — not just masking it.",
      },
      {
        q: "Is Freshtrax FDA-approved?",
        a: "Freshtrax uses sanitization technologies that have been proven in clinical settings across Asia for over a decade. The UVC and ozone technologies are FDA-recognized sanitization methods. We're currently pursuing formal FDA classification for the complete system.",
      },
      {
        q: "What happens if the machine breaks?",
        a: "We provide 24/7 technical support and remote diagnostics. Most issues are resolved via software updates or simple troubleshooting. For hardware failures, we have a replacement protocol and spare parts network to minimize downtime.",
      },
      {
        q: "How often does the machine need maintenance?",
        a: "Routine maintenance is minimal: quarterly system check. We handle most maintenance remotely. Preventive maintenance is included in the Founder's Club package.",
      },
      {
        q: "Can the machine handle different shoe types?",
        a: "Yes. The kiosk accommodates everything from running shoes to cleats to wrestling shoes. The antimicrobial vapor and UV-C light are safe for all common shoe materials and adjust naturally to fit the interior of any shoe type.",
      },
    ],
  },
  {
    category: "Financial & ROI",
    questions: [
      {
        q: "What if my venue doesn't hit 25 cycles per day?",
        a: "Even at 15 cycles/day (conservative scenario), you're looking at $1,575/month or $18,900/year — still a 240% Year 1 return. The machine pays for itself in 5 months at that volume. Most owners hit 25+ within 3 months of launch.",
      },
      {
        q: "Do I keep 100% of the revenue?",
        a: "You own the machine and set the price ($3.65-$4.35 per cycle). After operating costs (~$0.55/cycle), you pay a $99/month platform fee (includes Dashboard + device health monitoring) and a 5% service fee (used for marketing). Founder's Club members pay $79/month with 0% service fee on their founding machine — permanently.",
      },
      {
        q: "What are the ongoing costs?",
        a: "Operating costs are ~$0.55 per cycle (electricity, consumables, maintenance reserve). Additionally, there's a $99/month platform fee (includes Dashboard + device health monitoring) and a 5% service fee for marketing. Founder's Club members pay $79/month platform fee with the 0% service fee on founding machine, permanently.",
      },
      {
        q: "What if the market gets saturated?",
        a: "We're actively managing territory exclusivity for Founder's Club members. For non-exclusive owners, the addressable market (gyms, pickleball clubs, tennis centers, sports facilities) is massive — we're targeting 12 Tier 1 metros with 1,000+ venues each.",
      },
      {
        q: "Can I scale to multiple machines?",
        a: "Absolutely. Many of our best owners are running 3-5 machines across different venues. We have a multi-unit support program with volume pricing and dedicated account management.",
      },
    ],
  },
  {
    category: "Operations & Support",
    questions: [
      {
        q: "Do I need any special training?",
        a: "No. The machine is designed for end-users (athletes) to operate independently. Your role is placement, pricing, and collecting revenue. We provide 2-hour onboarding and ongoing support.",
      },
      {
        q: "What if users don't know how to use it?",
        a: "The machine has an intuitive touchscreen interface with video instructions. We also provide signage and QR codes linking to tutorial videos. Most users figure it out in seconds.",
      },
      {
        q: "How do I collect payment from users?",
        a: "The machine accepts contactless payments (Apple Pay, Google Pay, cards) and cash. Revenue is automatically tracked in your dashboard. All our kiosks use NAYAX POS (point of sale). Payouts are directly from NAYAX to your bank account.",
      },
      {
        q: "What if the venue wants to remove the machine?",
        a: "You own the machine, so you have full control. If a venue underperforms, you can relocate it. We help with placement strategy and venue relationships.",
      },
      {
        q: "Is there ongoing support after deployment?",
        a: "Yes. You get 24/7 technical support, monthly performance reviews, and quarterly strategy calls. Founder's Club members get priority support and dedicated account management.",
      },
    ],
  },
  {
    category: "Getting Started",
    questions: [
      {
        q: "How long does it take to deploy a machine?",
        a: "From purchase to deployment: 6-7 months. We handle logistics, and user training. You start collecting revenue immediately after launch.",
      },
      {
        q: "What's the difference between Founder's Club and regular ownership?",
        a: "Founder's Club (first 20 owners) includes: $79/month platform fee (vs. $99 regular), locked for life, 0% service fee on founding machine permanently, territory exclusivity, lifetime priority support, and quarterly strategy calls. Regular owners pay $99/month platform fee + 5% service fee but get full support without exclusivity. Download the 8-Month ROI Blueprint for complete machine acquisition pricing.",
      },
      {
        q: "How much does it cost to be an owner for Freshtrax kiosk?",
        a: "Monthly operating costs include: $99/month platform fee (or $79/month for Founder's Club) + 5% service fee on revenue + ~$0.55 per cycle for electricity and consumables. For the machine acquisition cost and complete financial breakdown, download the 8-Month ROI Blueprint PDF which includes all upfront costs, financing options, and detailed ROI projections.",
      },
      {
        q: "Can I finance the machine?",
        a: "Yes. Connect with us, and we can come up with a plan that works for you. Download the 8-Month ROI Blueprint PDF to see the machine cost and financing options. Most owners pay off the machine within 3-4 months from revenue.",
      },
      {
        q: "What venues are best for Freshtrax?",
        a: "Gyms, pickleball clubs, tennis centers, CrossFit boxes, martial arts studios, and any high-sweat sports facility. Ideal venues have 200+ members and strong hygiene culture.",
      },
      {
        q: "How do I get started?",
        a: "Download the 8-Month ROI Blueprint to see the full financial model. Then book a call with Marvin to discuss your venue, market, and timeline. We'll walk you through everything.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <SEOHead
        title="FAQ | Freshtrax Footwear Sanitization"
        description="Frequently asked questions about Freshtrax footwear sanitization kiosk. Learn about product technology, financial performance, operations, and getting started."
        canonicalUrl="https://getfreshtrax.com/faq"
        ogTitle="FAQ | Freshtrax Footwear Sanitization"
        ogDescription="Get answers to common questions about how Freshtrax works, profitability, maintenance, and becoming an owner."
      />
      <SchemaMarkup schema={createWebPageSchema({
        title: "FAQ | Freshtrax Footwear Sanitization",
        description: "Frequently asked questions about Freshtrax footwear sanitization kiosk.",
        url: "https://getfreshtrax.com/faq",
      })} />
      <SchemaMarkup schema={createFAQSchema(faqs.flatMap(category => category.questions.map(q => ({
        question: q.q,
        answer: q.a,
      }))))} />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      <ParticleField />
      <Navbar />
      <main className="flex-1" role="main">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center pt-20 pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-[#0a0a0a]/50 to-[#0a0a0a]" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-white/70">
                Everything you need to know about becoming a Freshtrax owner.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-20">
          <div className="container max-w-4xl">
            {faqs.map((section, sectionIdx) => (
              <motion.div
                key={sectionIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIdx * 0.1 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-8 text-orange-500">
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.questions.map((faq, qIdx) => (
                    <FAQItem key={qIdx} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-white/5">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Book a call with Marvin to discuss your specific situation, venue,
              and timeline.
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://calendar.app.google/YWP7rF8gFUXgfMRCA",
                  "_blank"
                )
              }
              className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 inline-flex items-center gap-2"
            >
              Book a call with us
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-orange-500/30 transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="text-lg font-semibold text-left">{question}</h3>
        <ChevronDown
          size={20}
          className={`text-orange-500 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 border-t border-white/5 text-white/70 leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}
