-- AlterTable
ALTER TABLE "CareerApplication" ADD COLUMN IF NOT EXISTS "coverLetterAssetId" TEXT;
ALTER TABLE "CareerApplication" ADD COLUMN IF NOT EXISTS "additionalAssetIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "CareerApplication" ADD COLUMN IF NOT EXISTS "additionalInfo" TEXT;
