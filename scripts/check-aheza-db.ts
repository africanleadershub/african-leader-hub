import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Check all programs
  const programs = await prisma.program.findMany({
    select: { id: true, slug: true, title: true, status: true, category: true },
    orderBy: { sortOrder: 'asc' }
  });
  console.log("=== ALL PROGRAMS ===");
  programs.forEach(p => console.log(`  ${p.slug} | ${p.title} | ${p.status} | ${p.category}`));
  
  // Check specifically for aheza
  const aheza = await prisma.program.findUnique({ where: { slug: "aheza" } });
  console.log("\n=== AHEZA PROGRAM ===");
  if (aheza) {
    console.log("FOUND:", JSON.stringify(aheza, null, 2));
  } else {
    console.log("NOT FOUND in database");
  }
  
  // Check participants for aheza
  if (aheza) {
    const participants = await prisma.programParticipant.findMany({
      where: { programId: aheza.id },
      select: { id: true, name: true, published: true, status: true, sortOrder: true }
    });
    console.log(`\n=== PARTICIPANTS (${participants.length}) ===`);
    participants.forEach(p => console.log(`  ${p.name} | published: ${p.published} | status: ${p.status} | order: ${p.sortOrder}`));
    
    const stories = await prisma.programTestimonial.findMany({
      where: { programId: aheza.id },
      select: { id: true, storyTitle: true, published: true, featured: true, slug: true }
    });
    console.log(`\n=== STORIES (${stories.length}) ===`);
    stories.forEach(s => console.log(`  ${s.storyTitle} | published: ${s.published} | featured: ${s.featured} | slug: ${s.slug}`));
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });