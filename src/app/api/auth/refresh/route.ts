import { NextRequest, NextResponse } from "next/server";
import { refreshSession } from "@/lib/auth/session";
import { generateCSRFToken } from "@/lib/auth/csrf";
import { applyAuthCookies } from "@/lib/auth/cookies";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh-token")?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const refreshed = await refreshSession(refreshToken);
  if (!refreshed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const csrfToken = generateCSRFToken();
  const response = NextResponse.json({
    success: true,
    user: {
      id: refreshed.user.id,
      email: refreshed.user.email,
      firstName: refreshed.user.firstName,
      lastName: refreshed.user.lastName,
      role: refreshed.user.role,
    },
    csrfToken,
  });

  return applyAuthCookies(response, {
    accessToken: refreshed.accessToken,
    refreshToken: refreshed.refreshToken,
    csrfToken,
  });
}
