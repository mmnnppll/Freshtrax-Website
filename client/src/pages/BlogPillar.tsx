import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { PILLARS, getPillarBySlug, getArticlesByPillar, blogArticles } from "@/data/blogArticles";
import { Link, useRoute } from "wouter";
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

function ArticleCard({ article }: { article: typeof blogArticles[0] }) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <a
        style={{
          display: "flex",
          flexDirection: "column",
          background: FT.card,
          border: `1px solid ${FT.border}`,
          borderRadius: 12,
          overflow: "hidden",
          textDecoration: "none",
          color: FT.text,
          transition: "border-color 200ms ease-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${FT.orange}66`)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = FT.border)}
      >
        <div style={{ height: 180, overflow: "hidden", background: FT.cardHi, flexShrink: 0 }}>
          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 300ms ease-out" }}
            loading="lazy"
          />
        </div>
        <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>
            {article.title}
          </h3>
          <p style={{ fontSize: 13, color: FT.muted, lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
            {article.excerpt}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: FT.dim }}>
            <span>
              {new Date(article.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default function BlogPillar() {
  const { openBookCall } = useBookCall();
  const [, params] = useRoute("/blog/pillar/:slug");
  const slug = params?.slug ?? "";
  const pillar = getPillarBySlug(slug);
  const articles = getArticlesByPillar(slug);
  const otherPillars = PILLARS.filter((p) => p.slug !== slug);

  if (!pillar) {
    return (
      <div style={{ minHeight: "100vh", background: FT.bg, color: FT.text, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Pillar not found</h1>
          <Link href="/blog"><a style={{ color: FT.orange }}>← Back to blog</a></Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${pillar.name} | Freshtrax Journal`}
        description={pillar.description}
        canonicalUrl={`https://getfreshtrax.com/blog/pillar/${pillar.slug}`}
        ogTitle={`${pillar.name} – Freshtrax`}
        ogDescription={pillar.description}
      />

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: FT.bg, color: FT.text, overflowX: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
        <ParticleField />
        <Navbar />
        <main style={{ flex: 1 }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ padding: "80px 40px 0", maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
              <Link href="/blog"><a style={{ color: FT.dim, textDecoration: "none" }}>JOURNAL</a></Link>
              <span style={{ color: FT.border }}>/</span>
              <span style={{ color: FT.orange }}>{pillar.name}</span>
            </div>
          </nav>

          {/* Hero */}
          <section style={{ padding: "32px 40px 48px", maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: `${FT.orange}1a`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                {pillar.icon}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange }}>
                {articles.length} articles
              </p>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.5px", maxWidth: 760, marginBottom: 16 }}>
              {pillar.name}
            </h1>
            <p style={{ fontSize: 18, color: FT.muted, maxWidth: 600, lineHeight: 1.6 }}>
              {pillar.description}
            </p>
          </section>

          {/* Articles grid */}
          <section style={{ padding: "0 40px 64px", maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          {/* Other pillars */}
          <section style={{ padding: "48px 40px 80px", maxWidth: 1280, margin: "0 auto", borderTop: `1px solid ${FT.border}` }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.muted, marginBottom: 24 }}>
              Explore other pillars
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {otherPillars.map((p) => {
                const count = getArticlesByPillar(p.slug).length;
                return (
                  <Link key={p.slug} href={`/blog/pillar/${p.slug}`}>
                    <a
                      style={{ display: "flex", gap: 16, padding: 20, background: FT.card, border: `1px solid ${FT.border}`, borderRadius: 12, textDecoration: "none", color: FT.text, transition: "border-color 200ms", alignItems: "flex-start" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${FT.orange}66`)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = FT.border)}
                    >
                      <div style={{ width: 36, height: 36, background: `${FT.orange}1a`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                        {p.icon}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.name}</p>
                        <p style={{ fontSize: 12, color: FT.dim }}>{count} articles</p>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: "linear-gradient(180deg, #2a1810 0%, #141414 100%)", borderTop: `1px solid ${FT.border}`, padding: "64px 40px", textAlign: "center" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: FT.orange, marginBottom: 12 }}>★ Ready to own a Freshtrax machine?</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, marginBottom: 16, maxWidth: 480, margin: "0 auto 16px" }}>
              Book a 30-min discovery call
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
              Book my call →
            </button>
          </section>
        </main>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 767px) {
          section { padding-left: 16px !important; padding-right: 16px !important; }
          nav[aria-label="Breadcrumb"] { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </>
  );
}
