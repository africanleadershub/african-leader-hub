import { NextRequest, NextResponse } from "next/server";
import type { UserRole } from "@/lib/rbac";
import { isAdmin } from "@/lib/rbac";
import { validateCSRFToken } from "./csrf";
import { getSessionFromRequest } from "./session";

export interface AuthenticatedRequest {
  userId: string;
  userEmail: string;
  userRole: UserRole;
  sessionId: string;
}

export async function authenticateRequest(
  request: NextRequest,
  requireCSRF = true
): Promise<
  | { success: true; auth: AuthenticatedRequest }
  | { success: false; response: NextResponse }
> {
  if (requireCSRF && ["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    if (!validateCSRFToken(request)) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "Invalid or missing CSRF token" },
          { status: 403 }
        ),
      };
    }
  }

  const sessionData = await getSessionFromRequest(request);
  if (!sessionData) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Unauthorized", message: "Invalid or expired session" },
        { status: 401 }
      ),
    };
  }

  return {
    success: true,
    auth: {
      userId: sessionData.user.id,
      userEmail: sessionData.user.email,
      userRole: sessionData.user.role,
      sessionId: sessionData.session.id,
    },
  };
}

export async function requireAuth(
  request: NextRequest,
  options: { requireCSRF?: boolean; requireAdmin?: boolean } = {}
): Promise<
  | { success: true; auth: AuthenticatedRequest }
  | { success: false; response: NextResponse }
> {
  const authResult = await authenticateRequest(request, options.requireCSRF ?? true);
  if (!authResult.success) return authResult;

  if (options.requireAdmin && !isAdmin(authResult.auth.userRole)) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Forbidden", message: "Admin access required" },
        { status: 403 }
      ),
    };
  }

  return authResult;
}
