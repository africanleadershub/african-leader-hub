import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProgramBySlug } from "@/lib/content";
import { formatApplicationCloseDate, isProgramAcceptingApplications } from "@/lib/programs";
import { ProgramApplyForm } from "@/components/program-apply-form";
import { ProgramGallery } from "@/components/program-gallery";
import { PartnerLogos } from "@/components/partner-logos";
import { HtmlContent } from "@/components/html-content";

export const dynamic = "force-dynamic";

interface ApplyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ApplyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) {
    return { title: "Program Not Found - African Leaders Hub" };
  }
  return {
    title: `Apply: ${program.title} - African Leaders Hub`,
    description: `Apply to ${program.title} at African Leaders Hub.`,
    robots: { index: false, follow: true },
  };
}

export default async function ProgramApplyPage({ params }: ApplyPageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const accepting =
    isProgramAcceptingApplications(program) && program.applicationMethod === "BUILT_IN_FORM";
  const banner = program.imageAsset?.url || program.bannerAsset?.url || "/background-pattern-1.jpg";
  const gallery = program.galleryImages
    .map((image) => image.asset)
    .filter((asset) => asset?.url)
    .map((asset) => ({
      url: asset.url,
      alt: asset.alt || asset.title || program.title,
    }));
  const photos = gallery.length > 0 ? gallery : [{ url: banner, alt: program.title }];
  const closeDate = formatApplicationCloseDate(program.applicationsCloseAt);
  const openDate = formatApplicationCloseDate(program.applicationsOpenAt);
  const partners = program.partners.filter((partner) => partner.published);
  const hasFacts = Boolean(openDate || closeDate || program.timelineHtml || partners.length > 0);

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[380px] py-16 text-white md:min-h-[420px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${banner})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70" />
        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-end justify-start px-4 sm:px-6 md:min-h-[420px] lg:px-8">
          <div className="flex h-full flex-col items-start justify-end text-start">
            <Button asChild variant="ghost" className="mb-4 rounded-full text-white hover:bg-white/10 hover:text-white">
              <Link href={`/programs/${program.slug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {program.title}
              </Link>
            </Button>
            <Badge className="mb-3 rounded-full bg-[#8B4513] text-white">{program.category}</Badge>
            <h1 className="mb-2 text-4xl font-bold md:text-5xl">Apply to {program.title}</h1>
            <p className="max-w-3xl text-lg text-gray-200">{program.description}</p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-12">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            <ProgramGallery images={photos} title={program.title} className="h-[280px] sm:h-[420px]" />
            {hasFacts ? <div className="space-y-6 rounded-2xl border bg-white p-6">
              {openDate || closeDate ? (
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-[#8B4513]" />
                  <div>
                    <p className="text-sm font-semibold text-[#8B4513]">Application window</p>
                    <p className="text-sm text-gray-700">
                      {openDate ? `Opens ${openDate}` : "Open now"}
                      {closeDate ? ` · Closes ${closeDate}` : ""}
                    </p>
                  </div>
                </div>
              ) : null}
              {program.timelineHtml ? (
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-[#8B4513]">Program timeline</h2>
                  <HtmlContent className="text-sm text-gray-700" html={program.timelineHtml} />
                </div>
              ) : null}
              {partners.length > 0 ? (
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-[#8B4513]">Partners</h2>
                  <PartnerLogos partners={partners} />
                </div>
              ) : null}
            </div> : null}
          </div>

          <div className="lg:sticky lg:top-28">
            {accepting ? (
              <ProgramApplyForm programId={program.id} heading="Your application" />
            ) : (
              <div className="rounded-xl border bg-white p-6 text-gray-700">
                <p>Applications for this program are not open right now.</p>
                <Button asChild className="mt-4 rounded-full bg-[#8B4513] text-white hover:bg-[#6B3410]">
                  <Link href={`/programs/${program.slug}`}>View program details</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
