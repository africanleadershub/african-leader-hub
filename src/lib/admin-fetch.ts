"use client";

export function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.split("; ").find((row) => row.startsWith("csrf-token="));
  return match ? decodeURIComponent(match.split("=")[1] || "") : "";
}

export async function adminFetch(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  const csrf = getCsrfToken();
  if (csrf) headers.set("X-CSRF-Token", csrf);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    window.location.href = "/login";
  }

  return response;
}
