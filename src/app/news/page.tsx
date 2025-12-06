"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Newspaper, Leaf, Heart, GraduationCap, BookOpen } from "lucide-react";
import { newsArticles, getFeaturedNews, getNewsByCategory } from "@/data/news";
import { generateOrganizationSchema } from "@/lib/seo";
import Image from "next/image";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";


export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featuredNews = getFeaturedNews().slice(0, 1);
  const organizationSchema = generateOrganizationSchema();

  // Get unique categories from news articles
  const categories = ["All", ...Array.from(new Set(newsArticles.map(article => article.category)))];

  // Filter articles based on selected category
  const filteredArticles = activeCategory === "All"
    ? newsArticles
    : getNewsByCategory(activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "All":
        return <Newspaper className="w-4 h-4" />;
      case "Program Updates":
        return <Newspaper className="w-4 h-4" />;
      case "Environment":
        return <Leaf className="w-4 h-4" />;
      case "Women Empowerment":
        return <Heart className="w-4 h-4" />;
      case "Youth Empowerment":
        return <GraduationCap className="w-4 h-4" />;
      case "Education":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Newspaper className="w-4 h-4" />;
    }
  };

  const callToActionBackground = {
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* Hero Section */}
      <section className="relative text-white py-16 h-[300px]" style={callToActionBackground}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background-pattern-1.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end justify-start">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">News & Updates</h1>
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">All News</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-20">
            {featuredNews.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group">
                <div className="bg-white w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden border border-[#8B4513] flex md:flex-row flex-col">
                  <div className="relative h-64">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-[#8B4513] text-white rounded-full">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime} min read</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8B4513] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link href={`/news/${article.slug}`} className="text-[#8B4513] transition-colors flex items-center">
                      <span className="text-[#8B4513]">Read More</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                const articleCount = category === "All"
                  ? newsArticles.length
                  : getNewsByCategory(category).length;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-full border-2 transition-all duration-300 group
                      ${isActive
                        ? 'bg-[#8B4513] text-white border-[#8B4513] shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#8B4513] hover:text-[#8B4513] hover:shadow-md'
                      }
                    `}
                  >
                    <span className={`
                      transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#8B4513]'}
                    `}>
                      {getCategoryIcon(category)}
                    </span>
                    <span className="font-medium text-sm whitespace-nowrap">
                      {category}
                    </span>
                    <span className={`
                      px-2 py-1 text-xs rounded-full font-medium
                      ${isActive
                        ? 'bg-white bg-opacity-20 text-black'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-[#8B4513] group-hover:bg-opacity-10 group-hover:text-[#8B4513]'
                      }
                    `}>
                      {articleCount}
                    </span>
                    {isActive && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="group">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden border border-[#8B4513]">
                    <div className="relative h-48">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-[#8B4513] text-white rounded-full">
                          {article.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime} min read</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8B4513] transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <Link href={`/news/${article.slug}`} className="text-[#8B4513] transition-colors flex items-center">
                        <span className="text-[#8B4513]">Read More</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500">No articles available in the {activeCategory} category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 text-white" style={callToActionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news and updates about our programs and impact.
          </p>

          <div className="max-w-md mx-auto">
            <NewsletterSubscribe source="news-page" />
            <p className="text-sm text-gray-200 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
