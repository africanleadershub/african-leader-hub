import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, extractSessionInfo } from "./session";
import { generateCSRFToken } from "./csrf";
import { applyAuthCookies } from "./cookies";
import type { UserRole } from "@/lib/rbac";

type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  requirePasswordReset: boolean;
};

export async function issueSessionResponse(request: NextRequest, user: AuthUser) {
  const { accessToken, refreshToken } = await createSession(
    user.id,
    user.email,
    user.role,
    extractSessionInfo(request)
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  const csrfToken = generateCSRFToken();
  const redirectTo = user.requirePasswordReset ? "/change-password" : "/admin/dashboard";
  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    requirePasswordReset: user.requirePasswordReset,
    redirectTo,
    csrfToken,
  });

  return applyAuthCookies(response, { accessToken, refreshToken, csrfToken });
}
