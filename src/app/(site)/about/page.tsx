import type { Metadata } from "next";
import { Target, Eye, Users, Handshake, Mail, Phone, MapPin, Shield, Heart, TreePine, GraduationCap, Lightbulb } from "lucide-react";
import { getOrganizationIdentity, getWebsiteSettings, publicContact } from "@/lib/content";
import { generateOrganizationSchema } from "@/lib/seo";
import type { LucideIcon } from "lucide-react";

const callToActionBackground = {
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}


export const metadata: Metadata = {
  title: "About Us - African Leaders Hub",
  description: "Learn about African Leaders Hub's mission, vision, team, and partners. Discover how we're building Africa's future through people, purpose, and possibility.",
  keywords: "about ALH, African Leaders Hub team, mission vision, partners Rwanda, youth empowerment organization, sustainable development Africa, non-profit Rwanda",
  authors: [{ name: "African Leaders Hub" }],
  openGraph: {
    title: "About Us - African Leaders Hub",
    description: "Learn about African Leaders Hub's mission, vision, team, and partners. Discover how we're building Africa's future through youth empowerment and sustainable development.",
    type: "website",
    locale: "en_US",
    url: "https://africanleadershub.org/about",
    siteName: "African Leaders Hub",
    images: [
      {
        url: "https://africanleadershub.org/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "African Leaders Hub About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - African Leaders Hub",
    description: "Learn about African Leaders Hub's mission, vision, team, and partners.",
    images: ["https://africanleadershub.org/hero-image.jpg"],
    creator: "@A_LeadersHub",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://africanleadershub.org/about",
  },
};

export default async function About() {
  const [identity, settings] = await Promise.all([
    getOrganizationIdentity(),
    getWebsiteSettings(),
  ]);
  const organizationSchema = generateOrganizationSchema();
  const contact = publicContact(settings);
  const values = Array.isArray(identity?.values)
    ? (identity.values as { title: string; description: string; icon?: string }[])
    : [];
  const valueIcons: Record<string, LucideIcon> = {
    Users,
    Shield,
    Handshake,
    Heart,
    TreePine,
    GraduationCap,
    Lightbulb,
  };
  const backgroundParagraphs = (identity?.background || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on strong principles and clear direction for Africa&apos;s future
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="relative bg-amber-900/10 rounded-2xl p-8 border border-[#8B4513]">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#8B4513] rounded-full mr-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {identity?.mission ||
                  "To empower youth, children, and women as ethical leaders for sustainable African development."}
              </p>
            </div>

            {/* Vision Card */}
            <div className="relative bg-amber-900/10 rounded-2xl p-8 border border-[#8B4513]">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#8B4513] rounded-full mr-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {identity?.vision ||
                  "A resilient Africa led by informed, innovative generations."}
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
              <p className="text-lg text-gray-600">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(values.length
                ? values
                : [
                    { title: "Empowerment", description: "Building confidence and capabilities in every individual", icon: "Users" },
                    { title: "Integrity", description: "Maintaining the highest ethical standards in all actions", icon: "Shield" },
                    { title: "Collaboration", description: "Working together for greater collective impact", icon: "Handshake" },
                    { title: "Compassion", description: "Serving communities with empathy and understanding", icon: "Heart" },
                  ]
              ).map((value) => {
                const Icon = valueIcons[value.icon || ""] || Users;
                return (
                  <div key={value.title} className="text-center p-6 bg-white rounded-xl hover:shadow-lg border border-[#8B4513] transition-shadow duration-300">
                    <div className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Background */}
      <section id="background" className="py-16 md:py-32 bg-amber-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Our Background</h2>
            <div className="max-w-4xl mx-auto text-black">
              {(backgroundParagraphs.length
                ? backgroundParagraphs
                : [
                    "African Leaders Hub (ALH) was founded to address the critical challenges facing Africa's youth, children, and women. Based in Rwanda, we operate across East Africa, focusing on the most pressing issues affecting our communities.",
                  ]
              ).map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-lg text-black leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {/* <section id="partners" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
      </section> */}

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
                href={contact.mailHref}
                className="text-gray-200 hover:text-white transition-colors"
              >
                {contact.email}
              </a>
            </div>

            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <a
                href={contact.telHref}
                className="text-gray-200 hover:text-white transition-colors"
              >
                {contact.phone}
              </a>
            </div>

            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-200">{contact.location}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
