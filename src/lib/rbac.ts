export type UserRole = "ADMIN" | "EDITOR";

const ROLE_HIERARCHY: Record<UserRole, number> = {
  ADMIN: 2,
  EDITOR: 1,
};

const ADMIN_ONLY_PREFIXES = ["/admin/users", "/admin/settings"];

export function hasMinimumRole(
  userRole: UserRole | undefined,
  requiredRole: UserRole
): boolean {
  if (!userRole) return false;
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function canAccessRoute(
  userRole: UserRole | undefined,
  route: string
): boolean {
  if (!userRole) return false;
  if (route === "/admin" || route.startsWith("/admin/dashboard") || route.startsWith("/admin/account") || route.startsWith("/admin/profile")) {
    return true;
  }
  if (ADMIN_ONLY_PREFIXES.some((prefix) => route.startsWith(prefix))) {
    return userRole === "ADMIN";
  }
  return hasMinimumRole(userRole, "EDITOR");
}

export function isAdmin(userRole: UserRole | undefined): boolean {
  return userRole === "ADMIN";
}
