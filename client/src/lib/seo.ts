/**
 * SEO utilities for managing meta tags and structured data
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export const DEFAULT_SEO: SEOConfig = {
  title: "Freshtrax — Medical-Grade Footwear Sterilization",
  description:
    "Make $38,325/year from a single machine. Freshtrax is a self-service footwear sterilization kiosk that eliminates bacteria and odor from athletic shoes in 90 seconds. Zero staff, zero inventory, zero competition.",
  keywords: [
    "footwear sterilization",
    "shoe sanitizer",
    "gym equipment",
    "passive income",
    "kiosk business",
    "athletic shoe cleaning",
    "bacteria elimination",
    "UVC sterilization",
    "ozone sterilization",
    "antimicrobial treatment",
  ],
  ogType: "website",
};

/**
 * Update document head with SEO meta tags
 */
export function updateSEOTags(config: SEOConfig) {
  // Update title
  document.title = config.title;

  // Update or create meta tags
  updateMetaTag("description", config.description);
  updateMetaTag("og:title", config.title);
  updateMetaTag("og:description", config.description);
  updateMetaTag("og:type", config.ogType || "website");
  updateMetaTag("twitter:title", config.title);
  updateMetaTag("twitter:description", config.description);

  if (config.keywords && config.keywords.length > 0) {
    updateMetaTag("keywords", config.keywords.join(", "));
  }

  if (config.ogImage) {
    updateMetaTag("og:image", config.ogImage);
    updateMetaTag("twitter:image", config.ogImage);
  }

  if (config.canonicalUrl) {
    updateCanonicalUrl(config.canonicalUrl);
  }
}

/**
 * Update or create a meta tag
 */
function updateMetaTag(name: string, content: string) {
  const isOgTag = name.startsWith("og:");
  const selector = isOgTag ? `meta[property="${name}"]` : `meta[name="${name}"]`;

  let tag = document.querySelector(selector) as HTMLMetaElement;

  if (!tag) {
    tag = document.createElement("meta");
    if (isOgTag) {
      tag.setAttribute("property", name);
    } else {
      tag.setAttribute("name", name);
    }
    document.head.appendChild(tag);
  }

  tag.content = content;
}

/**
 * Update or create canonical URL
 */
function updateCanonicalUrl(url: string) {
  let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Freshtrax",
    description:
      "Medical-grade footwear sterilization kiosk for fitness venues and sports centers",
    url: "https://getfreshtrax.com",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/FreshtraxLogoblack.webp",
    sameAs: [
      "https://www.facebook.com/freshtrax",
      "https://www.instagram.com/freshtrax",
      "https://www.linkedin.com/company/freshtrax",
    ],
  };
}

/**
 * Generate JSON-LD structured data for Product
 */
export function generateProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Freshtrax Footwear Sterilization Kiosk",
    description:
      "Self-service medical-grade footwear sterilization system using UVC, Ozone, and Antimicrobial Vapor",
    brand: {
      "@type": "Brand",
      name: "Freshtrax",
    },
    offers: {
      "@type": "Offer",
      // Price available in Blueprint PDF
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * Generate JSON-LD structured data for LocalBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Freshtrax",
    description: "Footwear sterilization kiosk operator",
    areaServed: ["US", "CA"],
    serviceType: "Footwear Sterilization",
  };
}

/**
 * Inject JSON-LD script into document head
 */
export function injectStructuredData(schema: Record<string, any>) {
  let script = document.querySelector(
    'script[type="application/ld+json"]'
  ) as HTMLScriptElement;

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
}
