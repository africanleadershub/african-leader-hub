import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Check if AHEZA already exists
  const existing = await prisma.program.findUnique({ where: { slug: "aheza" } });
  if (existing) {
    console.log("AHEZA program already exists:", existing.id);
    return;
  }

  // Get the max sortOrder to append at the end
  const maxOrder = await prisma.program.aggregate({
    _max: { sortOrder: true }
  });
  const nextOrder = (maxOrder._max.sortOrder || 0) + 1;

  // Create AHEZA program
  const aheza = await prisma.program.create({
    data: {
      slug: "aheza",
      title: "AHEZA",
      category: "Women Empowerment",
      description: "A women's entrepreneurship and leadership programme supporting Rwandan women to build sustainable businesses and become community leaders.",
      detailsHtml: "<p>AHEZA is a comprehensive women's entrepreneurship programme designed to empower Rwandan women with the skills, knowledge, and networks needed to build thriving businesses and become leaders in their communities.</p>",
      status: "PUBLISHED",
      sortOrder: nextOrder,
      showParticipants: true,
      showAlumni: true,
      showTestimonials: true,
      showTimeline: true,
      showObjectives: true,
      showKeyActivities: true,
      showExpectedOutcomes: true,
      showIntroduction: true,
      showGallery: true,
      showBackground: true,
      showGoal: true,
      showWhoServes: true,
      seoTitle: "AHEZA - Women's Entrepreneurship Programme",
      seoDescription: "AHEZA empowers Rwandan women entrepreneurs with business training, mentorship, and access to networks.",
    }
  });

  console.log("Created AHEZA program:", aheza.id);

  // Verify
  const verify = await prisma.program.findUnique({ where: { slug: "aheza" } });
  console.log("Verified:", verify);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });