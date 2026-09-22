import type { Metadata } from "next";
import Image from "next/image";
import { Users, TreePine, GraduationCap, Heart, Shield, Lightbulb } from "lucide-react";
import { generateOrganizationSchema } from "@/lib/seo";
import { Button } from "@/components/ui/button";

const callToActionBackground = {
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export const metadata: Metadata = {
  title: "Our Focus - African Leaders Hub",
  description: "Discover our six focus areas: Leadership & Youth Empowerment, Women's Empowerment & Equity, Education for Transformation, Civic Responsibility & Justice, Environment & Climate Stewardship, and Innovation & Enterprise for Impact.",
  keywords: "ALH focus areas, African Leaders Hub programs, youth empowerment, women empowerment, education, civic responsibility, climate action, innovation Africa",
  authors: [{ name: "African Leaders Hub" }],
  openGraph: {
    title: "Our Focus - African Leaders Hub",
    description: "Discover our six focus areas driving Africa's transformation.",
    type: "website",
    locale: "en_US",
    url: "https://africanleadershub.org/our-focus",
    siteName: "African Leaders Hub",
    images: [
      {
        url: "https://africanleadershub.org/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "African Leaders Hub Our Focus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Focus - African Leaders Hub",
    description: "Discover our six focus areas driving Africa's transformation.",
    images: ["https://africanleadershub.org/hero-image.jpg"],
    creator: "@A_LeadersHub",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://africanleadershub.org/our-focus",
  },
};

const focusAreas = [
  {
    id: "leadership-youth",
    title: "Leadership & Youth Empowerment",
    description: "Developing principled, purpose-driven leaders who drive change with courage and empathy, equipping youth and children with the mindset, skills, and values to shape the future.",
    icon: Users,
    image: "/background-pattern-1.jpg",
  },
  {
    id: "women-empowerment",
    title: "Women's Empowerment & Equity",
    description: "Restoring dignity, advancing equality, and expanding opportunities for women and girls through mentorship, leadership, and economic empowerment.",
    icon: Heart,
    image: "/background-pattern-2.jpg",
  },
  {
    id: "education",
    title: "Education for Transformation",
    description: "Championing inclusive, values-based education that builds character, curiosity, and competence, from early childhood through professional development.",
    icon: GraduationCap,
    image: "/background-pattern-3.jpg",
  },
  {
    id: "civic-responsibility",
    title: "Civic Responsibility & Justice",
    description: "Promoting ethical citizenship, accountability, and human rights through civic education and community leadership that upholds justice and social harmony.",
    icon: Shield,
    image: "/background-pattern-1.jpg",
  },
  {
    id: "environment",
    title: "Environment & Climate Stewardship",
    description: "Empowering communities to lead in conservation, sustainability, and climate resilience; protecting creation while building adaptive local economies.",
    icon: TreePine,
    image: "/background-pattern-2.jpg",
  },
  {
    id: "innovation",
    title: "Innovation & Enterprise for Impact",
    description: "Fueling Africa's transformation through creative problem-solving, entrepreneurship, and technology, turning ideas into ethical, scalable solutions that uplift communities.",
    icon: Lightbulb,
    image: "/background-pattern-3.jpg",
  },
];

export default function OurFocus() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Focus</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
              We focus on the human, social, and environmental pillars that sustain Africa&apos;s transformation
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Focus Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Shaping people, systems, and ideas that build a just, innovative, and sustainable future
            </p>
          </div>

          <div className="space-y-24">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={area.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                >
                  {/* Image Section */}
                  <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={area.image}
                        alt={area.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/20 to-black/40"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-8">
                          <Icon className="w-24 h-24 text-[#8B4513]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-[#8B4513] rounded-full">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {area.title}
                      </div>
                    </div>
                    <div className="text-lg text-gray-700 leading-relaxed">
                      {area.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#8B4513] text-white" style={callToActionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join us in empowering Africa&apos;s future leaders through our comprehensive programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#8B4513] hover:bg-gray-100 rounded-full">
              <a href="/get-involved">Get Involved</a>
            </Button>
            <Button asChild size="lg" className="bg-white text-[#8B4513] hover:bg-gray-100 rounded-full">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

