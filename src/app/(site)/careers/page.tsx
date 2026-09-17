import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  Calendar,
  Heart,
  GraduationCap,
  Users,
  Sparkles,
  Globe,
  Handshake,
  FileText,
  MessagesSquare,
  BadgeCheck,
} from "lucide-react";
import { getOrganizationIdentity, getPublishedCareers } from "@/lib/content";
import { toCareerView } from "@/lib/content-views";
import { generateOrganizationSchema } from "@/lib/seo";
import { CareerApplyForm } from "@/components/career-apply-form";

const callToActionBackground = {
  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export const metadata: Metadata = {
  title: "Careers - African Leaders Hub",
  description:
    "Join African Leaders Hub in Kigali. Explore open roles, our culture, benefits, and how we hire people who want to build Africa's future.",
  keywords: "ALH careers, jobs Rwanda, NGO jobs, African Leaders Hub careers, non-profit jobs Rwanda",
  openGraph: {
    title: "Careers - African Leaders Hub",
    description: "Join our team and help empower Africa's future leaders.",
    type: "website",
    locale: "en_US",
    url: "https://africanleadershub.org/careers",
    siteName: "African Leaders Hub",
    images: [{ url: "https://africanleadershub.org/hero-image.jpg", width: 1200, height: 630, alt: "African Leaders Hub Careers" }],
  },
};

function typeColor(type: string) {
  switch (type) {
    case "full-time":
      return "bg-green-600";
    case "part-time":
      return "bg-blue-600";
    case "contract":
      return "bg-purple-600";
    case "internship":
      return "bg-orange-600";
    default:
      return "bg-gray-600";
  }
}

export default async function Careers() {
  const organizationSchema = generateOrganizationSchema();
  const [careerRecords, identity] = await Promise.all([getPublishedCareers(), getOrganizationIdentity()]);
  const careers = careerRecords.map(toCareerView);
  const featuredCareers = careers.filter((career) => career.featured);
  const values = Array.isArray(identity?.values)
    ? (identity.values as { title: string; description: string }[])
    : [];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="relative h-[420px] text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/hero-image.jpg)" }} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/40 to-black/70" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-200">Work with us</p>
          <h1 className="max-w-3xl text-4xl font-bold md:text-6xl">Build Africa&apos;s future with us</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-100">
            African Leaders Hub is looking for people who care about education, rights, entrepreneurship, and climate action.
            Come do work that reaches youth, women, and communities across the continent.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-white text-[#8B4513] hover:bg-gray-100">
              <a href="#open-roles">See open roles</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white bg-transparent text-white hover:bg-white/10">
              <a href="#talent-pool">Join the talent pool</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Why African Leaders Hub</h2>
            <p className="mt-4 text-lg text-gray-600">
              This is not just a jobs board. We hire people who want to grow as professionals while contributing to ethical
              leadership across Africa.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Purpose with proximity",
                text: "Your work sits close to the communities we serve, from classrooms and youth hubs in Rwanda to partners across the region.",
              },
              {
                icon: Users,
                title: "A small, serious team",
                text: "You will collaborate with program leads, communicators, and partners who care about quality, dignity, and results.",
              },
              {
                icon: Globe,
                title: "Continental ambition",
                text: "Kigali is our home. Africa is the canvas. We build programs that can travel, be adapted, and be owned locally.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#8B4513]/20 bg-amber-50/40 p-6">
                <item.icon className="mb-4 h-8 w-8 text-[#8B4513]" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {values.length > 0 ? (
        <section className="bg-stone-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">How we work</h2>
              <p className="mt-4 text-lg text-gray-600">
                These values shape how we hire, how we give feedback, and how we show up for young people.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#8B4513]">{value.title}</h3>
                  <p className="mt-2 text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">What you can expect</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Benefits look different in a growing non-profit, but we are intentional about growth, care, and fairness.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: GraduationCap, title: "Learning", text: "Coaching, program exposure, and room to stretch into new skills." },
              { icon: Sparkles, title: "Meaningful work", text: "You will see the impact of your work in people, not only in reports." },
              { icon: Handshake, title: "Partnerships", text: "Work with government, civil society, and funders on real delivery." },
              { icon: Heart, title: "A humane pace", text: "We take the mission seriously without treating people as disposable." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border p-5">
                <item.icon className="mb-3 h-6 w-6 text-[#8B4513]" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">How hiring works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              A clear process, so you always know where you stand.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: FileText, step: "01", title: "Apply", text: "Send your CV and any supporting documents through the role page." },
              { icon: BadgeCheck, step: "02", title: "Review", text: "We read every application and shortlist against the role, not against noise." },
              { icon: MessagesSquare, step: "03", title: "Conversation", text: "Interviews are two-way: we learn about you, and you learn about the work." },
              { icon: Handshake, step: "04", title: "Offer", text: "We move as promptly as we can and keep unsuccessful candidates informed." },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl bg-white p-6 shadow-sm">
                <item.icon className="mb-4 h-6 w-6 text-[#8B4513]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8B4513]">{item.step}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredCareers.length > 0 ? (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Featured opportunities</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Roles we are actively hiring for right now.
              </p>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-8 md:grid-cols-2">
              {featuredCareers.map((career) => (
                <Link key={career.id} href={`/careers/${career.slug}`}>
                  <Card className="h-full border-2 border-[#8B4513] transition hover:border-[#6B3410] hover:shadow-xl">
                    <CardHeader>
                      <div className="mb-4 flex items-start justify-between">
                        <Badge className={`${typeColor(career.type)} text-white`}>{career.type.replace("-", " ")}</Badge>
                        <Badge variant="secondary" className="bg-[#8B4513] text-white">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="mb-2 text-2xl">{career.title}</CardTitle>
                      <CardDescription className="text-base">
                        {career.department} • {career.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 line-clamp-3 text-gray-700">{career.description}</p>
                      <div className="mb-4 flex items-center text-sm text-gray-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>
                          Posted:{" "}
                          {new Date(career.postedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <Button className="w-full rounded-full bg-[#8B4513] text-white hover:bg-[#6B3410]">
                        View details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="open-roles" className="bg-stone-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">All open positions</h2>
            <p className="text-lg text-gray-600">
              {careers.length === 1 ? "1 position available" : `${careers.length} positions available`}
            </p>
          </div>
          {careers.length > 0 ? (
            <div className="flex flex-col gap-4">
              {careers.map((career) => (
                <Link key={career.id} href={`/careers/${career.slug}`}>
                  <Card className="border border-[#8B4513] transition hover:border-[#6B3410] hover:shadow-lg">
                    <CardContent className="px-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900">{career.title}</h3>
                            {career.featured ? (
                              <Badge variant="secondary" className="bg-[#8B4513] text-white">
                                Featured
                              </Badge>
                            ) : null}
                          </div>
                          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Briefcase className="mr-2 h-4 w-4" />
                              {career.department}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              {career.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {career.type.replace("-", " ")}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-gray-700">{career.description}</p>
                        </div>
                        <Button className="rounded-full bg-[#8B4513] text-white hover:bg-[#6B3410]">
                          View details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="mb-4 text-lg text-gray-600">We do not have any open positions at the moment.</p>
              <p className="text-gray-500">Join the talent pool below and we will reach out when a role fits.</p>
            </div>
          )}
        </div>
      </section>

      <section id="talent-pool" className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Do not see a role that fits?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Send your CV anyway. We keep a talent pool for future program, operations, and communications roles.
            </p>
          </div>
          <CareerApplyForm heading="Join the talent pool" />
        </div>
      </section>

      <section className="bg-[#8B4513] py-16 text-white" style={callToActionBackground}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold md:text-4xl">Questions about working here?</h2>
          <p className="mx-auto mt-4 mb-8 max-w-2xl text-xl text-gray-200">
            If you would like to learn more about a team or a hiring timeline, we are happy to talk.
          </p>
          <Button asChild size="lg" className="rounded-full bg-white text-[#8B4513] hover:bg-gray-100">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
