import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createChallenge, getActiveChallengeByToken } from "@/lib/auth/challenges";
import {
  authenticationOptions,
  challengeFromClientDataJSON,
  verifyAuthentication,
} from "@/lib/auth/webauthn";
import { rateLimitLogin } from "@/lib/auth/rate-limit";
import { issueSessionResponse } from "@/lib/auth/issue";
import type { AuthenticationResponseJSON } from "@simplewebauthn/server";
import { z } from "zod";

const optionsSchema = z.object({
  email: z.string().email().optional(),
});

export async function POST(request: NextRequest) {
  const limited = await rateLimitLogin(request);
  if (!limited.success) return limited.response;

  const parsed = optionsSchema.safeParse(await request.json().catch(() => ({})));
  const email = parsed.success ? parsed.data.email?.toLowerCase() : undefined;

  let allowCredentialIds: string[] = [];
  if (email) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { passkeys: true },
    });
    allowCredentialIds = user?.passkeys.map((item) => item.credentialId) || [];
  }

  const options = await authenticationOptions({ allowCredentialIds });
  await createChallenge({
    type: "PASSKEY_LOGIN",
    email: email || "discoverable",
    userId: undefined,
    ttlMinutes: 5,
    token: options.challenge,
  });

  return NextResponse.json({ options });
}

export async function PUT(request: NextRequest) {
  const limited = await rateLimitLogin(request);
  if (!limited.success) return limited.response;

  const body = (await request.json()) as { credential?: AuthenticationResponseJSON };
  if (!body.credential?.id) {
    return NextResponse.json({ error: "Missing passkey assertion" }, { status: 400 });
  }

  const passkey = await prisma.passkeyCredential.findUnique({
    where: { credentialId: body.credential.id },
    include: { user: true },
  });
  if (!passkey || !passkey.user.active) {
    return NextResponse.json({ error: "Unknown passkey" }, { status: 401 });
  }

  const expectedChallenge = challengeFromClientDataJSON(body.credential.response.clientDataJSON);
  const challenge = expectedChallenge
    ? await getActiveChallengeByToken(expectedChallenge, "PASSKEY_LOGIN")
    : null;
  if (!challenge) {
    return NextResponse.json({ error: "Passkey sign-in expired. Try again." }, { status: 400 });
  }

  const verification = await verifyAuthentication(body.credential, challenge.token, {
    id: passkey.credentialId,
    publicKey: passkey.publicKey,
    counter: passkey.counter,
    transports: passkey.transports,
  });
  if (!verification.verified) {
    return NextResponse.json({ error: "Could not verify this passkey" }, { status: 401 });
  }

  await prisma.passkeyCredential.update({
    where: { id: passkey.id },
    data: {
      counter: verification.authenticationInfo.newCounter,
      lastUsedAt: new Date(),
    },
  });
  await prisma.authChallenge.update({
    where: { id: challenge.id },
    data: { consumedAt: new Date() },
  });

  return issueSessionResponse(request, passkey.user);
}
