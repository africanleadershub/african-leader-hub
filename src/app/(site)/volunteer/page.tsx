import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateOrganizationSchema } from "@/lib/seo";
import { VolunteerForm } from "@/components/volunteer-form";
import { InvolvementHero } from "@/components/involvement-hero";
import { InvolvementContact } from "@/components/involvement-contact";
import { INVOLVEMENT } from "@/lib/involvement";

const page = INVOLVEMENT.volunteer;

export const metadata: Metadata = {
  title: "Volunteer - African Leaders Hub",
  description:
    "Volunteer with African Leaders Hub. Share your skills in programs, outreach, content, translation, and research across Rwanda and East Africa.",
  openGraph: {
    title: "Volunteer - African Leaders Hub",
    description: "Share your time and skills with youth, teachers, and community partners.",
    type: "website",
    url: "https://africanleadershub.org/volunteer",
    images: [{ url: page.banner, width: 1200, height: 630, alt: "Volunteer with African Leaders Hub" }],
  },
  alternates: { canonical: "https://africanleadershub.org/volunteer" },
};

export default function VolunteerPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <InvolvementHero title={page.title} banner={page.banner} />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">Volunteer with us</h2>
            <p className="mb-8 text-lg text-gray-700">
              Join our team of dedicated volunteers and help us implement programs that transform lives across Africa.
            </p>
            <div className="space-y-6">
              <Card className="border border-[#8B4513] bg-amber-900/10">
                <CardHeader>
                  <CardTitle>Volunteer opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {[
                      "Program implementation and training",
                      "Community outreach and awareness",
                      "Digital content creation and social media",
                      "Translation and language support",
                      "Research and data collection",
                    ].map((item) => (
                      <li key={item} className="flex items-start text-gray-700">
                        <span className="mt-1 mr-3 text-[#8B4513]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border border-[#8B4513] bg-amber-900/10">
                <CardHeader>
                  <CardTitle>Volunteer benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {[
                      "Make a real difference in communities",
                      "Gain valuable experience and skills",
                      "Network with like-minded individuals",
                      "Receive volunteer certificates",
                    ].map((item) => (
                      <li key={item} className="flex items-start text-gray-700">
                        <span className="mt-1 mr-3 text-[#8B4513]">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="border border-[#8B4513]">
            <CardHeader>
              <CardTitle>Volunteer application</CardTitle>
              <CardDescription>Tell us about yourself and how you would like to help.</CardDescription>
            </CardHeader>
            <CardContent>
              <VolunteerForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <InvolvementContact />
    </div>
  );
}
