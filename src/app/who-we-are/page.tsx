import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { partners } from "@/data/partners";
import { generateOrganizationSchema } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { TeamSection } from "@/components/team-section";
import Link from "next/link";

const callToActionBackground = {
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export const metadata: Metadata = {
  title: "Who We Are - African Leaders Hub",
  description: "Meet the team and partners of African Leaders Hub. Discover the dedicated professionals and organizations working together to empower Africa's future leaders.",
  keywords: "ALH team, African Leaders Hub team, ALH partners, Rwanda NGO team, African development partners",
  authors: [{ name: "African Leaders Hub" }],
  openGraph: {
    title: "Who We Are - African Leaders Hub",
    description: "Meet the team and partners of African Leaders Hub.",
    type: "website",
    locale: "en_US",
    url: "https://africanleadershub.org/who-we-are",
    siteName: "African Leaders Hub",
    images: [
      {
        url: "https://africanleadershub.org/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "African Leaders Hub Who We Are",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Who We Are - African Leaders Hub",
    description: "Meet the team and partners of African Leaders Hub.",
    images: ["https://africanleadershub.org/hero-image.jpg"],
    creator: "@A_LeadersHub",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://africanleadershub.org/who-we-are",
  },
};

export default function WhoWeAre() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* Hero Section */}
      <section className="relative text-white py-16 h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background-pattern-3.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end justify-start">
          <div className="text-start">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Who We Are</h1>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Partners Section */}
      {partners.length > 0 && <section id="partners" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborating for impact across Rwanda and East Africa
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 xl:grid-cols-8 gap-8">
            {partners.map((partner) => (
              <div key={partner.id} className="group">
                {partner.logoType === "image" && (
                  <Image
                    src={partner.logo as string}
                    alt={`${partner.name} logo`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                {partner.logoType === "custom" && (
                  <div className="">
                    {partner.logo}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-6">
              Interested in partnering with us?
            </p>
            <Button className="w-fit bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full" size="lg" asChild>
              <Link href="/contact" className="flex items-center">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>}

      {/* Contact Section */}
      <section className="py-16 bg-[#8B4513] text-white" style={callToActionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Ready to join us in building Africa&apos;s future? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <a
                href="mailto:africanleadershub@gmail.com"
                className="text-gray-200 hover:text-white transition-colors"
              >
                africanleadershub@gmail.com
              </a>
            </div>

            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <a
                href="tel:+250788358891"
                className="text-gray-200 hover:text-white transition-colors"
              >
                +250 788 358 891
              </a>
            </div>

            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-200">Kigali, Rwanda</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

