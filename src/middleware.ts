import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { canAccessRoute } from "@/lib/rbac";

const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_AUTH_ROUTES = new Set(["/login", "/forgot-password", "/confirm-otp", "/reset-password"]);
const AUTH_ROUTES = new Set([...PUBLIC_AUTH_ROUTES, "/change-password"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = AUTH_ROUTES.has(pathname);
  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.has(pathname);
  const token = request.cookies.get("access-token")?.value;
  const payload = token ? await verifyAccessToken(token) : null;

  if (isPublicAuthRoute && payload) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (pathname === "/change-password" && !payload) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isAdminRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  if (isAdminRoute) {
    if (!payload) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!canAccessRoute(payload.role, pathname)) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/forgot-password",
    "/confirm-otp",
    "/reset-password",
    "/change-password",
  ],
};
