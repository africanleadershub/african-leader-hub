-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "ProgramApplicationMethod" AS ENUM ('EMAIL', 'EXTERNAL_LINK', 'BUILT_IN_FORM');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- AlterTable
ALTER TABLE "Program"
  ADD COLUMN IF NOT EXISTS "detailsHtml" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "detailsJson" JSONB,
  ADD COLUMN IF NOT EXISTS "timelineHtml" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "timelineJson" JSONB,
  ADD COLUMN IF NOT EXISTS "brochureAssetId" TEXT,
  ADD COLUMN IF NOT EXISTS "brochurePreviewAssetId" TEXT,
  ADD COLUMN IF NOT EXISTS "applicationsEnabled" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "applicationsOpenAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "applicationsCloseAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "applicationMethod" "ProgramApplicationMethod",
  ADD COLUMN IF NOT EXISTS "applicationEmail" TEXT,
  ADD COLUMN IF NOT EXISTS "applicationUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "applicationGuidelinesHtml" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "applicationGuidelinesJson" JSONB;

UPDATE "Program" SET
  "detailsHtml" = CONCAT_WS(
    '',
    CASE WHEN COALESCE("background", '') <> '' THEN CONCAT('<h2>Background</h2><p>', REPLACE(REPLACE(REPLACE("background", '&', '&amp;'), '<', '&lt;'), E'\n', '<br>'), '</p>') ELSE '' END,
    CASE WHEN COALESCE("goal", '') <> '' THEN CONCAT('<h2>Goal</h2><p>', REPLACE(REPLACE(REPLACE("goal", '&', '&amp;'), '<', '&lt;'), E'\n', '<br>'), '</p>') ELSE '' END,
    CASE WHEN COALESCE(array_length("objectives", 1), 0) > 0 THEN CONCAT('<h2>Objectives</h2><ul>', (SELECT string_agg(CONCAT('<li>', REPLACE(REPLACE(item, '&', '&amp;'), '<', '&lt;'), '</li>'), '') FROM unnest("objectives") AS item), '</ul>') ELSE '' END,
    CASE WHEN COALESCE(array_length("keyActivities", 1), 0) > 0 THEN CONCAT('<h2>Key activities</h2><ul>', (SELECT string_agg(CONCAT('<li>', REPLACE(REPLACE(item, '&', '&amp;'), '<', '&lt;'), '</li>'), '') FROM unnest("keyActivities") AS item), '</ul>') ELSE '' END,
    CASE WHEN COALESCE(array_length("targetGroups", 1), 0) > 0 THEN CONCAT('<h2>Target groups</h2><ul>', (SELECT string_agg(CONCAT('<li>', REPLACE(REPLACE(item, '&', '&amp;'), '<', '&lt;'), '</li>'), '') FROM unnest("targetGroups") AS item), '</ul>') ELSE '' END,
    CASE WHEN COALESCE(array_length("expectedOutcomes", 1), 0) > 0 THEN CONCAT('<h2>Expected outcomes</h2><ul>', (SELECT string_agg(CONCAT('<li>', REPLACE(REPLACE(item, '&', '&amp;'), '<', '&lt;'), '</li>'), '') FROM unnest("expectedOutcomes") AS item), '</ul>') ELSE '' END
  ),
  "timelineHtml" = CONCAT_WS(
    '',
    CASE WHEN COALESCE("duration", '') <> '' THEN CONCAT('<p>', REPLACE(REPLACE("duration", '&', '&amp;'), '<', '&lt;'), '</p>') ELSE '' END,
    CASE WHEN COALESCE("implementationPlan", '') <> '' THEN CONCAT('<p>', REPLACE(REPLACE(REPLACE("implementationPlan", '&', '&amp;'), '<', '&lt;'), E'\n', '<br>'), '</p>') ELSE '' END
  )
WHERE COALESCE("detailsHtml", '') = '';

-- CreateTable
CREATE TABLE IF NOT EXISTS "_PartnerToProgram" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "_PartnerToProgram_AB_unique" ON "_PartnerToProgram"("A", "B");
CREATE INDEX IF NOT EXISTS "_PartnerToProgram_B_index" ON "_PartnerToProgram"("B");

DO $$ BEGIN
  ALTER TABLE "_PartnerToProgram" ADD CONSTRAINT "_PartnerToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "_PartnerToProgram" ADD CONSTRAINT "_PartnerToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

INSERT INTO "_PartnerToProgram" ("A", "B")
SELECT DISTINCT pt."id", p."id"
FROM "Program" p
CROSS JOIN LATERAL unnest(p."partners") AS partner_name
JOIN "Partner" pt ON lower(pt."name") = lower(partner_name)
ON CONFLICT ("A", "B") DO NOTHING;

DO $$ BEGIN
  ALTER TABLE "Program" ADD CONSTRAINT "Program_brochureAssetId_fkey" FOREIGN KEY ("brochureAssetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "Program" ADD CONSTRAINT "Program_brochurePreviewAssetId_fkey" FOREIGN KEY ("brochurePreviewAssetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "Program_applicationsEnabled_idx" ON "Program"("applicationsEnabled");

CREATE TABLE IF NOT EXISTS "ProgramApplication" (
    "id" TEXT NOT NULL,
    "programId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "location" TEXT,
    "motivation" TEXT NOT NULL,
    "resumeAssetId" TEXT,
    "additionalAssetIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "ApplicationStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramApplication_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ProgramApplication_programId_idx" ON "ProgramApplication"("programId");
CREATE INDEX IF NOT EXISTS "ProgramApplication_status_idx" ON "ProgramApplication"("status");
CREATE INDEX IF NOT EXISTS "ProgramApplication_createdAt_idx" ON "ProgramApplication"("createdAt");
CREATE INDEX IF NOT EXISTS "ProgramApplication_email_idx" ON "ProgramApplication"("email");

DO $$ BEGIN
  ALTER TABLE "ProgramApplication" ADD CONSTRAINT "ProgramApplication_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "Program"
  DROP COLUMN IF EXISTS "background",
  DROP COLUMN IF EXISTS "goal",
  DROP COLUMN IF EXISTS "objectives",
  DROP COLUMN IF EXISTS "keyActivities",
  DROP COLUMN IF EXISTS "targetGroups",
  DROP COLUMN IF EXISTS "expectedOutcomes",
  DROP COLUMN IF EXISTS "implementationPlan",
  DROP COLUMN IF EXISTS "partners",
  DROP COLUMN IF EXISTS "duration";
