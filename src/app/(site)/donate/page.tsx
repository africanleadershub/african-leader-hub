import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { generateOrganizationSchema } from "@/lib/seo";
import { DonationInquiryForm } from "@/components/donation-inquiry-form";
import { InvolvementHero } from "@/components/involvement-hero";
import { InvolvementContact } from "@/components/involvement-contact";
import { INVOLVEMENT } from "@/lib/involvement";

const page = INVOLVEMENT.donate;

export const metadata: Metadata = {
  title: "Donate - African Leaders Hub",
  description:
    "Support African Leaders Hub with a donation. Your gift funds education, rights, entrepreneurship, and climate programs for youth, children, and women.",
  openGraph: {
    title: "Donate - African Leaders Hub",
    description: "Support programs that empower Africa's future leaders.",
    type: "website",
    url: "https://africanleadershub.org/donate",
    images: [{ url: page.banner, width: 1200, height: 630, alt: "Donate to African Leaders Hub" }],
  },
  alternates: { canonical: "https://africanleadershub.org/donate" },
};

export default function DonatePage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <InvolvementHero title={page.title} banner={page.banner} />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">Make a donation</h2>
            <p className="mb-8 text-lg text-gray-700">
              Your donation helps us empower youth, children, and women across Africa. Every contribution makes a
              difference in building resilient communities.
            </p>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-6 w-6 text-[#8B4513]" />
                  Where your donation goes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Teacher training and education programs",
                    "Youth entrepreneurship and job readiness programs",
                    "Climate action and environmental programs",
                    "Women's empowerment and teen mothers support",
                    "Rights awareness and civic education programs",
                  ].map((item) => (
                    <li key={item} className="flex items-start text-gray-700">
                      <span className="mt-1 mr-3 text-[#8B4513]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Donation inquiry</CardTitle>
              <CardDescription>Tell us how you would like to give. Our team will follow up with payment details.</CardDescription>
            </CardHeader>
            <CardContent>
              <DonationInquiryForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <InvolvementContact />
    </div>
  );
}
