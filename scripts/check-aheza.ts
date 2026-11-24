import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const aheza = await prisma.program.findUnique({ 
    where: { slug: 'aheza' },
    include: {
      objectivesManaged: true,
      outcomes: true,
      activities: true,
      timelinePhases: { include: { milestones: true } },
      testimonials: true,
      participants: true,
      galleryImages: true
    }
  });
  console.log('Program:', aheza?.title);
  console.log('New content tables:');
  console.log('  Objectives:', aheza?.objectivesManaged?.length || 0);
  console.log('  Outcomes:', aheza?.outcomes?.length || 0);
  console.log('  Activities:', aheza?.activities?.length || 0);
  console.log('  Timeline Phases:', aheza?.timelinePhases?.length || 0);
  console.log('  Milestones:', aheza?.timelinePhases?.flatMap(p => p.milestones).length || 0);
  console.log('  Testimonials:', aheza?.testimonials?.length || 0);
  console.log('  Participants:', aheza?.participants?.length || 0);
  console.log('  Gallery:', aheza?.galleryImages?.length || 0);
  console.log('Old JSON fields on Program:');
  console.log('  objectives:', (aheza as any)?.objectives);
  console.log('  keyActivities:', (aheza as any)?.keyActivities);
  console.log('  expectedOutcomes:', (aheza as any)?.expectedOutcomes);
  console.log('  background:', (aheza as any)?.background);
  console.log('  goal:', (aheza as any)?.goal);
  console.log('  duration:', (aheza as any)?.duration);
  console.log('  implementationPlan:', (aheza as any)?.implementationPlan);
}

main().finally(() => prisma.$disconnect());