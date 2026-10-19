import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProgramBySlug } from "@/lib/content";
import { ahezaTestimonials } from "@/data/aheza-testimonials";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const program = await getProgramBySlug("aheza");

  return {
    title: `What Participants Say | ${program?.title ?? "AHEZA"} - African Leaders Hub`,
    description:
      "Read the real experiences and outcomes shared by participants in the AHEZA program.",
  };
}

export default async function AhezaTestimonialsPage() {
  const program = await getProgramBySlug("aheza");

  if (!program) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-stone-200 bg-[#f8f5f1]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6 rounded-full text-[#8B4513] hover:bg-white/80">
            <Link href="/programs/aheza">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AHEZA Program
            </Link>
          </Button>

          <div className="mb-6">
            <Badge className="rounded-full bg-[#8B4513] text-white">{program.category}</Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            What Participants Say
          </h1>
          <p className="mt-4 max-w-3xl text-base text-gray-600 sm:text-lg">
            Real stories from AHEZA participants describing how the program helped them build better businesses,
            strengthen their confidence, and improve their day-to-day decision-making.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ahezaTestimonials.map((testimonial) => (
            <figure
              key={`${testimonial.name}-${testimonial.quote.slice(0, 18)}`}
              className="flex h-full flex-col justify-between rounded-2xl border border-[#8B4513]/15 bg-[#f6efe8] p-6 shadow-sm"
            >
              <div>
                <Quote className="mb-4 h-8 w-8 text-[#8B4513]/50" aria-hidden="true" />
                <blockquote className="text-base leading-relaxed text-gray-700">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-6 border-t border-[#8B4513]/10 pt-4">
                <span className="block text-sm font-semibold text-gray-900">{testimonial.name}</span>
                {testimonial.businessLine ? (
                  <span className="mt-1 block text-xs text-gray-500">{testimonial.businessLine}</span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" className="rounded-full bg-[#8B4513] text-white hover:bg-[#6b3410]">
            <Link href="/programs/aheza">Back to AHEZA Program</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
