import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;

  const [
    posts,
    programs,
    careers,
    team,
    contacts,
    volunteers,
    partnerships,
    donations,
    applications,
    subscribers,
    assets,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.program.count(),
    prisma.career.count({ where: { status: "PUBLISHED" } }),
    prisma.teamMember.count({ where: { status: "ACTIVE" } }),
    prisma.contactInquiry.count({ where: { status: "NEW" } }),
    prisma.volunteerApplication.count({ where: { status: "NEW" } }),
    prisma.partnershipApplication.count({ where: { status: "NEW" } }),
    prisma.donationInquiry.count({ where: { status: "NEW" } }),
    prisma.careerApplication.count({ where: { status: "NEW" } }),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.asset.count({ where: { active: true } }),
  ]);

  return NextResponse.json({
    stats: {
      posts,
      programs,
      careers,
      team,
      assets,
      subscribers,
      inbox:
        contacts + volunteers + partnerships + donations + applications,
      contacts,
      volunteers,
      partnerships,
      donations,
      applications,
    },
  });
}
