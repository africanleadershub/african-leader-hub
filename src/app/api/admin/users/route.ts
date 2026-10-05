import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { sendAccountInvite } from "@/lib/auth/invite";
import { isAdmin } from "@/lib/rbac";
import type { UserRole } from "@/lib/rbac";

const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  active: true,
  requirePasswordReset: true,
  lastLogin: true,
  createdAt: true,
} as const;

async function inviterName(userId: string) {
  const inviter = await prisma.user.findUnique({
    where: { id: userId },
    select: { firstName: true, lastName: true },
  });
  return inviter ? `${inviter.firstName} ${inviter.lastName}`.trim() : undefined;
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;
  if (!isAdmin(auth.auth.userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: userSelect,
  });
  return NextResponse.json({ users, currentUserId: auth.auth.userId });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  if (!isAdmin(auth.auth.userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: UserRole;
  };

  const email = String(body.email || "").toLowerCase().trim();
  if (!email || !String(body.firstName || "").trim() || !String(body.lastName || "").trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const strength = validatePasswordStrength(body.password || "");
  if (!strength.valid) {
    return NextResponse.json({ error: strength.errors[0] }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) {
    return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      password: await hashPassword(body.password),
      role: body.role === "ADMIN" ? "ADMIN" : "EDITOR",
      requirePasswordReset: true,
    },
    select: userSelect,
  });

  const inviteSent = await sendAccountInvite(user, await inviterName(auth.auth.userId));

  return NextResponse.json({ user, inviteSent }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  if (!isAdmin(auth.auth.userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = (await request.json()) as {
    id: string;
    active?: boolean;
    role?: UserRole;
    password?: string;
    resendInvite?: boolean;
  };

  const target = await prisma.user.findUnique({ where: { id: String(body.id || "") }, select: userSelect });
  if (!target) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (body.resendInvite) {
    if (!target.active) {
      return NextResponse.json({ error: "Activate this user before resending the invite" }, { status: 400 });
    }
    const inviteSent = await sendAccountInvite(target, await inviterName(auth.auth.userId));
    if (!inviteSent) {
      return NextResponse.json({ error: "The invite email could not be sent" }, { status: 502 });
    }
    return NextResponse.json({ user: target, inviteSent });
  }

  const isSelf = target.id === auth.auth.userId;
  const deactivating = body.active === false && target.active;
  const demoting = body.role === "EDITOR" && target.role === "ADMIN";

  if (isSelf && (deactivating || demoting)) {
    return NextResponse.json(
      { error: deactivating ? "You cannot deactivate your own account" : "You cannot remove your own admin role" },
      { status: 400 }
    );
  }

  if (target.role === "ADMIN" && target.active && (deactivating || demoting)) {
    const otherAdmins = await prisma.user.count({
      where: { role: "ADMIN", active: true, id: { not: target.id } },
    });
    if (otherAdmins === 0) {
      return NextResponse.json({ error: "Keep at least one active administrator" }, { status: 400 });
    }
  }

  const data: Record<string, unknown> = {};
  if (body.active !== undefined) data.active = body.active;
  if (body.role === "ADMIN" || body.role === "EDITOR") data.role = body.role;
  if (body.password) {
    const strength = validatePasswordStrength(body.password);
    if (!strength.valid) {
      return NextResponse.json({ error: strength.errors[0] }, { status: 400 });
    }
    data.password = await hashPassword(body.password);
  }

  const user = await prisma.user.update({
    where: { id: target.id },
    data,
    select: userSelect,
  });

  if (deactivating) {
    await prisma.session.updateMany({
      where: { userId: target.id, isActive: true },
      data: { isActive: false },
    });
    await prisma.authChallenge.updateMany({
      where: { userId: target.id, consumedAt: null },
      data: { consumedAt: new Date() },
    });
  }

  return NextResponse.json({ user });
}
