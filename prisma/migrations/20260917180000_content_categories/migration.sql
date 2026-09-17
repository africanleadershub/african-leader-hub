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

INSERT INTO "ContentCategory" ("id", "kind", "name", "slug", "sortOrder", "createdAt", "updatedAt") VALUES
  ('cat_news_program_updates', 'NEWS', 'Program Updates', 'program-updates', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_news_environment', 'NEWS', 'Environment', 'environment', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_news_women', 'NEWS', 'Women Empowerment', 'women-empowerment', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_news_youth', 'NEWS', 'Youth Empowerment', 'youth-empowerment', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_news_education', 'NEWS', 'Education', 'education', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_news_partnerships', 'NEWS', 'Partnerships', 'partnerships', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_news_events', 'NEWS', 'Events', 'events', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_program_youth', 'PROGRAM', 'Youth & Children Empowerment', 'youth-children-empowerment', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_program_environment', 'PROGRAM', 'Environment Protection & Climate Change', 'environment-protection-climate-change', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_program_civic', 'PROGRAM', 'Civic Education & Leadership', 'civic-education-leadership', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_program_women', 'PROGRAM', 'Women Empowerment', 'women-empowerment', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_program_education', 'PROGRAM', 'Education', 'education', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_program_healthcare', 'PROGRAM', 'Healthcare', 'healthcare', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_program_conferences', 'PROGRAM', 'Conferences', 'conferences', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("kind", "slug") DO NOTHING;
