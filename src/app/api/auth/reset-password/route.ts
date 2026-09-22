import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { getActiveChallengeByToken, consumeChallenge } from "@/lib/auth/challenges";
import { z } from "zod";

const schema = z.object({
  token: z.string().min(16),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid reset request" }, { status: 400 });
  }

  const strength = validatePasswordStrength(parsed.data.password);
  if (!strength.valid) {
    return NextResponse.json({ error: strength.errors[0] }, { status: 400 });
  }

  const challenge = await getActiveChallengeByToken(parsed.data.token, "PASSWORD_RESET");
  if (!challenge?.userId || !challenge.verifiedAt) {
    return NextResponse.json(
      { error: "Reset is not confirmed yet. Verify the code first." },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: challenge.userId },
    data: {
      password: await hashPassword(parsed.data.password),
      requirePasswordReset: false,
    },
  });
  await prisma.session.updateMany({
    where: { userId: challenge.userId, isActive: true },
    data: { isActive: false },
  });
  await consumeChallenge(challenge.id);

  return NextResponse.json({
    success: true,
    message: "Password updated. Sign in with your new password.",
  });
}
