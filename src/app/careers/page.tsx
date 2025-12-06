import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, ArrowRight, Calendar } from "lucide-react";
import { careers, getFeaturedCareers } from "@/data/careers";
import { generateOrganizationSchema } from "@/lib/seo";

const callToActionBackground = {
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export const metadata: Metadata = {
  title: "Careers - African Leaders Hub",
  description: "Join our team and help empower Africa's future leaders. Explore career opportunities at African Leaders Hub in Kigali, Rwanda.",
  keywords: "ALH careers, jobs Rwanda, NGO jobs, African Leaders Hub careers, non-profit jobs Rwanda",
  authors: [{ name: "African Leaders Hub" }],
  openGraph: {
    title: "Careers - African Leaders Hub",
    description: "Join our team and help empower Africa's future leaders.",
    type: "website",
    locale: "en_US",
    url: "https://africanleadershub.org/careers",
    siteName: "African Leaders Hub",
    images: [
      {
        url: "https://africanleadershub.org/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "African Leaders Hub Careers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers - African Leaders Hub",
    description: "Join our team and help empower Africa's future leaders.",
    images: ["https://africanleadershub.org/hero-image.jpg"],
    creator: "@A_LeadersHub",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://africanleadershub.org/careers",
  },
};

export default function Careers() {
  const organizationSchema = generateOrganizationSchema();
  const featuredCareers = getFeaturedCareers();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-600';
      case 'part-time':
        return 'bg-blue-600';
      case 'contract':
        return 'bg-purple-600';
      case 'internship':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Careers</h1>
            {/* <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
              Join us in building Africa&apos;s future through people, purpose, and possibility
            </p> */}
          </div>
        </div>
      </section>

      {/* Featured Careers */}
      {featuredCareers.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Opportunities
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our current openings and find your place in our mission
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {featuredCareers.map((career) => (
                <Link key={career.id} href={`/careers/${career.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-[#8B4513] hover:border-[#6B3410]">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <Badge className={`${getTypeColor(career.type)} text-white`}>
                          {career.type.replace('-', ' ')}
                        </Badge>
                        <Badge variant="secondary" className="bg-[#8B4513] text-white">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl mb-2">{career.title}</CardTitle>
                      <CardDescription className="text-base">
                        {career.department} • {career.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {career.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Posted: {new Date(career.postedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <Button className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Careers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Open Positions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {careers.length} position{careers.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {careers.length > 0 ? (
            <div className="flex flex-col gap-4">
              {careers.map((career) => (
                <Link key={career.id} href={`/careers/${career.slug}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 border border-[#8B4513] hover:border-[#6B3410]">
                    <CardContent className="px-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{career.title}</h3>
                            {career.featured && (
                              <Badge variant="secondary" className="bg-[#8B4513] text-white">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-2" />
                              {career.department}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {career.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {career.type.replace('-', ' ')}
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2">
                            {career.description}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Button className="bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full">
                            View Details
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">
                We don&apos;t have any open positions at the moment.
              </p>
              <p className="text-gray-500">
                Check back soon or send us your resume for future opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#8B4513] text-white" style={callToActionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don&apos;t See a Role That Fits?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            We&apos;re always looking for passionate individuals to join our mission. Send us your resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <Button asChild size="lg" className="bg-white text-[#8B4513] hover:bg-gray-100 rounded-full">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

