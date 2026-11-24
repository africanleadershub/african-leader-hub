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

// Using more reliable professional portrait sources with better face visibility
const PORTRAIT_URLS: Record<string, string> = {
  "Uwamariya Chantal": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face",
  "Mukarwego Betty": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=face",
  "Tuyisenge Ruth": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&crop=face",
  "Muteteri Ange": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=face",
  "Amina Musabyimana": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face",
  "Uwase Esperance": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=face",
  "Muzirankoni Eminathe Gloria": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face",
  "Iragena Ernest": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=face",
  "Umugwaneza Alice": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=face",
  "Musabyimana Elina": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face",
  "Josephine Dusabeyezu": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=face",
  "Igiraneza Hoziane": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face",
  "Kayitesi Deborah": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=face",
  "Uwamahoro Agathe": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face",
  "Sebwitabure Irakora Davy": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=face",
  "Ubuntubwimana Hosiana": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=face",
  "Marie Irene Umumararungu": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face",
};

async function uploadProfessionalPortrait(name: string, imageUrl: string) {
  const folder = "african-leaders-hub/aheza-staging/participants";
  const publicId = `participant-${name.toLowerCase().replace(/\s+/g, "-")}-v2`;

  // Upload with MORE GENEROUS face detection - zoom out slightly to include full head/hair
  const upload = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUrl,
      {
        folder,
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
        transformation: [
          { width: 500, height: 500, gravity: "face", crop: "thumb", zoom: 0.7 },
          { width: 400, height: 400, crop: "fill", gravity: "center" },
          { quality: "auto:best", fetch_format: "auto" },
        ],
        tags: ["aheza-staging", "participant-portrait", "professional", "v2"],
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

  console.log(`Re-uploading images with BETTER FACE FRAMING for ${participants.length} participants...\n`);

  for (const participant of participants) {
    const portraitUrl = PORTRAIT_URLS[participant.name];
    if (!portraitUrl) {
      console.log(`⚠️  No portrait URL for ${participant.name}, skipping`);
      continue;
    }

    try {
      console.log(`📸 Re-uploading with improved framing for ${participant.name}...`);
      const upload = await uploadProfessionalPortrait(participant.name, portraitUrl);

      // Delete old asset
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
          originalFilename: `${participant.name.toLowerCase().replace(/\s+/g, "-")}-v2.jpg`,
          mimeType: "image/jpeg",
          width: upload.width,
          height: upload.height,
          format: upload.format,
          bytes: upload.bytes,
          tags: ["aheza-staging", "participant-portrait", "professional", "v2"],
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

  // Update story images
  console.log("\n📚 Updating story images...");
  const stories = await prisma.programTestimonial.findMany({
    where: { programId: aheza.id },
    include: { participant: true, photoAsset: true },
  });

  for (const story of stories) {
    if (story.participant?.photoAssetId) {
      if (story.photoAsset && story.photoAsset.id !== story.participant.photoAssetId) {
        await cloudinary.uploader.destroy(story.photoAsset.publicId);
        await prisma.asset.delete({ where: { id: story.photoAsset.id } });
      }

      await prisma.programTestimonial.update({
        where: { id: story.id },
        data: { photoAssetId: story.participant.photoAssetId },
      });
      console.log(`   ✅ Linked story "${story.storyTitle}" to improved portrait`);
    }
  }

  console.log("\n✅ All participant images re-uploaded with BETTER FACE FRAMING!");
  console.log("   - Used zoom: 0.7 to show MORE of the head/hair");
  console.log("   - Thumb crop with face gravity then center fill for perfect square");
  console.log("   - Larger source images (600x600) for better quality");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });