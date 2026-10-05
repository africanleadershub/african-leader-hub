import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getCareerBySlug } from "@/lib/content";
import { toCareerView } from "@/lib/content-views";
import { generateOrganizationSchema } from "@/lib/seo";
import { HtmlContent } from "@/components/html-content";
import { CareerJobDetails } from "@/components/career-job-details";

const callToActionBackground = {
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

interface CareerPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const careerRecord = await getCareerBySlug(slug);
  const career = careerRecord ? toCareerView(careerRecord) : null;

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
  const careerRecord = await getCareerBySlug(slug);
  const career = careerRecord ? toCareerView(careerRecord) : null;
  const organizationSchema = generateOrganizationSchema();

  if (!career) {
    notFound();
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
      <section className="relative text-white py-16 h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background-pattern-3.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-linear-to-br from-[#8B4513]/30 to-black/70"></div>
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
              <HtmlContent className="mb-8" html={career.detailsHtml} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CareerJobDetails
                department={career.department}
                location={career.location}
                type={career.type}
                postedDate={career.postedDate}
                applicationDeadline={career.applicationDeadline}
                applyHref={`/careers/${slug}/apply`}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#8B4513] text-white" style={callToActionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Apply?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Continue to the application form to upload your resume, cover letter, and any supporting documents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#8B4513] hover:bg-gray-100 rounded-full">
              <Link href={`/careers/${slug}/apply`}>Apply for this role</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white bg-transparent text-white hover:bg-white/10">
              <Link href="/careers">View all positions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

