import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCareerBySlug } from "@/lib/content";
import { toCareerView } from "@/lib/content-views";
import { CareerApplyForm } from "@/components/career-apply-form";
import { CareerJobDetails } from "@/components/career-job-details";

interface CareerApplyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CareerApplyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const careerRecord = await getCareerBySlug(slug);
  const career = careerRecord ? toCareerView(careerRecord) : null;

  if (!career) {
    return {
      title: "Career Not Found - African Leaders Hub",
    };
  }

  return {
    title: `Apply for ${career.title} - Careers - African Leaders Hub`,
    description: `Submit your application for ${career.title} at African Leaders Hub.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://africanleadershub.org/careers/${slug}/apply`,
    },
  };
}

export default async function CareerApplyPage({ params }: CareerApplyPageProps) {
  const { slug } = await params;
  const careerRecord = await getCareerBySlug(slug);
  const career = careerRecord ? toCareerView(careerRecord) : null;

  if (!career) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[380px] py-16 text-white md:min-h-[420px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/background-pattern-3.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70" />
        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-end justify-start px-4 sm:px-6 md:min-h-[420px] lg:px-8">
          <div className="flex h-full flex-col items-start justify-end text-start">
            <Button asChild variant="ghost" className="mb-4 rounded-full text-white hover:bg-white/10 hover:text-white">
              <Link href={`/careers/${slug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {career.title}
              </Link>
            </Button>
            <Badge className="mb-3 rounded-full bg-[#8B4513] text-white">{career.department}</Badge>
            <h1 className="mb-2 text-4xl font-bold md:text-5xl">Apply for {career.title}</h1>
            <p className="max-w-3xl text-lg text-gray-200">{career.description}</p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-12">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:px-8">
          <CareerApplyForm careerId={career.id} heading="Your application" />
          <CareerJobDetails
            department={career.department}
            location={career.location}
            type={career.type}
            postedDate={career.postedDate}
            applicationDeadline={career.applicationDeadline}
          />
        </div>
      </section>
    </div>
  );
}
