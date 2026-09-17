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
    orderBy: type === "subscribers" ? { subscribedAt: "desc" } : { createdAt: "desc" },
    take: 200,
    ...(include ? { include } : {}),
  } as never);

  if (type === "applications") {
    const applications = items as unknown as Array<{
      resumeAssetId?: string | null;
      coverLetterAssetId?: string | null;
      additionalAssetIds?: string[];
    }>;
    const assetIds = applications.flatMap((item) =>
      [item.resumeAssetId, item.coverLetterAssetId, ...(item.additionalAssetIds || [])].filter(
        (id): id is string => Boolean(id)
      )
    );
    const assets = assetIds.length
      ? await prisma.asset.findMany({
          where: { id: { in: assetIds } },
          select: { id: true, url: true, originalFilename: true, title: true },
        })
      : [];
    const byId = new Map(assets.map((asset) => [asset.id, asset]));
    return NextResponse.json({
      items: applications.map((item) => ({
        ...item,
        documents: [
          item.resumeAssetId
            ? { label: "Resume", url: byId.get(item.resumeAssetId)?.url, name: byId.get(item.resumeAssetId)?.originalFilename }
            : null,
          item.coverLetterAssetId
            ? {
                label: "Cover letter",
                url: byId.get(item.coverLetterAssetId)?.url,
                name: byId.get(item.coverLetterAssetId)?.originalFilename,
              }
            : null,
          ...(item.additionalAssetIds || []).map((id) => ({
            label: "Document",
            url: byId.get(id)?.url,
            name: byId.get(id)?.originalFilename || byId.get(id)?.title,
          })),
        ].filter((doc) => doc?.url),
      })),
    });
  }

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
