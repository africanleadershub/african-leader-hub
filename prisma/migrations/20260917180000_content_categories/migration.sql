-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "CategoryKind" AS ENUM ('NEWS', 'PROGRAM');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "ContentCategory" (
    "id" TEXT NOT NULL,
    "kind" "CategoryKind" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentCategory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ContentCategory_kind_slug_key" ON "ContentCategory"("kind", "slug");
CREATE INDEX IF NOT EXISTS "ContentCategory_kind_sortOrder_idx" ON "ContentCategory"("kind", "sortOrder");
CREATE INDEX IF NOT EXISTS "ContentCategory_kind_name_idx" ON "ContentCategory"("kind", "name");
