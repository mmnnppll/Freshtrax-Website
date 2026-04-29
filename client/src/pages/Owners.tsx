import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, TrendingUp, VolumeX, Volume2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createWebPageSchema } from "@/components/SchemaMarkup";
import AcquisitionProcess from "@/components/AcquisitionProcess";
import PlacementVenueGuide from "@/components/PlacementVenueGuide";
import ResponsibilityBreakdown from "@/components/ResponsibilityBreakdown";
import DetailedFinancials from "@/components/DetailedFinancials";
import FoundersClubDetails from "@/components/FoundersClubDetails";
import OperatorFAQs from "@/components/OperatorFAQs";

export default function Owners() {
  const { openModal } = useLeadCapture();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const DEMO_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/openart-enhanced_1776890114044_1e2c34a5_6aa45cb4.mp4";

  return (
    <>
      <SEOHead
        title="Become an Owner | Freshtrax Footwear Sterilization"
        description="Join the Freshtrax network as an owner. Generate $38,325+ annually from a single kiosk. ROI Calculator, Founder's Club benefits, and partnership opportunities."
        canonicalUrl="https://getfreshtrax.com/owners"
        ogTitle="Become an Owner | Freshtrax Footwear Sterilization"
        ogDescription="Make $3,150–$10,000+ monthly revenue. Access to $3,800 in incentives through the Founder's Club."
      />
      <SchemaMarkup schema={createWebPageSchema({
        title: "Become an Owner | Freshtrax Footwear Sterilization",
        description: "Join the Freshtrax network as an owner. Generate $38,325+ annually from a single kiosk.",
        url: "https://getfreshtrax.com/owners",
      })} />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      <ParticleField />
      <Navbar />
      <main className="flex-1" role="main">
        {/* Hero Section */}
        <section
          id="owners-hero"
          className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-[#0a0a0a]/50 to-[#0a0a0a]" />
          </div>

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Become a Freshtrax Owner
                </h1>
                <p className="text-xl text-white/70 mb-8">
                  Run a shoe sanitization kiosk business in fitness centers, pickleball clubs, and sports venues.
                  Operators generate $28,000+ net profit annually from a single machine with zero staff and zero inventory.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => openModal(OFFERS.roiBlueprint)}
                    className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Get the 8-Month ROI Blueprint
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        "https://calendar.app.google/YWP7rF8gFUXgfMRCA",
                        "_blank"
                      )
                    }
                    className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Book a call with us
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>

              {/* Right: Demo Video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[280px] sm:max-w-[300px]">
                  <div className="absolute -inset-8 bg-orange-500/[0.06] rounded-full blur-[80px]" />
                  <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl aspect-[9/16]">
                    <video
                      ref={videoRef}
                      src={DEMO_VIDEO}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setIsMuted(!isMuted);
                        if (videoRef.current) {
                          videoRef.current.muted = !isMuted;
                        }
                      }}
                      className="absolute bottom-4 right-4 p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Own Freshtrax */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Why Become an Owner
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Predictable Revenue",
                  description:
                    "Every cycle generates $3.50-$3.90 net profit. No guessing. No volatility.",
                },
                {
                  icon: Zap,
                  title: "Fully Automated",
                  description:
                    "The machine runs 24/7. You collect revenue. That's it. No staff required.",
                },
                {
                  icon: CheckCircle,
                  title: "Proven Model",
                  description:
                    "Operating profitably in 10+ locations. We've solved the hard problems.",
                },
                {
                  icon: ArrowRight,
                  title: "Scaling Path",
                  description:
                    "Start with 1 machine. Scale to 5, 10, 50. We support multi-unit operators.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Project Your Revenue
            </h2>
            <ROICalculator />
          </div>
        </section>

        {/* New Expanded Sections */}
        <AcquisitionProcess />
        <PlacementVenueGuide />
        <ResponsibilityBreakdown />
        <DetailedFinancials />
        <FoundersClubDetails />
        <OperatorFAQs />

        {/* Founder's Club CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-gradient-to-r from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-lg p-12 text-center"
            >
              <div className="inline-block px-4 py-1 bg-orange-500/20 rounded-full text-orange-400 text-sm font-semibold mb-4">
                Limited Opportunity
              </div>
              <h3 className="text-3xl font-bold mb-4">Join the Founder's Club</h3>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Be part of the first 20 operators. Get territory exclusivity, lifetime
                priority support, and access to over $3,800 in incentives to support your first kiosk.
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
                Schedule a call
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-center">Next Steps</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: "1",
                  title: "Download the Blueprint",
                  desc: "Get the complete 8-month financial model and market analysis.",
                },
                {
                  num: "2",
                  title: "Book a Call",
                  desc: "Talk to Marvin about your venue, market, and timeline.",
                },
                {
                  num: "3",
                  title: "Deploy & Earn",
                  desc: "Get your machine installed and start generating revenue.",
                },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/60">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </>
  );
}

function ROICalculator() {
  const [dailyCycles, setDailyCycles] = useState(25);
  const [isFounder, setIsFounder] = useState(false);

  const grossPerCycle = 4.05; // Blended average: ($3.65 + $4.45) / 2
  const operatingCostPerCycle = 0.55; // Antimicrobial fog, credit card fees, electricity
  const netPerCycle = grossPerCycle - operatingCostPerCycle; // $3.50 net
  const dailyRevenue = dailyCycles * netPerCycle;
  const monthlyRevenue = dailyRevenue * 30;
  const annualRevenue = monthlyRevenue * 12;
  
  // Platform fees
  const platformFee = isFounder ? 79 : 99; // $79 for Founder's Club, $99 for regular
  const monthlyServiceFee = isFounder ? 0 : (annualRevenue * 0.05) / 12; // 5% service fee (waived for Founder's Club Year 1)
  const monthlyNetProfit = monthlyRevenue - platformFee - monthlyServiceFee;
  const annualNetProfit = monthlyNetProfit * 12;
  
  // Machine cost is confidential - available in the Blueprint PDF
  // Removed hardcoded payback calculation

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-lg p-8">
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-4">
            Daily Cycles: <span className="text-orange-500">{dailyCycles}</span>
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={dailyCycles}
            onChange={(e) => setDailyCycles(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-xs text-white/50 mt-2">
            <span>5 cycles/day</span>
            <span>50 cycles/day</span>
          </div>
        </div>

        <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isFounder}
              onChange={(e) => setIsFounder(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm text-white/80">
              {isFounder ? "Founder's Club Member" : "Regular Operator"}
            </span>
          </label>
          {isFounder && (
            <p className="text-xs text-orange-500/80 mt-2">
              Platform fee: $79/mo | Service fee: Waived for 1 year
            </p>
          )}
          {!isFounder && (
            <p className="text-xs text-orange-500/80 mt-2">
              Platform fee: $99/mo | Service fee: 5% of revenue
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/60 text-sm mb-1">Daily Revenue</p>
            <p className="text-2xl font-bold text-orange-500">
              ${dailyRevenue.toFixed(0)}
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/60 text-sm mb-1">Monthly Net Profit</p>
            <p className="text-2xl font-bold text-green-400">
              ${monthlyNetProfit.toFixed(0)}
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/60 text-sm mb-1">Annual Net Profit</p>
            <p className="text-2xl font-bold text-green-400">
              ${annualNetProfit.toFixed(0)}
            </p>
          </div>

        </div>

        <p className="text-xs text-white/50 mt-6 text-center">
          Gross revenue: $4.05/cycle | Operating cost: $0.55/cycle | Net per cycle: $3.50<br />
          Platform fee: {isFounder ? "$79/mo" : "$99/mo"} | Service fee: {isFounder ? "Waived Year 1" : "5% of revenue"}<br />
          <span className="text-orange-500">Download the 8-Month ROI Blueprint PDF for machine acquisition cost and complete payback analysis</span>
         </p>
      </div>
    </div>
  );
}
