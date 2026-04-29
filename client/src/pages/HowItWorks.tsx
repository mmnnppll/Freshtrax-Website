import { motion } from "framer-motion";
import { ArrowRight, Zap, Wind, Droplets, Clock, Footprints, BarChart3, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createWebPageSchema, createVideoSchema } from "@/components/SchemaMarkup";

export default function HowItWorks() {
  const { openModal } = useLeadCapture();

  const steps = [
    {
      number: "1",
      title: "SELECT",
      description: "Choose your cycle & pay",
      icon: Zap,
    },
    {
      number: "2",
      title: "INSERT",
      description: "Mount shoes on internal steel rods",
      icon: Footprints,
    },
    {
      number: "3",
      title: "REFRESH",
      description: "Close the doors and the sanitization process begins",
      icon: Wind,
    },
    {
      number: "4",
      title: "UNLOAD",
      description: "Shoes emerge sanitized and refreshed",
      icon: CheckCircle,
    },
  ];

  const technologies = [
    {
      title: "UVC Light",
      icon: Zap,
      location: "Located on the steel rods inside the chamber",
      mechanism:
        "UVC radiation (250-270 nm wavelength) disrupts microbial DNA and RNA, causing strand breakage.",
      targets: "Eliminates bacteria, fungi, viruses, and biofilm-forming microorganisms.",
      effectiveness:
        "Clinical studies show 91-95% bioburden reduction on treated surfaces (Torres-Teran et al., 2023, ICHE).",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/uvc-feature_e3435a49.png",
    },
    {
      title: "Ozone",
      icon: Wind,
      location: "Generated on top of the chamber where the tube generates ozone on the spot and circulates it throughout",
      mechanism:
        "Ozone (O₃) is a powerful oxidizing agent that breaks down odor molecules and organic compounds at the molecular level.",
      targets:
        "Eliminates odor at its source and targets bacteria, fungi, and parasites.",
      effectiveness:
        "Recognized in peer-reviewed literature as an effective sanitization method for fungal infections (Gupta & Simkovich, 2022, JAPMA).",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/ozone-activated_f4057814.webp",
    },
    {
      title: "Antimicrobial Vapor",
      icon: Droplets,
      location: "Dispersed through vents in the steel rods to penetrate footwear from within",
      mechanism:
        "Disperses antimicrobial agents throughout the shoe interior via vapor, reaching fabric fibers and internal surfaces.",
      targets:
        "Targets bacteria and fungi in hard-to-reach areas within shoe materials.",
      effectiveness:
        "Safe formulation used in medical-grade sterilization protocols. Complements UVC and Ozone for comprehensive coverage.",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/antimicrobial-fog-feature_5eeb8f30.png",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "90 Seconds",
      description: "Complete sanitization cycle",
    },
    {
      icon: Footprints,
      title: "Dual Chamber",
      description: "Process 2 pairs simultaneously",
    },
    {
      icon: BarChart3,
      title: "Real-Time Monitoring",
      description: "Operator dashboard tracks all cycles",
    },
    {
      icon: CheckCircle,
      title: "Safe & Effective",
      description: "Medical-grade sterilization without harsh chemicals",
    },
  ];

  const faqs = [
    {
      question: "What happens inside the machine?",
      answer:
        "The machine uses three sterilization methods in sequence: UVC light disrupts microbial DNA, ozone eliminates odors at the molecular level, and antimicrobial vapor reaches internal shoe fibers. This multi-stage approach ensures comprehensive sanitization.",
    },
    {
      question: "Is it safe for all shoe types?",
      answer:
        "Yes. The sanitization process is designed to be safe for athletic shoes, casual footwear, and most shoe materials. The antimicrobial vapor and UVC light do not damage shoe integrity or materials.",
    },
    {
      question: "How often should shoes be sterilized?",
      answer:
        "For athletes and frequent users, 2-3 times per week is recommended. For casual use, weekly sanitization is sufficient. The more you use your shoes, the more bacteria and fungi accumulate.",
    },
    {
      question: "Can I monitor cycles remotely?",
      answer:
        "Yes. Operators have access to a real-time dashboard that tracks all cycles, revenue, machine health, and usage patterns. This allows for remote monitoring and data-driven business decisions.",
    },
    {
      question: "What's the difference between this and shoe sprays?",
      answer:
        "Sprays only mask odors temporarily. Freshtrax eliminates odor at the molecular level and kills pathogens throughout the shoe, not just on the surface. Clinical studies confirm the effectiveness of UVC and ozone sterilization.",
    },
  ];

  return (
    <>
      <SEOHead
        title="How It Works | Freshtrax Footwear Sterilization"
        description="Learn how Freshtrax sterilizes athletic shoes in 90 seconds using medical-grade UVC light, ozone, and antimicrobial vapor technology."
        canonicalUrl="https://getfreshtrax.com/how-it-works"
        ogTitle="How It Works | Freshtrax Footwear Sterilization"
        ogDescription="Discover the 4-step process: SELECT, INSERT, REFRESH, UNLOAD. Backed by peer-reviewed clinical research."
      />
      <SchemaMarkup schema={createWebPageSchema({
        title: "How It Works | Freshtrax Footwear Sterilization",
        description: "Learn how Freshtrax sterilizes athletic shoes in 90 seconds using medical-grade UVC light, ozone, and antimicrobial vapor technology.",
        url: "https://getfreshtrax.com/how-it-works",
      })} />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      <ParticleField />
      <Navbar />
      <main className="flex-1" role="main">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center pt-20 pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-[#0a0a0a]/50 to-[#0a0a0a]" />
          </div>
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                How Freshtrax Works
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Freshtrax is a shoe sterilization machine for gyms, fitness centers, and sports venues.
                Three technologies work together to eliminate bacteria, fungi, and odor from athletic footwear in 90 seconds.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4-Step Process */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold mb-3">The Only UVC Shoe Sanitizer Built for High-Traffic Venues</h2>
              <p className="text-white/60 text-lg max-w-2xl">
                Engineered for the demands of gyms, pickleball clubs, and sports facilities where hundreds of shoes pass through weekly.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">The Process</h2>
              <p className="text-white/60 text-lg">
                Four simple steps to sanitized, refreshed shoes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 h-full">
                    <StepIcon className="w-12 h-12 text-orange-500 mb-4" />
                    <div className="text-sm font-semibold text-orange-500 mb-2">
                      STEP {step.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-white/60">{step.description}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="text-orange-500" size={24} />
                    </div>
                  )}
                </motion.div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Technology Deep-Dive */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">The Science</h2>
              <p className="text-white/60 text-lg">
                Three complementary technologies for comprehensive sterilization.
              </p>
            </motion.div>

            <div className="space-y-12">
              {technologies.map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  >
                    <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-8 h-8 text-orange-500" />
                        <h3 className="text-3xl font-bold">{tech.title}</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-orange-500 mb-2">
                            LOCATION
                          </p>
                          <p className="text-white/70">{tech.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-orange-500 mb-2">
                            HOW IT WORKS
                          </p>
                          <p className="text-white/70">{tech.mechanism}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-orange-500 mb-2">
                            WHAT IT TARGETS
                          </p>
                          <p className="text-white/70">{tech.targets}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-orange-500 mb-2">
                            CLINICAL EVIDENCE
                          </p>
                          <p className="text-white/70">{tech.effectiveness}</p>
                        </div>
                      </div>
                    </div>
                    <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                      <img
                        src={tech.image}
                        alt={tech.title}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Why Freshtrax</h2>
              <p className="text-white/60 text-lg">
                Designed for operators and athletes who demand results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => {
                const BenefitIcon = benefit.icon;
                return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-6 text-center"
                >
                  <BenefitIcon className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-white/60">{benefit.description}</p>
                </motion.div>
              );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Frequently Asked</h2>
              <p className="text-white/60 text-lg">
                Everything you need to know about how Freshtrax works.
              </p>
            </motion.div>

            <div className="max-w-3xl space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-6"
                >
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-lg">
                      {faq.question}
                      <span className="transition group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-4 text-white/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Join operators who are building passive income with Freshtrax.
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
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Transparent Pricing</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Simple, predictable costs. No hidden fees.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Regular Operator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 border border-white/10 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold mb-6">Regular Operator</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Platform Fee</span>
                    <span className="text-xl font-bold text-orange-500">$99/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Service Fee</span>
                    <span className="text-xl font-bold text-orange-500">5% of revenue</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-white/70">Includes</span>
                    <span className="text-sm text-white/60">Dashboard + Device Health Monitoring</span>
                  </div>
                </div>
                <p className="text-sm text-white/50">Best for: Individual operators starting out</p>
              </motion.div>

              {/* Founder's Club */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/30 rounded-lg p-8 relative"
              >
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  EXCLUSIVE
                </div>
                <h3 className="text-2xl font-bold mb-6">Founder's Club</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Platform Fee</span>
                    <span className="text-xl font-bold text-orange-500">$79/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Service Fee (Year 1)</span>
                    <span className="text-xl font-bold text-green-400">Waived</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Year 1 Savings</span>
                    <span className="text-xl font-bold text-green-400">~$1,428</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-white/70">Includes</span>
                    <span className="text-sm text-white/60">Territory Exclusivity + Priority Support</span>
                  </div>
                </div>
                <p className="text-sm text-white/50">Best for: Early-stage operators securing market position</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </>
  );
}
