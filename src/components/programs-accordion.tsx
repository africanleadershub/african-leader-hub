"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Program } from "@/data/programs";
import Image from "next/image";

interface ProgramsAccordionProps {
  programs: Program[];
}

export function ProgramsAccordion({ programs }: ProgramsAccordionProps) {
  return (
    <div className="space-y-4">
      {programs.map((program) => {
        return (
          <div
            key={program.id}
            className="bg-white rounded-xl border border-[#8B4513] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div
              className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-opacity-50 border-l-8 border-[#8B4513]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center md:flex-row flex-col space-x-4 flex-1 gap-4">
                  {/* Program Image */}
                  <div className="relative w-full md:w-32 h-64 md:h-32 rounded-sm overflow-hidden flex-shrink-0">
                    <Image
                      src={program.image}
                      alt={program.title}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Program Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-semibold text-gray-900 truncate text-wrap leading-tight">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {program.description}
                    </p>
                    <Link href={`/programs/${program.slug}`} className="text-[#8B4513] mt-4 font-semibold text-sm flex items-center">Read More <ArrowRight className="w-4 h-4" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
