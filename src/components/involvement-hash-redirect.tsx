"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HASH_ROUTES: Record<string, string> = {
  "#donate": "/donate",
  "#volunteer": "/volunteer",
  "#partnerships": "/partner",
  "#partner": "/partner",
};

export function InvolvementHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const destination = HASH_ROUTES[window.location.hash];
    if (destination) router.replace(destination);
  }, [router]);

  return null;
}
