import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const allParticipants = await prisma.programParticipant.findMany({
    select: { id: true, name: true, programId: true, published: true }
  });
  console.log("=== ALL PARTICIPANTS ===");
  allParticipants.forEach(p => console.log(`  ${p.name} | programId: ${p.programId} | published: ${p.published}`));
  
  const allStories = await prisma.programTestimonial.findMany({
    select: { id: true, storyTitle: true, programId: true, participantId: true, published: true }
  });
  console.log("\n=== ALL STORIES ===");
  allStories.forEach(s => console.log(`  ${s.storyTitle} | programId: ${s.programId} | participantId: ${s.participantId} | published: ${s.published}`));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });