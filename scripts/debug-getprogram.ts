import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: "postgresql://postgres:1213@localhost:5432/alh_dev" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Simulate what getProgramBySlug does
  const programInclude = {
    imageAsset: true,
    bannerAsset: true,
    brochureAsset: true,
    brochurePreviewAsset: true,
    ogImageAsset: true,
    partners: { include: { logoAsset: true }, orderBy: { sortOrder: "asc" as const } },
    galleryImages: { include: { asset: true }, orderBy: { sortOrder: "asc" as const } },
    objectivesManaged: { where: { published: true }, orderBy: { sortOrder: "asc" as const } },
    outcomes: { where: { published: true }, include: { imageAsset: true }, orderBy: { sortOrder: "asc" as const } },
    activities: { where: { published: true }, include: { imageAsset: true }, orderBy: { sortOrder: "asc" as const } },
    timelinePhases: { where: { published: true }, include: { milestones: { where: { published: true }, orderBy: { sortOrder: "asc" as const } } }, orderBy: { sortOrder: "asc" as const } },
    testimonials: { where: { published: true }, include: { photoAsset: true, mediaAsset: true, participant: { select: { id: true, name: true, projectName: true, published: true, photoAsset: true } } }, orderBy: { sortOrder: "asc" as const } },
    participants: { where: { published: true }, select: { id: true, name: true, projectName: true, biography: true, location: true, status: true, photoAsset: true, published: true, programId: true, sortOrder: true, createdAt: true, updatedAt: true, photoAssetId: true, testimonials: { where: { published: true, slug: { not: null } }, select: { id: true, slug: true, storyTitle: true, excerpt: true }, orderBy: { sortOrder: "asc" as const } } }, orderBy: { sortOrder: "asc" as const } },
  };

  const program = await prisma.program.findFirst({
    where: { slug: "aheza", status: "PUBLISHED" },
    include: {
      ...programInclude,
      galleryImages: { where: { published: true }, include: { asset: true }, orderBy: { sortOrder: "asc" as const } },
    },
  });

  console.log("Program:", program?.title);
  console.log("objectivesManaged:", program?.objectivesManaged?.length || 0);
  console.log("objectives (JSON):", (program as any)?.objectives?.length || 0);
  console.log("outcomes:", program?.outcomes?.length || 0);
  console.log("activities:", program?.activities?.length || 0);
  console.log("timelinePhases:", program?.timelinePhases?.length || 0);
  console.log("milestones:", program?.timelinePhases?.flatMap(p => p.milestones).length || 0);
  console.log("testimonials:", program?.testimonials?.length || 0);
  console.log("participants:", program?.participants?.length || 0);
  console.log("galleryImages:", program?.galleryImages?.length || 0);
  
  console.log("\n--- objectivesManaged details ---");
  program?.objectivesManaged?.forEach((o, i) => console.log(`${i+1}. ${o.title} | published: ${o.published} | theme: ${o.theme} | description: "${o.description}"`));
}

main().finally(() => prisma.$disconnect());