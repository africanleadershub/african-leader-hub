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

  // Get all stories for AHEZA
  const allStories = await prisma.programTestimonial.findMany({
    where: { programId: aheza.id },
    include: { participant: true },
  });

  console.log(`Total stories: ${allStories.length}`);

  // Group by participant name
  const byParticipant = new Map<string, typeof allStories>();
  for (const story of allStories) {
    const pName = story.participant?.name || "Unknown";
    if (!byParticipant.has(pName)) byParticipant.set(pName, []);
    byParticipant.get(pName)!.push(story);
  }

  // Find participants with multiple stories
  let totalDeleted = 0;
  for (const [pName, stories] of byParticipant.entries()) {
    if (stories.length > 1) {
      console.log(`\n📋 ${pName} has ${stories.length} stories:`);
      stories.forEach((s, i) => {
        console.log(`  ${i + 1}. "${s.storyTitle}" (slug: ${s.slug})`);
      });

      // Keep the one with most formal/correct naming (typically with proper capitalization and full names)
      // Sort by: prefer titles with "Umugwaneza", "Umumararungu", proper capitalization, no extra spaces
      const sorted = stories.sort((a, b) => {
        const aTitle = a.storyTitle || "";
        const bTitle = b.storyTitle || "";
        
        // Prefer titles with full Rwandan names (Umugwaneza, Umumararungu, etc.)
        const aHasFormal = /Umugwaneza|Umumararungu|UWAMAHORO|MUTETERI|MUSABYIMANA|MUZIRANKONI|IRAGENA|SEBWITABURE|UBUNTUBWIMANA/.test(aTitle);
        const bHasFormal = /Umugwaneza|Umumararungu|UWAMAHORO|MUTETERI|MUSABYIMANA|MUZIRANKONI|IRAGENA|SEBWITABURE|UBUNTUBWIMANA/.test(bTitle);
        if (aHasFormal !== bHasFormal) return aHasFormal ? -1 : 1;
        
        // Prefer proper title case (not all lowercase or weird casing)
        const aProper = /^[A-Z][a-z]+/.test(aTitle.trim());
        const bProper = /^[A-Z][a-z]+/.test(bTitle.trim());
        if (aProper !== bProper) return aProper ? -1 : 1;
        
        // Prefer longer titles (more complete)
        return bTitle.length - aTitle.length;
      });

      const toKeep = sorted[0];
      const toDelete = sorted.slice(1);
      
      console.log(`  ✅ Keeping: "${toKeep.storyTitle}"`);
      for (const story of toDelete) {
        await prisma.programTestimonial.delete({ where: { id: story.id } });
        console.log(`  🗑️ Deleted: "${story.storyTitle}"`);
        totalDeleted++;
      }
    }
  }

  console.log(`\n✅ Done. Total duplicates removed: ${totalDeleted}`);
  
  // Verify remaining stories
  const remaining = await prisma.programTestimonial.findMany({
    where: { programId: aheza.id },
    include: { participant: true },
    orderBy: { storyTitle: 'asc' },
  });
  console.log(`\n📚 Remaining stories (${remaining.length}):`);
  remaining.forEach(s => console.log(`  - "${s.storyTitle}" (${s.participant?.name})`));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });