import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { v2 as cloudinary } from "cloudinary";
import fetch from "node-fetch";

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

// Professional portrait image URLs (using curated professional headshots from free sources)
const PORTRAIT_URLS: Record<string, string> = {
  "Uwamariya Chantal": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  "Mukarwego Betty": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  "Tuyisenge Ruth": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  "Muteteri Ange": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  "Amina Musabyimana": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  "Uwase Esperance": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  "Muzirankoni Eminathe Gloria": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  "Iragena Ernest": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  "Umugwaneza Alice": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  "Musabyimana Elina": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  "Josephine Dusabeyezu": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  "Igiraneza Hoziane": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  "Kayitesi Deborah": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  "Uwamahoro Agathe": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  "Sebwitabure Irakora Davy": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  "Ubuntubwimana Hosiana": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  "Marie Irene Umumararungu": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
};

async function uploadProfessionalPortrait(name: string, imageUrl: string) {
  const folder = "african-leaders-hub/aheza-staging/participants";
  const publicId = `participant-${name.toLowerCase().replace(/\s+/g, "-")}`;

  // Upload with Cloudinary's face detection and professional cropping
  const upload = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUrl,
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

  return upload;
}

async function main() {
  const aheza = await prisma.program.findUnique({ where: { slug: "aheza" } });
  if (!aheza) throw new Error("AHEZA not found");

  const participants = await prisma.programParticipant.findMany({
    where: { programId: aheza.id },
    include: { photoAsset: true },
  });

  console.log(`Updating images for ${participants.length} participants...\n`);

  for (const participant of participants) {
    const portraitUrl = PORTRAIT_URLS[participant.name];
    if (!portraitUrl) {
      console.log(`⚠️  No portrait URL for ${participant.name}, skipping`);
      continue;
    }

    try {
      console.log(`📸 Uploading professional portrait for ${participant.name}...`);
      const upload = await uploadProfessionalPortrait(participant.name, portraitUrl);

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
          folder: "african-leaders-hub/aheza-staging/participants",
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

      console.log(`   ✅ Updated: ${upload.secure_url} (${upload.width}x${upload.height})`);
    } catch (error) {
      console.error(`   ❌ Failed for ${participant.name}:`, error);
    }
  }

  // Also update story images to use the same professional portraits
  console.log("\n📚 Updating story images...");
  const stories = await prisma.programTestimonial.findMany({
    where: { programId: aheza.id },
    include: { participant: true, photoAsset: true },
  });

  for (const story of stories) {
    if (story.participant?.photoAssetId) {
      // Delete old story image if different from participant image
      if (story.photoAsset && story.photoAsset.id !== story.participant.photoAssetId) {
        await cloudinary.uploader.destroy(story.photoAsset.publicId);
        await prisma.asset.delete({ where: { id: story.photoAsset.id } });
      }

      await prisma.programTestimonial.update({
        where: { id: story.id },
        data: { photoAssetId: story.participant.photoAssetId },
      });
      console.log(`   ✅ Linked story "${story.storyTitle}" to participant portrait`);
    }
  }

  console.log("\n✅ All participant images updated with professional face-detected portraits!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });