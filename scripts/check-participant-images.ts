import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ["error", "warn"] });

async function main() {
  const aheza = await prisma.program.findUnique({ where: { slug: "aheza" } });
  if (!aheza) throw new Error("AHEZA not found");

  const participants = await prisma.programParticipant.findMany({
    where: { programId: aheza.id },
    include: {
      photoAsset: true,
    },
  });

  console.log(`Total participants: ${participants.length}`);
  console.log("\n=== Participant Images ===");
  for (const p of participants) {
    console.log(`${p.name}:`);
    if (p.photoAsset) {
      console.log(`  ✅ Has image: ${p.photoAsset.url} (${p.photoAsset.width}x${p.photoAsset.height})`);
    } else {
      console.log(`  ❌ No image`);
    }
  }

  // Also check stories for images
  const stories = await prisma.programTestimonial.findMany({
    where: { programId: aheza.id },
    include: { photoAsset: true, participant: true },
  });

  console.log("\n=== Story Images ===");
  for (const s of stories) {
    console.log(`"${s.storyTitle}" (${s.participant?.name}):`);
    if (s.photoAsset) {
      console.log(`  ✅ Has image: ${s.photoAsset.url} (${s.photoAsset.width}x${s.photoAsset.height})`);
    } else {
      console.log(`  ❌ No image`);
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });