import Tokens from "csrf";
import { NextRequest } from "next/server";

function getCsrfSecret(): string {
  const secret = process.env.CSRF_SECRET;
  if (!secret) {
    throw new Error("CSRF_SECRET must be set in environment variables");
  }
  return secret;
}

const tokens = new Tokens();

export function generateCSRFToken(): string {
  return tokens.create(getCsrfSecret());
}

export function verifyCSRFToken(token: string): boolean {
  try {
    return tokens.verify(getCsrfSecret(), token);
  } catch {
    return false;
  }
}

export function getCSRFTokenFromRequest(request: NextRequest): string | null {
  return (
    request.headers.get("X-CSRF-Token") ||
    request.headers.get("X-XSRF-Token") ||
    request.cookies.get("csrf-token")?.value ||
    null
  );
}

export function validateCSRFToken(request: NextRequest): boolean {
  const token = getCSRFTokenFromRequest(request);
  if (!token) return false;
  return verifyCSRFToken(token);
}
