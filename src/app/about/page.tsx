import type { Metadata } from "next";
import { Target, Eye, Users, Handshake, Mail, Phone, MapPin, Shield, Heart, TreePine, GraduationCap, Lightbulb } from "lucide-react";
import { generateOrganizationSchema } from "@/lib/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function About() {
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
                To empower youth, children, and women as ethical leaders for sustainable African development.
                We address systemic challenges like poverty, gender inequality, climate change, unemployment,
                and rights violations through holistic development programs that combine education, rights awareness,
                entrepreneurship, and environmental action.
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
                A resilient Africa led by informed, innovative generations. We envision a continent where
                every young person has access to quality education, understands their rights, and has the
                skills and opportunities to become ethical leaders who drive sustainable development in
                their communities.
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
              <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg border border-[#8B4513] transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Empowerment</h4>
                <p className="text-gray-600 text-sm">Building confidence and capabilities in every individual</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg border border-[#8B4513] transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Integrity</h4>
                <p className="text-gray-600 text-sm">Maintaining the highest ethical standards in all actions</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg border border-[#8B4513] transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Collaboration</h4>
                <p className="text-gray-600 text-sm">Working together for greater collective impact</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg border border-[#8B4513] transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Compassion</h4>
                <p className="text-gray-600 text-sm">Serving communities with empathy and understanding</p>
              </div>
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
              <p className="text-lg text-black leading-relaxed mb-6">
                African Leaders Hub (ALH) was founded to address the critical challenges facing Africa&apos;s youth,
                children, and women. Based in Rwanda, we operate across East Africa, focusing on the most
                pressing issues affecting our communities.
              </p>
              <p className="text-lg text-black leading-relaxed mb-6">
                Our work addresses challenges like teenage pregnancies (22,000+ cases annually in Rwanda),
                gender-based violence (37% of women affected), deforestation (37,000 hectares lost),
                unemployment among graduates, and widespread rights violations.
              </p>
              <p className="text-lg text-black leading-relaxed">
                Through community-led programs, strategic partnerships, and data-driven approaches, we create
                sustainable solutions that empower individuals and transform communities. Our programs are
                designed to be scalable, replicable, and aligned with national development strategies.
              </p>
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
