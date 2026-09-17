"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, TreePine, GraduationCap, Heart, Shield, Stethoscope, MessageSquare } from "lucide-react";
import { programs, programCategories } from "@/data/programs";
import { generateOrganizationSchema } from "@/lib/seo";
import { ProgramsAccordion } from "@/components/programs-accordion";


export default function Programs() {
  const [activeCategory, setActiveCategory] = useState("youth-and-children-empowerment");
  const organizationSchema = generateOrganizationSchema();

  const getProgramsByCategory = (category: string) => {
    return programs.filter(program => program.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Youth & Children Empowerment":
        return <Users className="w-6 h-6" />;
      case "Environment Protection & Climate Change":
        return <TreePine className="w-6 h-6" />;
      case "Civic Education & Leadership":
        return <Shield className="w-6 h-6" />;
      case "Women Empowerment":
        return <Heart className="w-6 h-6" />;
      case "Education":
        return <GraduationCap className="w-6 h-6" />;
      case "Healthcare":
        return <Stethoscope className="w-6 h-6" />;
      case "Conferences":
        return <MessageSquare className="w-6 h-6" />;
      default:
        return <Users className="w-6 h-6" />;
    }
  };

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
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url(/hero-image.jpg)', backgroundPosition: 'center' }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/30 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end justify-start">
          <div className="text-start">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Program Overview</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our programs equip leaders, innovators, and communities to drive transformation with integrity, empathy, and purpose shaping a just, innovative, and sustainable Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Programs by Category */}
      <section className="py-16 bg-amber-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Custom Category Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {programCategories.map((category) => {
                const categoryValue = category.toLowerCase().replace(/\s+/g, '-').replace('&', 'and');
                const isActive = activeCategory === categoryValue;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(categoryValue)}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-full border-2 transition-all duration-300 group
                      ${isActive
                        ? 'bg-[#8B4513] text-white border-[#8B4513] shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#8B4513] hover:text-[#8B4513] hover:shadow-md'
                      }
                    `}
                  >
                    <span className={`
                      transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#8B4513]'}
                    `}>
                      {getCategoryIcon(category)}
                    </span>
                    <span className="font-medium text-sm whitespace-nowrap">
                      {category.split(' ')[0]}
                    </span>
                    {isActive && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Category Content */}
          {programCategories.map((category) => {
            const categoryPrograms = getProgramsByCategory(category);
            const categoryValue = category.toLowerCase().replace(/\s+/g, '-').replace('&', 'and');
            const isActive = activeCategory === categoryValue;

            if (!isActive) return null;

            return (
              <div key={category} className="animate-in fade-in-50 duration-300">
                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-[#8B4513] bg-opacity-10 rounded-xl text-white">
                      {getCategoryIcon(category)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black">{category}</h3>
                      <p className="text-gray-600">
                        {categoryPrograms.length} program{categoryPrograms.length !== 1 ? 's' : ''} in this category
                      </p>
                    </div>
                  </div>
                </div>

                {categoryPrograms.length > 0 ? (
                  <ProgramsAccordion programs={categoryPrograms} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No programs available</h3>
                    <p className="text-gray-500">Check back soon for programs in this category.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Program Impact */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Program Impact</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our programs create measurable impact across all focus areas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B4513] mb-2">5,000+</div>
              <h3 className="text-xl font-semibold mb-2">Teachers Upgraded</h3>
              <p className="text-gray-300">Primary teachers upgraded to bachelor&apos;s degree level</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B4513] mb-2">150+</div>
              <h3 className="text-xl font-semibold mb-2">Climate Ambassadors</h3>
              <p className="text-gray-300">Youth trained as climate action champions across 30 districts</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B4513] mb-2">60,000+</div>
              <h3 className="text-xl font-semibold mb-2">Youth Reached</h3>
              <p className="text-gray-300">Young people educated through Know Your Rights program</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B4513] mb-2">3M</div>
              <h3 className="text-xl font-semibold mb-2">Trees Target</h3>
              <p className="text-gray-300">Trees to be planted through One Tree African Family Program</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B4513] mb-2">25,000+</div>
              <h3 className="text-xl font-semibold mb-2">Civic Education</h3>
              <p className="text-gray-300">People trained in human rights awareness and protection</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B4513] mb-2">2,000+</div>
              <h3 className="text-xl font-semibold mb-2">Job Readiness</h3>
              <p className="text-gray-300">Youth trained through Bategure employment program</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B4513] mb-2">22,000+</div>
              <h3 className="text-xl font-semibold mb-2">Teen Mothers</h3>
              <p className="text-gray-300">Annual cases addressed through empowerment program</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B4513] mb-2">20+</div>
              <h3 className="text-xl font-semibold mb-2">Programs</h3>
              <p className="text-gray-300">Comprehensive programs across 7 thematic areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Approach */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Our Implementation Approach</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We combine insight, collaboration, and continuous learning to ensure every program delivers lasting impact and real transformation across communities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4">
                <div className="w-16 h-16 bg-[#8B4513] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl mb-2">Research & Co-Design</h3>
              </div>
              <div className="p-4">
                <p>
                Grounded in evidence and empathy, we begin with listening: conducting community assessments and stakeholder consultations to design programs that respond to real needs and opportunities.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="p-4">
                <div className="w-16 h-16 bg-[#8B4513] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl mb-2">Pilot & Learning Implementation</h3>
              </div>
              <div className="p-4">
                <p>
                We start small, testing new ideas in context to refine models, strengthen partnerships, and learn what works before wider rollout.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="p-4">
                <div className="w-16 h-16 bg-[#8B4513] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl mb-2">Scaling & Replication</h3>
              </div>
              <div className="p-4">
                <p>
                Effective models are expanded to reach more communities, adapting to context while maintaining quality, inclusivity, and measurable impact.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="p-4">
                <div className="w-16 h-16 bg-[#8B4513] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl mb-2">Monitoring, Evaluation & Learning (MEL)</h3>
              </div>
              <div className="p-4">
                <p>
                We track outcomes, capture lessons, and continuously improve, ensuring transparency, accountability, and sustainable results that inform future innovations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#8B4513] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join us in empowering Africa&apos;s future leaders through our comprehensive programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#8B4513] hover:bg-gray-100 rounded-full">
              <Link href="/get-involved#donate">Support Our Programs</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#8B4513] rounded-full bg-black">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
