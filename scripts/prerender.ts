/**
 * Freshtrax Static Prerender Script
 *
 * Runs after `vite build`. For every route it:
 *   1. Injects per-page title, meta description, canonical URL, and OG/Twitter tags
 *   2. For blog articles: injects the full article body as semantic HTML inside #root
 *      so crawlers that don't run JS see real content.
 *
 * Usage (automatic via package.json build script):
 *   tsx scripts/prerender.ts
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

// ---------------------------------------------------------------------------
// Import blog data directly — no path aliases needed (pure data file)
// ---------------------------------------------------------------------------
import {
  blogArticles,
  PILLARS,
  type BlogArticle,
  type Pillar,
} from "../client/src/data/blogArticles";
import { CITIES } from "../client/src/data/cities";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BASE_URL = "https://getfreshtrax.com";
const DIST_DIR = join(process.cwd(), "dist/public");
const TEMPLATE_PATH = join(DIST_DIR, "index.html");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(str: string): string {
  return str.replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/**
 * Convert the markdown-like article content format (used in BlogArticle.tsx)
 * into semantic HTML for crawler consumption.
 */
function articleContentToHtml(content: string): string {
  const paragraphs = content.split("\n\n");
  const parts: string[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("# ")) {
      parts.push(`<h1>${escapeHtml(trimmed.slice(2).trim())}</h1>`);
    } else if (trimmed.startsWith("## ")) {
      parts.push(`<h2>${escapeHtml(trimmed.slice(3).trim())}</h2>`);
    } else if (trimmed.startsWith("### ")) {
      parts.push(`<h3>${escapeHtml(trimmed.slice(4).trim())}</h3>`);
    } else if (trimmed.startsWith("#### ")) {
      parts.push(`<h4>${escapeHtml(trimmed.slice(5).trim())}</h4>`);
    } else if (trimmed.split("\n").some((l) => l.trimStart().startsWith("- "))) {
      const items = trimmed
        .split("\n")
        .filter((l) => l.trimStart().startsWith("- "))
        .map((l) => `<li>${escapeHtml(l.replace(/^[\s-]+/, "").trim())}</li>`)
        .join("");
      parts.push(`<ul>${items}</ul>`);
    } else if (trimmed.split("\n").some((l) => /^\d+\./.test(l.trimStart()))) {
      const items = trimmed
        .split("\n")
        .filter((l) => /^\d+\./.test(l.trimStart()))
        .map((l) => `<li>${escapeHtml(l.replace(/^\d+\.\s*/, "").trim())}</li>`)
        .join("");
      parts.push(`<ol>${items}</ol>`);
    } else {
      // Apply inline bold (**text**) formatting
      const inlined = escapeHtml(trimmed).replace(
        /\*\*([^*]+)\*\*/g,
        "<strong>$1</strong>"
      );
      parts.push(`<p>${inlined}</p>`);
    }
  }

  return parts.join("\n");
}

/**
 * Build a self-contained article HTML block suitable for injection into #root.
 * This is what crawlers without JS will see.
 */
function buildArticleHtml(article: BlogArticle): string {
  // article.content already begins with "# Title", which articleContentToHtml
  // converts to <h1>. Don't add a second <h1> here.
  const bodyHtml = articleContentToHtml(article.content);
  return `<article>
  <p><em>${escapeHtml(article.excerpt)}</em></p>
  ${bodyHtml}
</article>`;
}

/**
 * Inject route-specific meta tags into the HTML template, and optionally
 * pre-populate #root with static body content.
 */
