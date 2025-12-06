"use client";

import { useState } from "react";
import Image from "next/image";
import { executiveCommittee, auditCommittee, conflictResolutionCommittee, TeamMember } from "@/data/team";
import { TeamMemberModal } from "@/components/team-member-modal";

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals committed to empowering Africa&apos;s future leaders
          </p>
        </div>

        {/* Executive Committee */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-[#8B4513] mb-8 text-center">
            Executive Committee
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {executiveCommittee.map((member) => (
              <div
                key={member.id}
                className="group cursor-pointer"
                onClick={() => handleMemberClick(member)}
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#8B4513] group-hover:border-[#6B3410] transition-colors duration-300">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#8B4513] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Committee */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-[#8B4513] mb-8 text-center">
            Audit Committee
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {auditCommittee.map((member) => (
              <div
                key={member.id}
                className="group cursor-pointer"
                onClick={() => handleMemberClick(member)}
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#8B4513] group-hover:border-[#6B3410] transition-colors duration-300">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#8B4513] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conflict Resolution Committee */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-[#8B4513] mb-8 text-center">
            Conflict Resolution Committee
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {conflictResolutionCommittee.map((member) => (
              <div
                key={member.id}
                className="group cursor-pointer"
                onClick={() => handleMemberClick(member)}
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#8B4513] group-hover:border-[#6B3410] transition-colors duration-300">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#8B4513] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Member Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

