-- AlterTable
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "totpEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "totpSecret" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "totpPendingSecret" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "backupCodes" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "AuthChallengeType" AS ENUM ('LOGIN_2FA', 'PASSWORD_RESET', 'PASSKEY_REGISTER', 'PASSKEY_LOGIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "AuthChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "type" "AuthChallengeType" NOT NULL,
    "codeHash" TEXT NOT NULL DEFAULT '',
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "verifiedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "PasskeyCredential" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "deviceType" TEXT,
    "backedUp" BOOLEAN NOT NULL DEFAULT false,
    "transports" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "name" TEXT,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasskeyCredential_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "AuthChallenge_token_key" ON "AuthChallenge"("token");
CREATE INDEX IF NOT EXISTS "AuthChallenge_userId_idx" ON "AuthChallenge"("userId");
CREATE INDEX IF NOT EXISTS "AuthChallenge_email_idx" ON "AuthChallenge"("email");
CREATE INDEX IF NOT EXISTS "AuthChallenge_type_idx" ON "AuthChallenge"("type");
CREATE INDEX IF NOT EXISTS "AuthChallenge_expiresAt_idx" ON "AuthChallenge"("expiresAt");

CREATE UNIQUE INDEX IF NOT EXISTS "PasskeyCredential_credentialId_key" ON "PasskeyCredential"("credentialId");
CREATE INDEX IF NOT EXISTS "PasskeyCredential_userId_idx" ON "PasskeyCredential"("userId");

ALTER TABLE "AuthChallenge" DROP CONSTRAINT IF EXISTS "AuthChallenge_userId_fkey";
ALTER TABLE "AuthChallenge" ADD CONSTRAINT "AuthChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PasskeyCredential" DROP CONSTRAINT IF EXISTS "PasskeyCredential_userId_fkey";
ALTER TABLE "PasskeyCredential" ADD CONSTRAINT "PasskeyCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
