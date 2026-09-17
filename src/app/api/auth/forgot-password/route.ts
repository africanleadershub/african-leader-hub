import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimitReset } from "@/lib/auth/rate-limit";
import { createChallenge } from "@/lib/auth/challenges";
import { appUrl } from "@/lib/auth/tokens";
import { sendAuthEmail } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  const limited = await rateLimitReset(request);
  if (!limited.success) return limited.response;

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email } });

  if (user?.active) {
    const { challenge, otp } = await createChallenge({
      type: "PASSWORD_RESET",
      email: user.email,
      userId: user.id,
      ttlMinutes: 30,
      withOtp: true,
    });
    const confirmUrl = `${appUrl()}/confirm-otp?challengeId=${challenge.id}&purpose=reset`;
    try {
      await sendAuthEmail({
        to: user.email,
        subject: "Reset your African Leaders Hub password",
        heading: "Password reset",
        bodyHtml: `
          <p>Hi ${user.firstName},</p>
          <p>Use this one-time code to confirm your password reset:</p>
          <div class="code">${otp}</div>
          <p style="text-align:center">
            <a class="button" href="${confirmUrl}">Confirm code</a>
          </p>
          <p>This code expires in 30 minutes. If you did not request a reset, you can ignore this email.</p>
        `,
      });
    } catch (error) {
      console.error("Password reset email failed:", error);
    }
    return NextResponse.json({
      success: true,
      challengeId: challenge.id,
      message: "If an account exists, we sent a verification code.",
    });
  }

  return NextResponse.json({
    success: true,
    message: "If an account exists, we sent a verification code.",
  });
}
