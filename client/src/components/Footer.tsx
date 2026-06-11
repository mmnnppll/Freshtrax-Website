/*
 * Design: Dark Matter Industrial — Footer
 * Updated footer with new page structure and CTA links.
 */
import { ArrowRight, Instagram, Phone } from "lucide-react";
import { useBookCall } from "@/contexts/BookCallContext";
import { CITIES } from "@/data/cities";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "ROI Calculator", href: "/owners" },
      { label: "Shoe Sanitization Machine", href: "/shoe-sanitization-machine" },
    ],
  },
  {
    title: "Venues",
    links: [
      { label: "Pickleball Clubs", href: "/pickleball-clubs" },
      { label: "Tennis Clubs", href: "/tennis-clubs" },
      { label: "Badminton Centers", href: "/badminton-centers" },
      { label: "Climbing Gyms", href: "/bouldering-gyms" },
      { label: "Training Boxes", href: "/crossfit-gyms" },
    ],
  },
  {
    title: "Own a Machine",
    links: [
      { label: "Become an Owner", href: "/owners" },
      { label: "Founder's Club", href: "/owners" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  const { openBookCall } = useBookCall();
  return (
    <footer className="relative border-t border-white/[0.04] py-12 md:py-16">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="h-10 flex items-center">
              <img
                src="/images/freshtrax-logo.jpg"
                alt="Freshtrax"
                className="h-full w-auto"
              />
            </a>
            <p className="text-white/60 text-xs font-body mt-3 max-w-xs leading-relaxed">
              Medical-grade footwear sanitization. Fully automated. Zero competition.
            </p>
            <a
              href="tel:+17788988063"
              className="mt-4 flex items-center gap-2 text-white/60 hover:text-orange-500 text-xs font-body transition-colors duration-300"
            >
              <Phone size={12} />
              +1 778.898.8063
            </a>
            <a
              href="https://www.instagram.com/fresh.trax/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 text-white/60 hover:text-orange-500 text-xs font-body transition-colors duration-300"
            >
              <Instagram size={12} />
              @fresh.trax
            </a>
            <button
              onClick={openBookCall}
              className="mt-6 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-500 text-xs font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 font-body"
            >
              Book a Call
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white font-semibold text-sm mb-4 font-body">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={`${section.title}-${linkIdx}`}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-orange-500 text-xs font-body transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Locations row — local SEO internal links */}
        <div className="pb-6 mb-6 border-b border-white/[0.04]">
          <p className="text-white/40 text-xs font-body">
            <span className="text-white/55 font-semibold">Serving the Lower Mainland:</span>{" "}
            {CITIES.map((c, i) => (
              <span key={c.slug}>
                <a
                  href={`/gyms/${c.slug}`}
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  {c.name}
                </a>
                {i < CITIES.length - 1 && " · "}
              </span>
            ))}
            {" "}— and venues across Canada &amp; the US.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs font-body">
            &copy; {new Date().getFullYear()} Freshtrax. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/terms"
              className="text-white/50 hover:text-white/80 text-xs font-body transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
