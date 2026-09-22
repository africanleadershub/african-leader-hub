import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { hashPassword, validatePasswordStrength, verifyPassword } from "@/lib/auth/password";
import { z } from "zod";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter your current and new password" }, { status: 400 });
  }

  const strength = validatePasswordStrength(parsed.data.newPassword);
  if (!strength.valid) {
    return NextResponse.json({ error: strength.errors[0] }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: auth.auth.userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const matches = await verifyPassword(parsed.data.currentPassword, user.password);
  if (!matches) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await hashPassword(parsed.data.newPassword),
      requirePasswordReset: false,
    },
  });

  return NextResponse.json({ success: true, message: "Password updated" });
}
