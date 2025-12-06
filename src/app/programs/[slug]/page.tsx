import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Activity } from "lucide-react";
import { programs, getProgramBySlug } from "@/data/programs";
import { generateProgramSchema } from "@/lib/seo";
import { ProgramsAccordion } from "@/components/programs-accordion";

interface ProgramPageProps {
  params: {
    slug: string;
  };
}

const callToActionBackground = {
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return {
      title: "Program Not Found - African Leaders Hub",
    };
  }

  return {
    title: `${program.title} - African Leaders Hub`,
    description: program.description,
    keywords: `${program.title}, ${program.category}, African Leaders Hub, Rwanda programs`,
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const programSchema = generateProgramSchema(program.title, program.description);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(programSchema),
        }}
      />
      {/* Hero Section */}
      <section className="relative text-white py-16 min-h-[calc(100vh-20rem)] md:min-h-[400px] h-[calc(100vh-10rem)] md:h-[450px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background-pattern-1.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end justify-start">
          <div className="text-start flex flex-col justify-end items-start h-full">
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-6 hover:text-white rounded-full">
              <Link href="/programs">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Programs
              </Link>
            </Button>
            <Badge className="bg-[#8B4513] text-white mb-4 rounded-full text-wrap">
              {program.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{program.title}</h1>
            <p className="text-xl text-white max-w-3xl">{program.description}</p>
          </div>
        </div>
      </section>

      {/* Program Overview Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8B4513] mb-2">{program.targetGroups.length}</div>
              <h3 className="text-lg font-semibold mb-1">Target Group{program.targetGroups.length > 1 ? "s" : ""}</h3>
              <p className="text-gray-600 text-sm">Primary beneficiaries</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8B4513] mb-2">{program.keyActivities.length}</div>
              <h3 className="text-lg font-semibold mb-1">Key Activity{program.keyActivities.length > 1 ? "s" : ""}</h3>
              <p className="text-gray-600 text-sm">Core program activities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8B4513] mb-2">{program.expectedOutcomes.length}</div>
              <h3 className="text-lg font-semibold mb-1">Expected Outcome{program.expectedOutcomes.length > 1 ? "s" : ""}</h3>
              <p className="text-gray-600 text-sm">Measurable results</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8B4513] mb-2">{program.partners.length}</div>
              <h3 className="text-lg font-semibold mb-1">Partner{program.partners.length > 1 ? "s" : ""}</h3>
              <p className="text-gray-600 text-sm">Collaborative organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Background */}
              <div className="flex flex-col gap-4">
                <div className="text-lg font-bold text-[#8B4513]">Background</div>
                <div className="text-gray-700">{program.background}</div>
              </div>

              {/* Goal */}
              <div className="flex flex-col gap-4">
                <div className="text-lg font-bold text-[#8B4513]">Goal</div>
                <div className="text-gray-700">{program.goal}</div>
              </div>

              {/* Objectives */}
              <div className="flex flex-col gap-4">
                <div className="text-lg font-bold text-[#8B4513]">Objectives</div>
                <div className="text-gray-700">{program.objectives.join(", ")}</div>
              </div>

              {/* Key Activities */}
              <div className="flex flex-col gap-4">
                <div className="text-lg font-bold text-[#8B4513]">Key Activities</div>
                <div className="text-gray-700">{program.keyActivities.join(", ")}</div>
              </div>

              {/* Expected Outcomes */}
              <div className="flex flex-col gap-4">
                <div className="text-lg font-bold text-[#8B4513]">Expected Outcomes</div>
                <div className="text-gray-700">{program.expectedOutcomes.join(", ")}</div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Target Groups */}
              <div className="flex flex-col gap-4">
                <div className="text-lg font-bold text-[#8B4513]">Target Groups</div>
                <div className="text-gray-700">
                  <ul className="list-disc list-inside">
                    {program.targetGroups.map((group, index) => (
                      <li key={index} className="text-gray-700">{group}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Program Timeline */}
              {(program.duration || program.implementationPlan) && (
                <div className="flex flex-col gap-4">
                  <div className="text-lg font-bold text-[#8B4513]">Program Timeline</div>
                  <div className="text-gray-700">
                    {program.duration && (
                      <div>
                        <h4 className="font-semibold text-black mb-1">Duration:</h4>
                        <p className="text-gray-600">{program.duration}</p>
                      </div>
                    )}
                    {program.implementationPlan && (
                      <div>
                        <h4 className="font-semibold text-black mb-1">Implementation Plan:</h4>
                        <p className="text-gray-600">{program.implementationPlan}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Budget */}
              {program.budget && (
                <div className="flex flex-col gap-4">
                  <div className="text-lg font-bold text-[#8B4513]">Budget</div>
                  <div className="text-gray-700">
                    <p className="text-gray-600">{program.budget}</p>
                  </div>
                </div>
              )}

              {/* Partners */}
              <div className="flex flex-col gap-4">
                <div className="text-lg font-bold text-[#8B4513]">Partners</div>
                <div className="text-gray-700">
                  <ul className="list-disc list-inside">
                    {program.partners.map((partner, index) => (
                      <li key={index} className="text-gray-700">{partner}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Impact & Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Program Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Measuring success through tangible outcomes and community transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow border border-[#8B4513]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#8B4513] mr-2" />
                  Expected Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {program.expectedOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#8B4513] mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border border-[#8B4513]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-6 h-6 text-[#8B4513] mr-2" />
                  Key Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-1">
                  {program.keyActivities.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#8B4513] mr-3 mt-1 font-bold">{index + 1}.</span>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="bg-[#8B4513] text-white" style={callToActionBackground}>
              <CardContent className="py-8">
                <h3 className="text-4xl font-bold mb-4">Join Our Impact</h3>
                <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                  Be part of creating lasting change in the lives of our target groups.
                  Your support helps us reach more people and create greater impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Related Programs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore other programs in the same category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {programs
              .filter(p => p.category === program.category && p.slug !== program.slug)
              .slice(0, 3)
              .map((relatedProgram) => (
                <ProgramsAccordion programs={[relatedProgram]} key={relatedProgram.slug} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
