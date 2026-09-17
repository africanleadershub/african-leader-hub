import { SignJWT, jwtVerify, type JWTPayload as JoseJWTPayload } from "jose";
import type { UserRole } from "@/lib/rbac";

function getSecret(name: "JWT_SECRET" | "JWT_REFRESH_SECRET"): Uint8Array {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be set in environment variables`);
  }
  return new TextEncoder().encode(value);
}

const ISSUER = "african-leaders-hub";
const AUDIENCE = "alh-admin";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export interface AccessTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId: string;
}

export interface RefreshTokenPayload {
  userId: string;
  sessionId: string;
}

function parseTimeToSeconds(timeString: string): number {
  const match = timeString.match(/^(\d+)([smhd])$/);
  if (!match) return 60 * 60 * 24;
  const value = Number(match[1]);
  const unit = match[2];
  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 60 * 60 * 24;
    default:
      return 60 * 60 * 24;
  }
}

export function getAccessTokenMaxAge(): number {
  return parseTimeToSeconds(JWT_EXPIRES_IN);
}

export function getRefreshTokenMaxAge(): number {
  return parseTimeToSeconds(JWT_REFRESH_EXPIRES_IN);
}

export async function generateAccessToken(
  payload: AccessTokenPayload
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(getSecret("JWT_SECRET"));
}

export async function generateRefreshToken(
  payload: RefreshTokenPayload
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(JWT_REFRESH_EXPIRES_IN)
    .sign(getSecret("JWT_REFRESH_SECRET"));
}

export async function verifyAccessToken(
  token: string
): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret("JWT_SECRET"), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    return toAccessPayload(payload);
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string
): Promise<RefreshTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret("JWT_REFRESH_SECRET"), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    if (typeof payload.userId !== "string" || typeof payload.sessionId !== "string") {
      return null;
    }
    return { userId: payload.userId, sessionId: payload.sessionId };
  } catch {
    return null;
  }
}

function toAccessPayload(payload: JoseJWTPayload): AccessTokenPayload | null {
  if (
    typeof payload.userId !== "string" ||
    typeof payload.email !== "string" ||
    (payload.role !== "ADMIN" && payload.role !== "EDITOR") ||
    typeof payload.sessionId !== "string"
  ) {
    return null;
  }
  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    sessionId: payload.sessionId,
  };
}
