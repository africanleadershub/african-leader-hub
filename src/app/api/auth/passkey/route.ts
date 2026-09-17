import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { createChallenge, getActiveChallenge } from "@/lib/auth/challenges";
import { publicKeyToString, registrationOptions, verifyRegistration } from "@/lib/auth/webauthn";
import { displayName } from "@/lib/auth/current-user";
import type { RegistrationResponseJSON } from "@simplewebauthn/server";

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;

  const passkeys = await prisma.passkeyCredential.findMany({
    where: { userId: auth.auth.userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      deviceType: true,
      backedUp: true,
      createdAt: true,
      lastUsedAt: true,
    },
  });
  return NextResponse.json({ passkeys });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const user = await prisma.user.findUnique({
    where: { id: auth.auth.userId },
    include: { passkeys: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const options = await registrationOptions({
    userId: user.id,
    email: user.email,
    name: displayName(user),
    excludeCredentialIds: user.passkeys.map((item) => item.credentialId),
  });

  await createChallenge({
    type: "PASSKEY_REGISTER",
    email: user.email,
    userId: user.id,
    ttlMinutes: 5,
    token: options.challenge,
  });

  return NextResponse.json({ options });
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const body = (await request.json()) as {
    credential?: RegistrationResponseJSON;
    name?: string;
  };
  if (!body.credential) {
    return NextResponse.json({ error: "Missing passkey credential" }, { status: 400 });
  }

  const challenge = await prisma.authChallenge.findFirst({
    where: {
      userId: auth.auth.userId,
      type: "PASSKEY_REGISTER",
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });
  if (!challenge) {
    return NextResponse.json({ error: "Passkey registration expired. Try again." }, { status: 400 });
  }

  const verification = await verifyRegistration(body.credential, challenge.token);
  if (!verification.verified || !verification.registrationInfo) {
    return NextResponse.json({ error: "Could not verify this passkey" }, { status: 400 });
  }

  const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;
  await prisma.passkeyCredential.create({
    data: {
      userId: auth.auth.userId,
      credentialId: credential.id,
      publicKey: publicKeyToString(credential.publicKey),
      counter: credential.counter,
      deviceType: credentialDeviceType,
      backedUp: credentialBackedUp,
      transports: credential.transports || [],
      name: body.name || "Passkey",
    },
  });
  await prisma.authChallenge.update({
    where: { id: challenge.id },
    data: { consumedAt: new Date() },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing passkey id" }, { status: 400 });

  await prisma.passkeyCredential.deleteMany({
    where: { id, userId: auth.auth.userId },
  });
  return NextResponse.json({ success: true });
}
