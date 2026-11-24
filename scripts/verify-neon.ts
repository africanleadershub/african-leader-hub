import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const tables = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`;
  console.log("Tables:", tables.map((t: any) => t.tablename).join(", "));
  
  // Check key AHEZA tables
  const programs = await prisma.program.findMany({ where: { slug: "aheza" } });
  console.log("AHEZA program:", programs.length > 0 ? "FOUND" : "NOT FOUND");
  
  const participants = await prisma.programParticipant.count({ where: { programId: programs[0]?.id } });
  console.log("Participants:", participants);
  
  const stories = await prisma.programTestimonial.count({ where: { programId: programs[0]?.id } });
  console.log("Stories:", stories);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });