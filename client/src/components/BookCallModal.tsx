/*
 * Book-a-Call Modal — qualifier before the calendar link.
 * Step 1: Venue type + daily foot traffic (two taps)
 * Step 2: Name + Email + #1 goal
 * Then: Success state with the Google Calendar booking link.
 * The qualifier answers are emailed to admin so every 30-minute call
 * starts with context instead of discovery.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  CheckCircle,
  CalendarDays,
  User,
  Mail,
  Building2,
  Users,
  Target,
  Dumbbell,
  Volleyball,
  Mountain,
  Briefcase,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { CALENDAR_URL } from "@/contexts/BookCallContext";

interface BookCallModalProps {
  open: boolean;
  onClose: () => void;
}

const VENUE_TYPES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "gym", label: "Gym / Fitness Center", icon: Dumbbell },
  { id: "racket", label: "Racket & Court Sports", icon: Target },
  { id: "team", label: "Indoor Team Sports", icon: Volleyball },
  { id: "climbing", label: "Climbing / Bouldering", icon: Mountain },
  { id: "novenue", label: "I don't own a venue (yet)", icon: Briefcase },
  { id: "other", label: "Other Venue", icon: MapPin },
];

const TRAFFIC_OPTIONS = ["Under 100", "100–500", "500–1,000", "1,000+"];

const REASON_OPTIONS = [
  "New revenue stream",
  "Cleaner member experience",
  "Solve odor complaints",
  "Exploring for now",
];

export default function BookCallModal({ open, onClose }: BookCallModalProps) {
  const [step, setStep] = useState(1);
  const [venueType, setVenueType] = useState("");
  const [traffic, setTraffic] = useState("");
  const [reason, setReason] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset to a clean form whenever the modal reopens
  useEffect(() => {
    if (open) {
      setStep(1);
      setSubmitted(false);
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!venueType || !traffic) return;
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/send-booking-qualifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, venueType, traffic, reason }),
      });
    } catch (error) {
      console.error("Failed to send booking qualifier:", error);
    }
    setLoading(false);
    setSubmitted(true);
    localStorage.setItem("ft_lead_captured", "1");
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Orange glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-orange-500/8 rounded-full blur-[80px] pointer-events-none" />

              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-[10000] w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.16] flex items-center justify-center transition-colors duration-200 cursor-pointer pointer-events-auto"
              >
                <X size={18} className="text-white/70" />
              </button>

              <div className="relative z-10 p-7 pt-6">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Context header */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                          <CalendarDays size={18} className="text-orange-500" />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm font-body font-medium leading-tight">
                            Book a 30-Minute Call
                          </p>
                          <p className="text-white/30 text-xs font-body">
                            Three quick questions so the call is all signal
                          </p>
                        </div>
                      </div>

                      {/* ─── STEP 1: Venue + Traffic ─── */}
                      {step === 1 && (
                        <form onSubmit={handleStep1Submit}>
                          <p className="text-white/50 text-xs font-body font-medium mb-2.5 flex items-center gap-1.5">
                            <Building2 size={12} />
                            What best describes your venue?
                          </p>
                          <div className="grid grid-cols-2 gap-2 mb-5">
                            {VENUE_TYPES.map((vt) => (
                              <button
                                key={vt.id}
                                type="button"
                                onClick={() => setVenueType(vt.id)}
                                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-left text-sm font-body transition-all duration-200 ${
                                  venueType === vt.id
                                    ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                    : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/[0.12] hover:text-white/70"
                                }`}
                              >
                                <vt.icon size={16} className="shrink-0" />
                                <span className="leading-tight">{vt.label}</span>
                              </button>
                            ))}
                          </div>

                          <p className="text-white/50 text-xs font-body font-medium mb-2.5 flex items-center gap-1.5">
                            <Users size={12} />
                            Daily foot traffic on a typical day?
                          </p>
                          <div className="grid grid-cols-2 gap-2 mb-5">
                            {TRAFFIC_OPTIONS.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setTraffic(t)}
                                className={`px-3.5 py-2.5 rounded-lg border text-left text-sm font-body transition-all duration-200 ${
                                  traffic === t
                                    ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                    : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/[0.12] hover:text-white/70"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>

                          <button
                            type="submit"
                            disabled={!venueType || !traffic}
                            className="w-full px-6 py-3.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-body"
                          >
                            Continue
                            <ArrowRight size={16} />
                          </button>
                        </form>
                      )}

                      {/* ─── STEP 2: Name + Email + Goal ─── */}
                      {step === 2 && (
                        <form onSubmit={handleFinalSubmit}>
                          <div className="relative mb-4">
                            <User
                              size={16}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20"
                            />
                            <input
                              type="text"
                              placeholder="Your name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm font-body placeholder:text-white/30 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20 transition-all"
                            />
                          </div>
                          <div className="relative mb-5">
                            <Mail
                              size={16}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20"
                            />
                            <input
                              type="email"
                              placeholder="Your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm font-body placeholder:text-white/30 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20 transition-all"
                            />
                          </div>

                          <p className="text-white/50 text-xs font-body font-medium mb-2.5 flex items-center gap-1.5">
                            <Target size={12} />
                            What&apos;s the #1 thing you want out of Freshtrax?
                          </p>
                          <div className="grid grid-cols-2 gap-2 mb-5">
                            {REASON_OPTIONS.map((r) => (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setReason(r)}
                                className={`px-3.5 py-2.5 rounded-lg border text-left text-sm font-body transition-all duration-200 ${
                                  reason === r
                                    ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                    : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/[0.12] hover:text-white/70"
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>

                          <button
                            type="submit"
                            disabled={!name.trim() || !email.trim() || loading}
                            className="w-full px-6 py-3.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-body"
                          >
                            {loading ? "One sec…" : "Continue to calendar"}
                            <ArrowRight size={16} />
                          </button>
                        </form>
                      )}
                    </motion.div>
                  ) : (
                    /* ─── SUCCESS: calendar handoff ─── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="text-center py-6"
                    >
                      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <CheckCircle size={32} className="text-green-500" />
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2">
                        You&apos;re set, {name.split(" ")[0]}.
                      </h3>
                      <p className="text-white/50 text-sm font-body mb-6 max-w-sm mx-auto">
                        Grab any time that works. Your answers are already in my
                        inbox, so we skip the small talk and go straight to your
                        numbers.
                      </p>
                      <button
                        type="button"
                        onClick={() => window.open(CALENDAR_URL, "_blank")}
                        className="w-full px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-body"
                      >
                        <CalendarDays size={16} />
                        Pick your call time
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
