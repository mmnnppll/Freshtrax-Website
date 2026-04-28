import { motion } from "framer-motion";
import { ArrowRight, Heart, Lightbulb, Target, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createWebPageSchema } from "@/components/SchemaMarkup";

export default function About() {
  const { openModal } = useLeadCapture();

  return (
    <>
      <SEOHead
        title="About Freshtrax | Our Mission & Vision"
        description="Learn about Freshtrax's mission to revolutionize footwear hygiene. Founded by Marvin N., we're committed to eliminating bacteria and odor from athletic shoes using medical-grade technology."
        canonicalUrl="https://getfreshtrax.com/about"
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
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-6">The Founder's Journey</h2>
                <div className="space-y-6 text-white/70 leading-relaxed">
                  <p>
                    My journey to founding Freshtrax began with two things: a drive
                    to build something that no employer could take from me, and a
                    pair of shoes that were genuinely offensive.
                  </p>
                  <p>
                    After moving from Malaysia to Canada, I spent over a decade in
                    the restaurant sales trenches, closing deals with some of the
                    largest restaurant groups on the continent. I was good at it. I
                    built relationships. I delivered results. And then my employer
                    decided my six-figure commission check looked better in their
                    account than mine.
                  </p>
                  <p>
                    In that moment, I learned what hard and loyal work actually means
                    to a corporation: nothing. You aren't a partner. You're a line
                    item that can be deleted to balance a spreadsheet. I decided that
                    day I would never let someone else hold the eraser to my income
                    again.
                  </p>
                  <p>
                    Around the same time, I was dealing with a different problem. I
                    play racket sports two or three times a week — badminton, tennis,
                    whatever I can get a court for. My shoes had developed a scent so
                    potent it didn't just smell, it had a personality. My fiancée
                    would wrinkle her nose every time I got in the car after a game.
                    I tried everything: sprays, charcoal inserts. Nothing worked beyond
                    a few hours.
                  </p>
                  <p>
                    Eventually I developed athlete's foot — a direct consequence of
                    bacteria that no spray could actually kill, just briefly masking.
                  </p>
                  <p>
                    I didn't want another band-aid. I wanted a system that actually
                    solved the problem. Then I saw an Instagram post about a
                    helmet-sanitizing kiosk operating across Asia. I didn't send an
                    inquiry email. I didn't add it to a wishlist. I booked a flight
                    to the factory.
                  </p>
                  <p>
                    What I found was a model that had been operating profitably for
                    over a decade across Japan, South Korea, and China — and a
                    complete absence of it anywhere in North America. I worked
                    directly with the manufacturer to adapt the technology for
                    footwear. The result is Freshtrax: a three-stage, medical-grade
                    sterilization kiosk that eliminates what sprays can't reach, in
                    90 seconds.
                  </p>
                  <p>
                    I built this because I needed reliable income that would take care
                    of me whether I was working or not — income that couldn't be stolen
                    by an employer, cut in a restructuring, or eliminated in an
                    afternoon. And I built it because I know I'm not the only one. There
                    are thousands of people who play hard, work hard, and want to build
                    something that works even when they're not in the room.
                  </p>
                  <p className="italic text-white/50">
                    Freshtrax is designed to be that — for me, and for every operator
                    who partners with us.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <div className="w-full max-w-xs rounded-lg overflow-hidden">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/1760602831165_31b4dff4.jpeg"
                    alt="Marvin N., Founder of Freshtrax"
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-6">Marvin N.</h3>
                <p className="text-white/60">Founder, Freshtrax</p>
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
                    "We don't build features. We build solutions to problems that actually matter to athletes and operators.",
                },
                {
                  icon: Target,
                  title: "Operator First",
                  description:
                    "Every decision we make is filtered through one lens: does this help our operators succeed?",
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
