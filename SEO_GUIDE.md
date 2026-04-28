# Freshtrax Website SEO Guide

## Overview

This document outlines the SEO strategy, implementation details, and maintenance guidelines for the Freshtrax website. All pages use the `SEOHead` component for dynamic meta tag management.

---

## SEO Architecture

### Core Components

**SEOHead Component** (`client/src/components/SEOHead.tsx`)
- Dynamically updates page title, meta description, canonical URL, and Open Graph tags
- Uses React `useEffect` to manipulate DOM on page mount
- Returns `null` (no visual output)
- Accepts props: `title`, `description`, `canonicalUrl`, `ogTitle`, `ogDescription`, `ogImage`

### Implementation Pattern

Every page wraps its content in a fragment with SEOHead:

```tsx
export default function PageName() {
  return (
    <>
      <SEOHead
        title="Page Title | Freshtrax"
        description="Page-specific meta description (150-160 chars)"
        canonicalUrl="https://getfreshtrax.com/page-path"
        ogTitle="Page Title | Freshtrax"
        ogDescription="Social media description"
      />
      <div className="page-content">
        {/* Page content here */}
      </div>
    </>
  );
}
```

---

## Page-by-Page SEO Configuration

### 1. Homepage (`/`)

| Property | Value |
|----------|-------|
| **Title** | Freshtrax \| Footwear Sterilization Kiosk for Fitness Venues |
| **Meta Description** | Freshtrax is a self-service footwear sterilization kiosk for fitness venues. Medical-grade UVC + ozone eliminates odor in 90 seconds. Zero staff required. |
| **Canonical** | https://getfreshtrax.com/ |
| **Priority** | 1.0 (Highest) |
| **Keywords** | footwear sterilization, shoe sanitizer, fitness kiosk, UVC sterilization |

**Key Elements:**
- Hero section with $38,325/year revenue claim
- Video demo integration
- Lead capture CTA: "Get the 8-Month ROI Blueprint"
- Financial projections section

---

### 2. Become an Owner (`/owners`)

| Property | Value |
|----------|-------|
| **Title** | Become an Owner \| Freshtrax Footwear Sterilization |
| **Meta Description** | Join the Freshtrax network as an owner. Generate $38,325+ annually from a single kiosk. ROI Calculator, Founder's Club benefits, and partnership opportunities. |
| **Canonical** | https://getfreshtrax.com/owners |
| **Priority** | 0.9 (High - Lead Gen) |
| **Keywords** | franchise opportunity, passive income, business opportunity, ROI calculator |

**Key Elements:**
- ROI Calculator (interactive revenue projector)
- Founder's Club benefits ($3,800 in incentives)
- 4 value propositions (Predictable Revenue, Automated, Proven Model, Scaling Path)
- CTA: "Book a call with us"

---

### 3. How It Works (`/how-it-works`)

| Property | Value |
|----------|-------|
| **Title** | How It Works \| Freshtrax Footwear Sterilization |
| **Meta Description** | Learn how Freshtrax sterilizes athletic shoes in 90 seconds using medical-grade UVC light, ozone, and antimicrobial vapor technology. |
| **Canonical** | https://getfreshtrax.com/how-it-works |
| **Priority** | 0.8 (Educational) |
| **Keywords** | shoe sterilization, UVC light, ozone technology, antimicrobial vapor |

**Key Elements:**
- 4-step process (SELECT, INSERT, REFRESH, UNLOAD)
- Technology deep-dive with clinical evidence
- 5-question FAQ section
- Peer-reviewed citations (Torres-Teran et al., Gupta & Simkovich)

---

### 4. FAQ (`/faq`)

| Property | Value |
|----------|-------|
| **Title** | FAQ \| Freshtrax Footwear Sterilization |
| **Meta Description** | Frequently asked questions about Freshtrax footwear sterilization kiosk. Learn about product technology, financial performance, operations, and getting started. |
| **Canonical** | https://getfreshtrax.com/faq |
| **Priority** | 0.7 (Support/Trust) |
| **Keywords** | FAQ, product support, technical specifications, profitability |

**Key Elements:**
- 25+ Q&A covering: Product & Technology, Financial Performance, Operations, Getting Started
- Expandable accordion interface
- Trust-building content

---

### 5. About (`/about`)

| Property | Value |
|----------|-------|
| **Title** | About Freshtrax \| Our Mission & Vision |
| **Meta Description** | Learn about Freshtrax's mission to revolutionize footwear hygiene. Founded by Marvin N., we're committed to eliminating bacteria and odor from athletic shoes using medical-grade technology. |
| **Canonical** | https://getfreshtrax.com/about |
| **Priority** | 0.6 (Brand/Trust) |
| **Keywords** | about us, company mission, founder story, company values |

**Key Elements:**
- Founder story (Marvin N.)
- Mission: "Revolutionize footwear hygiene"
- Vision: "Every athlete deserves clean, healthy shoes"
- 3 core values: Relentless Execution, Customer Obsession, Innovation

---

### 6. Contact (`/contact`)

| Property | Value |
|----------|-------|
| **Title** | Contact Us \| Freshtrax Footwear Sterilization |
| **Meta Description** | Get in touch with Freshtrax. Contact us for operator inquiries, partnerships, general questions, or support. We respond within 1 business day. |
| **Canonical** | https://getfreshtrax.com/contact |
| **Priority** | 0.7 (Conversion) |
| **Keywords** | contact us, support, inquiry, partnership |

**Key Elements:**
- Contact form (name, email, phone, company, inquiry type, message)
- 4 inquiry types: Operator, Partnership, General, Support
- Email notifications to getfreshtrax@gmail.com
- 1 business day response promise

---

## Technical SEO Implementation

### Sitemap Configuration

**File:** `client/public/sitemap.xml`

```xml
<!-- Homepage: 1.0 priority, weekly updates -->
<!-- Owners: 0.9 priority, weekly updates (lead gen) -->
<!-- How It Works: 0.8 priority, monthly updates -->
<!-- FAQ: 0.7 priority, monthly updates -->
<!-- Contact: 0.7 priority, monthly updates -->
<!-- About: 0.6 priority, quarterly updates -->
```

**Update Strategy:**
- Update `lastmod` dates when content changes
- Adjust `changefreq` based on update patterns
- Homepage should always be 1.0; adjust others based on importance

### Robots.txt

**File:** `client/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://getfreshtrax.com/sitemap.xml
```

### Meta Tags in index.html

**File:** `client/index.html`

Pre-configured with:
- Charset (UTF-8)
- Viewport (responsive)
- Theme color (#0a0a0a)
- Favicon
- Google Ads Pixel (AW-18115161423)
- Preconnect to CDN (d2xsxph8kpxj0f.cloudfront.net)

---

## Content Strategy

### Keyword Targeting

| Page | Primary Keywords | Secondary Keywords |
|------|------------------|-------------------|
| Homepage | footwear sterilization, shoe sanitizer, fitness kiosk | UVC sterilization, ozone technology, athletic shoe care |
| Owners | franchise opportunity, passive income, business opportunity | ROI calculator, fitness business, revenue model |
| How It Works | shoe sterilization, UVC light, ozone technology | antimicrobial vapor, 90-second cycle, medical-grade |
| FAQ | FAQ, product support, technical specifications | profitability, maintenance, machine features |
| About | about us, company mission, founder story | company values, team, vision |
| Contact | contact us, support, inquiry | partnership, operator inquiry, technical support |

### Content Guidelines

1. **Title Tags (50-60 characters)**
   - Include primary keyword
   - Brand name at end: "| Freshtrax"
   - Unique for each page

2. **Meta Descriptions (150-160 characters)**
   - Include primary keyword naturally
   - Call-to-action when appropriate
   - Unique for each page
   - No keyword stuffing

3. **Headings (H1, H2, H3)**
   - One H1 per page (page title)
   - Use keyword-rich headings
   - Maintain logical hierarchy
   - Use descriptive text

4. **Internal Linking**
   - Link to /owners from homepage (lead gen)
   - Link to /how-it-works from /owners (educational)
   - Link to /faq from /how-it-works (support)
   - Link to /contact from all pages (conversion)

---

## Monitoring & Maintenance

### Regular Tasks

**Weekly:**
- Monitor Google Search Console for errors
- Check page indexation status
- Review search query performance

**Monthly:**
- Update sitemap.xml with new content
- Review meta descriptions for accuracy
- Check for broken internal links
- Analyze traffic patterns

**Quarterly:**
- Audit all pages for SEO compliance
- Update content with fresh information
- Review keyword rankings
- Optimize underperforming pages

### Tools & Resources

- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com
- **Lighthouse:** Built into Chrome DevTools
- **SEO Audit:** Screaming Frog, Semrush, Ahrefs

### Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Duplicate content | Ensure each page has unique title/description |
| Missing canonical tags | SEOHead component handles this automatically |
| Slow page load | Optimize images, use CDN (already configured) |
| Mobile responsiveness | Test with Chrome DevTools mobile view |
| Broken links | Use Search Console to identify crawl errors |

---

## Future Enhancements

### Phase 2: Blog Implementation

- Create `/blog` section for thought leadership
- Target long-tail keywords (e.g., "how to eliminate shoe odor")
- Build backlink opportunities
- Improve domain authority

### Phase 3: Schema Markup

- Add JSON-LD for Organization
- Add Product schema for machine specs
- Add LocalBusiness schema (if expanding to multiple locations)
- Add FAQ schema for FAQ page

### Phase 4: Link Building

- Guest posts on fitness/wellness blogs
- Press releases for major milestones
- Partnerships with fitness influencers
- Industry directory listings

---

## Adding New Pages

When adding a new page, follow this checklist:

1. **Create page component** in `client/src/pages/`
2. **Add route** in `client/src/App.tsx`
3. **Import SEOHead** in the page component
4. **Wrap content** in fragment with SEOHead:
   ```tsx
   <>
     <SEOHead
       title="Page Title | Freshtrax"
       description="Meta description..."
       canonicalUrl="https://getfreshtrax.com/page-path"
       ogTitle="Page Title | Freshtrax"
       ogDescription="Social description..."
     />
     <div>Page content</div>
   </>
   ```
5. **Update sitemap.xml** with new URL and priority
6. **Add internal links** from relevant pages
7. **Test** in browser console for correct meta tags

---

## Contact & Questions

For SEO-related questions or updates, contact the development team or refer to this guide.

**Last Updated:** April 24, 2026
**Version:** 1.0
