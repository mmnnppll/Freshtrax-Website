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
    // ── Venue-specific wrappers — same Blueprint PDF, audience-flavored.
    // presetBusinessType pre-selects the venue type in the modal so the
    // visitor skips a step and the lead auto-segments in the CRM.
    pickleballSheet: {
          label: "Pickleball Club Intelligence",
          headline: "Get the Pickleball Club Revenue Sheet",
          description:
                  "How pickleball clubs turn a high-traffic corner into $24,237+/year — revenue math, placement guide, and the member-experience pitch.",
          pdfName: "Freshtrax Pickleball Club Revenue Sheet.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Get the revenue sheet",
          presetBusinessType: "racket",
    },
    tennisSheet: {
          label: "Tennis Club Intelligence",
          headline: "Get the Tennis Club Revenue Sheet",
          description:
                  "How tennis clubs add a premium amenity members notice — revenue math, placement guide, and projections for racket-sport traffic.",
          pdfName: "Freshtrax Tennis Club Revenue Sheet.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Get the revenue sheet",
          presetBusinessType: "racket",
    },
    badmintonSheet: {
          label: "Badminton Center Intelligence",
          headline: "Get the Badminton Center Revenue Sheet",
          description:
                  "Built on real data from our badminton pilot venue — revenue math, placement guide, and projections for dedicated-shoe court traffic.",
          pdfName: "Freshtrax Badminton Center Revenue Sheet.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Get the revenue sheet",
          presetBusinessType: "racket",
    },
    climbingSheet: {
          label: "Climbing Gym Intelligence",
          headline: "Get the Climbing Gym Revenue Sheet",
          description:
                  "How climbing and bouldering gyms solve rental-shoe odor and add revenue — full math, placement guide, and member-experience pitch.",
          pdfName: "Freshtrax Climbing Gym Revenue Sheet.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Get the revenue sheet",
          presetBusinessType: "climbing",
    },
    gymSheet: {
          label: "Gym & Box Intelligence",
          headline: "Get the Gym Revenue Sheet",
          description:
                  "How gyms, boxes, and training facilities add zero-staff revenue per square foot — full math, placement guide, and member-retention angle.",
          pdfName: "Freshtrax Gym Revenue Sheet.pdf",
          pdfUrl: "/Freshtrax-roi-blueprint.pdf",
          ctaText: "Get the revenue sheet",
          presetBusinessType: "gym",
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
