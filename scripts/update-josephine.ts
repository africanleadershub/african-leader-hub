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

  const josephine = await prisma.programParticipant.findFirst({
    where: { programId: aheza.id, name: "Josephine Dusabeyezu" },
  });
  if (!josephine) throw new Error("Josephine not found");

  await prisma.programParticipant.update({
    where: { id: josephine.id },
    data: {
      projectName: "Tailoring Business",
      businessDescription: "She runs a small tailoring business in Kigali City, Rwanda, specializing in designing, sewing, and altering clothes for clients. She makes custom outfits for women and men, including dresses, shirts, skirts, trousers, and traditional wear, according to customers' preferences and measurements. She also offers clothing repairs and adjustments. Her business serves individual customers who want affordable, well-fitting, and personalized clothing. She manages the daily operations herself, from taking orders and purchasing fabrics to sewing, finishing garments, and delivering completed clothes to customers.",
      sector: "Tailoring & Textiles",
      socialMedia: "",
      challengesBefore: "Limited business management skills, no structured approach to tracking orders, finances, and customer preferences.",
      achievements: "Learning to organize daily operations, track orders and finances, and improve customer service through AHEZA mentorship.",
      biography: "Tailor in Kigali City specializing in custom clothing design, sewing, alterations, and repairs for women and men. Building a professional tailoring service through AHEZA business training.",
    },
  });

  // Also update her story
  const story = await prisma.programTestimonial.findFirst({
    where: { programId: aheza.id, participantId: josephine.id },
  });
  if (story) {
    await prisma.programTestimonial.update({
      where: { id: story.id },
      data: {
        organization: "Tailoring Business",
        excerpt: "AHEZA has given me the confidence to start building my business properly. I am learning step by step how to plan, manage finances, and serve my customers better.",
        content: "AHEZA has given me the confidence to start building my business properly. I am learning step by step how to plan, manage finances, and serve my customers better.",
      },
    });
  }

  console.log("✅ Josephine Dusabeyezu updated with full details");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });