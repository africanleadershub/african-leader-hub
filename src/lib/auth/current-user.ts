import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "./jwt";
import type { UserRole } from "@/lib/rbac";

export type CurrentUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  requirePasswordReset: boolean;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token")?.value;
  if (!token) return null;

  const payload = await verifyAccessToken(token);
  if (!payload) return null;

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          active: true,
          requirePasswordReset: true,
        },
      },
    },
  });

  if (!session || !session.isActive || session.expiresAt < new Date() || !session.user.active) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
    role: session.user.role,
    requirePasswordReset: session.user.requirePasswordReset,
  };
}

export function displayName(user: { firstName: string; lastName: string }): string {
  return `${user.firstName} ${user.lastName}`.trim();
}
