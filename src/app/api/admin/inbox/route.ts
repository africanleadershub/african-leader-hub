import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { Prisma } from "@/generated/prisma/client";

const INBOX = ["contacts", "volunteers", "partnerships", "donations", "applications", "subscribers"] as const;
type InboxType = (typeof INBOX)[number];

function modelFor(type: InboxType) {
  switch (type) {
    case "contacts":
      return prisma.contactInquiry;
    case "volunteers":
      return prisma.volunteerApplication;
    case "partnerships":
      return prisma.partnershipApplication;
    case "donations":
      return prisma.donationInquiry;
    case "applications":
      return prisma.careerApplication;
    case "subscribers":
      return prisma.newsletterSubscriber;
  }
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;
  const type = (new URL(request.url).searchParams.get("type") || "contacts") as InboxType;
  if (!INBOX.includes(type)) return NextResponse.json({ error: "Invalid type" }, { status: 400 });

  const include =
    type === "applications" ? { career: { select: { title: true, slug: true } } } : undefined;

  const items = await (modelFor(type) as typeof prisma.contactInquiry).findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    ...(include ? { include } : {}),
  } as never);

  return NextResponse.json({ items });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  const body = (await request.json()) as {
    type: InboxType;
    id: string;
    status?: string;
    adminNotes?: string;
    isActive?: boolean;
  };
  if (!INBOX.includes(body.type) || !body.id) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const data: Prisma.ContactInquiryUpdateInput = {};
  if (body.status) data.status = body.status as never;
  if (body.adminNotes !== undefined) data.adminNotes = body.adminNotes;
  if (body.type === "subscribers" && body.isActive !== undefined) {
    const item = await prisma.newsletterSubscriber.update({
      where: { id: body.id },
      data: { isActive: body.isActive },
    });
    return NextResponse.json({ item });
  }

  const item = await (modelFor(body.type) as typeof prisma.contactInquiry).update({
    where: { id: body.id },
    data,
  });
  return NextResponse.json({ item });
}
