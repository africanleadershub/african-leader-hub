import { prisma } from "@/lib/prisma";
import type { AuthChallengeType } from "@/generated/prisma/client";
import { createOtp, createToken, hashValue } from "./tokens";

const MAX_ATTEMPTS = 5;

export async function createChallenge(params: {
  type: AuthChallengeType;
  email: string;
  userId?: string;
  ttlMinutes?: number;
  withOtp?: boolean;
  token?: string;
  metadata?: Record<string, string>;
}) {
  const otp = params.withOtp ? createOtp() : "";
  const token = params.token || createToken();
  const challenge = await prisma.authChallenge.create({
    data: {
      type: params.type,
      email: params.email.toLowerCase(),
      userId: params.userId,
      codeHash: otp ? hashValue(otp) : "",
      token,
      expiresAt: new Date(Date.now() + (params.ttlMinutes ?? 15) * 60 * 1000),
      metadata: params.metadata,
    },
  });
  return { challenge, otp, token };
}

export async function getActiveChallenge(id: string, type?: AuthChallengeType) {
  const challenge = await prisma.authChallenge.findUnique({ where: { id } });
  if (!challenge || challenge.consumedAt || challenge.expiresAt < new Date()) {
    return null;
  }
  if (type && challenge.type !== type) return null;
  return challenge;
}

export async function getActiveChallengeByToken(token: string, type?: AuthChallengeType) {
  const challenge = await prisma.authChallenge.findUnique({ where: { token } });
  if (!challenge || challenge.consumedAt || challenge.expiresAt < new Date()) {
    return null;
  }
  if (type && challenge.type !== type) return null;
  return challenge;
}

export async function registerChallengeAttempt(id: string) {
  const challenge = await prisma.authChallenge.update({
    where: { id },
    data: { attempts: { increment: 1 } },
  });
  if (challenge.attempts >= MAX_ATTEMPTS) {
    await prisma.authChallenge.update({
      where: { id },
      data: { consumedAt: new Date() },
    });
    return null;
  }
  return challenge;
}

export async function markChallengeVerified(id: string) {
  return prisma.authChallenge.update({
    where: { id },
    data: { verifiedAt: new Date() },
  });
}

export async function consumeChallenge(id: string) {
  return prisma.authChallenge.update({
    where: { id },
    data: { consumedAt: new Date(), verifiedAt: new Date() },
  });
}
