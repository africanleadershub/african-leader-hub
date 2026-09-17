import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;

  const sessions = await prisma.session.findMany({
    where: { userId: auth.auth.userId, isActive: true, expiresAt: { gt: new Date() } },
    orderBy: { lastActivity: "desc" },
    select: {
      id: true,
      ipAddress: true,
      userAgent: true,
      device: true,
      browser: true,
      os: true,
      lastActivity: true,
      createdAt: true,
      expiresAt: true,
    },
  });

  return NextResponse.json({
    currentSessionId: auth.auth.sessionId,
    sessions: sessions.map((session) => ({
      ...session,
      current: session.id === auth.auth.sessionId,
    })),
  });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing session id" }, { status: 400 });

  await prisma.session.updateMany({
    where: { id, userId: auth.auth.userId },
    data: { isActive: false },
  });
  return NextResponse.json({ success: true, signedOut: id === auth.auth.sessionId });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  await prisma.session.updateMany({
    where: {
      userId: auth.auth.userId,
      isActive: true,
      id: { not: auth.auth.sessionId },
    },
    data: { isActive: false },
  });
  return NextResponse.json({ success: true });
}
