/*
 * Lead Capture Context — manages modal state globally.
 * Any section can trigger the modal with a specific offer.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import LeadCaptureModal, { type LeadOffer } from "@/components/LeadCaptureModal";

// Pre-defined offers for each section
export const OFFERS = {
  roiBlueprint: {
    label: "Operator Intelligence",
    headline: "Get the 8-Month ROI Blueprint",
    description:
      "Discover how to generate $3,150+ monthly revenue from a single kiosk. Includes detailed financial projections, break-even analysis, and proven operator scenarios.",
    pdfName: "Freshtrax 8-Month ROI Blueprint.pdf",
    pdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/Freshtrax-8month-roi-blueprint_71791f1a.pdf",
    ctaText: "Get the blueprint now",
  },
  revenueEstimate: {
    label: "Revenue Modeling",
    headline: "Get your free revenue estimate",
    description:
      "Customized revenue projections based on your venue type, foot traffic, and location. See your path to $10,000+ monthly recurring revenue.",
    pdfName: "Freshtrax Revenue Estimate.pdf",
    pdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/Freshtrax-8month-roi-blueprint_71791f1a.pdf",
    ctaText: "Get my estimate",
  },
  financialModel: {
    label: "Financial Deep-Dive",
    headline: "Roadmap to $10,000 MRR",
    description:
      "The complete breakdown on what it takes to get to $10,000 MRR — including conservative, base, and optimistic scenarios with month-by-month cash flow projections.",
    pdfName: "Freshtrax Financial Model.pdf",
    pdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/Freshtrax-8month-roi-blueprint_71791f1a.pdf",
    ctaText: "Download the model",
  },
  pathogensReport: {
    label: "Science & Safety",
    headline: "The Hidden Pathogens Report",
    description:
      "What's really living inside athletic footwear? Clinical data on bacteria, fungi, and viral loads — and why UVC + ozone is the only proven solution.",
    pdfName: "Hidden Pathogens Report.pdf",
    pdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/Freshtrax-8month-roi-blueprint_71791f1a.pdf",
    ctaText: "Download the report",
  },
  marketBreakdown: {
    label: "Market Intelligence",
    headline: "See the $1B market breakdown",
    description:
      "Full analysis of the $1B self-service hygiene market — venue counts, consumer spending data, and why North America is wide open for first movers.",
    pdfName: "Freshtrax Market Analysis.pdf",
    pdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/Freshtrax-8month-roi-blueprint_71791f1a.pdf",
    ctaText: "Get the analysis",
  },
  founderSlot: {
    label: "Founder's Club",
    headline: "Claim your founder slot",
    description:
      "Lock in exclusive Year 1 terms: 100% revenue retention, waived service fees, and priority Tier 1 venue placement. Only 20 slots available.",
    pdfName: "Freshtrax Founder's Club Package.pdf",
    pdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/Freshtrax-8month-roi-blueprint_71791f1a.pdf",
    ctaText: "Reserve my slot",
  },
} satisfies Record<string, LeadOffer>;

interface LeadCaptureContextType {
  openModal: (offer: LeadOffer) => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | null>(null);

export function useLeadCapture() {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) throw new Error("useLeadCapture must be used within LeadCaptureProvider");
  return ctx;
}

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<LeadOffer>(OFFERS.roiBlueprint);

  const openModal = useCallback((offer: LeadOffer) => {
    setCurrentOffer(offer);
    setOpen(true);
  }, []);

  return (
    <LeadCaptureContext.Provider value={{ openModal }}>
      {children}
      <LeadCaptureModal open={open} onClose={() => setOpen(false)} offer={currentOffer} />
    </LeadCaptureContext.Provider>
  );
}
