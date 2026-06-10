/*
 * Lead Capture Modal — Multi-step form.
 * Step 1: Name + Business Type (low friction)
 * Step 2: Email + Phone (the hook)
 * Step 3: Optional 30-day readiness question
 * Then: Success confirmation
 */
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  FileText,
  User,
  Building2,
  Mail,
  Phone,
  Zap,
  Dumbbell,
  Target,
  CircleDot,
  Mountain,
  Landmark,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export interface LeadOffer {
  label: string;
  headline: string;
  description: string;
  pdfName: string;
  pdfUrl: string;
  ctaText: string;
}

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
  offer: LeadOffer;
}

const BUSINESS_TYPES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "gym", label: "Gym / Fitness Center", icon: Dumbbell },
  { id: "pickleball", label: "Pickleball / Padel", icon: Target },
  { id: "tennis", label: "Tennis Club", icon: CircleDot },
  { id: "climbing", label: "Climbing Gym", icon: Mountain },
  { id: "arena", label: "Arena / Sports Complex", icon: Landmark },
  { id: "other", label: "Other Venue", icon: MapPin },
];

export default function LeadCaptureModal({
  open,
  onClose,
  offer,
}: LeadCaptureModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [readyIn30, setReadyIn30] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStep(1);
        setName("");
        setBusinessType("");
        setEmail("");
        setPhone("");
        setReadyIn30(null);
        setLoading(false);
        setSubmitted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      onClose();
    },
    [onClose],
  );

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !businessType) return;
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStep(3);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      // Send email notification to admin
      await fetch("/api/send-lead-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          businessType,
          phone,
          readyIn30,
          offer: offer.label,
        }),
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
    
    setLoading(false);
    setSubmitted(true);
    // Converted leads are excluded from the scroll-triggered prompt
    localStorage.setItem("ft_lead_captured", "1");

    // Auto-trigger PDF download
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = offer.pdfUrl;
      link.download = offer.pdfName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 300);
  };

  const handleSkipStep3 = () => {
    handleFinalSubmit();
  };

  // Step indicator removed per user request

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

              {/* Close button — fixed z-index and explicit pointer events */}
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
                      {/* Offer context — always visible */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                          <FileText size={18} className="text-orange-500" />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm font-body font-medium leading-tight">
                            {offer.pdfName}
                          </p>
                          <p className="text-white/30 text-xs font-body">
                            Free download
                          </p>
                        </div>
                      </div>

                      {/* ─── STEP 1: Name + Business Type ─── */}
                      {step === 1 && (
                        <form onSubmit={handleStep1Submit}>

                          {/* Name input */}
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

                          {/* Business type grid */}
                          <p className="text-white/50 text-xs font-body font-medium mb-2.5 flex items-center gap-1.5">
                            <Building2 size={12} />
                            Where would you install Freshtrax?
                          </p>
                          <div className="grid grid-cols-2 gap-2 mb-5">
                            {BUSINESS_TYPES.map((bt) => (
                              <button
                                key={bt.id}
                                type="button"
                                onClick={() => setBusinessType(bt.id)}
                                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-left text-sm font-body transition-all duration-200 ${
                                  businessType === bt.id
                                    ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                    : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/[0.12] hover:text-white/70"
                                }`}
                              >
                                <bt.icon size={16} className="shrink-0" />
                                <span className="leading-tight">
                                  {bt.label}
                                </span>
                              </button>
                            ))}
                          </div>

                          <button
                            type="submit"
                            disabled={!name.trim() || !businessType}
                            className="w-full px-6 py-3.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-body"
                          >
                            Continue
                            <ArrowRight size={16} />
                          </button>
                        </form>
                      )}

                      {/* ─── STEP 2: Email + Phone ─── */}
                      {step === 2 && (
                        <form onSubmit={handleStep2Submit}>
                          <h3 className="font-display font-bold text-xl text-white mb-1 leading-tight">
                            Where should we send your report?
                          </h3>
                          <p className="text-white/40 text-sm font-body mb-5">
                            We'll send your custom{" "}
                            <span className="text-orange-500/80">
                              {offer.pdfName.replace(".pdf", "")}
                            </span>{" "}
                            straight to your inbox.
                          </p>

                          {/* Email */}
                          <div className="relative mb-3">
                            <Mail
                              size={16}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20"
                            />
                            <input
                              type="email"
                              placeholder="Email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm font-body placeholder:text-white/30 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20 transition-all"
                            />
                          </div>

                          {/* Phone */}
                          <div className="relative mb-5">
                            <Phone
                              size={16}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20"
                            />
                            <input
                              type="tel"
                              placeholder="Phone number (optional)"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm font-body placeholder:text-white/30 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20 transition-all"
                            />
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              className="px-4 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/60 font-medium text-sm rounded-lg transition-all duration-300 flex items-center gap-1.5 font-body"
                            >
                              <ArrowLeft size={14} />
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={!email.trim()}
                              className="flex-1 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-body"
                            >
                              Continue
                              <ArrowRight size={16} />
                            </button>
                          </div>

                          <p className="text-white/20 text-[11px] font-body mt-4 text-center">
                            No spam. Unsubscribe anytime. Your data stays
                            private.
                          </p>
                        </form>
                      )}

                      {/* ─── STEP 3: Optional readiness question ─── */}
                      {step === 3 && (
                        <div>
                          <h3 className="font-display font-bold text-xl text-white mb-1 leading-tight">
                            One last thing{" "}
                            <span className="text-white/30 text-base font-normal">
                              (optional)
                            </span>
                          </h3>
                          <p className="text-white/40 text-sm font-body mb-6">
                            If the ROI numbers make sense, would you be ready to
                            start within the next 30 days?
                          </p>

                          <div className="space-y-2.5 mb-6">
                            <button
                              type="button"
                              onClick={() => setReadyIn30(true)}
                              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg border text-left text-sm font-body transition-all duration-200 ${
                                readyIn30 === true
                                  ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                  : "bg-white/[0.02] border-white/[0.06] text-white/60 hover:border-white/[0.12]"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                  readyIn30 === true
                                    ? "border-orange-500 bg-orange-500"
                                    : "border-white/20"
                                }`}
                              >
                                {readyIn30 === true && (
                                  <CheckCircle
                                    size={12}
                                    className="text-white"
                                  />
                                )}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Yes, I'm ready to move fast
                                </span>
                                <p className="text-white/30 text-xs mt-0.5">
                                  Get priority placement support and founder
                                  pricing
                                </p>
                              </div>
                              <Zap
                                size={16}
                                className="ml-auto text-orange-500/50"
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() => setReadyIn30(false)}
                              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg border text-left text-sm font-body transition-all duration-200 ${
                                readyIn30 === false
                                  ? "bg-white/[0.06] border-white/[0.12] text-white/70"
                                  : "bg-white/[0.02] border-white/[0.06] text-white/60 hover:border-white/[0.12]"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                  readyIn30 === false
                                    ? "border-white/40 bg-white/10"
                                    : "border-white/20"
                                }`}
                              >
                                {readyIn30 === false && (
                                  <CheckCircle
                                    size={12}
                                    className="text-white/60"
                                  />
                                )}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Not yet — just exploring
                                </span>
                                <p className="text-white/30 text-xs mt-0.5">
                                  No pressure, we'll send the report either way
                                </p>
                              </div>
                            </button>
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setStep(2)}
                              className="px-4 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/60 font-medium text-sm rounded-lg transition-all duration-300 flex items-center gap-1.5 font-body"
                            >
                              <ArrowLeft size={14} />
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={handleFinalSubmit}
                              disabled={loading}
                              className="flex-1 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-body"
                            >
                              {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <>
                                  Send my report
                                  <ArrowRight size={16} />
                                </>
                              )}
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={handleSkipStep3}
                            className="w-full mt-3 text-white/25 hover:text-white/40 text-xs font-body text-center transition-colors"
                          >
                            Skip this step →
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    /* ─── SUCCESS STATE ─── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle size={32} className="text-green-500" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-white mb-2">
                        Great, {name.split(" ")[0]}!
                      </h3>
                      <p className="text-white/50 text-sm font-body mb-6 max-w-xs mx-auto leading-relaxed">
                        Your{" "}
                        <span className="text-orange-500 font-medium">
                          {offer.pdfName}
                        </span>{" "}
                        is downloading now. Please review it and we hope to hear from you soon.
                      </p>

                      {readyIn30 === true && (
                        <div className="mb-5 p-3 rounded-lg bg-orange-500/5 border border-orange-500/15">
                          <p className="text-orange-400/80 text-xs font-body">
                            <Zap
                              size={12}
                              className="inline mr-1 -mt-0.5"
                            />
                            You're flagged for priority placement. A team member
                            will reach out within 24 hours.
                          </p>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-8 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white/80 font-medium text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-body"
                      >
                        Done
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
