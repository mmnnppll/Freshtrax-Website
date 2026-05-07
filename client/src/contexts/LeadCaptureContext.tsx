/*
 * Lead Capture Context - manages modal state globally.
 * Any section can trigger the modal with a specific offer.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import LeadCaptureModal, { type LeadOffer } from "@/components/LeadCaptureModal";

// Pre-defined offers for each section
export const OFFERS = {
    roiBlueprint: {
          label: "Owner Intelligence",
          headline: "Get the 8-Month ROI Blueprint",
          description:
                  "I will show you exactly the steps on how to generate $3,150+ monthly revenue from a single kiosk.",
          pdfName: "Freshtrax 8-Month ROI Blueprint.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Get the blueprint now",
    },
    revenueEstimate: {
          label: "Revenue Modeling",
          headline: "Get your free revenue estimate",
          description:
                  "Customized revenue projections based on your venue type, foot traffic, and location. See your path to $10,000+ monthly recurring revenue.",
          pdfName: "Freshtrax Revenue Estimate.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Get my estimate",
    },
    financialModel: {
          label: "Financial Deep-Dive",
          headline: "Roadmap to $10,000 MRR",
          description:
                  "The complete breakdown on what it takes to get to $10,000 MRR - including conservative, base, and optimistic scenarios with month-by-month cash flow projections.",
          pdfName: "Freshtrax Financial Model.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Download the model",
    },
    pathogensReport: {
          label: "Science & Safety",
          headline: "The Hidden Pathogens Report",
          description:
                  "What's really living inside athletic footwear? Clinical data on bacteria, fungi, and viral loads - and why UVC + ozone is the only proven solution.",
          pdfName: "Hidden Pathogens Report.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Download the report",
    },
    marketBreakdown: {
          label: "Market Intelligence",
          headline: "See the $1B market breakdown",
          description:
                  "Deep-dive into the $1B+ athletic footwear hygiene market. Includes venue-by-venue opportunity analysis and competitive landscape.",
          pdfName: "Freshtrax Market Breakdown.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Get the breakdown",
    },
};

interface LeadCaptureContextType {
    openModal: (offer: LeadOffer) => void;
    closeModal: () => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | null>(null);

export function useLeadCapture() {
    const context = useContext(LeadCaptureContext);
    if (!context) {
          throw new Error("useLeadCapture must be used within a LeadCaptureProvider");
    }
    return context;
}

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentOffer, setCurrentOffer] = useState<LeadOffer>(OFFERS.roiBlueprint);

  const openModal = useCallback((offer: LeadOffer) => {
        setCurrentOffer(offer);
        setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
        setIsOpen(false);
  }, []);

  return (
        <LeadCaptureContext.Provider value={{ openModal, closeModal }}>
          {children}
                <LeadCaptureModal open={isOpen} onClose={closeModal} offer={currentOffer} />
        </LeadCaptureContext.Provider>
      );
}