function buildHtml(opts: {
  template: string;
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogArticlePublishedTime?: string;
  ogArticleAuthor?: string;
  bodyHtml?: string;
}): string {
  const {
    template,
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogType,
    ogArticlePublishedTime,
    ogArticleAuthor,
    bodyHtml,
  } = opts;

  const safeTitle = escapeAttr(title);
  const safeDesc = escapeAttr(description);
  const safeCanonical = escapeAttr(canonical);
  const safeOgTitle = escapeAttr(ogTitle ?? title);
  const safeOgDesc = escapeAttr(ogDescription ?? description);

  let html = template;

  // Title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);

  // Meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"/,
    `<meta name="description" content="${safeDesc}"`
  );

  // Canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"/,
    `<link rel="canonical" href="${safeCanonical}"`
  );

  // OG tags
  html = html.replace(
    /property="og:title"\s+content="[^"]*"/,
    `property="og:title" content="${safeOgTitle}"`
  );
  html = html.replace(
    /property="og:description"\s+content="[^"]*"/,
    `property="og:description" content="${safeOgDesc}"`
  );
  html = html.replace(
    /property="og:url"\s+content="[^"]*"/,
    `property="og:url" content="${safeCanonical}"`
  );

  // og:type (default is "website"; blog articles override to "article")
  if (ogType) {
    html = html.replace(
      /property="og:type"\s+content="[^"]*"/,
      `property="og:type" content="${escapeAttr(ogType)}"`
    );
  }

  // og:article tags (injected just before </head> for blog posts)
  if (ogArticlePublishedTime || ogArticleAuthor) {
    const articleTags: string[] = [];
    if (ogArticlePublishedTime) {
      articleTags.push(`<meta property="og:article:published_time" content="${escapeAttr(ogArticlePublishedTime)}" />`);
    }
    if (ogArticleAuthor) {
      articleTags.push(`<meta property="og:article:author" content="${escapeAttr(ogArticleAuthor)}" />`);
    }
    html = html.replace("</head>", `${articleTags.join("\n    ")}\n  </head>`);
  }

  // Twitter tags
  html = html.replace(
    /name="twitter:title"\s+content="[^"]*"/,
    `name="twitter:title" content="${safeOgTitle}"`
  );
  html = html.replace(
    /name="twitter:description"\s+content="[^"]*"/,
    `name="twitter:description" content="${safeOgDesc}"`
  );
  html = html.replace(
    /name="twitter:url"\s+content="[^"]*"/,
    `name="twitter:url" content="${safeCanonical}"`
  );

  // Inject body content into #root if provided
  if (bodyHtml) {
    html = html.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${bodyHtml}</div>`
    );
  }

  return html;
}

function writeRoute(routePath: string, html: string): void {
  // "/blog/some-slug" → dist/public/blog/some-slug/index.html
  const cleanPath = routePath.replace(/^\//, "");
  const outDir = cleanPath ? join(DIST_DIR, cleanPath) : DIST_DIR;
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "index.html");
  writeFileSync(outFile, html, "utf-8");
  console.log(`  ✓ ${routePath || "/"}`);
}

// ---------------------------------------------------------------------------
// Static routes (title + meta only)
// ---------------------------------------------------------------------------
const STATIC_ROUTES: Array<{
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}> = [
  {
    path: "/",
    title: "Freshtrax | Shoe Sanitization Kiosk for Fitness & Sports Venues",
    description:
      "Freshtrax is the only medical-grade shoe sanitization kiosk built for North American fitness venues. UVC + ozone eliminates bacteria and odor in 90 seconds. Zero staff required.",
    ogTitle:
      "Freshtrax | Shoe Sanitization Kiosk for Fitness & Sports Venues",
    ogDescription:
      "Make up to $36,830/year per kiosk (typical: $24,237). Self-service footwear sanitization that eliminates bacteria and odor in 90 seconds.",
  },
  {
    path: "/how-it-works",
    title: "How It Works | Freshtrax Footwear Sanitization",
    description:
      "Learn how Freshtrax sanitizes athletic shoes in 90 seconds using medical-grade UVC light, ozone, and antimicrobial vapor technology.",
    ogTitle: "How It Works | Freshtrax Footwear Sanitization",
    ogDescription:
      "Discover the 4-step process: SELECT, INSERT, REFRESH, UNLOAD. Backed by peer-reviewed clinical research.",
  },
  {
    path: "/owners",
    title: "Become an Owner | Freshtrax Footwear Sanitization",
    description:
      "Join the Freshtrax Founders Club. Generate up to $36,830/year per kiosk (typical: $24,237). Zero staff, zero inventory.",
    ogTitle: "Become an Owner | Freshtrax Footwear Sanitization",
    ogDescription:
      "First 20 Founders Club slots. Locked-in $79/month platform fee for life. ROI calculator and full financial projections.",
  },
  {
    path: "/about",
    title: "About Freshtrax | Our Mission & Vision",
    description:
      "Learn about Freshtrax's mission to revolutionize footwear hygiene. Medical-grade shoe sanitization for fitness venues across North America.",
    ogTitle: "About Freshtrax | Our Mission & Vision",
    ogDescription:
      "Discover the story behind Freshtrax and our commitment to eliminating bacteria, fungi, and odor from athletic footwear.",
  },
  {
    path: "/faq",
    title: "FAQ | Freshtrax Footwear Sanitization",
    description:
      "Frequently asked questions about Freshtrax. Learn about the technology, financial performance, operations, maintenance, and how to get started.",
    ogTitle: "FAQ | Freshtrax Footwear Sanitization",
    ogDescription:
      "Get answers about how Freshtrax works, profitability, maintenance costs, and becoming a kiosk owner.",
  },
  {
    path: "/contact",
    title: "Contact Us | Freshtrax Footwear Sanitization",
    description:
      "Get in touch with Freshtrax. Reach us for owner inquiries, partnerships, or support. We respond within 1 business day.",
    ogTitle: "Contact Us | Freshtrax Footwear Sanitization",
    ogDescription:
      "Contact Freshtrax for owner inquiries, venue partnerships, or general questions.",
  },
  {
    path: "/blog",
    title: "Blog | Freshtrax Footwear Sanitization",
    description:
      "Expert articles on footwear hygiene, shoe sanitization science, gym cleanliness, and the Freshtrax kiosk business model.",
    ogTitle: "Freshtrax Blog | Footwear Hygiene & Sanitization",
    ogDescription:
      "Read expert articles on athlete foot health, UV sanitization science, venue hygiene best practices, and kiosk business insights.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Freshtrax",
    description:
      "How Freshtrax collects, uses, and safeguards your information when you visit our website or interact with our kiosks.",
  },
  {
    path: "/terms",
    title: "Terms of Service | Freshtrax",
    description:
      "Terms governing use of the Freshtrax website and footwear sanitization kiosk services.",
  },
  // Venue landing pages
  {
    path: "/pickleball-clubs",
    title: "Shoe Sanitization Kiosk for Pickleball Clubs | Freshtrax",
    description:
      "Freshtrax keeps pickleball courts cleaner and members healthier. Self-service footwear sanitization in 90 seconds. Zero staff, passive revenue for your club.",
    ogTitle: "Shoe Sanitization Kiosk for Pickleball Clubs | Freshtrax",
    ogDescription:
      "Pickleball courts see 50-100+ players daily. Freshtrax eliminates bacteria, fungi, and odor from athletic footwear in 90 seconds.",
  },
  {
    path: "/crossfit-gyms",
    title: "Shoe Sanitization Kiosk for CrossFit Gyms | Freshtrax",
    description:
      "CrossFit boxes see barefoot training, shared mats, and high-sweat footwear every session. Freshtrax eliminates bacteria and odor in 90 seconds. Zero staff.",
    ogTitle: "Shoe Sanitization Kiosk for CrossFit Gyms | Freshtrax",
    ogDescription:
      "CrossFit athletes train barefoot on shared mats. Freshtrax keeps footwear clean and your box smelling like a serious training facility.",
  },
  {
    path: "/badminton-centers",
    title: "Shoe Sanitization Kiosk for Badminton Centers | Freshtrax",
    description:
      "Badminton courts require dedicated indoor shoes — keep them clean with Freshtrax. Medical-grade sanitization in 90 seconds. Pilot-tested at a badminton facility.",
    ogTitle: "Shoe Sanitization Kiosk for Badminton Centers | Freshtrax",
    ogDescription:
      "Freshtrax was first piloted at a badminton facility. Medical-grade shoe sanitization in 90 seconds — fits naturally into your shoe-change policy.",
  },
  {
    path: "/tennis-clubs",
    title: "Shoe Sanitization Kiosk for Tennis Clubs | Freshtrax",
    description:
      "Tennis clubs attract members who value premium amenities. Freshtrax delivers medical-grade shoe sanitization in 90 seconds — a hygiene upgrade your members will notice.",
    ogTitle: "Shoe Sanitization Kiosk for Tennis Clubs | Freshtrax",
    ogDescription:
      "Tennis club members expect premium. Freshtrax delivers hygiene, passive revenue, and zero staffing overhead.",
  },
  {
    path: "/bouldering-gyms",
    title: "Shoe Sanitization Kiosk for Bouldering Gyms | Freshtrax",
    description:
      "Bouldering gyms attract urban, hygiene-conscious climbers. Freshtrax delivers medical-grade shoe sanitization in 90 seconds — a hygiene amenity that fits your community.",
    ogTitle: "Shoe Sanitization Kiosk for Bouldering Gyms | Freshtrax",
    ogDescription:
      "Solve rental shoe odor and protect your climbing community. Freshtrax sanitizes footwear in 90 seconds with zero staff involvement.",
  },
  {
    path: "/shoe-sanitization-machine",
    title: "Shoe Sanitization Machine for Gyms & Sports Venues | Freshtrax",
    description:
      "Freshtrax is the shoe sanitization machine built for fitness venues. UVC, ozone, and antimicrobial vapor eliminate odor and bacteria in 90 seconds. Zero staff required.",
    ogTitle: "Shoe Sanitization Machine for Gyms & Sports Venues | Freshtrax",
    ogDescription:
      "Freshtrax eliminates odor and bacteria from athletic footwear in 90 seconds using UVC light, ozone, antimicrobial vapor, and heat.",
  },
];

// ---------------------------------------------------------------------------
// Sitemap generation
// ---------------------------------------------------------------------------
// Per-route priority/changefreq/lastmod. Routes not listed fall back to
// DEFAULT_SITEMAP_META. Bump a route's lastmod when its content changes.
const DEFAULT_SITEMAP_META = {
  priority: "0.5",
  changefreq: "monthly",
  lastmod: "2026-06-09",
};

const SITEMAP_META: Record<
  string,
  { priority: string; changefreq: string; lastmod: string }
> = {
  "/": { priority: "1.0", changefreq: "weekly", lastmod: "2026-05-06" },
  "/owners": { priority: "0.9", changefreq: "weekly", lastmod: "2026-05-06" },
  "/how-it-works": { priority: "0.8", changefreq: "monthly", lastmod: "2026-05-06" },
  "/blog": { priority: "0.75", changefreq: "weekly", lastmod: "2026-05-06" },
  "/faq": { priority: "0.7", changefreq: "monthly", lastmod: "2026-05-06" },
  "/about": { priority: "0.6", changefreq: "yearly", lastmod: "2026-05-06" },
  "/contact": { priority: "0.6", changefreq: "monthly", lastmod: "2026-05-06" },
  "/privacy": { priority: "0.3", changefreq: "yearly", lastmod: "2026-05-01" },
  "/terms": { priority: "0.3", changefreq: "yearly", lastmod: "2026-05-01" },
  "/pickleball-clubs": { priority: "0.85", changefreq: "monthly", lastmod: "2026-06-01" },
  "/crossfit-gyms": { priority: "0.85", changefreq: "monthly", lastmod: "2026-06-01" },
  "/badminton-centers": { priority: "0.80", changefreq: "monthly", lastmod: "2026-06-01" },
  "/tennis-clubs": { priority: "0.80", changefreq: "monthly", lastmod: "2026-06-01" },
  "/bouldering-gyms": { priority: "0.75", changefreq: "monthly", lastmod: "2026-06-01" },
  "/shoe-sanitization-machine": { priority: "0.85", changefreq: "monthly", lastmod: "2026-06-09" },
};

// Image + video entries for the homepage <url> block (carried over from the
// previous hand-maintained sitemap).
const HOMEPAGE_MEDIA = `
    <image:image>
      <image:loc>/images/shoe-sanitization-kiosk-hero.webp</image:loc>
      <image:title>Freshtrax Hero Background</image:title>
    </image:image>
    <image:image>
      <image:loc>/images/freshtrax-logo-black.png</image:loc>
      <image:title>Freshtrax Logo</image:title>
    </image:image>
    <video:video>
      <video:thumbnail_loc>/images/shoe-sanitization-kiosk-hero.webp</video:thumbnail_loc>
      <video:title>Freshtrax Demo Video</video:title>
      <video:description>12-second cinematic demo of Freshtrax footwear sanitization kiosk in action</video:description>
      <video:content_loc>https://d2xsxph8kpxj0f.cloudfront.net/310519663320106798/ByYadj377S2Q2TrQ4TArq4/openart-enhanced_1776890114044_1e2c34a5_6aa45cb4.mp4</video:content_loc>
      <video:duration>12</video:duration>
    </video:video>`;

function sitemapUrlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string,
  extra = ""
): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${extra}
  </url>`;
}

