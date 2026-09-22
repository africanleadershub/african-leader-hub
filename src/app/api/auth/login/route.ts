import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { rateLimitLogin } from "@/lib/auth/rate-limit";
import { createChallenge } from "@/lib/auth/challenges";
import { issueSessionResponse } from "@/lib/auth/issue";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const limited = await rateLimitLogin(request);
    if (!limited.success) return limited.response;

    const parsed = loginSchema.safeParse(await request.json());
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

    if (user.totpEnabled) {
      const { challenge } = await createChallenge({
        type: "LOGIN_2FA",
        email: user.email,
        userId: user.id,
        ttlMinutes: 10,
      });
      return NextResponse.json({
        success: true,
        requiresTwoFactor: true,
        challengeId: challenge.id,
        methods: ["authenticator", "backup"],
      });
    }

    return issueSessionResponse(request, user);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
