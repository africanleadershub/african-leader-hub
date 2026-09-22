import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { isAdmin } from "@/lib/rbac";
import type { UserRole } from "@/lib/rbac";

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;
  if (!isAdmin(auth.auth.userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      active: true,
      lastLogin: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ users });
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

  const strength = validatePasswordStrength(body.password);
  if (!strength.valid) {
    return NextResponse.json({ error: strength.errors[0] }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email: body.email.toLowerCase().trim(),
      firstName: body.firstName,
      lastName: body.lastName,
      password: await hashPassword(body.password),
      role: body.role === "ADMIN" ? "ADMIN" : "EDITOR",
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      active: true,
    },
  });

  return NextResponse.json({ user }, { status: 201 });
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
  };
  const data: Record<string, unknown> = {};
  if (body.active !== undefined) data.active = body.active;
  if (body.role) data.role = body.role;
  if (body.password) {
    const strength = validatePasswordStrength(body.password);
    if (!strength.valid) {
      return NextResponse.json({ error: strength.errors[0] }, { status: 400 });
    }
    data.password = await hashPassword(body.password);
  }
  const user = await prisma.user.update({
    where: { id: body.id },
    data,
    select: { id: true, email: true, firstName: true, lastName: true, role: true, active: true },
  });
  return NextResponse.json({ user });
}
