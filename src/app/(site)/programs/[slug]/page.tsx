import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  Mail,
  Clock,
  Target,
  Zap,
  Users,
  TrendingUp,
  CheckCircle2,
  Quote,
  ImageIcon,
  BookOpenText,
} from "lucide-react";
import { getProgramBySlug, getPublishedPrograms, getWebsiteSettings } from "@/lib/content";
import { toProgramView } from "@/lib/content-views";
import { generateProgramSchema } from "@/lib/seo";
import { ProgramsAccordion } from "@/components/programs-accordion";
import { HtmlContent } from "@/components/html-content";
import { ProgramGallery } from "@/components/program-gallery";
import { AhezaGallery } from "@/components/aheza-gallery";
import { PartnerLogos } from "@/components/partner-logos";
import { ahezaTestimonials } from "@/data/aheza-testimonials";
import { cn } from "@/lib/utils";
import {
  formatApplicationCloseDate,
  isProgramAcceptingApplications,
  programApplyAction,
} from "@/lib/programs";

export const dynamic = "force-dynamic";

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program Not Found - African Leaders Hub" };
  return {
    title: program.seoTitle || `${program.title} - African Leaders Hub`,
    description: program.seoDescription || program.description,
    keywords: `${program.title}, ${program.category}, African Leaders Hub, Rwanda programs`,
  };
}

// ---------------------------------------------------------------------------
// Helpers: parse named <h2> sections out of the detailsHtml blob
// ---------------------------------------------------------------------------
function extractSection(html: string, heading: string): string {
  const re = new RegExp(
    `<h2[^>]*>\\s*${heading}\\s*</h2>([\\s\\S]*?)(?=<h2[^>]*>|$)`,
    "i"
  );
  return html.match(re)?.[1]?.trim() ?? "";
}

