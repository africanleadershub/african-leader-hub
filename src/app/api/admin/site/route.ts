import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { isAdmin } from "@/lib/rbac";
import { Prisma } from "@/generated/prisma/client";

const SETTINGS_FIELDS = [
  "siteName",
  "tagline",
  "addressLine1",
  "addressLine2",
  "city",
  "country",
  "phonePrimary",
  "phoneSecondary",
  "emailPrimary",
  "emailSecondary",
  "businessHours",
  "mapEmbedUrl",
  "socialLinks",
  "logoAssetId",
] as const;

const IDENTITY_FIELDS = ["mission", "vision", "background", "values", "heroAssetId"] as const;

function pick<T extends string>(source: Record<string, unknown>, keys: readonly T[]) {
  const next: Record<string, unknown> = {};
  for (const key of keys) {
    if (source[key] !== undefined) next[key] = source[key];
  }
  return next;
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;
  if (!isAdmin(auth.auth.userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [settings, identity] = await Promise.all([
    prisma.websiteSettings.findUnique({ where: { id: "default" }, include: { logoAsset: true } }),
    prisma.organizationIdentity.findUnique({ where: { id: "default" }, include: { heroAsset: true } }),
  ]);

  return NextResponse.json({ settings, identity });
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  if (!isAdmin(auth.auth.userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    settings?: Record<string, unknown>;
    identity?: Record<string, unknown>;
  };

  const settingsData = body.settings ? pick(body.settings, SETTINGS_FIELDS) : null;
  const identityData = body.identity ? pick(body.identity, IDENTITY_FIELDS) : null;

  const [settings, identity] = await Promise.all([
    settingsData
      ? prisma.websiteSettings.upsert({
          where: { id: "default" },
          update: settingsData as Prisma.WebsiteSettingsUncheckedUpdateInput,
          create: { id: "default", ...settingsData } as Prisma.WebsiteSettingsUncheckedCreateInput,
          include: { logoAsset: true },
        })
      : prisma.websiteSettings.findUnique({ where: { id: "default" }, include: { logoAsset: true } }),
    identityData
      ? prisma.organizationIdentity.upsert({
          where: { id: "default" },
          update: identityData as Prisma.OrganizationIdentityUncheckedUpdateInput,
          create: { id: "default", ...identityData } as Prisma.OrganizationIdentityUncheckedCreateInput,
          include: { heroAsset: true },
        })
      : prisma.organizationIdentity.findUnique({ where: { id: "default" }, include: { heroAsset: true } }),
  ]);

  return NextResponse.json({ settings, identity });
}
