import { prisma } from "@/lib/prisma";
import { sendAuthEmail } from "@/lib/email";
import { createChallenge, markChallengeVerified } from "./challenges";
import { appUrl } from "./tokens";

const INVITE_TTL_HOURS = 72;

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function sendAccountInvite(
  user: { id: string; email: string; firstName: string; role: string },
  invitedBy?: string
): Promise<boolean> {
  await prisma.authChallenge.updateMany({
    where: { userId: user.id, type: "PASSWORD_RESET", consumedAt: null },
    data: { consumedAt: new Date() },
  });

  const { challenge, token } = await createChallenge({
    type: "PASSWORD_RESET",
    email: user.email,
    userId: user.id,
    ttlMinutes: INVITE_TTL_HOURS * 60,
    metadata: { purpose: "invite" },
  });
  // The link goes only to the account's inbox, so opening it is the verification step.
  await markChallengeVerified(challenge.id);

  const setupUrl = `${appUrl()}/reset-password?token=${token}&welcome=1`;
  const role = user.role === "ADMIN" ? "an administrator" : "an editor";

  try {
    await sendAuthEmail({
      to: user.email,
      subject: "Your African Leaders Hub console account",
      heading: "Welcome to the console",
      bodyHtml: `
        <p>Hi ${escapeHtml(user.firstName)},</p>
        <p>${invitedBy ? escapeHtml(invitedBy) : "An administrator"} created an account for you as ${role} on the African Leaders Hub console.</p>
        <p>Before you sign in for the first time, choose your own password:</p>
        <p style="text-align:center">
          <a class="button" href="${setupUrl}">Set your password</a>
        </p>
        <p>This link works once and expires in ${INVITE_TTL_HOURS} hours. If it expires, use “Forgot password?” on the sign-in page.</p>
        <p>If you were not expecting this, you can ignore this email.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("Account invite email failed:", error);
    return false;
  }
}
