import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, TreePine, GraduationCap, Heart, Shield, Lightbulb } from "lucide-react";
import { programs } from "@/data/programs";
import { impactStats } from "@/data/impact";
import { getLatestNews } from "@/data/news";
import { generateOrganizationSchema } from "@/lib/seo";
import { ProgramsAccordion } from "@/components/programs-accordion";
import Image from "next/image";
import { partners } from "@/data/partners";

export default function Home() {
  const featuredPrograms = programs.slice(0, 6);
  const featuredStats = impactStats.slice(0, 4);
  const latestNews = getLatestNews(3);
  const organizationSchema = generateOrganizationSchema();
  
  const impactSectionBackground = {
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  const callToActionBackground = {
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-2.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }


  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* Hero Section */}
      <section className="relative text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background-pattern-2.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/20 to-black/60"></div>
        <div className="relative max-w-7xl min-h-[calc(100vh-10rem)] mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col justify-end items-start">
          <div className="text-start">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Africa&apos;s Future Leaders
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl">
            Building Africa&apos;s Future through People, Purpose, and Possibility
            </p>
            <p className="text-lg mb-12 text-gray-300 max-w-4xl"> 
            African Leaders Hub (ALH) is a Rwanda-based non-profit advancing Africa&apos;s transformation by equipping people to lead with purpose, integrity, and compassion. Through leadership, learning, and sustainable action, we restore dignity, inspire innovation, and cultivate change that lasts across communities and generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Link 
                href="/programs" 
                className="inline-flex text-white items-center justify-center px-8 py-4 hover:bg-white text-black font-semibold bg-[#8B4513] hover:text-black rounded-full transition-colors"
              >
                Discover Our Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Highlight */}
      <section className="relative py-16 bg-white">
        {/* <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: 'url(/tyler-franta-iusJ25iYu1c-unsplash.jpg)' }}
        ></div> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
            To develop principled leaders who drive transformation with courage and empathy, shaping a just, innovative, and sustainable Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Program Teasers */}
      <section className="relative py-16 bg-gray-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our programs equip leaders, innovators, and communities to drive transformation with integrity, empathy, and purpose shaping a just, innovative, and sustainable Africa.
            </p>
          </div>

          <ProgramsAccordion programs={featuredPrograms} />

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full">
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 text-white" style={impactSectionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Transforming lives and communities across Rwanda and East Africa
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {featuredStats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-white">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest News & Updates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed about our latest programs, partnerships, and impact stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden border border-[#8B4513]">
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-[#8B4513] text-white rounded-full">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime} min read</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8B4513] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link href={`/news/${article.slug}`} className="text-[#8B4513] transition-colors flex items-center">
                      <span className="text-[#8B4513]">Read More</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full hover:scale-105 transition-all duration-300">
              <Link href="/news">View All News</Link>
            </Button>
          </div>
        </div>
      </section>}

      {/* Program Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Focus Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We focus on the human, social, and environmental pillars that sustain Africa’s transformation, shaping people, systems, and ideas that build a just, innovative, and sustainable future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow bg-amber-900/10 hover:border hover:border-[#8B4513]">
              <CardHeader>
                <Users className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
                <CardTitle>Leadership & Youth Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black">
                  Developing principled, purpose-driven leaders who drive change with courage and empathy, equipping youth and children with the mindset, skills, and values to shape the future.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-amber-900/10 hover:border hover:border-[#8B4513]">
              <CardHeader>
                <Heart className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
                <CardTitle>Women&apos;s Empowerment & Equity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black">
                  Restoring dignity, advancing equality, and expanding opportunities for women and girls through mentorship, leadership, and economic empowerment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-amber-900/10 hover:border hover:border-[#8B4513]">
              <CardHeader>
                <GraduationCap className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
                <CardTitle>Education for Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black">
                  Championing inclusive, values-based education that builds character, curiosity, and competence, from early childhood through professional development.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-amber-900/10 hover:border hover:border-[#8B4513]">
              <CardHeader>
                <Shield className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
                <CardTitle>Civic Responsibility & Justice</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black">
                  Promoting ethical citizenship, accountability, and human rights through civic education and community leadership that upholds justice and social harmony.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-amber-900/10 hover:border hover:border-[#8B4513]">
              <CardHeader>
                <TreePine className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
                <CardTitle>Environment & Climate Stewardship</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black">
                  Empowering communities to lead in conservation, sustainability, and climate resilience; protecting creation while building adaptive local economies.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-amber-900/10 hover:border hover:border-[#8B4513]">
              <CardHeader>
                <Lightbulb className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
                <CardTitle>Innovation & Enterprise for Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black">
                  Fueling Africa&apos;s transformation through creative problem-solving, entrepreneurship, and technology, turning ideas into ethical, scalable solutions that uplift communities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      {partners.length > 0 && <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Collaborating with government ministries, international organizations, and local NGOs for maximum impact
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-8">
            {partners.slice(0, 12).map((partner) => (
              <div key={partner.id} className="group">
                {partner.logoType === "image" && (
                  <Image
                    src={partner.logo as string}
                    alt={`${partner.name} logo`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                {partner.logoType === "custom" && (
                  <div className="">
                    {partner.logo}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* CTA Banner */}
      <section className="py-16 bg-[#8B4513] text-white" style={callToActionBackground}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Building Resilient Communities
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Together, we can create a brighter future for Africa&apos;s youth, children, and women through education, empowerment, and environmental action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
