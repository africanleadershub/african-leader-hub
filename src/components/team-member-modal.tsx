"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TeamMember } from "@/data/team";
import Link from "next/link";
import { Linkedin, Facebook, Instagram, MapPin, Briefcase, X } from "lucide-react";

interface TeamMemberModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
  if (!member) return null;

  // Helper function to get social media URL
  const getSocialUrl = (value: string | undefined, platform: 'twitter' | 'facebook' | 'instagram'): string | null => {
    if (!value || value.trim() === '') return null;
    
    // If it's already a full URL, return it
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value;
    }
    
    // Otherwise, construct the URL based on platform
    const cleanValue = value.replace('@', '');
    switch (platform) {
      case 'twitter':
        return `https://twitter.com/${cleanValue}`;
      case 'facebook':
        return `https://facebook.com/${cleanValue}`;
      case 'instagram':
        return `https://instagram.com/${cleanValue}`;
      default:
        return null;
    }
  };

  const linkedinUrl = member.linkedin && member.linkedin.trim() !== '' ? member.linkedin : null;
  const twitterUrl = getSocialUrl(member.twitter, 'twitter');
  const facebookUrl = getSocialUrl(member.facebook, 'facebook');
  const instagramUrl = getSocialUrl(member.instagram, 'instagram');

  const hasSocialMedia = linkedinUrl || twitterUrl || facebookUrl || instagramUrl;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl sm:max-w-3xl md:max-w-5xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="sr-only">Team Member Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#8B4513] mx-auto sm:mx-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-lg text-[#8B4513] font-semibold mb-1">
                {member.position}
              </p>
              
              {member.committee && (
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600 mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{member.committee}</span>
                </div>
              )}
              
              {member.nationality && (
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{member.nationality}</span>
                </div>
              )}
            </div>
          </div>

          {/* Responsibilities */}
          {member.responsibilities && (
            <div className="pt-3 border-t">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Key Responsibilities
              </h4>
              <p className="text-gray-600">{member.responsibilities}</p>
            </div>
          )}

          {/* Biography */}
          {member.biography && (
            <div className="pt-3 border-t">
              
              <div 
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: member.biography }}
              />
            </div>
          )}

          {/* Social Media Links */}
          {hasSocialMedia && (
            <div className="pt-3 border-t flex items-center justify-start">
              <div className="flex flex-wrap gap-3">
                {linkedinUrl && (
                  <Link
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full
                     w-8 h-8 bg-[#0077b5] text-white hover:bg-[#005885] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Link>
                )}
                {twitterUrl && (
                  <Link
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full
                     w-8 h-8 bg-[#1DA1F2] text-white hover:bg-[#0d8bd9] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </Link>
                )}
                {facebookUrl && (
                  <Link
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full
                     w-8 h-8 bg-[#1877F2] text-white hover:bg-[#166fe5] transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </Link>
                )}
                {instagramUrl && (
                  <Link
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full
                     w-8 h-8 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

