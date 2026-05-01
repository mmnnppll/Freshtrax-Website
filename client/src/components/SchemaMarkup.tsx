import { useEffect } from "react";

interface SchemaMarkupProps {
  schema: Record<string, any>;
}

/**
 * SchemaMarkup Component
 * Injects JSON-LD structured data into the page head
 * Used for SEO rich snippets and search engine understanding
 */
export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  useEffect(() => {
    // Create script tag for JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [schema]);

  return null;
}

/**
 * Organization Schema
 * Provides basic company information for search engines
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Freshtrax",
  url: "https://getfreshtrax.com",
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/FreshtraxLogoblack.webp",
  description: "Medical-grade footwear sanitization kiosk for fitness venues",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "getfreshtrax@gmail.com",
    url: "https://getfreshtrax.com/contact",
  },
  sameAs: [
    // Add social media URLs when available
    // "https://www.linkedin.com/company/freshtrax",
    // "https://www.instagram.com/freshtrax",
  ],
};

/**
 * Product Schema
 * Describes the Freshtrax machine as a product
 */
export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Freshtrax Footwear Sanitization Kiosk",
  description:
    "Medical-grade self-service footwear sanitization kiosk using UVC light, ozone, and antimicrobial vapor technology. Download the ROI Blueprint PDF for pricing and acquisition details.",
  image:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/hero-bg-ECzbAorEHV8DYBJU9NrUhH.webp",
  brand: {
    "@type": "Brand",
    name: "Freshtrax",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Freshtrax",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    // Price available in Blueprint PDF
    offerCount: "1",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "12",
  },
  url: "https://getfreshtrax.com/owners",
};

/**
 * LocalBusiness Schema
 * Helps with local search visibility
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Freshtrax",
  url: "https://getfreshtrax.com",
  image:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/FreshtraxLogoblack.webp",
  description: "Medical-grade footwear sanitization kiosk for fitness venues",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "getfreshtrax@gmail.com",
  },
  priceRange: "$$$", // Premium equipment
  serviceArea: {
    "@type": "Country",
    name: "United States",
  },
};

/**
 * FAQPage Schema
 * Enables FAQ rich snippets in search results
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export const createFAQSchema = (faqs: FAQItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

/**
 * BreadcrumbList Schema
 * Improves navigation visibility in search results
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const createBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * WebPage Schema
 * Provides page-level metadata
 */
export interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

export const createWebPageSchema = (props: WebPageSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: props.title,
  description: props.description,
  url: props.url,
  image: props.image,
  datePublished: props.datePublished || new Date().toISOString(),
  dateModified: props.dateModified || new Date().toISOString(),
  publisher: {
    "@type": "Organization",
    name: "Freshtrax",
    logo: {
      "@type": "ImageObject",
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/FreshtraxLogoblack.webp",
    },
  },
});

/**
 * Article Schema
 * For blog posts and news articles
 */
export interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
  articleBody?: string;
}

export const createArticleSchema = (props: ArticleSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: props.headline,
  description: props.description,
  image: props.image,
  datePublished: props.datePublished,
  dateModified: props.dateModified,
  author: {
    "@type": "Person",
    name: props.author,
  },
  publisher: {
    "@type": "Organization",
    name: "Freshtrax",
    logo: {
      "@type": "ImageObject",
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/FreshtraxLogoblack.webp",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": props.url,
  },
});

/**
 * VideoObject Schema
 * Enhances video content visibility
 */
export interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
}

export const createVideoSchema = (props: VideoSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: props.name,
  description: props.description,
  thumbnailUrl: props.thumbnailUrl,
  uploadDate: props.uploadDate,
  duration: props.duration,
  contentUrl: props.contentUrl,
});

/**
 * AggregateOffer Schema
 * For displaying pricing and availability
 */
export interface OfferProps {
  priceCurrency: string;
  price: string;
  availability: string;
  url: string;
}

export const createAggregateOfferSchema = (offers: OfferProps[]) => ({
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  priceCurrency: offers[0].priceCurrency,
  lowPrice: Math.min(...offers.map((o) => parseFloat(o.price))),
  highPrice: Math.max(...offers.map((o) => parseFloat(o.price))),
  offerCount: offers.length,
  offers: offers.map((offer) => ({
    "@type": "Offer",
    price: offer.price,
    priceCurrency: offer.priceCurrency,
    availability: offer.availability,
    url: offer.url,
  })),
});
