import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: "postgresql://postgres:1213@localhost:5432/alh_dev" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const program = await prisma.program.findUnique({
    where: { slug: "aheza" },
    select: {
      showObjectives: true,
      showKeyActivities: true,
      showExpectedOutcomes: true,
      showTestimonials: true,
      showTimeline: true,
      showGallery: true,
      showParticipants: true,
      showAlumni: true,
      showIntroduction: true,
      showBackground: true,
      showGoal: true,
      showWhoServes: true,
    }
  });
  console.log("Show flags:", program);
}

main().finally(() => prisma.$disconnect());