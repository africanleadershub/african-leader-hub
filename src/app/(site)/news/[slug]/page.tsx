import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, ArrowRight, Clock, Tag } from "lucide-react";
import { newsArticles, getNewsBySlug } from "@/data/news";
import { generateNewsArticleSchema } from "@/lib/seo";
import { ShareButton } from "@/components/share-button";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";
import Image from "next/image";

interface NewsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found - African Leaders Hub",
    };
  }

  return {
    title: `${article.title} - African Leaders Hub`,
    description: article.excerpt,
    keywords: `${article.title}, ${article.category}, African Leaders Hub, Rwanda news`,
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = generateNewsArticleSchema(
    article.title,
    article.excerpt,
    article.author,
    article.date
  );

  const bannerBackground = {
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
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
          __html: JSON.stringify(articleSchema),
        }}
      />
      {/* Hero Section */}
      <section className="relative text-white py-20 min-h-[calc(100vh-20rem)] md:min-h-[400px] h-[calc(100vh-10rem)] md:h-[600px]" style={bannerBackground}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background-pattern-1.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70"></div>
        <div className="relative flex flex-col justify-end items-start h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-start flex flex-col justify-end items-start h-full">
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-6 hover:text-white rounded-full">
              <Link href="/news">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to News & Updates
              </Link>
            </Button>
          </div>
          <div className="text-start flex flex-col justify-center items-start h-full">
            <Badge className="bg-[#8B4513] text-white mb-6 text-sm px-4 rounded-full">
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{article.title}</h1>
            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-start gap-3 md:gap-6 text-white text-sm md:text-base">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-medium">
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              {article.readTime && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium">{article.readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="wfull">
            <div className="w-full md:w-3/4 mx-auto">
              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4">
                {article.tags && article.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-600" />
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center ml-auto">
                  <ShareButton
                    title={article.title}
                    url={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://africanleadershub.org'}/news/${article.slug}`}
                    description={article.excerpt}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">More Articles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more stories and updates from African Leaders Hub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.filter(a => a.slug !== article.slug).slice(0, 3).map((relatedArticle) => (
              <Link key={relatedArticle.slug} href={`/news/${relatedArticle.slug}`} className="h-full hover:shadow-lg transition-shadow overflow-hidden bg-white rounded-xl shadow group border border-[#8B4513]">
                <div className="relative h-48">
                  <Image
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-[#8B4513] text-white rounded-full group-hover:bg-[#6B3410] transition-colors">
                      {relatedArticle.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <div className="flex items-center text-xs text-white bg-black/50 rounded px-2 py-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(relatedArticle.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg">{relatedArticle.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {relatedArticle.author}
                  </div>
                </div>
                <div className="pb-4 px-4">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {relatedArticle.excerpt}
                  </p>
                    <Link href={`/news/${relatedArticle.slug}`} className="text-[#8B4513] transition-colors flex items-center">
                      <span className="text-[#8B4513]">Read More</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full">
              <Link href="/news">
                View All Articles
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-[#8B4513] text-white" style={callToActionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news and updates about our programs and impact.
          </p>

          <div className="max-w-md mx-auto">
            <NewsletterSubscribe source="news-article" />
          </div>
        </div>
      </section>
    </div>
  );
}
