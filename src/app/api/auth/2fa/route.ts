import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { generateTotpSecret, totpQrDataUrl, totpUri, verifyTotp } from "@/lib/auth/totp";
import { createBackupCodes, hashBackupCode } from "@/lib/auth/tokens";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;

  const user = await prisma.user.findUnique({
    where: { id: auth.auth.userId },
    select: { totpEnabled: true, email: true },
  });
  return NextResponse.json({ enabled: Boolean(user?.totpEnabled) });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const user = await prisma.user.findUnique({ where: { id: auth.auth.userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const secret = generateTotpSecret();
  await prisma.user.update({
    where: { id: user.id },
    data: { totpPendingSecret: secret },
  });

  return NextResponse.json({
    secret,
    uri: totpUri(secret, user.email),
    qrDataUrl: await totpQrDataUrl(secret, user.email),
  });
}

const confirmSchema = z.object({
  code: z.string().min(6),
});

export async function PUT(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const parsed = confirmSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter the authenticator code" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: auth.auth.userId } });
  if (!user?.totpPendingSecret) {
    return NextResponse.json({ error: "Start authenticator setup first" }, { status: 400 });
  }
  if (!verifyTotp(user.totpPendingSecret, parsed.data.code, user.email)) {
    return NextResponse.json({ error: "Invalid authenticator code" }, { status: 401 });
  }

  const codes = createBackupCodes();
  const hashed = await Promise.all(codes.map((code) => hashBackupCode(code)));
  await prisma.user.update({
    where: { id: user.id },
    data: {
      totpEnabled: true,
      totpSecret: user.totpPendingSecret,
      totpPendingSecret: null,
      backupCodes: hashed,
    },
  });

  return NextResponse.json({
    success: true,
    backupCodes: codes,
  });
}

const disableSchema = z.object({
  code: z.string().min(6),
});

export async function DELETE(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const parsed = disableSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter an authenticator code to disable 2FA" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: auth.auth.userId } });
  if (!user?.totpEnabled || !user.totpSecret) {
    return NextResponse.json({ error: "Authenticator is not enabled" }, { status: 400 });
  }
  if (!verifyTotp(user.totpSecret, parsed.data.code, user.email)) {
    return NextResponse.json({ error: "Invalid authenticator code" }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      totpEnabled: false,
      totpSecret: null,
      totpPendingSecret: null,
      backupCodes: [],
    },
  });

  return NextResponse.json({ success: true });
}
