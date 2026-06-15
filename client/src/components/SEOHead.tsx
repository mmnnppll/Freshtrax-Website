import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Update og:url — keep in sync with the canonical so social shares of
    // inner pages don't fall back to the homepage URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", canonicalUrl);

    // Update Open Graph tags
    if (ogTitle) {
      let ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (!ogTitleTag) {
        ogTitleTag = document.createElement("meta");
        ogTitleTag.setAttribute("property", "og:title");
        document.head.appendChild(ogTitleTag);
      }
      ogTitleTag.setAttribute("content", ogTitle);
    }

    if (ogDescription) {
      let ogDescTag = document.querySelector('meta[property="og:description"]');
      if (!ogDescTag) {
        ogDescTag = document.createElement("meta");
        ogDescTag.setAttribute("property", "og:description");
        document.head.appendChild(ogDescTag);
      }
      ogDescTag.setAttribute("content", ogDescription);
    }

    if (ogImage) {
      let ogImageTag = document.querySelector('meta[property="og:image"]');
      if (!ogImageTag) {
        ogImageTag = document.createElement("meta");
        ogImageTag.setAttribute("property", "og:image");
        document.head.appendChild(ogImageTag);
      }
      ogImageTag.setAttribute("content", ogImage);
    }

    // Update Twitter Card tags — the prerendered HTML sets these, so mirror
    // the OG/canonical values on client-side navigation to keep them in parity
    let twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (!twitterUrl) {
      twitterUrl = document.createElement("meta");
      twitterUrl.setAttribute("name", "twitter:url");
      document.head.appendChild(twitterUrl);
    }
    twitterUrl.setAttribute("content", canonicalUrl);

    if (ogTitle) {
      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement("meta");
        twitterTitle.setAttribute("name", "twitter:title");
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute("content", ogTitle);
    }

    if (ogDescription) {
      let twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDesc) {
        twitterDesc = document.createElement("meta");
        twitterDesc.setAttribute("name", "twitter:description");
        document.head.appendChild(twitterDesc);
      }
      twitterDesc.setAttribute("content", ogDescription);
    }
  }, [title, description, canonicalUrl, ogTitle, ogDescription, ogImage]);

  return null;
}
