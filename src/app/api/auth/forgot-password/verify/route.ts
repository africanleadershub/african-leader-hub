import { NextRequest, NextResponse } from "next/server";
import {
  getActiveChallenge,
  markChallengeVerified,
  registerChallengeAttempt,
} from "@/lib/auth/challenges";
import { hashValue } from "@/lib/auth/tokens";
import { z } from "zod";

const schema = z.object({
  challengeId: z.string().min(1),
  code: z.string().min(6),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid code" }, { status: 400 });
  }

  const challenge = await getActiveChallenge(parsed.data.challengeId, "PASSWORD_RESET");
  if (!challenge) {
    return NextResponse.json({ error: "This code has expired. Request a new one." }, { status: 400 });
  }

  if (challenge.codeHash !== hashValue(parsed.data.code.replace(/\s/g, ""))) {
    await registerChallengeAttempt(challenge.id);
    return NextResponse.json({ error: "Invalid verification code" }, { status: 401 });
  }

  await markChallengeVerified(challenge.id);
  return NextResponse.json({
    success: true,
    resetToken: challenge.token,
    redirectTo: `/reset-password?token=${challenge.token}`,
  });
}
