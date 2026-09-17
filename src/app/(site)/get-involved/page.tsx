import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Handshake, Users } from "lucide-react";
import { generateOrganizationSchema } from "@/lib/seo";
import Link from "next/link";
import { InvolvementHashRedirect } from "@/components/involvement-hash-redirect";
import { InvolvementHero } from "@/components/involvement-hero";
import { InvolvementContact } from "@/components/involvement-contact";
import { INVOLVEMENT } from "@/lib/involvement";

export const metadata: Metadata = {
  title: "Get Involved - African Leaders Hub",
  description:
    "Support African Leaders Hub through donations, volunteering, or partnerships. Help us empower Africa's future leaders through education, rights awareness, and environmental action.",
  keywords: "donate ALH, volunteer Rwanda, partnership opportunities, support African youth, ALH involvement",
  openGraph: {
    title: "Get Involved - African Leaders Hub",
    description: "Support African Leaders Hub through donations, volunteering, or partnerships.",
    type: "website",
    locale: "en_US",
    url: "https://africanleadershub.org/get-involved",
    siteName: "African Leaders Hub",
    images: [{ url: "https://africanleadershub.org/hero-image.jpg", width: 1200, height: 630, alt: "African Leaders Hub Get Involved" }],
  },
  alternates: { canonical: "https://africanleadershub.org/get-involved" },
};

export default function GetInvolved() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <div className="min-h-screen">
      <InvolvementHashRedirect />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <InvolvementHero title="Get involved" banner="/background-pattern-1.jpg" kicker="Join the work" />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black md:text-4xl">Ways to get involved</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              There are many ways you can support our mission and make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="overflow-hidden text-center transition-shadow hover:shadow-lg">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${INVOLVEMENT.donate.banner})` }} />
              <CardHeader>
                <DollarSign className="mx-auto mb-2 h-10 w-10 text-[#8B4513]" />
                <CardTitle className="text-2xl">Donate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  Support our programs financially to help us reach more youth, children, and women across Africa.
                </CardDescription>
                <Button asChild className="rounded-full bg-[#8B4513] text-white hover:bg-[#6B3410]">
                  <Link href="/donate">Make a donation</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden text-center transition-shadow hover:shadow-lg">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${INVOLVEMENT.volunteer.banner})` }} />
              <CardHeader>
                <Users className="mx-auto mb-2 h-10 w-10 text-[#8B4513]" />
                <CardTitle className="text-2xl">Volunteer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  Share your skills and time to help us implement programs and reach more communities.
                </CardDescription>
                <Button asChild variant="outline" className="rounded-full border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
                  <Link href="/volunteer">Volunteer now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden text-center transition-shadow hover:shadow-lg">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${INVOLVEMENT.partner.banner})` }} />
              <CardHeader>
                <Handshake className="mx-auto mb-2 h-10 w-10 text-[#8B4513]" />
                <CardTitle className="text-2xl">Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  Join as an organizational partner to amplify our impact and reach more communities together.
                </CardDescription>
                <Button asChild variant="outline" className="rounded-full border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
                  <Link href="/partner">Become a partner</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <InvolvementContact />
    </div>
  );
}
