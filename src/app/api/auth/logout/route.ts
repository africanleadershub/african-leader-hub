import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth/middleware";
import { revokeSession } from "@/lib/auth/session";
import { clearAuthCookies } from "@/lib/auth/cookies";

export async function POST(request: NextRequest) {
  const auth = await authenticateRequest(request, false);
  if (auth.success) {
    await revokeSession(auth.auth.sessionId);
  }
  await clearAuthCookies();
  return NextResponse.json({ success: true });
}
