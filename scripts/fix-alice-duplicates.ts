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

  // Find all stories for Alice
  const aliceStories = await prisma.programTestimonial.findMany({
    where: {
      programId: aheza.id,
      OR: [
        { storyTitle: { contains: "Alice", mode: "insensitive" } },
        { participant: { name: { contains: "Alice", mode: "insensitive" } } },
      ],
    },
    include: { participant: true },
  });

  console.log("Alice stories found:", aliceStories.length);
  aliceStories.forEach((s, i) => {
    console.log(`${i + 1}. ID: ${s.id} | Title: "${s.storyTitle}" | Participant: ${s.participant?.name} | Slug: ${s.slug}`);
  });

  // Find duplicates - keep the one with "Umugwaneza" (more formal name)
  if (aliceStories.length > 1) {
    const toDelete = aliceStories.filter(s => !s.storyTitle?.includes("Umugwaneza"));
    for (const story of toDelete) {
      await prisma.programTestimonial.delete({ where: { id: story.id } });
      console.log(`✅ Deleted duplicate: "${story.storyTitle}" (${story.id})`);
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });