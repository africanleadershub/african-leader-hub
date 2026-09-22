import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAccessTokenMaxAge, getRefreshTokenMaxAge } from "./jwt";

function cookieOptions(maxAge: number, httpOnly = true) {
  return {
    httpOnly,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge,
    path: "/",
  };
}

export async function setAuthCookies(params: {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
}) {
  const cookieStore = await cookies();
  cookieStore.set("access-token", params.accessToken, cookieOptions(getAccessTokenMaxAge()));
  cookieStore.set(
    "refresh-token",
    params.refreshToken,
    cookieOptions(getRefreshTokenMaxAge())
  );
  cookieStore.set(
    "csrf-token",
    params.csrfToken,
    cookieOptions(getRefreshTokenMaxAge(), false)
  );
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
  cookieStore.delete("refresh-token");
  cookieStore.delete("csrf-token");
}

export function clearAuthCookiesOnResponse(response: NextResponse) {
  response.cookies.delete("access-token");
  response.cookies.delete("refresh-token");
  response.cookies.delete("csrf-token");
  return response;
}

export function applyAuthCookies(
  response: NextResponse,
  params: { accessToken: string; refreshToken: string; csrfToken: string }
) {
  response.cookies.set(
    "access-token",
    params.accessToken,
    cookieOptions(getAccessTokenMaxAge())
  );
  response.cookies.set(
    "refresh-token",
    params.refreshToken,
    cookieOptions(getRefreshTokenMaxAge())
  );
  response.cookies.set(
    "csrf-token",
    params.csrfToken,
    cookieOptions(getRefreshTokenMaxAge(), false)
  );
  return response;
}
