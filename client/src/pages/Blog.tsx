import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, createWebPageSchema } from "@/components/SchemaMarkup";
import { blogArticles, getAllBlogCategories, getAllBlogTags } from "@/data/blogArticles";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = getAllBlogCategories();
  const tags = getAllBlogTags();

  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      const matchesTag = !selectedTag || article.tags.includes(selectedTag);
      const matchesSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  return (
    <>
      <SEOHead
        title="Blog | Freshtrax - Footwear Sanitization & Fitness Insights"
        description="Read articles about shoe sanitization, athlete's foot prevention, gym hygiene, and fitness business insights. Expert tips from the Freshtrax team."
        canonicalUrl="https://getfreshtrax.com/blog"
        ogTitle="Blog | Freshtrax"
        ogDescription="Expert articles on footwear sanitization, foot health, and fitness business growth."
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={createWebPageSchema({
        title: "Blog | Freshtrax - Footwear Sanitization & Fitness Insights",
        description: "Read articles about shoe sanitization, athlete's foot prevention, and fitness business insights.",
        url: "https://getfreshtrax.com/blog",
      })} />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
        <ParticleField />
        <Navbar />
        <main className="flex-1" role="main">
          {/* Hero Section */}
          <section className="relative min-h-[40vh] flex items-center pt-20 pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-[#0a0a0a]/50 to-[#0a0a0a]" />
            </div>
            <div className="relative z-10 container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Freshtrax Blog
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Expert insights on footwear sanitization, foot health, and fitness business growth.
                </p>
              </div>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="py-12 border-b border-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Search Bar */}
                <div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setSelectedCategory(null)}
                      variant={selectedCategory === null ? "default" : "outline"}
                      className={selectedCategory === null ? "bg-orange-500 hover:bg-orange-600" : ""}
                    >
                      All
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tag Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setSelectedTag(null)}
                      variant={selectedTag === null ? "default" : "outline"}
                      className={selectedTag === null ? "bg-orange-500 hover:bg-orange-600" : ""}
                      size="sm"
                    >
                      All Tags
                    </Button>
                    {tags.map((tag) => (
                      <Button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className={selectedTag === tag ? "bg-orange-500 hover:bg-orange-600" : ""}
                        size="sm"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Articles Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {filteredArticles.map((article) => (
                    <Link key={article.id} href={`/blog/${article.slug}`}>
                      <a className="group h-full">
                        <article className="h-full flex flex-col bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition">
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden bg-gray-800">
                            <img
                              src={article.imageUrl}
                              alt={article.imageAlt}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-6 flex flex-col">
                            {/* Category Badge */}
                            <div className="mb-3">
                              <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">
                                {article.category}
                              </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-lg font-bold mb-3 group-hover:text-orange-400 transition line-clamp-2">
                              {article.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                              {article.excerpt}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800">
                              <span>{article.author}</span>
                              <span>{article.readingTime} min read</span>
                            </div>

                            {/* Date */}
                            <div className="mt-3 text-xs text-gray-600">
                              {new Date(article.publishedDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </article>
                      </a>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">
                    No articles found. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </section>

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
