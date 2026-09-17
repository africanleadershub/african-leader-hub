import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyTotp } from "@/lib/auth/totp";
import { verifyBackupCode } from "@/lib/auth/tokens";
import {
  consumeChallenge,
  getActiveChallenge,
  registerChallengeAttempt,
} from "@/lib/auth/challenges";
import { issueSessionResponse } from "@/lib/auth/issue";
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

  const challenge = await getActiveChallenge(parsed.data.challengeId, "LOGIN_2FA");
  if (!challenge?.userId) {
    return NextResponse.json({ error: "This code has expired. Please sign in again." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: challenge.userId } });
  if (!user || !user.active || !user.totpEnabled || !user.totpSecret) {
    return NextResponse.json({ error: "Unable to verify this code" }, { status: 400 });
  }

  const code = parsed.data.code.replace(/\s/g, "").toUpperCase();
  let valid = verifyTotp(user.totpSecret, code, user.email);

  if (!valid) {
    const remaining: string[] = [];
    for (const hash of user.backupCodes) {
      if (!valid && (await verifyBackupCode(code, hash))) {
        valid = true;
      } else {
        remaining.push(hash);
      }
    }
    if (valid) {
      await prisma.user.update({
        where: { id: user.id },
        data: { backupCodes: remaining },
      });
    }
  }

  if (!valid) {
    await registerChallengeAttempt(challenge.id);
    return NextResponse.json({ error: "Invalid authenticator or backup code" }, { status: 401 });
  }

  await consumeChallenge(challenge.id);
  return issueSessionResponse(request, user);
}
