/*
 * Homepage FAQ Accordion — P2 point 16
 * 5 questions covering the most common pre-call objections.
 * Includes FAQPage schema markup for Google rich snippets.
 */
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";
import { SchemaMarkup, createFAQSchema } from "@/components/SchemaMarkup";

const homeFAQs = [
  {
    question: "How much does it cost to become a Freshtrax owner?",
    answer:
      "The machine acquisition cost and full financing breakdown are in the 8-Month ROI Blueprint — download it free above. Monthly ongoing costs are $79/month platform fee (Founder's Club) or $99/month (regular), plus ~$0.55/cycle in electricity and consumables. Founder's Club members pay 0% service fee on their founding machine, permanently.",
  },
  {
    question: "What's the realistic ROI, and how quickly does it pay off?",
    answer:
      "At 20 cycles/day (base case), owners project $24,237/year net. At 30 cycles/day (optimistic), that's $36,830/year. Most owners cover their machine cost within 6–8 months. The full math — conservative, base, and optimistic scenarios — is in the Blueprint PDF.",
  },
  {
    question: "How long does it take from purchase to deployment?",
    answer:
      "From purchase to first paying customer: approximately 6–7 months. We handle manufacturing, logistics, and installation. You handle venue placement. We walk you through everything, including signage, pricing, and launch.",
  },
  {
    question: "What support do I get after the kiosk is deployed?",
    answer:
      "24/7 remote technical support, monthly performance reviews, and quarterly strategy calls. Most issues are resolved remotely via software diagnostics. Founder's Club members get priority support and a dedicated account manager. Hardware failures trigger our replacement protocol — downtime is minimized.",
  },
  {
    question: "Is my territory exclusive? Can a competitor put one next to mine?",
    answer:
      "Founder's Club members (first 20 owners) receive territory exclusivity — no competing Freshtrax unit within your defined zone. Regular owners don't have exclusivity but operate in a market of 1,000+ venues per metro. We actively manage placement to protect owner economics.",
  },
];

export default function HomeFAQ() {
  const { openModal } = useLeadCapture();

  return (
    <section className="py-24 border-t border-white/5" aria-label="Frequently asked questions">
      {/* FAQPage schema for Google rich snippets */}
      <SchemaMarkup
        schema={createFAQSchema(
          homeFAQs.map((f) => ({ question: f.question, answer: f.answer }))
        )}
      />

      <div className="container max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Common Questions
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Before You Book a Call
          </h2>
          <p className="text-white/60 text-lg">
            The five questions every serious owner asks us.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3 mb-12">
          {homeFAQs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-white/50 text-sm mb-4">
            More questions?{" "}
            <a href="/faq" className="text-orange-500 hover:text-orange-400 underline underline-offset-4 transition-colors">
              See the full FAQ →
            </a>
          </p>
          <button
            onClick={() => openModal(OFFERS.roiBlueprint)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
          >
            Get my Free ROI Blueprint
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-white pr-4">{question}</span>
        <ChevronDown
          size={18}
          className={`text-orange-500 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 border-t border-white/5 pt-4 text-white/65 leading-relaxed text-sm">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}
