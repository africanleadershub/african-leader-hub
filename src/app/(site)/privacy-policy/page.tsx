import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { privacyPolicyContent } from "@/data/privacy-policy";
import "../legal-pages.css";

export const metadata: Metadata = {
  title: "Privacy Policy - African Leaders Hub",
  description: "Learn about how African Leaders Hub collects, uses, and protects your personal information. Comprehensive privacy policy covering data collection, usage, and user rights.",
  keywords: "privacy policy, data protection, African Leaders Hub, privacy rights, GDPR compliance, data security, personal information",
  authors: [{ name: "African Leaders Hub" }],
  openGraph: {
    title: "Privacy Policy - African Leaders Hub",
    description: "Learn about how African Leaders Hub collects, uses, and protects your personal information.",
    type: "website",
    locale: "en_US",
    url: "https://africanleadershub.org/privacy-policy",
    siteName: "African Leaders Hub",
    images: [
      {
        url: "https://africanleadershub.org/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "African Leaders Hub Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - African Leaders Hub",
    description: "Learn about how African Leaders Hub collects, uses, and protects your personal information.",
    images: ["https://africanleadershub.org/hero-image.jpg"],
    creator: "@A_LeadersHub",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://africanleadershub.org/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const JSONLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - African Leaders Hub",
    "description": "Learn about how African Leaders Hub collects, uses, and protects your personal information.",
    "url": "https://africanleadershub.org/privacy-policy",
    "author": {
      "@type": "Organization",
      "name": "African Leaders Hub",
      "url": "https://africanleadershub.org",
    },
    "publisher": {
      "@type": "Organization",
      "name": "African Leaders Hub",
      "url": "https://africanleadershub.org",
    },
    "datePublished": "2025-01-26",
    "dateModified": "2025-01-26",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "url": "https://africanleadershub.org/privacy-policy",
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://africanleadershub.org",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacy Policy",
          "item": "https://africanleadershub.org/privacy-policy",
        },
      ],
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://africanleadershub.org/hero-image.jpg",
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JSONLD),
        }}
      />
      {/* Hero Section */}
      <section className="relative text-white py-16 h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background-pattern-1.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="text-start max-w-4xl h-full flex flex-col justify-end items-start">
            <div className="flex justify-start items-center mb-4">
              <div className="p-4 bg-[#8B4513] rounded-full mr-4 w-16 h-16 flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Privacy Policy</h1>
            </div>
            {/* <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Your privacy is important to us. Learn how we protect and handle your personal information.
            </p> */}
            <p className="text-lg text-gray-300">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="bg-white pt-2 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none article-content"
            dangerouslySetInnerHTML={{ __html: privacyPolicyContent }}
          />
        </div>
      </section>
    </div>
  );
}
