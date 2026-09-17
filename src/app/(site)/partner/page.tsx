import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateOrganizationSchema } from "@/lib/seo";
import { PartnershipForm } from "@/components/partnership-form";
import { InvolvementHero } from "@/components/involvement-hero";
import { InvolvementContact } from "@/components/involvement-contact";
import { INVOLVEMENT } from "@/lib/involvement";

const page = INVOLVEMENT.partner;

export const metadata: Metadata = {
  title: "Partner with us - African Leaders Hub",
  description:
    "Partner with African Leaders Hub. We work with government, civil society, schools, and the private sector to expand impact across Africa.",
  openGraph: {
    title: "Partner with us - African Leaders Hub",
    description: "Collaborate with government, civil society, and private-sector allies.",
    type: "website",
    url: "https://africanleadershub.org/partner",
    images: [{ url: page.banner, width: 1200, height: 630, alt: "Partner with African Leaders Hub" }],
  },
  alternates: { canonical: "https://africanleadershub.org/partner" },
};

export default function PartnerPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <InvolvementHero title={page.title} banner={page.banner} />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">Partnership opportunities</h2>
            <p className="mb-8 text-lg text-gray-700">
              Join us as a partner organization to amplify our impact and reach more communities across Africa.
            </p>
            <div className="space-y-6">
              <Card className="border border-[#8B4513] bg-amber-900/10">
                <CardHeader>
                  <CardTitle>Types of partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {[
                      "Government ministries and agencies",
                      "International organizations and NGOs",
                      "Educational institutions",
                      "Private sector companies",
                      "Community-based organizations",
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
                  <CardTitle>Partnership benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {[
                      "Access to our extensive network and expertise",
                      "Collaborative program development",
                      "Shared resources and knowledge",
                      "Increased impact and reach",
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
              <CardTitle>Partnership inquiry</CardTitle>
              <CardDescription>Tell us about your organization and partnership interests.</CardDescription>
            </CardHeader>
            <CardContent>
              <PartnershipForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <InvolvementContact />
    </div>
  );
}
