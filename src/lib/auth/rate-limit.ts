import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextRequest, NextResponse } from "next/server";

const loginLimiter = new RateLimiterMemory({
  points: 8,
  duration: 15 * 60,
});

const resetLimiter = new RateLimiterMemory({
  points: 5,
  duration: 15 * 60,
});

const apiLimiter = new RateLimiterMemory({
  points: 80,
  duration: 60,
});

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

export async function rateLimitLogin(request: NextRequest): Promise<
  { success: true } | { success: false; response: NextResponse }
> {
  try {
    await loginLimiter.consume(clientKey(request));
    return { success: true };
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      ),
    };
  }
}

export async function rateLimitApi(request: NextRequest): Promise<
  { success: true } | { success: false; response: NextResponse }
> {
  try {
    await apiLimiter.consume(clientKey(request));
    return { success: true };
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      ),
    };
  }
}

export async function rateLimitReset(request: NextRequest): Promise<
  { success: true } | { success: false; response: NextResponse }
> {
  try {
    await resetLimiter.consume(clientKey(request));
    return { success: true };
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Too many reset attempts. Please try again later." },
        { status: 429 }
      ),
    };
  }
}
