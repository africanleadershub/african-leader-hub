import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ["error", "warn"] });

async function main() {
  const aheza = await prisma.program.findUnique({ where: { slug: "aheza" } });
  if (!aheza) throw new Error("AHEZA not found");

  const participant = await prisma.programParticipant.findFirst({
    where: { programId: aheza.id, name: "Tuyisenge Ruth" },
    include: { photoAsset: true },
  });
  if (!participant) throw new Error("Tuyisenge Ruth not found");

  const portraitUrl = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face";
  const folder = "african-leaders-hub/aheza-staging/participants";
  const publicId = `participant-tuyisenge-ruth`;

  console.log(`📸 Uploading professional portrait for ${participant.name}...`);
  const upload = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload(
      portraitUrl,
      {
        folder,
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
        transformation: [
          { width: 400, height: 400, gravity: "face", crop: "fill" },
          { quality: "auto:best", fetch_format: "auto" },
        ],
        tags: ["aheza-staging", "participant-portrait", "professional"],
      },
      (error, result) => {
        if (error || !result) reject(error || new Error("Upload failed"));
        else resolve(result);
      }
    );
  });

  // Delete old asset if exists
  if (participant.photoAsset) {
    await cloudinary.uploader.destroy(participant.photoAsset.publicId);
    await prisma.asset.delete({ where: { id: participant.photoAsset.id } });
  }

  // Create new asset
  const asset = await prisma.asset.create({
    data: {
      source: "CLOUDINARY",
      kind: "IMAGE",
      publicId: upload.public_id,
      url: upload.secure_url,
      urlRaw: upload.url,
      title: `${participant.name} - Professional Portrait`,
      alt: `Professional portrait of ${participant.name}, AHEZA programme participant`,
      description: `Professional headshot of ${participant.name}, participant in the AHEZA women's entrepreneurship programme.`,
      folder,
      originalFilename: `${participant.name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
      mimeType: "image/jpeg",
      width: upload.width,
      height: upload.height,
      format: upload.format,
      bytes: upload.bytes,
      tags: ["aheza-staging", "participant-portrait", "professional"],
    },
  });

  // Update participant
  await prisma.programParticipant.update({
    where: { id: participant.id },
    data: { photoAssetId: asset.id },
  });

  // Update story
  const story = await prisma.programTestimonial.findFirst({
    where: { programId: aheza.id, participantId: participant.id },
  });
  if (story) {
    await prisma.programTestimonial.update({
      where: { id: story.id },
      data: { photoAssetId: asset.id },
    });
  }

  console.log(`   ✅ Updated: ${upload.secure_url} (${upload.width}x${upload.height})`);
  console.log("\n✅ Tuyisenge Ruth portrait fixed!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });