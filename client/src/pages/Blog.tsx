import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createWebPageSchema } from "@/components/SchemaMarkup";
import { blogArticles, PILLARS, getArticlesByPillar } from "@/data/blogArticles";
import { Link } from "wouter";
import { useState } from "react";
import { Zap, TrendingUp, Building2, Activity } from "lucide-react";

const PILLAR_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  "shoe-care-gear": Zap,
  "revenue-business-model": TrendingUp,
  "venue-owner-playbooks": Building2,
  "athlete-health-hygiene": Activity,
};

const POSTS_PER_PAGE = 10;

// ─── Design tokens ────────────────────────────────────────────────────────────
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

const latestPosts = [...blogArticles].sort(
  (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
);

const topArticles = [...blogArticles]
  .sort((a, b) => b.readingTime - a.readingTime)
  .slice(0, 4);

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const count = getArticlesByPillar(pillar.slug).length;
  const labels = ["PILLAR 01", "PILLAR 02", "PILLAR 03", "PILLAR 04"];
  const IconComp = PILLAR_ICONS[pillar.slug];
  return (
    <Link href={`/blog/pillar/${pillar.slug}`}>
      <a
        style={{
          display: "block",
          background: FT.card,
          border: `1px solid ${FT.border}`,
          borderRadius: 12,
          padding: 28,
          minHeight: 240,
          position: "relative",
          textDecoration: "none",
          color: FT.text,
          transition: "border-color 200ms ease-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${FT.orange}66`)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = FT.border)}
      >
        <div
          style={{
            width: 40, height: 40,
            background: `${FT.orange}1a`,
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 12,
          }}
        >
          {IconComp ? <IconComp size={20} color={FT.orange} /> : null}
        </div>
        <p style={{ color: FT.orange, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          {labels[index]}
        </p>
        <h3 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.25, marginBottom: 10 }}>
          {pillar.name}
        </h3>
        <p style={{ fontSize: 13, color: FT.muted, lineHeight: 1.6, marginBottom: 48 }}>
          {pillar.description}
        </p>
        <div style={{ position: "absolute", bottom: 24, left: 28, right: 28, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: FT.dim }}>
          <span>{count} articles</span>
          <span style={{ color: FT.orange }}>→</span>
        </div>
      </a>
    </Link>
  );
}

function PostRow({ article }: { article: typeof blogArticles[0] }) {
  const pillar = PILLARS.find((p) => p.slug === article.pillar);
  return (
    <Link href={`/blog/${article.slug}`}>
      <a
        className="post-row"
        style={{
          display: "flex", gap: 20, padding: "20px 0",
          borderBottom: `1px solid ${FT.border}`,
          textDecoration: "none", color: FT.text,
          transition: "border-color 200ms ease-out", alignItems: "flex-start",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${FT.orange}40`)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = FT.border)}
      >
        <div className="post-row-img" style={{ flexShrink: 0, width: 160, height: 96, borderRadius: 8, overflow: "hidden", background: FT.cardHi }}>
          <img src={article.imageUrl} alt={article.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>{article.title}</h3>
          <p style={{ fontSize: 13, color: FT.muted, lineHeight: 1.6, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {article.excerpt}
          </p>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            {pillar && (
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: FT.orange, background: `${FT.orange}1a`, padding: "3px 8px", borderRadius: 4 }}>
                {pillar.name}
              </span>
            )}
            <span style={{ fontSize: 12, color: FT.dim }}>
              {new Date(article.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {article.readingTime} min read
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}

function TopArticlesCard() {
  return (
    <div style={{ background: FT.card, border: `1px solid ${FT.border}`, borderRadius: 12, padding: 24, marginBottom: 16 }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 16 }}>Top Articles</p>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {topArticles.map((article, i) => (
          <li key={article.id} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: FT.orange, lineHeight: 1, flexShrink: 0, width: 28 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link href={`/blog/${article.slug}`}>
              <a style={{ fontSize: 13, color: FT.text, textDecoration: "none", lineHeight: 1.4, fontWeight: 500 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = FT.orange)}
                onMouseLeave={(e) => (e.currentTarget.style.color = FT.text)}>
                {article.title}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DiscoveryCallCard() {
  return (
    <div style={{ background: "linear-gradient(180deg, #2a1810, #141414)", border: `1px solid ${FT.orange}66`, borderRadius: 12, padding: 24, marginBottom: 16 }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 8 }}>★ Talk to Freshtrax</p>
      <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>Book a 30-min discovery call</h4>
      <ul style={{ padding: 0, margin: "0 0 20px", listStyle: "none" }}>
        {["See the machine live + get real numbers", "No sales pressure — just the facts"].map((item) => (
          <li key={item} style={{ fontSize: 13, color: FT.muted, marginBottom: 8, paddingLeft: 16, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: FT.orange }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
      <a
        href="https://calendar.app.google/YWP7rF8gFUXgfMRCA"
        target="_blank" rel="noopener noreferrer"
        style={{ display: "block", textAlign: "center", background: FT.orange, color: "#fff", padding: "12px 16px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "background 200ms" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = FT.orangeDim)}
        onMouseLeave={(e) => (e.currentTarget.style.background = FT.orange)}
      >
        Book my call →
      </a>
    </div>
  );
}

function BrowseByPillarCard() {
  return (
    <div style={{ background: FT.card, border: `1px solid ${FT.border}`, borderRadius: 12, padding: 24 }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 16 }}>Browse by Pillar</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {PILLARS.map((pillar) => (
          <Link key={pillar.slug} href={`/blog/pillar/${pillar.slug}`}>
            <a
              style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: FT.text, border: `1px solid ${FT.border}`, borderRadius: 6, padding: "6px 12px", textDecoration: "none", transition: "border-color 200ms, color 200ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = FT.orange; e.currentTarget.style.color = FT.orange; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = FT.border; e.currentTarget.style.color = FT.text; }}
            >
              {pillar.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(latestPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = latestPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  function scrollToList() {
    document.getElementById("latest-dispatches")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <SEOHead
        title="Blog | Freshtrax – Shoe Hygiene & Kiosk Business Journal"
        description="Science-backed articles on shoe sanitization, athlete foot health, kiosk revenue models, and venue owner playbooks."
        canonicalUrl="https://getfreshtrax.com/blog"
        ogTitle="Freshtrax Journal"
        ogDescription="Science-backed articles on shoe hygiene, foot health, and the business of Freshtrax kiosks."
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={createWebPageSchema({ title: "Blog | Freshtrax Journal", description: "Expert articles on shoe sanitization and kiosk business.", url: "https://getfreshtrax.com/blog" })} />

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: FT.bg, color: FT.text, overflowX: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
        <ParticleField />
        <Navbar />
        <main style={{ flex: 1 }}>

          {/* Hero */}
          <section style={{ paddingTop: 96, paddingBottom: 48, paddingLeft: 40, paddingRight: 40, maxWidth: 1280, margin: "0 auto" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 16 }}>The Journal</p>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.5px", maxWidth: 920, marginBottom: 20 }}>
              Shoe hygiene, athlete performance, &amp; the business of&nbsp;Freshtrax.
            </h1>
            <p style={{ fontSize: 18, color: FT.muted, maxWidth: 580, lineHeight: 1.6 }}>
              Science-backed articles across four topic pillars — pick one or browse the latest dispatches below.
            </p>
          </section>

          {/* Pillar grid */}
          <section style={{ padding: "0 40px 48px", maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {PILLARS.map((pillar, i) => <PillarCard key={pillar.slug} pillar={pillar} index={i} />)}
            </div>
          </section>

          {/* Latest posts + sidebar */}
          <section
            className="blog-body-grid"
            style={{ padding: "0 40px 80px", maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: 40, alignItems: "start" }}
          >
            <div id="latest-dispatches">
              <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.muted, paddingBottom: 16, borderBottom: `1px solid ${FT.border}`, marginBottom: 0 }}>
                Latest Dispatches
              </h2>
              {paginatedPosts.map((article) => <PostRow key={article.id} article={article} />)}

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, paddingTop: 32 }}>
                  <button
                    onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); scrollToList(); }}
                    disabled={currentPage === 1}
                    style={{ padding: "8px 14px", borderRadius: 6, border: `1px solid ${FT.border}`, background: "transparent", color: currentPage === 1 ? FT.dim : FT.text, cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600 }}
                  >
                    ←
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => { setCurrentPage(page); scrollToList(); }}
                      style={{
                        padding: "8px 14px", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer",
                        border: `1px solid ${page === currentPage ? FT.orange : FT.border}`,
                        background: page === currentPage ? `${FT.orange}1a` : "transparent",
                        color: page === currentPage ? FT.orange : FT.muted,
                        transition: "all 150ms",
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); scrollToList(); }}
                    disabled={currentPage === totalPages}
                    style={{ padding: "8px 14px", borderRadius: 6, border: `1px solid ${FT.border}`, background: "transparent", color: currentPage === totalPages ? FT.dim : FT.text, cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600 }}
                  >
                    →
                  </button>
                </div>
              )}
            </div>
            <aside style={{ position: "sticky", top: 16 }}>
              <TopArticlesCard />
              <DiscoveryCallCard />
              <BrowseByPillarCard />
            </aside>
          </section>

          {/* Mobile sidebar */}
          <section className="blog-mobile-sidebar" style={{ display: "none", padding: "0 20px 60px" }}>
            <TopArticlesCard />
            <DiscoveryCallCard />
            <BrowseByPillarCard />
          </section>

          {/* Bottom CTA */}
          <section style={{ background: "linear-gradient(180deg, #2a1810 0%, #141414 100%)", borderTop: `1px solid ${FT.border}`, padding: "64px 40px", textAlign: "center" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 12 }}>★ Ready to own a Freshtrax machine?</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginBottom: 16, maxWidth: 560, margin: "0 auto 16px" }}>
              See the real numbers in a 30-min call
            </h2>
            <p style={{ color: FT.muted, fontSize: 16, marginBottom: 32 }}>
              Owners are generating up to $36,830/year per machine — no staff required.
            </p>
            <a
              href="/Freshtrax-roi-blueprint.pdf"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: FT.orange, color: "#fff", padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", transition: "background 200ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = FT.orangeDim)}
              onMouseLeave={(e) => (e.currentTarget.style.background = FT.orange)}
            >
              Download my free ROI blueprint →
            </a>
          </section>
        </main>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .blog-body-grid { grid-template-columns: 1fr !important; }
          .blog-body-grid > aside { display: none !important; }
          .blog-mobile-sidebar { display: block !important; }
        }
        @media (max-width: 767px) {
          .blog-body-grid, .blog-mobile-sidebar { padding-left: 16px !important; padding-right: 16px !important; }
          .post-row-img { display: none !important; }
        }
      `}</style>
    </>
  );
}
