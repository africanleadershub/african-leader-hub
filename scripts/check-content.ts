import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: "postgresql://postgres:1213@localhost:5432/alh_dev" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const p = await prisma.program.findUnique({ 
    where: { slug: "aheza" },
    include: {
      objectivesManaged: true,
      outcomes: true,
      activities: true,
      timelinePhases: { include: { milestones: true } },
      galleryImages: { include: { asset: true } },
      testimonials: { include: { participant: true } },
      participants: true,
    }
  });
  if (!p) { console.log("NOT FOUND"); return; }
  console.log("=== OBJECTIVES ==="); console.log(p.objectivesManaged.map(o => ({ title: o.title, theme: o.theme, published: o.published })));
  console.log("=== EXPECTED OUTCOMES ==="); console.log(p.outcomes.map(o => ({ title: o.title, published: o.published })));
  console.log("=== KEY ACTIVITIES ==="); console.log(p.activities.map(a => ({ title: a.title, published: a.published })));
  console.log("=== TIMELINE PHASES ==="); console.log(p.timelinePhases.map(ph => ({ name: ph.name, milestones: ph.milestones.map(m => m.title) })));
  console.log("=== GALLERY ==="); console.log(p.galleryImages.map(g => ({ caption: g.caption, published: g.published })));
  console.log("=== TESTIMONIALS ==="); console.log(p.testimonials.map(t => ({ storyTitle: t.storyTitle, published: t.published, featured: t.featured })));
  console.log("=== PARTICIPANTS ==="); console.log(p.participants.map(pt => ({ name: pt.name, status: pt.status, published: pt.published })));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });