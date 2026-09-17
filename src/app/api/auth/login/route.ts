import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, extractSessionInfo } from "@/lib/auth/session";
import { rateLimitLogin } from "@/lib/auth/rate-limit";
import { generateCSRFToken } from "@/lib/auth/csrf";
import { applyAuthCookies } from "@/lib/auth/cookies";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const limited = await rateLimitLogin(request);
    if (!limited.success) return limited.response;

    const body: unknown = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.active) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const passwordValid = await verifyPassword(parsed.data.password, user.password);
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

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
      csrfToken,
    });

    return applyAuthCookies(response, { accessToken, refreshToken, csrfToken });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
