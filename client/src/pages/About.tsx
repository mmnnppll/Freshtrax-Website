import { motion } from "framer-motion";
import { ArrowRight, Heart, Lightbulb, Target, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";
import { useBookCall } from "@/contexts/BookCallContext";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createWebPageSchema } from "@/components/SchemaMarkup";

export default function About() {
  const { openModal } = useLeadCapture();
  const { openBookCall } = useBookCall();

  return (
    <>
      <SEOHead
        title="About Freshtrax | Our Mission & Vision"
        description="Learn about Freshtrax's mission to revolutionize footwear hygiene. Founded by Marvin N., we're committed to eliminating bacteria and odor from athletic shoes using medical-grade technology."
        canonicalUrl="https://getfreshtrax.com/about/"
        ogTitle="About Freshtrax | Our Mission & Vision"
        ogDescription="Discover the story behind Freshtrax and our commitment to relentless execution, customer obsession, and innovation."
      />
      <SchemaMarkup schema={createWebPageSchema({
        title: "About Freshtrax | Our Mission & Vision",
        description: "Learn about Freshtrax's mission to revolutionize footwear hygiene. Founded by Marvin N.",
        url: "https://getfreshtrax.com/about",
      })} />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      <ParticleField />
      <Navbar />
      <main className="flex-1" role="main">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-[#0a0a0a]/50 to-[#0a0a0a]" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About Freshtrax
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Built by an athlete, for athletes. Freshtrax exists because one
                person refused to accept that smelly shoes were just part of the
                game.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-6">The Founder's Journey</h2>
                <div className="space-y-6 text-white/70 leading-relaxed">
                  <p>
                    My six-figure commission check was stolen by my employer. I had
                    spent years in national account sales, building relationships,
                    delivering results for some of the largest restaurant groups in
                    North America — and when it came time to pay out, they decided
                    that money looked better on their balance sheet. That was the
                    day I stopped working for someone else's income and started
                    building my own.
                  </p>

                  {/* Pull Quote */}
                  <div className="border-l-4 border-orange-500 pl-6 py-2 my-8">
                    <p className="text-white text-xl font-semibold leading-snug italic">
                      "I decided that day I'd never let someone else hold the eraser
                      to my income again."
                    </p>
                  </div>

                  <p>
                    Around the same time, I was dealing with a completely separate
                    problem. I play racket sports two or three times a week. My shoes
                    had developed a scent so potent it had a personality. I tried
                    everything — sprays, charcoal inserts, airing them out. Nothing
                    worked. Eventually I developed athlete's foot: a direct result of
                    bacteria that no spray can actually eliminate, just briefly mask.
                  </p>
                  <p>
                    Then I saw an Instagram post about a kiosk sanitizing helmets
                    across Asia. I didn't send an inquiry email. I booked a flight to
                    the factory. What I found was a model that had been operating
                    profitably for over a decade across Japan, South Korea, and China
                    — and a complete absence of it anywhere in North America. I worked
                    directly with the manufacturer to adapt the technology for
                    footwear. The result is Freshtrax: a three-stage, medical-grade
                    sanitization kiosk that eliminates what sprays can't reach, in
                    90 seconds.
                  </p>

                  {/* Layoff letter accent — larger card */}
                  <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="flex gap-5 p-5 items-start">
                      <div className="flex-shrink-0 w-44 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        <img
                          src="/termination-letter.jpg"
                          alt="Termination letter — the moment that started Freshtrax"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2 pt-1">
                        <p className="text-orange-500 font-semibold text-sm uppercase tracking-wide">
                          The laid-off letter that changed everything
                        </p>
                        <p className="text-white/70 text-sm leading-relaxed">
                          I fought the company hard for my commission — and they decided to lay me off instead of pay up.
                        </p>
                        <p className="text-white/40 text-xs">May 22, 2025 · Termination of Employment</p>
                      </div>
                    </div>
                  </div>

                  <p>
                    I built Freshtrax because I needed income that couldn't be stolen,
                    cut in a restructuring, or eliminated in an afternoon. Income that
                    works even when I'm not in the room. And I built it because I know
                    I'm not the only one — there are thousands of people who play hard,
                    work hard, and want to build something that outlasts their last
                    paycheck. Freshtrax is designed to be that asset, for me and for
                    every owner who partners with us.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6 md:sticky md:top-28"
              >
                {/* Factory photo */}
                <div className="w-full rounded-xl overflow-hidden border border-white/10">
                  <img
                    src="/founder-factory.jpg"
                    alt="Marvin at the factory sourcing the Freshtrax kiosk technology"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Marvin N.</h3>
                  <p className="text-white/60">Founder, Freshtrax</p>
                  <p className="text-white/40 text-sm mt-1">At the factory — sourcing the technology firsthand</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-lg p-8"
              >
                <Heart className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-white/70 leading-relaxed">
                  "Freshtrax keeps your gear as relentless as your grind, so the
                  only thing you leave behind is your best performance."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-8"
              >
                <Target className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-white/70 leading-relaxed">
                  "To be the standard for athletes and competitors who refuse to
                  let anything get in the way of their game."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lightbulb,
                  title: "Solve Real Problems",
                  description:
                    "We don't build features. We build solutions to problems that actually matter to athletes and owners.",
                },
                {
                  icon: Target,
                  title: "Owner First",
                  description:
                    "Every decision we make is filtered through one lens: does this help our owners succeed?",
                },
                {
                  icon: Zap,
                  title: "Relentless Execution",
                  description:
                    "We don't accept band-aids or compromises. We go to the factory, we test, we iterate until it works.",
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-6"
                >
                  {value.icon && (
                    <value.icon className="w-8 h-8 text-orange-500 mb-4" />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-white/60">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Whether you're an athlete looking to build passive income or a venue
              owner wanting to offer premium hygiene solutions, let's talk.
            </p>
            <button
              onClick={openBookCall}
              className="px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 inline-flex items-center gap-2"
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
