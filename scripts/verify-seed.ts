import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.findUnique({ where: { email: "umutonichristella17@gmail.com" } });
  console.log("Admin user:", user ? "FOUND" : "NOT FOUND", user);
  
  const settings = await prisma.websiteSettings.findUnique({ where: { id: "default" } });
  console.log("Website settings:", settings ? "FOUND" : "NOT FOUND");
  
  const identity = await prisma.organizationIdentity.findUnique({ where: { id: "default" } });
  console.log("Organization identity:", identity ? "FOUND" : "NOT FOUND");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });