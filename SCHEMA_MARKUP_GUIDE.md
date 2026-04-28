# Schema Markup Implementation Guide

## Overview

This document outlines the JSON-LD structured data implementation for the Freshtrax website. Schema markup helps search engines understand page content and enables rich snippets in search results.

---

## Schema Markup Component

**File:** `client/src/components/SchemaMarkup.tsx`

The `SchemaMarkup` component injects JSON-LD structured data into the page head using React's `useEffect` hook. It accepts a schema object and renders nothing to the DOM.

### Usage Pattern

```tsx
import { SchemaMarkup, organizationSchema, createWebPageSchema } from "@/components/SchemaMarkup";

export default function Page() {
  return (
    <>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={createWebPageSchema({
        title: "Page Title",
        description: "Page description",
        url: "https://getfreshtrax.com/page-path",
      })} />
      {/* Page content */}
    </>
  );
}
```

---

## Schema Types Implemented

### 1. Organization Schema

**Purpose:** Provides basic company information to search engines

**Used On:** All pages

**Data Included:**
- Company name: "Freshtrax"
- Website URL: https://getfreshtrax.com
- Logo URL
- Description
- Contact information
- Social media links (placeholder)

**Search Result Impact:**
- Improves company knowledge panel
- Enhances brand recognition in search results
- Provides contact information

---

### 2. Product Schema

**Purpose:** Describes the Freshtrax machine as a product

**Used On:** Homepage, Owners page

**Data Included:**
- Product name: "Freshtrax Footwear Sterilization Kiosk"
- Description
- Image URL
- Brand information
- Manufacturer
- Pricing information
- Aggregate rating (4.8/5 stars)

**Search Result Impact:**
- Enables product rich snippets
- Shows pricing and availability
- Displays ratings and reviews
- Improves product visibility in shopping results

---

### 3. WebPage Schema

**Purpose:** Provides page-level metadata for search engines

**Used On:** All pages (Homepage, Owners, How It Works, FAQ, About, Contact)

**Data Included:**
- Page title
- Page description
- Page URL
- Publication date
- Last modified date
- Featured image
- Publisher information

**Search Result Impact:**
- Improves page snippet quality
- Helps with page indexation
- Provides publication metadata
- Enhances search result appearance

---

### 4. VideoObject Schema

**Purpose:** Enhances video content visibility in search results

**Used On:** Homepage (demo video)

**Data Included:**
- Video name: "Freshtrax Demo Video"
- Description
- Thumbnail URL
- Upload date
- Duration (ISO 8601 format: PT12S)
- Content URL

**Search Result Impact:**
- Enables video rich snippets in search results
- Video appears in Google Video results
- Improves click-through rates
- Shows video duration and thumbnail

---

### 5. FAQPage Schema

**Purpose:** Enables FAQ rich snippets in search results

**Used On:** FAQ page

**Data Included:**
- 20 Question/Answer pairs
- Each question with corresponding answer

**Search Result Impact:**
- Shows FAQ items directly in search results
- Increases click-through rates
- Answers appear as snippets
- Improves page visibility for question-based queries

**Example Questions Included:**
- How does Freshtrax actually work?
- Is Freshtrax FDA-approved?
- What happens if the machine breaks?
- How often does the machine need maintenance?
- Can the machine handle different shoe types?
- (And 15 more...)

---

## Implementation Details by Page

### Homepage (`/`)

**Schemas Injected:**
1. Organization Schema
2. Product Schema
3. WebPage Schema (Homepage)
4. VideoObject Schema (Demo video)

**Key Features:**
- Comprehensive company information
- Product details with pricing
- Video metadata for demo
- Page-level SEO metadata

---

### Become an Owner (`/owners`)

**Schemas Injected:**
1. Organization Schema
2. WebPage Schema (Owners page)

**Key Features:**
- Lead generation page metadata
- Company information
- Page-specific description

---

### How It Works (`/how-it-works`)

**Schemas Injected:**
1. Organization Schema
2. WebPage Schema (How It Works page)

**Key Features:**
- Educational content metadata
- Technology explanation
- Page-specific description

---

### FAQ (`/faq`)

**Schemas Injected:**
1. Organization Schema
2. WebPage Schema (FAQ page)
3. FAQPage Schema (20 Q&A items)

**Key Features:**
- FAQ rich snippets enabled
- All 20 Q&A pairs structured
- Search engine optimization for question queries

---

### About (`/about`)

**Schemas Injected:**
1. Organization Schema
2. WebPage Schema (About page)

**Key Features:**
- Company mission and vision
- Founder information
- Brand values

---

### Contact (`/contact`)

**Schemas Injected:**
1. Organization Schema
2. WebPage Schema (Contact page)

**Key Features:**
- Contact information
- Support page metadata
- Inquiry types

---

## Rich Snippet Types Enabled

### 1. FAQ Rich Snippets

**Appearance:** Questions and answers appear directly in search results

**Trigger:** FAQPage schema on FAQ page

**Example:**
```
FAQ | Freshtrax Footwear Sterilization
How does Freshtrax actually work?
Freshtrax uses a three-stage sterilization process...
```

---

### 2. Product Rich Snippets

**Appearance:** Product details, pricing, and ratings in search results

**Trigger:** Product schema on homepage and owners page

**Example:**
```
Freshtrax Footwear Sterilization Kiosk
★★★★★ (4.8) - 12 reviews
$7,850
In Stock
```

---

### 3. Organization Rich Snippets

**Appearance:** Company knowledge panel in search results

**Trigger:** Organization schema on all pages

**Example:**
```
Freshtrax
Medical-grade footwear sterilization kiosk for fitness venues
Contact: getfreshtrax@gmail.com
```

---

### 4. Video Rich Snippets

**Appearance:** Video appears in search results with thumbnail and duration

**Trigger:** VideoObject schema on homepage

**Example:**
```
Freshtrax Demo Video
12 seconds
Freshtrax — a self-service footwear sterilization kiosk...
```

---

## Testing & Validation

### Google Rich Results Test

1. Go to: https://search.google.com/test/rich-results
2. Enter homepage URL: https://getfreshtrax.com/
3. Verify schemas detected:
   - Organization
   - Product
   - WebPage
   - VideoObject

### FAQ Rich Results Test

1. Go to: https://search.google.com/test/rich-results
2. Enter FAQ URL: https://getfreshtrax.com/faq
3. Verify schemas detected:
   - FAQPage
   - Organization
   - WebPage

### Schema.org Validator

1. Go to: https://validator.schema.org/
2. Enter page URL
3. Verify all schemas are valid

---

## Best Practices

### 1. Keep Schemas Updated

- Update `dateModified` in WebPage schema when content changes
- Keep product pricing current in Product schema
- Add new FAQ items to FAQPage schema when adding questions

### 2. Avoid Duplicate Schemas

- Organization schema appears on all pages (intentional for consistency)
- Each page has its own WebPage schema (unique metadata)
- Only homepage has VideoObject schema

### 3. Maintain Schema Accuracy

- Ensure all URLs are correct and absolute
- Use ISO 8601 date format (YYYY-MM-DD)
- Use ISO 8601 duration format for videos (PT12S = 12 seconds)
- Keep descriptions concise and accurate

### 4. Monitor Search Performance

- Check Google Search Console for rich result status
- Monitor click-through rates for rich snippets
- Track keyword rankings for FAQ items
- Analyze user engagement metrics

---

## Future Enhancements

### Phase 1: LocalBusiness Schema

Add LocalBusiness schema when expanding to multiple locations:

```json
{
  "@type": "LocalBusiness",
  "name": "Freshtrax",
  "address": "...",
  "telephone": "...",
  "openingHoursSpecification": "..."
}
```

### Phase 2: Review Schema

Add Review schema when collecting customer testimonials:

```json
{
  "@type": "Review",
  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
  "reviewBody": "Customer testimonial...",
  "author": { "@type": "Person", "name": "Customer Name" }
}
```

### Phase 3: Event Schema

Add Event schema for webinars or product launches:

```json
{
  "@type": "Event",
  "name": "Freshtrax Webinar",
  "startDate": "2026-05-15T14:00:00",
  "endDate": "2026-05-15T15:00:00",
  "url": "https://getfreshtrax.com/webinar"
}
```

### Phase 4: BreadcrumbList Schema

Add breadcrumb navigation schema:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "https://getfreshtrax.com/" },
    { "position": 2, "name": "FAQ", "item": "https://getfreshtrax.com/faq" }
  ]
}
```

---

## Troubleshooting

### Schema Not Appearing in Search Results

1. **Check injection:** Use browser console to verify JSON-LD scripts are present
2. **Validate schema:** Use Google Rich Results Test tool
3. **Wait for indexing:** Google may take time to re-crawl and process schemas
4. **Check Search Console:** Look for rich result status and errors

### Incorrect Data in Rich Snippets

1. **Verify schema data:** Check SchemaMarkup.tsx for correct values
2. **Update metadata:** Ensure page titles and descriptions match schema
3. **Test again:** Use Google Rich Results Test after making changes

### Performance Issues

1. **Minimize schema size:** Keep descriptions concise
2. **Avoid nested schemas:** Use flat structure when possible
3. **Cache optimization:** Ensure schemas are cached properly

---

## Monitoring & Maintenance

### Weekly Tasks

- Check Google Search Console for rich result errors
- Monitor FAQ rich snippet appearance
- Track search impressions and CTR

### Monthly Tasks

- Validate all schemas using Google Rich Results Test
- Update product pricing if changed
- Review FAQ schema for new questions

### Quarterly Tasks

- Audit all pages for schema accuracy
- Test on different devices and browsers
- Review search performance metrics

---

## Resources

- **Schema.org:** https://schema.org/
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Validator:** https://validator.schema.org/
- **Google Search Central:** https://developers.google.com/search
- **JSON-LD Specification:** https://json-ld.org/

---

## Contact & Questions

For schema markup questions or updates, refer to this guide or contact the development team.

**Last Updated:** April 24, 2026
**Version:** 1.0
