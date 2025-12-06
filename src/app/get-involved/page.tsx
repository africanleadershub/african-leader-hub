import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Mail, Phone } from "lucide-react";
import { generateOrganizationSchema } from "@/lib/seo";
import Link from "next/link";
import { VolunteerForm } from "@/components/volunteer-form";
import { PartnershipForm } from "@/components/partnership-form";

const callToActionBackground = {
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-3.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export const metadata: Metadata = {
  title: "Get Involved - African Leaders Hub",
  description: "Support African Leaders Hub through donations, volunteering, or partnerships. Help us empower Africa's future leaders through education, rights awareness, and environmental action.",
  keywords: "donate ALH, volunteer Rwanda, partnership opportunities, support African youth, ALH involvement, African development support, Rwanda NGO support",
  authors: [{ name: "African Leaders Hub" }],
  openGraph: {
    title: "Get Involved - African Leaders Hub",
    description: "Support African Leaders Hub through donations, volunteering, or partnerships. Help us empower Africa's future leaders.",
    type: "website",
    locale: "en_US",
    url: "https://africanleadershub.org/get-involved",
    siteName: "African Leaders Hub",
    images: [
      {
        url: "https://africanleadershub.org/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "African Leaders Hub Get Involved",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Involved - African Leaders Hub",
    description: "Support African Leaders Hub through donations, volunteering, or partnerships.",
    images: ["https://africanleadershub.org/hero-image.jpg"],
    creator: "@A_LeadersHub",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://africanleadershub.org/get-involved",
  },
};

export default function GetInvolved() {
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
      <section className="relative text-white py-16 h-[300px]" style={callToActionBackground}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background-pattern-1.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end justify-start">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get Involved</h1>
          </div>
        </div>
      </section>

      {/* Ways to Get Involved */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Ways to Get Involved</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              There are many ways you can support our mission and make a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="w-16 h-16 text-[#8B4513] mx-auto mb-4" />
                <CardTitle className="text-2xl">Donate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg mb-4">
                  Support our programs financially to help us reach more youth, children, and women across Africa.
                </CardDescription>
                <Button asChild className="bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full">
                  <Link href="#donate">Make a Donation</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-16 h-16 text-[#8B4513] mx-auto mb-4" />
                <CardTitle className="text-2xl">Volunteer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg mb-4">
                  Share your skills and time to help us implement programs and reach more communities.
                </CardDescription>
                <Button asChild variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white rounded-full">
                  <Link href="#volunteer">Volunteer Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Handshake className="w-16 h-16 text-[#8B4513] mx-auto mb-4" />
                <CardTitle className="text-2xl">Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg mb-4">
                  Join as an organizational partner to amplify our impact and reach more communities together.
                </CardDescription>
                <Button asChild variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white rounded-full">
                  <Link href="#partnerships">Become a Partner</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Donate Section */}
      {/* <section id="donate" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Make a Donation</h2>
              <p className="text-lg text-gray-700 mb-8">
                Your donation helps us empower youth, children, and women across Africa. Every contribution makes a difference in building resilient communities.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="w-6 h-6 text-[#8B4513] mr-2" />
                      Where Your Donation Goes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Teacher training and education programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Youth entrepreneurship and job readiness programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Climate action and environmental programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Women&apos;s empowerment and teen mothers support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Rights awareness and civic education programs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Donation Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">$50</span>
                        <span className="text-sm text-gray-600">Supports one teacher training session</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">$100</span>
                        <span className="text-sm text-gray-600">Provides scholarship for one vulnerable child</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">$250</span>
                        <span className="text-sm text-gray-600">Supports teen mother empowerment program</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">$500</span>
                        <span className="text-sm text-gray-600">Funds climate ambassador training</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Donation Form</CardTitle>
                  <CardDescription>
                    Fill out the form below to make a donation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="amount">Donation Amount (USD)</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">$50</SelectItem>
                        <SelectItem value="100">$100</SelectItem>
                        <SelectItem value="250">$250</SelectItem>
                        <SelectItem value="500">$500</SelectItem>
                        <SelectItem value="1000">$1,000</SelectItem>
                        <SelectItem value="custom">Custom Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="program">Program to Support (Optional)</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Fund</SelectItem>
                        <SelectItem value="education">Teacher Empowerment</SelectItem>
                        <SelectItem value="youth">Youth Empowerment</SelectItem>
                        <SelectItem value="environment">Climate Action</SelectItem>
                        <SelectItem value="women">Women Empowerment</SelectItem>
                        <SelectItem value="rights">Rights Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea id="message" placeholder="Add a personal message" />
                  </div>

                  <Button className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full">
                    Make Donation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Volunteer Section */}
      <section id="volunteer" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Volunteer with Us</h2>
              <p className="text-lg text-gray-700 mb-8">
                Join our team of dedicated volunteers and help us implement programs that transform lives across Africa.
              </p>

              <div className="space-y-6">
                <Card className="bg-amber-900/10 border border-[#8B4513]">
                  <CardHeader>
                    <CardTitle>Volunteer Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Program implementation and training</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Community outreach and awareness</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Digital content creation and social media</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Translation and language support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">•</span>
                        <span className="text-gray-700">Research and data collection</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-amber-900/10 border border-[#8B4513]">
                  <CardHeader>
                    <CardTitle>Volunteer Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">✓</span>
                        <span className="text-gray-700">Make a real difference in communities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">✓</span>
                        <span className="text-gray-700">Gain valuable experience and skills</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">✓</span>
                        <span className="text-gray-700">Network with like-minded individuals</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">✓</span>
                        <span className="text-gray-700">Receive volunteer certificates</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="border border-[#8B4513]">
                <CardHeader>
                  <CardTitle>Volunteer Application</CardTitle>
                  <CardDescription>
                    Tell us about yourself and how you&apos;d like to help
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <VolunteerForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partnerships" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Partnership Opportunities</h2>
              <p className="text-lg text-gray-700 mb-8">
                Join us as a partner organization to amplify our impact and reach more communities across Africa.
              </p>

              <div className="space-y-6">
                <Card className="bg-amber-900/10 border border-[#8B4513]">
                  <CardHeader>
                    <CardTitle>Types of Partnerships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700">Government ministries and agencies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700">International organizations and NGOs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700">Educational institutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700">Private sector companies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700">Community-based organizations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-amber-900/10 border border-[#8B4513]">
                  <CardHeader>
                    <CardTitle>Partnership Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">✓</span>
                        <span className="text-gray-700">Access to our extensive network and expertise</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">✓</span>
                        <span className="text-gray-700">Collaborative program development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">✓</span>
                        <span className="text-gray-700">Shared resources and knowledge</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#8B4513] mr-3 mt-1">✓</span>
                        <span className="text-gray-700">Increased impact and reach</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="border border-[#8B4513]">
                <CardHeader>
                  <CardTitle>Partnership Inquiry</CardTitle>
                  <CardDescription>
                    Tell us about your organization and partnership interests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <PartnershipForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#8B4513] text-white" style={callToActionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get in touch with us to learn more about how you can get involved
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <a 
                href="mailto:africanleadershub@gmail.com"
                className="text-gray-200 hover:text-white transition-colors"
              >
                africanleadershub@gmail.com
              </a>
            </div>

            <div className="text-center">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <a 
                href="tel:+250788358891"
                className="text-gray-200 hover:text-white transition-colors"
              >
                +250 788 358 891
              </a>
            </div>

            <div className="text-center">
              <Handshake className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-200">Kigali, Rwanda</p>
            </div>
          </div>

          <Button asChild size="lg" className="bg-white text-[#8B4513] hover:bg-gray-100 rounded-full">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
