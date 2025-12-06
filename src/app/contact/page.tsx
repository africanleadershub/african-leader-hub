import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateOrganizationSchema } from "@/lib/seo";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us - African Leaders Hub",
  description: "Get in touch with African Leaders Hub. Contact us for inquiries, partnerships, or to learn more about our programs in Rwanda and East Africa.",
  keywords: "contact ALH, African Leaders Hub contact, Rwanda office, partnership inquiries, ALH support, African development contact, Rwanda NGO contact",
  authors: [{ name: "African Leaders Hub" }],
  openGraph: {
    title: "Contact Us - African Leaders Hub",
    description: "Get in touch with African Leaders Hub. Contact us for inquiries, partnerships, or to learn more about our programs.",
    type: "website",
    locale: "en_US",
    url: "https://africanleadershub.org/contact",
    siteName: "African Leaders Hub",
    images: [
      {
        url: "https://africanleadershub.org/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "African Leaders Hub Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - African Leaders Hub",
    description: "Get in touch with African Leaders Hub. Contact us for inquiries, partnerships, or to learn more about our programs.",
    images: ["https://africanleadershub.org/hero-image.jpg"],
    creator: "@A_LeadersHub",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://africanleadershub.org/contact",
  },
};

export default function Contact() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* Hero Section */}
      <section className="relative text-white py-16 h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background-pattern-1.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end justify-start">
          <div className="text-start">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>


          <div className="bg-[#8B4513] text-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
            <ContactForm />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="text-center lg:text-left">
              <div className="text-2xl font-semibold text-[#8B4513] mb-2">Address</div>
              <p className="text-gray-600">Kigali, Rwanda</p>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-semibold text-[#8B4513] mb-2">Phone</div>
              <a href="tel:+250788358891" className="text-gray-600 hover:text-[#8B4513] transition-colors">
                +250 788 358 891
              </a>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-semibold text-[#8B4513] mb-2">Email</div>
              <a href="mailto:africanleadershub@gmail.com" className="text-gray-600 hover:text-[#8B4513] transition-colors">
                africanleadershub@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our organization and programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-[#8B4513]">
              <CardHeader>
                <CardTitle>How can I support ALH?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You can support us through donations, volunteering, or partnerships. Visit our
                  <Link href="/get-involved" className="text-[#8B4513] hover:underline"> Get Involved</Link> page
                  to learn more about the different ways you can help.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-[#8B4513]">
              <CardHeader>
                <CardTitle>Where does ALH operate?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We are based in Rwanda and operate primarily in East Africa, with programs
                  reaching communities across the region.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-[#8B4513]">
              <CardHeader>
                <CardTitle>How can I volunteer with ALH?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We welcome volunteers with various skills and backgrounds. Fill out our
                  volunteer application form on the
                  <Link href="/get-involved#volunteer" className="text-[#8B4513] hover:underline"> Get Involved</Link> page.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-[#8B4513]">
              <CardHeader>
                <CardTitle>What programs does ALH offer?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We offer programs in youth empowerment, environmental protection, civic education,
                  women&apos;s empowerment, education, and healthcare. Visit our
                  <Link href="/programs" className="text-[#8B4513] hover:underline"> Programs</Link> page for details.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-[#8B4513]">
              <CardHeader>
                <CardTitle>How can my organization partner with ALH?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We welcome partnerships with government agencies, NGOs, educational institutions,
                  and private companies. Contact us to discuss partnership opportunities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-[#8B4513]">
              <CardHeader>
                <CardTitle>Is ALH a registered organization?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Yes, African Leaders Hub is a registered non-profit organization based in Rwanda,
                  operating with proper legal status and governance structures.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
