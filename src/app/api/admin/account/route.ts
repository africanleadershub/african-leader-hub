import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;

  const user = await prisma.user.findUnique({
    where: { id: auth.auth.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      totpEnabled: true,
      lastLogin: true,
      createdAt: true,
      _count: { select: { passkeys: true } },
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      totpEnabled: user.totpEnabled,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      passkeyCount: user._count.passkeys,
    },
  });
}

const updateSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
});

export async function PATCH(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid first and last name" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: auth.auth.userId },
    data: {
      firstName: parsed.data.firstName.trim(),
      lastName: parsed.data.lastName.trim(),
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });

  return NextResponse.json({ success: true, user });
}
