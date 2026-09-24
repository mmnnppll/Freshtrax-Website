import ParticleField from "@/components/ParticleField";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EconomicsSection from "@/components/EconomicsSection";
import FinancialProjections from "@/components/FinancialProjections";
import TechnologySection from "@/components/TechnologySection";
import VenueCategoriesSection from "@/components/VenueCategoriesSection";
import PilotSection from "@/components/PilotSection";
import MarketOpportunity from "@/components/MarketOpportunity";
import FoundersClub from "@/components/FoundersClub";
import HomeFAQ from "@/components/HomeFAQ";
import Footer from "@/components/Footer";
import BlueprintScrollTrigger from "@/components/BlueprintScrollTrigger";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, productSchema, createWebPageSchema, createVideoSchema } from "@/components/SchemaMarkup";

export default function Home() {
  return (
    <>
      <SEOHead
        title="Freshtrax | Shoe Sanitization Kiosk for Fitness & Sports Venues"
        description="Freshtrax is the first self-service shoe sanitization kiosk built for North American fitness venues. UVC + ozone eliminates odor and bacteria in 90 seconds. Zero staff required."
        canonicalUrl="https://getfreshtrax.com/"
        ogTitle="Freshtrax | Shoe Sanitization Kiosk for Fitness & Sports Venues"
        ogDescription="Make up to $36,830/year per kiosk (optimistic case, 30 cycles/day). Typical owner projects $24,237/year. Freshtrax is a self-service shoe sanitization kiosk that eliminates bacteria and odor from athletic shoes in 90 seconds."
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={productSchema} />
      <SchemaMarkup schema={createWebPageSchema({
        title: "Freshtrax | Shoe Sanitization Kiosk for Fitness & Sports Venues",
        description: "Freshtrax is a self-service shoe sanitization kiosk for fitness & sports venues. UVC light and ozone eliminate odor in 90 seconds.",
        url: "https://getfreshtrax.com/",
        image: "https://getfreshtrax.com/images/shoe-sanitization-kiosk-hero.webp",
      })} />
      <SchemaMarkup schema={createVideoSchema({
        name: "Freshtrax Demo Video",
        description: "12-second cinematic demo of Freshtrax shoe sanitization kiosk in action",
        thumbnailUrl: "https://getfreshtrax.com/images/shoe-sanitization-kiosk-hero.webp",
        uploadDate: "2026-03-20",
        duration: "PT12S",
        contentUrl: "https://getfreshtrax.com/videos/kiosk-demo-720.mp4",
      })} />
      <BlueprintScrollTrigger afterSelector="#founders" />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      <ParticleField />
      <Navbar />
      <main className="flex-1" role="main">
        <section id="hero" aria-label="Hero section">
          <HeroSection />
        </section>
        {/* Subtle divider */}
        <div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          aria-hidden="true"
        />
        <section id="pilot" aria-label="Venue partner results">
          <PilotSection />
        </section>
        <div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          aria-hidden="true"
        />
        <section id="technology" aria-label="Technology section">
          <TechnologySection />
        </section>
        <div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          aria-hidden="true"
        />
        <VenueCategoriesSection />
        <div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          aria-hidden="true"
        />
        <section id="economics" aria-label="Unit economics section">
          <EconomicsSection />
        </section>
        <div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          aria-hidden="true"
        />
        <section id="projections" aria-label="Financial projections section">
          <FinancialProjections />
        </section>
        <div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          aria-hidden="true"
        />
        <section id="market" aria-label="Market opportunity section">
          <MarketOpportunity />
        </section>
        <div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          aria-hidden="true"
        />
        <section id="founders" aria-label="Founders club section">
          <FoundersClub />
        </section>
        <div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          aria-hidden="true"
        />
        <section id="faq" aria-label="Frequently asked questions">
          <HomeFAQ />
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
    </>
  );
}
