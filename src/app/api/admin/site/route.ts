import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { isAdmin } from "@/lib/rbac";

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

  const [settings, identity] = await Promise.all([
    body.settings
      ? prisma.websiteSettings.upsert({
          where: { id: "default" },
          update: body.settings,
          create: { id: "default", ...body.settings },
          include: { logoAsset: true },
        })
      : prisma.websiteSettings.findUnique({ where: { id: "default" }, include: { logoAsset: true } }),
    body.identity
      ? prisma.organizationIdentity.upsert({
          where: { id: "default" },
          update: body.identity,
          create: { id: "default", ...body.identity },
          include: { heroAsset: true },
        })
      : prisma.organizationIdentity.findUnique({ where: { id: "default" }, include: { heroAsset: true } }),
  ]);

  return NextResponse.json({ settings, identity });
}