/**
 * Build sitemap.xml from the same data the router uses, so the sitemap can
 * never drift from the actual pages again.
 */
function buildSitemap(): string {
  const entries: string[] = [];

  // Static routes
  for (const route of STATIC_ROUTES) {
    const meta = SITEMAP_META[route.path] ?? DEFAULT_SITEMAP_META;
    const loc = route.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${route.path}/`;
    entries.push(
      sitemapUrlEntry(
        loc,
        meta.lastmod,
        meta.changefreq,
        meta.priority,
        route.path === "/" ? HOMEPAGE_MEDIA : ""
      )
    );
  }

  // City landing pages
  for (const c of CITIES) {
    entries.push(
      sitemapUrlEntry(
        `${BASE_URL}/gyms/${c.slug}/`,
        "2026-06-11",
        "monthly",
        "0.8"
      )
    );
  }

  // Blog pillar pages — lastmod is the newest article in the pillar
  for (const pillar of PILLARS) {
    const dates = blogArticles
      .filter((a) => a.pillar === pillar.slug)
      .map((a) => a.updatedDate || a.publishedDate)
      .sort();
    const lastmod = dates[dates.length - 1] ?? DEFAULT_SITEMAP_META.lastmod;
    entries.push(
      sitemapUrlEntry(
        `${BASE_URL}/blog/pillar/${pillar.slug}/`,
        lastmod,
        "weekly",
        "0.65"
      )
    );
  }

  // Blog articles
  for (const article of blogArticles) {
    entries.push(
      sitemapUrlEntry(
        `${BASE_URL}/blog/${article.slug}/`,
        article.updatedDate || article.publishedDate,
        "monthly",
        "0.7"
      )
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

${entries.join("\n\n")}

</urlset>
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main(): void {
  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`\nERROR: ${TEMPLATE_PATH} not found.`);
    console.error("Run 'pnpm build' (vite build step) before prerendering.\n");
    process.exit(1);
  }

  const template = readFileSync(TEMPLATE_PATH, "utf-8");
  const today = new Date().toISOString().split("T")[0];

  console.log(`\nFreshtrax Prerender — ${today}`);
  console.log("─".repeat(50));

  // -- Static routes
  console.log("\nStatic routes:");
  for (const route of STATIC_ROUTES) {
    const html = buildHtml({
      template,
      title: route.title,
      description: route.description,
      canonical: route.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${route.path}/`,
      ogTitle: route.ogTitle,
      ogDescription: route.ogDescription,
    });
    writeRoute(route.path, html);
  }

  // -- City landing pages
  console.log("\nCity pages:");
  for (const c of CITIES) {
    const html = buildHtml({
      template,
      title: c.seoTitle,
      description: c.seoDescription,
      canonical: `${BASE_URL}/gyms/${c.slug}/`,
      ogTitle: c.seoTitle,
      ogDescription: c.seoDescription,
    });
    writeRoute(`/gyms/${c.slug}`, html);
  }

  // -- Blog pillar pages
  console.log("\nBlog pillar pages:");
  for (const pillar of PILLARS) {
    const html = buildHtml({
      template,
      title: `${pillar.name} | Freshtrax Blog`,
      description: pillar.description,
      canonical: `${BASE_URL}/blog/pillar/${pillar.slug}/`,
      ogTitle: `${pillar.name} — Freshtrax`,
      ogDescription: pillar.description,
    });
    writeRoute(`/blog/pillar/${pillar.slug}`, html);
  }

  // -- Blog article pages (meta + full body content)
  console.log("\nBlog articles:");
  for (const article of blogArticles) {
    const articleHtml = buildArticleHtml(article);
    const html = buildHtml({
      template,
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      canonical: `${BASE_URL}/blog/${article.slug}/`,
      ogTitle: article.seoTitle || article.title,
      ogDescription: article.seoDescription || article.excerpt,
      ogType: "article",
      ogArticlePublishedTime: article.publishedDate
        ? new Date(article.publishedDate).toISOString()
        : undefined,
      ogArticleAuthor: article.author || "Freshtrax",
      bodyHtml: articleHtml,
    });
    writeRoute(`/blog/${article.slug}`, html);
  }

  // -- Sitemap (generated from the same data as the routes above)
  console.log("\nSitemap:");
  const sitemap = buildSitemap();
  writeFileSync(join(DIST_DIR, "sitemap.xml"), sitemap, "utf-8");
  console.log("  ✓ dist/public/sitemap.xml");
  // Keep the checked-in copy current so dev preview and the repo never drift
  writeFileSync(
    join(process.cwd(), "client/public/sitemap.xml"),
    sitemap,
    "utf-8"
  );
  console.log("  ✓ client/public/sitemap.xml");

  // Summary
  const total =
    STATIC_ROUTES.length + CITIES.length + PILLARS.length + blogArticles.length;
  console.log(
    `\n✅ Prerender complete — ${total} pages generated, sitemap has ${total} URLs\n`
  );
}

main();
