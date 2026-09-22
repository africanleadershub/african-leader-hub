import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@/lib/rbac";
import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenMaxAge,
  verifyAccessToken,
  verifyRefreshToken,
} from "./jwt";

export interface SessionInfo {
  ipAddress?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  os?: string;
}

export function extractSessionInfo(request: NextRequest): SessionInfo {
  const userAgent = request.headers.get("user-agent") || undefined;
  const forwarded = request.headers.get("x-forwarded-for");
  const ipAddress = forwarded ? forwarded.split(",")[0]?.trim() : undefined;

  let device: string | undefined;
  let browser: string | undefined;
  let os: string | undefined;

  if (userAgent) {
    if (/mobile|android|iphone|ipad/i.test(userAgent)) {
      device = "mobile";
    } else {
      device = "desktop";
    }

    if (/chrome/i.test(userAgent) && !/edge|edg/i.test(userAgent)) browser = "Chrome";
    else if (/firefox/i.test(userAgent)) browser = "Firefox";
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = "Safari";
    else if (/edge|edg/i.test(userAgent)) browser = "Edge";

    if (/windows/i.test(userAgent)) os = "Windows";
    else if (/macintosh|mac os x/i.test(userAgent)) os = "macOS";
    else if (/linux/i.test(userAgent)) os = "Linux";
    else if (/android/i.test(userAgent)) os = "Android";
    else if (/iphone|ipad|ios/i.test(userAgent)) os = "iOS";
  }

  return { ipAddress, userAgent, device, browser, os };
}

export async function createSession(
  userId: string,
  userEmail: string,
  userRole: UserRole,
  sessionInfo: SessionInfo
) {
  const expiresAt = new Date(Date.now() + getRefreshTokenMaxAge() * 1000);

  const session = await prisma.session.create({
    data: {
      userId,
      token: `pending-${crypto.randomUUID()}`,
      expiresAt,
      ...sessionInfo,
    },
  });

  const accessToken = await generateAccessToken({
    userId,
    email: userEmail,
    role: userRole,
    sessionId: session.id,
  });
  const refreshToken = await generateRefreshToken({
    userId,
    sessionId: session.id,
  });

  const updatedSession = await prisma.session.update({
    where: { id: session.id },
    data: { token: accessToken, refreshToken },
  });

  return { session: updatedSession, accessToken, refreshToken };
}

export async function validateSession(token: string) {
  const payload = await verifyAccessToken(token);
  if (!payload) return null;

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  });

  if (!session || !session.isActive || session.expiresAt < new Date() || !session.user.active) {
    return null;
  }

  await prisma.session.update({
    where: { id: session.id },
    data: { lastActivity: new Date() },
  });

  return { session, user: session.user, payload };
}

export async function refreshSession(refreshToken: string) {
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) return null;

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  });

  if (
    !session ||
    !session.isActive ||
    session.expiresAt < new Date() ||
    session.refreshToken !== refreshToken ||
    !session.user.active
  ) {
    return null;
  }

  const accessToken = await generateAccessToken({
    userId: session.user.id,
    email: session.user.email,
    role: session.user.role,
    sessionId: session.id,
  });
  const newRefreshToken = await generateRefreshToken({
    userId: session.user.id,
    sessionId: session.id,
  });

  const updatedSession = await prisma.session.update({
    where: { id: session.id },
    data: {
      token: accessToken,
      refreshToken: newRefreshToken,
      lastActivity: new Date(),
    },
  });

  return {
    session: updatedSession,
    user: session.user,
    accessToken,
    refreshToken: newRefreshToken,
  };
}

export async function revokeSession(sessionId: string) {
  await prisma.session.update({
    where: { id: sessionId },
    data: { isActive: false },
  });
}

export async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get("access-token")?.value;
  if (!token) return null;
  return validateSession(token);
}