function extractListItems(html: string): string[] {
  const items: string[] = [];
  const re = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    if (text) items.push(text);
  }
  return items;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const [program, settings] = await Promise.all([getProgramBySlug(slug), getWebsiteSettings()]);
  if (!program) notFound();

  const relatedPrograms = (await getPublishedPrograms())
    .filter((item) => item.category === program.category && item.slug !== program.slug)
    .slice(0, 3);

  const programSchema = generateProgramSchema(program.title, program.description);
  const banner = program.imageAsset?.url || program.bannerAsset?.url || "/background-pattern-1.jpg";
  const accepting = isProgramAcceptingApplications(program);
  const applicationEmail =
    program.applicationEmail || settings?.emailPrimary || "africanleadershub@gmail.com";
  const applyAction = accepting ? programApplyAction(program, applicationEmail) : null;
  const closeDate = formatApplicationCloseDate(program.applicationsCloseAt);
  const brochureUrl = program.brochureAsset ? `/api/programs/${program.slug}/brochure` : null;
  const brochurePreview = program.brochurePreviewAsset?.url;
  const partners = program.partners.filter((partner) => partner.published);
  const hasSidebar = Boolean(program.timelineHtml) || partners.length > 0 || Boolean(applyAction);

  // Parse detailsHtml into named sections (AHEZA-specific structure)
  const details = program.detailsHtml ?? "";
  const isAheza = slug === "aheza";
  const gallery = program.galleryImages
    .map((image) => image.asset)
    .filter((asset) => asset?.url)
    .map((asset) => ({ url: asset.url, alt: asset.alt || asset.title || program.title }));
  const ahezaGalleryImages = isAheza
    ? program.galleryImages
        .map((image) => image.asset)
        .filter((asset) => asset?.url)
        .map((asset) => ({
          src: asset.url,
          alt: asset.alt || "AHEZA participants during a program session.",
          caption: undefined,
        }))
    : [];
  const backgroundHtml = isAheza ? extractSection(details, "Background") : "";
  const goalHtml = isAheza ? extractSection(details, "Goal") : "";
  const objectivesHtml = isAheza ? extractSection(details, "Objectives") : "";
  const activitiesHtml = isAheza ? extractSection(details, "Key Activities") : "";
  const whoHtml = isAheza ? extractSection(details, "Who the Program Serves") : "";
  const outcomesHtml = isAheza ? extractSection(details, "Expected Outcomes") : "";
  const objectives = extractListItems(objectivesHtml);
  const activities = extractListItems(activitiesHtml);
  const outcomes = extractListItems(outcomesHtml);
  const objectiveItems = isAheza
    ? [
        "Improve record-keeping, pricing, costs, stock, savings and profitability.",
        "Help entrepreneurs understand their customers, markets and competitors, and build marketing and customer acquisition skills.",
        "Strengthen business planning, goal-setting, and the development of viable business models and offers.",
        "Prepare participants to present their business clearly, and encourage networking and experience-sharing among them.",
      ]
    : objectives;
  const activityItems = isAheza
    ? [
        "One-to-one mentoring sessions tailored to each participant's business.",
        "Business idea assessment, feasibility studies and market research.",
        "Customer profiling, value proposition development and customer acquisition strategies.",
        "Financial training: accounting fundamentals, income and expense tracking, and business records in Excel and Google Sheets.",
        "Business Model Canvas, offer and sales strategy development, and an introduction to basic legal and regulatory considerations.",
        "Communication and business visibility, prototype refinement, and pitch preparation.",
      ]
    : activities;
  const outcomeItems = isAheza
    ? [
        "Consistent record-keeping and clearer separation of personal and business finances.",
        "Better understanding of income, costs, profits and losses, with improved stock management, pricing and savings habits.",
        "Clearer business goals and structured plans.",
        "Better understanding of customers and market opportunities, with improved customer relationships and marketing practices.",
        "Stronger business models and clearer sales offers.",
        "Greater confidence and improved capacity to plan for growth.",
      ]
    : outcomes;

  // Featured testimonials (first 3 prominent; full stories live on dedicated page)
  const featuredTestimonials = ahezaTestimonials.slice(0, 3);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema) }}
      />

      {/* ── Hero ── */}
      <section className="relative text-white py-16 min-h-[calc(100vh-20rem)] md:min-h-[400px] h-[calc(100vh-10rem)] md:h-[450px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${banner})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end justify-start">
          <div className="flex flex-col justify-end items-start h-full">
            <Button
              asChild
              variant="ghost"
              className="text-white hover:bg-white/10 mb-6 hover:text-white rounded-full"
            >
              <Link href="/programs">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Programs
              </Link>
            </Button>
            <Badge className="bg-[#8B4513] text-white mb-4 rounded-full text-wrap">
              {program.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{program.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl mb-4">{program.description}</p>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Clock className="w-4 h-4" />
              <span>Six-month program</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isAheza ? (
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,2fr)_310px]">
              <div className="space-y-16">
                <section aria-labelledby="about-heading">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B4513] text-white">
                      <BookOpenText className="h-4 w-4" />
                    </div>
                    <h2 id="about-heading" className="text-2xl font-bold text-gray-900">
                      About the Program
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {backgroundHtml && (
                      <HtmlContent
                        className="text-gray-700 prose-p:leading-relaxed"
                        html={backgroundHtml}
                      />
                    )}
                    {goalHtml && (
                      <div className="rounded-2xl border-l-4 border-[#8B4513] bg-[#f6efe8] px-6 py-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-[#8B4513]" />
                          <span className="text-sm font-semibold text-[#8B4513] uppercase tracking-wide">
                            Program Goal
                          </span>
                        </div>
                        <HtmlContent
                          className="text-gray-800 font-medium prose-p:my-0"
                          html={goalHtml}
                        />
                      </div>
                    )}
                    {whoHtml && (
                      <div className="rounded-2xl bg-gray-50 px-6 py-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-5 h-5 text-[#8B4513]" />
                          <span className="text-sm font-semibold text-[#8B4513] uppercase tracking-wide">
                            Who This Program Serves
                          </span>
                        </div>
                        <HtmlContent className="text-gray-700 prose-p:my-0" html={whoHtml} />
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {hasSidebar && (
                <aside className="order-last lg:order-none overflow-hidden rounded-2xl border border-[#8B4513]/20 bg-[#f6efe8] shadow-sm">
                  {program.timelineHtml && (
                    <div className="border-b border-[#8B4513]/10 px-5 py-6">
                      <h2 className="mb-3 text-lg font-bold text-[#8B4513]">Program Timeline</h2>
                      <HtmlContent className="text-gray-700" html={program.timelineHtml} />
                    </div>
                  )}
                  {partners.length > 0 && (
                    <div className="border-b border-[#8B4513]/10 px-5 py-6">
                      <h2 className="mb-4 text-lg font-bold text-[#8B4513]">Partners</h2>
                      <PartnerLogos partners={partners} />
                    </div>
                  )}
                  {applyAction && (
                    <div className="border-t border-[#8B4513]/15 bg-[#8B4513]/10 px-5 py-6">
                      <h2 className="mb-2 text-lg font-bold text-[#8B4513]">Apply</h2>
                      <p className="mb-4 text-sm text-gray-600">
                        {closeDate
                          ? `Applications close ${closeDate}.`
                          : "This program is currently receiving applications."}
                      </p>
                      <ApplyNowButton action={applyAction} className="w-full" />
                    </div>
                  )}
                </aside>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-16">
                {details ? (
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Details</h2>
                    <HtmlContent className="text-gray-700" html={details} />
                  </section>
                ) : null}
              </div>

              {hasSidebar && (
                <aside className="overflow-hidden rounded-r-2xl border border-[#8B4513]/20 border-l-[3px] border-l-[#8B4513] bg-[#f6efe8] shadow-sm">
                  {program.timelineHtml && (
                    <div className="border-b border-[#8B4513]/10 px-5 py-6">
                      <h2 className="mb-3 text-lg font-bold text-[#8B4513]">Program Timeline</h2>
                      <HtmlContent className="text-gray-700" html={program.timelineHtml} />
                    </div>
                  )}
                  {partners.length > 0 && (
                    <div className="border-b border-[#8B4513]/10 px-5 py-6">
                      <h2 className="mb-4 text-lg font-bold text-[#8B4513]">Partners</h2>
                      <PartnerLogos partners={partners} />
                    </div>
                  )}
                  {applyAction && (
                    <div className="border-t border-[#8B4513]/15 bg-[#8B4513]/10 px-5 py-6">
                      <h2 className="mb-2 text-lg font-bold text-[#8B4513]">Apply</h2>
                      <p className="mb-4 text-sm text-gray-600">
                        {closeDate
                          ? `Applications close ${closeDate}.`
                          : "This program is currently receiving applications."}
                      </p>
                      <ApplyNowButton action={applyAction} className="w-full" />
                    </div>
                  )}
                </aside>
              )}
            </div>
          )}

          <div className="mt-16 space-y-16">
            {objectiveItems.length > 0 && (
              <section aria-labelledby="objectives-heading">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <h2 id="objectives-heading" className="text-2xl font-bold text-gray-900">
                    Objectives
                  </h2>
                </div>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                  {objectiveItems.map((obj, i) => (
                    <div
                      key={i}
                      className="flex h-full gap-3 rounded-xl border border-[#8B4513]/15 bg-[#f6efe8] px-4 py-4"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8B4513] text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activityItems.length > 0 && (
              <section aria-labelledby="activities-heading">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h2 id="activities-heading" className="text-2xl font-bold text-gray-900">
                    Key Activities
                  </h2>
                </div>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {activityItems.map((act, i) => (
                    <div key={i} className="flex h-full items-start gap-2 rounded-lg bg-gray-50 px-4 py-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8B4513]" />
                      <span className="text-sm text-gray-700">{act}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {outcomeItems.length > 0 && (
              <section aria-labelledby="outcomes-heading">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8B4513] text-white">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <h2 id="outcomes-heading" className="text-2xl font-bold text-gray-900">
                    Expected Outcomes
                  </h2>
                </div>
                <p className="mb-5 ml-11 text-sm text-gray-600">
                  Intended outcomes for participants who complete the program. Individual results vary.
                </p>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {outcomeItems.map((outcome, i) => (
                    <div
                      key={i}
                      className="flex h-full flex-col rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                    >
                      <div className="mb-3 h-1.5 w-10 rounded-full bg-[#8B4513]" />
                      <p className="flex-1 text-base leading-7 text-gray-700">{outcome}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {gallery.length > 0 && (
              <section aria-labelledby="gallery-heading">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B4513] text-white">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <h2 id="gallery-heading" className="text-2xl font-bold text-gray-900">
                    Program Gallery
                  </h2>
                </div>
                {isAheza ? (
                  <AhezaGallery images={ahezaGalleryImages} title={program.title} />
                ) : (
                  <ProgramGallery images={gallery} title={program.title} className="max-w-none" />
                )}
              </section>
            )}

            {isAheza && ahezaTestimonials.length > 0 && (
              <section aria-labelledby="testimonials-heading" className="rounded-2xl bg-[#f6efe8] px-6 py-8 sm:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B4513] text-white">
                      <Quote className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 id="testimonials-heading" className="text-2xl font-bold text-gray-900">
                        Participant Stories
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        Real experiences shared by AHEZA participants.
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="default" className="rounded-full bg-[#8B4513] text-white hover:bg-[#6B3410]">
                    <Link href="/programs/aheza/testimonials">Read Participant Stories</Link>
                  </Button>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {featuredTestimonials.map((t) => (
                    <figure
                      key={t.name}
                      className="flex flex-col gap-3 rounded-2xl bg-white border border-[#8B4513]/10 px-5 py-5 shadow-sm"
                    >
                      <Quote className="h-5 w-5 shrink-0 text-[#8B4513]/40" aria-hidden />
                      <blockquote className="flex-1 text-sm leading-relaxed text-gray-700">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="border-t border-[#8B4513]/10 pt-3">
                        <span className="block text-sm font-semibold text-gray-900">{t.name}</span>
                        {t.businessLine && (
                          <span className="block text-xs text-gray-500">{t.businessLine}</span>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {brochureUrl && (
              <section aria-labelledby="brochure-heading">
                <h2 id="brochure-heading" className="text-2xl font-bold text-gray-900 mb-6">
                  Program Brochure
                </h2>
                <a
                  href={brochureUrl}
                  download
                  className="group relative block max-w-xl overflow-hidden rounded-xl border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                >
                  {brochurePreview ? (
                    <Image
                      src={brochurePreview}
                      alt={`${program.title} brochure`}
                      width={640}
                      height={400}
                      className="h-auto w-full object-cover transition group-hover:opacity-90"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-stone-100 text-[#8B4513]">
                      <Download className="mr-2 h-5 w-5" />
                      Download brochure
                    </div>
                  )}
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-black/60 py-3 text-sm font-medium text-white">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </span>
                </a>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* ── Apply CTA banner ── */}
      {applyAction && (
        <section className="relative overflow-hidden py-32">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${banner})` }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-linear-to-br from-[#8B4513]/40 to-black/70" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Apply to this program
            </h2>
            <p className="mb-8 text-gray-200">
              {closeDate
                ? `Applications close ${closeDate}.`
                : "This program is currently receiving applications."}
            </p>
            {program.applicationMethod === "EMAIL" && program.applicationGuidelinesHtml && (
              <div className="mb-8 rounded-xl bg-white/95 p-6 text-left">
                <HtmlContent className="text-gray-700" html={program.applicationGuidelinesHtml} />
              </div>
            )}
            <ApplyNowButton action={applyAction} />
          </div>
        </section>
      )}

      {/* ── Related programs ── */}
      {relatedPrograms.length > 0 && (
        <section className="py-16 bg-secondary text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Related Programs</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore other programs in the same category
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPrograms.map((relatedProgram) => (
                <ProgramsAccordion
                  programs={[toProgramView(relatedProgram)]}
                  key={relatedProgram.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ApplyNowButton({
  action,
  className,
}: {
  action: { href: string; label: string; external: boolean };
  className?: string;
}) {
  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "rounded-full bg-[#8B4513] px-8 py-6 text-lg text-white hover:bg-[#6B3410]",
        className
      )}
    >
      {action.external ? (
        <a href={action.href} target="_blank" rel="noreferrer">
          {action.label}
        </a>
      ) : action.href.startsWith("mailto:") ? (
        <a href={action.href}>
          <Mail className="mr-2 h-4 w-4" />
          {action.label}
        </a>
      ) : (
        <Link href={action.href}>{action.label}</Link>
      )}
    </Button>
  );
}
