import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { getLegalPageBySlug, getPublishedLegalPages } from "@/lib/content";
import { sanitizeHtml } from "@/lib/sanitize-html";
import "../../legal-pages.css";

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "privacy-policy" || slug === "terms-of-service") {
    return {};
  }
  const page = await getLegalPageBySlug(slug);
  if (!page) {
    return { title: "Page Not Found - African Leaders Hub" };
  }
  return {
    title: page.seoTitle || `${page.title} - African Leaders Hub`,
    description: page.seoDescription || page.excerpt || page.title,
  };
}

export default async function ExtraLegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  if (slug === "privacy-policy" || slug === "terms-of-service") {
    notFound();
  }
  const page = await getLegalPageBySlug(slug);
  if (!page) notFound();
  const content = sanitizeHtml(page.contentHtml || "<p>This page is coming soon.</p>");

  return (
    <div className="min-h-screen">
      <section className="relative text-white py-16 h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/background-pattern-1.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="text-start max-w-4xl h-full flex flex-col justify-end items-start">
            <div className="flex justify-start items-center mb-4">
              <div className="p-4 bg-[#8B4513] rounded-full mr-4 w-16 h-16 flex items-center justify-center">
                <FileText className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">{page.title}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white pt-2 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none article-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const pages = await getPublishedLegalPages();
  return pages
    .filter((page) => page.slug !== "privacy-policy" && page.slug !== "terms-of-service")
    .map((page) => ({ slug: page.slug }));
}
