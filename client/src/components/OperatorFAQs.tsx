import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need a business entity to become an owner?",
    answer: "No. You can operate as an individual, though we recommend setting up an LLC / incorporation for liability separation. We can point you toward resources if needed.",
  },
  {
    question: "What happens if the machine needs maintenance?",
    answer: "Our kiosks are built to require minimal maintenance so your downtime is minimized because we monitor units remotely. On occasion you would need to swap out the antimicrobial detergent when it's low and clean the filter. We are here to support you throughout.",
  },
  {
    question: "Can I own more than one unit?",
    answer: "Yes. Multiple unit owners receive the same founding terms on each unit during the founding period. Owning more than one unit in multiple venues is the natural scaling path for this model.",
  },
  {
    question: "How do I negotiate with the venue?",
    answer: "We provide a full placement guide as part of the owner onboarding package. It covers how to approach venue owners, what terms to negotiate, and what a standard placement agreement looks like. You are not figuring this out alone.",
  },
  {
    question: "Is there a contract between me and Freshtrax?",
    answer: "Yes. Owners sign a standard owner agreement that outlines the service terms, revenue structure, support commitments, and the founding owner service fee terms. All terms are shared in full before you commit.",
  },
  {
    question: "What if the venue asks me to remove the kiosk?",
    answer: "Placement agreements include a standard notice period (typically 30 to 60 days). If a venue relationship ends, we work with you to identify and secure a replacement venue. You own the asset. It moves with you.",
  },
  {
    question: "How long until I see my first revenue?",
    answer: "Revenue starts the day your machine goes live at its first venue. Given the 6 to 7 month production and delivery window, most owners use that time to scout and confirm their placement venue so they go live within days of receiving their unit.",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-white/10 rounded-lg overflow-hidden hover:border-orange-500/30 transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors duration-300"
      >
        <h3 className="text-left font-semibold text-white">{question}</h3>
        <ChevronDown
          size={20}
          className={`text-orange-500 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-4 bg-white/2 border-t border-white/5"
        >
          <p className="text-white/70 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function OperatorFAQs() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Questions Owners Ask Before Joining</h2>
          <p className="text-xl text-white/60 max-w-3xl">
            These are the questions that kill deals when left unanswered. Address them here so owners never have to email to find out.
          </p>
        </motion.div>

        <div className="space-y-3 max-w-3xl">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              index={idx}
            />
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-lg text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="text-white/70 mb-6">
            Book a call with Marvin to discuss your specific situation, venue, and timeline.
          </p>
          <button
            onClick={() =>
              window.open(
                "https://calendar.app.google/YWP7rF8gFUXgfMRCA",
                "_blank"
              )
            }
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 inline-block"
          >
            Book a Call
          </button>
        </motion.div>
      </div>
    </section>
  );
}
