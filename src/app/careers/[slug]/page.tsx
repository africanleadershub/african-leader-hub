import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, ArrowLeft, Calendar } from "lucide-react";
import { getCareerBySlug } from "@/data/careers";
import { generateOrganizationSchema } from "@/lib/seo";

const callToActionBackground = {
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

interface CareerPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareerBySlug(slug);

  if (!career) {
    return {
      title: "Career Not Found - African Leaders Hub",
    };
  }

  return {
    title: `${career.title} - Careers - African Leaders Hub`,
    description: career.description,
    keywords: `ALH careers, ${career.title}, jobs Rwanda, ${career.department}`,
    authors: [{ name: "African Leaders Hub" }],
    openGraph: {
      title: `${career.title} - African Leaders Hub`,
      description: career.description,
      type: "website",
      locale: "en_US",
      url: `https://africanleadershub.org/careers/${slug}`,
      siteName: "African Leaders Hub",
    },
    twitter: {
      card: "summary_large_image",
      title: `${career.title} - African Leaders Hub`,
      description: career.description,
      creator: "@A_LeadersHub",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://africanleadershub.org/careers/${slug}`,
    },
  };
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const career = getCareerBySlug(slug);
  const organizationSchema = generateOrganizationSchema();

  if (!career) {
    notFound();
  }

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
            <Link
              href="/careers"
              className="inline-flex items-center text-white hover:text-gray-200 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{career.title}</h1>

          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Career Details (HTML Content) */}
              <div
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: career.detailsHtml }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-2 border-[#8B4513] bg-amber-900/10 sticky top-28">
                <CardHeader>
                  <CardTitle className="text-xl">Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Department</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{career.department}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{career.location}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Type</span>
                    </div>
                    <Badge className={`${getTypeColor(career.type)} text-white`}>
                      {career.type.replace('-', ' ')}
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Posted</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {new Date(career.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  {career.applicationDeadline && (
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Application Deadline</span>
                      </div>
                      <p className="text-gray-900 font-semibold">
                        {new Date(career.applicationDeadline).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#8B4513] text-white" style={callToActionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Apply?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Send us your resume, cover letter and any other relevant documents through the designated email address. We look forward to hearing from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#8B4513] hover:bg-gray-100 rounded-full">
              <Link href="/contact">View All Positions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

