import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { useLeadCapture, OFFERS } from "@/contexts/LeadCaptureContext";

const navLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useLeadCapture();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="h-8 md:h-10 flex items-center" aria-label="Freshtrax home">
          <img
            src="/images/freshtrax-logo.jpg"
            alt="Freshtrax"
            className="h-full w-auto"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-orange-500 transition-colors duration-300 font-body"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/owners"
            className="px-5 py-2.5 bg-orange-600 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 font-body"
          >
            Become an Owner
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-white/5">
          <div className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-orange-500 transition-colors py-2 font-body"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/owners"
              className="mt-2 px-5 py-3 bg-orange-600 text-white text-sm font-semibold rounded-lg text-center font-body block"
              onClick={() => setMobileOpen(false)}
            >
              Become an Owner
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
