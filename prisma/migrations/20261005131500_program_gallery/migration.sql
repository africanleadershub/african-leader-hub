CREATE TABLE "ProgramGalleryImage" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProgramGalleryImage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ProgramGalleryImage_programId_sortOrder_idx" ON "ProgramGalleryImage"("programId", "sortOrder");

CREATE INDEX "ProgramGalleryImage_assetId_idx" ON "ProgramGalleryImage"("assetId");

ALTER TABLE "ProgramGalleryImage" ADD CONSTRAINT "ProgramGalleryImage_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProgramGalleryImage" ADD CONSTRAINT "ProgramGalleryImage_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
