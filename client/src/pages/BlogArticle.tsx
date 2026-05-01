import { useParams, Link } from "wouter";
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createArticleSchema } from "@/components/SchemaMarkup";
import { getBlogArticleBySlug, getRelatedArticles } from "@/data/blogArticles";
import { Button } from "@/components/ui/button";

export default function BlogArticle() {
  const params = useParams();
  const slug = params.slug as string;

  const article = useMemo(() => getBlogArticleBySlug(slug), [slug]);
  const relatedArticles = useMemo(
    () => (article ? getRelatedArticles(article.id, 3) : []),
    [article]
  );

  if (!article) {
    return (
      <>
        <SEOHead
          title="Article Not Found | Freshtrax"
          description="The article you're looking for could not be found."
          canonicalUrl="https://getfreshtrax.com/blog"
        />
        <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
          <ParticleField />
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
              <p className="text-gray-400 mb-8">
                The article you're looking for could not be found.
              </p>
              <Link href="/blog">
                <a>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Back to Blog
                  </Button>
                </a>
              </Link>
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
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
        <ParticleField />
        <Navbar />
        <main className="flex-1" role="main">
          {/* Article Header */}
          <section className="relative py-12 border-b border-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                  <Link href="/blog">
                    <a className="hover:text-orange-400 transition">Blog</a>
                  </Link>
                  <span>/</span>
                  <span className="text-gray-500">{article.category}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {article.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8">
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-white">{article.author}</span>
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(article.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{article.readingTime} min read</span>
                </div>

                {/* Category Badge */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  className="w-full h-96 object-cover rounded-lg mb-12"
                />
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-6">
                  {article.content.split("\n\n").map((paragraph, index) => {
                    // Handle headings - convert # to h2 to avoid duplicate H1
                    if (paragraph.startsWith("# ")) {
                      return (
                        <h2 key={index} className="text-3xl font-bold text-white mt-8 mb-4">
                          {paragraph.replace("# ", "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-white mt-6 mb-3">
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-xl font-bold text-white mt-4 mb-2">
                          {paragraph.replace("### ", "")}
                        </h3>
                      );
                    }
                    // Handle lists
                    if (paragraph.startsWith("- ")) {
                      const items = paragraph.split("\n").filter((line) => line.startsWith("- "));
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                          {items.map((item, i) => (
                            <li key={i} className="text-gray-300">
                              {item.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    // Regular paragraphs
                    return (
                      <p key={index} className="text-gray-300 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Tags */}
          <section className="py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-sm font-semibold text-gray-400 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                      <a className="inline-block px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-300 hover:border-orange-500 hover:text-orange-400 transition">
                        {tag}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="py-16 border-t border-gray-800">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 max-w-3xl mx-auto">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {relatedArticles.map((relArticle) => (
                    <Link key={relArticle.id} href={`/blog/${relArticle.slug}`}>
                      <a className="group">
                        <article className="flex flex-col bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition">
                          {/* Image */}
                          <div className="relative h-40 overflow-hidden bg-gray-800">
                            <img
                              src={relArticle.imageUrl}
                              alt={relArticle.imageAlt}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-4 flex flex-col flex-1">
                            <span className="inline-block px-2 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded mb-2 w-fit">
                              {relArticle.category}
                            </span>
                            <h3 className="font-bold mb-2 group-hover:text-orange-400 transition line-clamp-2">
                              {relArticle.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-auto">
                              {relArticle.readingTime} min read
                            </p>
                          </div>
                        </article>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-16 border-t border-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-400 mb-8">
                  Join the network of owners generating up to $36,830/year per machine.
                </p>
                <Link href="/owners">
                  <a>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold">
                      Become an Owner
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
