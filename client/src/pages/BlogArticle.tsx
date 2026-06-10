import React from "react";
import { useParams, Link } from "wouter";
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createArticleSchema } from "@/components/SchemaMarkup";
import { getBlogArticleBySlug, getSiblingArticles, getPillarBySlug } from "@/data/blogArticles";
import { useBookCall } from "@/contexts/BookCallContext";

const FT = {
  bg: "#0a0a0a",
  card: "#141414",
  cardHi: "#1c1c1c",
  border: "#262626",
  text: "#f5f5f5",
  muted: "#9a9a9a",
  dim: "#6b6b6b",
  orange: "#f57e2c",
  orangeDim: "#b85a18",
} as const;

function DiscoveryCallCard() {
  const { openBookCall } = useBookCall();
  return (
    <div style={{ background: "linear-gradient(180deg, #2a1810, #141414)", border: `1px solid ${FT.orange}66`, borderRadius: 12, padding: 24, marginBottom: 16 }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 8 }}>★ Talk to Freshtrax</p>
      <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>Book a 30-min discovery call</h4>
      <ul style={{ padding: 0, margin: "0 0 20px", listStyle: "none" }}>
        {["See the machine live + get real numbers", "No sales pressure — just the facts"].map((item) => (
          <li key={item} style={{ fontSize: 13, color: FT.muted, marginBottom: 8, paddingLeft: 16, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: FT.orange }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={openBookCall}
        style={{ display: "block", width: "100%", textAlign: "center", background: FT.orange, color: "#fff", padding: "12px 16px", borderRadius: 8, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", transition: "background 200ms" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = FT.orangeDim)}
        onMouseLeave={(e) => (e.currentTarget.style.background = FT.orange)}
      >
        Book my call →
      </button>
    </div>
  );
}

/** Parse inline markdown — bold and links — into React nodes */
function renderInline(text: string): React.ReactNode[] {
  // Split on **bold** and [link text](url) patterns
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color: FT.text, fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http");
      return isExternal ? (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
          style={{ color: FT.orange, textDecoration: "underline", textUnderlineOffset: 3 }}>
          {label}
        </a>
      ) : (
        <Link key={i} href={href}>
          <a style={{ color: FT.orange, textDecoration: "underline", textUnderlineOffset: 3 }}>{label}</a>
        </Link>
      );
    }
    return part;
  });
}

/** Render markdown-like content as React elements */
function ArticleContent({ content }: { content: string }) {
  const paragraphs = content.split("\n\n");
  return (
    <div style={{ color: FT.muted, lineHeight: 1.8, fontSize: 16 }}>
      {paragraphs.map((para, i) => {
        if (para.startsWith("# ")) {
          return <h2 key={i} style={{ fontSize: 28, fontWeight: 700, color: FT.text, marginTop: 40, marginBottom: 16 }}>{para.replace("# ", "")}</h2>;
        }
        if (para.startsWith("## ")) {
          return <h2 key={i} style={{ fontSize: 22, fontWeight: 700, color: FT.text, marginTop: 36, marginBottom: 12 }}>{para.replace("## ", "")}</h2>;
        }
        if (para.startsWith("### ")) {
          return <h3 key={i} style={{ fontSize: 18, fontWeight: 700, color: FT.text, marginTop: 28, marginBottom: 10 }}>{para.replace("### ", "")}</h3>;
        }
        if (para.startsWith("#### ")) {
          return <h4 key={i} style={{ fontSize: 16, fontWeight: 700, color: FT.text, marginTop: 24, marginBottom: 8 }}>{para.replace("#### ", "")}</h4>;
        }
        if (para.startsWith("- ")) {
          const items = para.split("\n").filter((l) => l.startsWith("- ") || l.startsWith("  - "));
          return (
            <ul key={i} style={{ margin: "12px 0 12px 24px", padding: 0 }}>
              {items.map((item, j) => (
                <li key={j} style={{ marginBottom: 6, lineHeight: 1.6 }}>{renderInline(item.replace(/^[\s-]+/, ""))}</li>
              ))}
            </ul>
          );
        }
        if (/^\d+\./.test(para)) {
          const items = para.split("\n").filter((l) => /^\d+\./.test(l));
          return (
            <ol key={i} style={{ margin: "12px 0 12px 24px", padding: 0 }}>
              {items.map((item, j) => (
                <li key={j} style={{ marginBottom: 6, lineHeight: 1.6 }}>{renderInline(item.replace(/^\d+\.\s*/, ""))}</li>
              ))}
            </ol>
          );
        }
        // Italic CTA block (lines starting and ending with *)
        if (para.startsWith("*") && para.endsWith("*") && !para.startsWith("**")) {
          const inner = para.replace(/^\*/, "").replace(/\*$/, "");
          return (
            <p key={i} style={{ fontSize: 14, color: FT.dim, borderLeft: `2px solid ${FT.orange}`, paddingLeft: 16, margin: "24px 0", fontStyle: "italic" }}>
              {renderInline(inner)}
            </p>
          );
        }
        return para.trim() ? (
          <p key={i} style={{ marginBottom: 20, lineHeight: 1.8 }}>
            {renderInline(para)}
          </p>
        ) : null;
      })}
    </div>
  );
}

export default function BlogArticle() {
  const { openBookCall } = useBookCall();
  const params = useParams();
  const slug = params.slug as string;

  const article = useMemo(() => getBlogArticleBySlug(slug), [slug]);
  const siblings = useMemo(() => (article ? getSiblingArticles(article.id, 5) : []), [article]);
  const pillar = useMemo(() => (article ? getPillarBySlug(article.pillar) : undefined), [article]);

  if (!article) {
    return (
      <>
        <SEOHead title="Article Not Found | Freshtrax" description="The article you're looking for could not be found." canonicalUrl="https://getfreshtrax.com/blog" />
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: FT.bg, color: FT.text }}>
          <ParticleField />
          <Navbar />
          <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Article Not Found</h1>
              <Link href="/blog"><a style={{ color: FT.orange }}>← Back to blog</a></Link>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const articleUrl = `https://getfreshtrax.com/blog/${article.slug}`;

  return (
    <>
      <SEOHead
        title={article.seoTitle}
        description={article.seoDescription}
        canonicalUrl={articleUrl}
        ogTitle={article.title}
        ogDescription={article.excerpt}
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={createArticleSchema({
        headline: article.title,
        description: article.excerpt,
        image: article.imageUrl,
        datePublished: article.publishedDate,
        dateModified: article.updatedDate,
        author: article.author,
        url: articleUrl,
      })} />

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: FT.bg, color: FT.text, overflowX: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
        <ParticleField />
        <Navbar />
        <main style={{ flex: 1 }} role="main">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ padding: "80px 40px 0", maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, flexWrap: "wrap" }}>
              <Link href="/blog"><a style={{ color: FT.dim, textDecoration: "none" }}>JOURNAL</a></Link>
              <span style={{ color: FT.border }}>/</span>
              {pillar && (
                <>
                  <Link href={`/blog/pillar/${pillar.slug}`}>
                    <a style={{ color: FT.orange, textDecoration: "none" }}>{pillar.name}</a>
                  </Link>
                  <span style={{ color: FT.border }}>/</span>
                </>
              )}
              <span style={{ color: FT.text, fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 12 }}>{article.title}</span>
            </div>
          </nav>

          {/* Two-col layout: article + sidebar */}
          <div
            className="article-grid"
            style={{ padding: "32px 40px 80px", maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 300px", gap: 48, alignItems: "start" }}
          >
            {/* ── Article ── */}
            <article>
              {/* Tag + title */}
              {pillar && (
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: FT.orange, background: `${FT.orange}1a`, padding: "4px 10px", borderRadius: 4, display: "inline-block", marginBottom: 16 }}>
                  {pillar.name}
                </span>
              )}
              <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 20 }}>
                {article.title}
              </h1>

              {/* Byline */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: FT.dim, marginBottom: 32, flexWrap: "wrap" }}>
                <span style={{ color: FT.text, fontWeight: 600 }}>{article.author}</span>
                <span>·</span>
                <span>{new Date(article.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span>·</span>
                <span>{article.readingTime} min read</span>
              </div>

              {/* Hero image */}
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 40, height: 360, background: FT.cardHi }}>
                <img src={article.imageUrl} alt={article.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Body */}
              <ArticleContent content={article.content} />

              {/* Tags */}
              <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${FT.border}` }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.dim, marginBottom: 12 }}>Tags</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {article.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 11, color: FT.muted, background: FT.card, border: `1px solid ${FT.border}`, borderRadius: 4, padding: "4px 10px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sibling strip (mobile — inside article) */}
              {siblings.length > 0 && (
                <div className="sibling-strip-mobile" style={{ display: "none", marginTop: 48, paddingTop: 24, borderTop: `1px solid ${FT.border}` }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 16 }}>
                    ★ More in {pillar?.name}
                  </p>
                  {siblings.map((s) => (
                    <Link key={s.id} href={`/blog/${s.slug}`}>
                      <a style={{ display: "block", padding: "10px 0", borderBottom: `1px solid ${FT.border}`, textDecoration: "none", color: FT.text, fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = FT.orange)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = FT.text)}>
                        ↳ {s.title}
                      </a>
                    </Link>
                  ))}
                  {pillar && (
                    <Link href={`/blog/pillar/${pillar.slug}`}>
                      <a style={{ display: "block", marginTop: 12, fontSize: 12, color: FT.dim, textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = FT.orange)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = FT.dim)}>
                        ↑ Up to pillar page
                      </a>
                    </Link>
                  )}
                  <div style={{ marginTop: 24 }}>
                    <DiscoveryCallCard />
                  </div>
                </div>
              )}
            </article>

            {/* ── Sticky Sidebar ── */}
            <aside style={{ position: "sticky", top: 16 }}>
              {/* Sibling cluster */}
              {siblings.length > 0 && pillar && (
                <div style={{ background: FT.card, border: `1px solid ${FT.border}`, borderRadius: 12, padding: 24, marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 16 }}>
                    ★ Cluster · {pillar.name}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {siblings.map((s) => (
                      <li key={s.id} style={{ marginBottom: 12 }}>
                        <Link href={`/blog/${s.slug}`}>
                          <a style={{ display: "flex", gap: 8, fontSize: 13, color: FT.text, textDecoration: "none", lineHeight: 1.4, fontWeight: 500, transition: "color 200ms" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = FT.orange)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = FT.text)}>
                            <span style={{ color: FT.orange, flexShrink: 0 }}>↳</span>
                            {s.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div style={{ borderTop: `1px solid ${FT.border}`, paddingTop: 12, marginTop: 4 }}>
                    <Link href={`/blog/pillar/${pillar.slug}`}>
                      <a style={{ fontSize: 12, color: FT.dim, textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = FT.orange)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = FT.dim)}>
                        ↑ Up to pillar page
                      </a>
                    </Link>
                  </div>
                </div>
              )}

              <DiscoveryCallCard />
            </aside>
          </div>

          {/* Bottom CTA */}
          <section style={{ background: "linear-gradient(180deg, #2a1810 0%, #141414 100%)", borderTop: `1px solid ${FT.border}`, padding: "64px 40px", textAlign: "center" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 12 }}>★ Ready to own a Freshtrax machine?</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, marginBottom: 16, maxWidth: 480, margin: "0 auto 16px" }}>
              See the real numbers in a 30-min call
            </h2>
            <p style={{ color: FT.muted, fontSize: 16, marginBottom: 28 }}>
              No pressure — just the real numbers and how the machine works.
            </p>
            <button
              type="button"
              onClick={openBookCall}
              style={{ display: "inline-block", background: FT.orange, color: "#fff", padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = FT.orangeDim)}
              onMouseLeave={(e) => (e.currentTarget.style.background = FT.orange)}
            >
              Book my discovery call →
            </button>
          </section>
        </main>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .article-grid { grid-template-columns: 1fr !important; }
          .article-grid > aside { display: none !important; }
          .sibling-strip-mobile { display: block !important; }
        }
        @media (max-width: 767px) {
          .article-grid { padding-left: 16px !important; padding-right: 16px !important; }
          nav[aria-label="Breadcrumb"] { padding-left: 16px !important; padding-right: 16px !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </>
  );
}
