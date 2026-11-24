import { config } from "dotenv";
config({ path: ".env" });

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

async function main() {
  console.log("=== SOURCE: Local DB (alh_dev) ===");
  const localPool = new Pool({ connectionString: process.env.DATABASE_URL });
  const localAdapter = new PrismaPg(localPool);
  const localPrisma = new PrismaClient({ adapter: localAdapter });

  const localAheza = await localPrisma.program.findUnique({ where: { slug: "aheza" } });
  if (!localAheza) throw new Error("AHEZA not found in LOCAL database");
  console.log(`Local AHEZA ID: ${localAheza.id}`);

  const localParticipants = await localPrisma.programParticipant.findMany({
    where: { programId: localAheza.id },
    include: {
      photoAsset: true,
      testimonials: {
        where: { published: true, slug: { not: null } },
        include: { photoAsset: true, mediaAsset: true }
      }
    }
  });
  console.log(`Local participants: ${localParticipants.length}`);
  localParticipants.forEach(p => {
    console.log(`  ${p.name} | photo: ${p.photoAsset?.url ? "YES" : "NO"} | stories: ${p.testimonials.length}`);
  });

  const localStories = await localPrisma.programTestimonial.findMany({
    where: { programId: localAheza.id, published: true, slug: { not: null } },
    include: { photoAsset: true, mediaAsset: true, participant: true }
  });
  console.log(`Local stories: ${localStories.length}`);

  await localPrisma.$disconnect();
  await localPool.end();

  console.log("\n=== DESTINATION: Neon Staging ===");
  config({ path: ".env.local", override: true });
  
  const neonPool = new Pool({ connectionString: process.env.DATABASE_URL });
  const neonAdapter = new PrismaPg(neonPool);
  const neonPrisma = new PrismaClient({ adapter: neonAdapter });

  const neonAheza = await neonPrisma.program.findUnique({ where: { slug: "aheza" } });
  if (!neonAheza) throw new Error("AHEZA not found in NEON database");
  console.log(`Neon AHEZA ID: ${neonAheza.id}`);

  // Verify this is NOT production
  const neonUrl = process.env.DATABASE_URL || "";
  if (neonUrl.includes("localhost") || neonUrl.includes("127.0.0.1")) {
    throw new Error("DESTINATION appears to be LOCAL, not Neon!");
  }
  if (!neonUrl.includes("neon.tech")) {
    throw new Error(`DESTINATION does not appear to be Neon: ${neonUrl.substring(0, 50)}...`);
  }
  console.log("✅ Destination confirmed as Neon staging");

  // Transfer participants
  console.log("\n=== TRANSFERRING PARTICIPANTS ===");
  for (const localP of localParticipants) {
    let assetId = localP.photoAssetId;
    
    // Transfer photo asset if exists
    if (localP.photoAsset) {
      const existingAsset = await neonPrisma.asset.findFirst({ 
        where: { publicId: localP.photoAsset.publicId } 
      });
      if (!existingAsset) {
        const newAsset = await neonPrisma.asset.create({
          data: {
            source: localP.photoAsset.source,
            kind: localP.photoAsset.kind,
            publicId: localP.photoAsset.publicId,
            url: localP.photoAsset.url,
            urlRaw: localP.photoAsset.urlRaw,
            title: localP.photoAsset.title,
            alt: localP.photoAsset.alt,
            description: localP.photoAsset.description,
            folder: localP.photoAsset.folder,
            originalFilename: localP.photoAsset.originalFilename,
            mimeType: localP.photoAsset.mimeType,
            width: localP.photoAsset.width,
            height: localP.photoAsset.height,
            format: localP.photoAsset.format,
            bytes: localP.photoAsset.bytes,
            tags: localP.photoAsset.tags,
            active: localP.photoAsset.active,
          }
        });
        assetId = newAsset.id;
        console.log(`  Created asset for ${localP.name}: ${newAsset.id}`);
      } else {
        assetId = existingAsset.id;
        console.log(`  Reused asset for ${localP.name}: ${existingAsset.id}`);
      }
    }

    // Create participant
    const existingP = await neonPrisma.programParticipant.findFirst({
      where: { programId: neonAheza.id, name: localP.name }
    });
    
    if (!existingP) {
      const newP = await neonPrisma.programParticipant.create({
        data: {
          programId: neonAheza.id,
          name: localP.name,
          projectName: localP.projectName,
          businessDescription: localP.businessDescription,
          sector: localP.sector,
          socialMedia: localP.socialMedia,
          challengesBefore: localP.challengesBefore,
          achievements: localP.achievements,
          goals: localP.goals,
          biography: localP.biography,
          location: localP.location,
          status: localP.status,
          published: localP.published,
          sortOrder: localP.sortOrder,
          photoAssetId: assetId,
        }
      });
      console.log(`  ✅ Created participant: ${newP.name} (${newP.id})`);
      
      // Transfer stories for this participant
      for (const localStory of localP.testimonials) {
        let storyAssetId = localStory.photoAssetId;
        if (localStory.photoAsset) {
          const existingStoryAsset = await neonPrisma.asset.findFirst({ 
            where: { publicId: localStory.photoAsset.publicId } 
          });
          if (!existingStoryAsset) {
            const newAsset = await neonPrisma.asset.create({
              data: {
                source: localStory.photoAsset.source,
                kind: localStory.photoAsset.kind,
                publicId: localStory.photoAsset.publicId,
                url: localStory.photoAsset.url,
                urlRaw: localStory.photoAsset.urlRaw,
                title: localStory.photoAsset.title,
                alt: localStory.photoAsset.alt,
                description: localStory.photoAsset.description,
                folder: localStory.photoAsset.folder,
                originalFilename: localStory.photoAsset.originalFilename,
                mimeType: localStory.photoAsset.mimeType,
                width: localStory.photoAsset.width,
                height: localStory.photoAsset.height,
                format: localStory.photoAsset.format,
                bytes: localStory.photoAsset.bytes,
                tags: localStory.photoAsset.tags,
                active: localStory.photoAsset.active,
              }
            });
            storyAssetId = newAsset.id;
          } else {
            storyAssetId = existingStoryAsset.id;
          }
        }
        
        await neonPrisma.programTestimonial.create({
          data: {
            programId: neonAheza.id,
            participantId: newP.id,
            name: localStory.name,
            role: localStory.role,
            organization: localStory.organization,
            location: localStory.location,
            content: localStory.content,
            excerpt: localStory.excerpt,
            storyTitle: localStory.storyTitle,
            slug: localStory.slug,
            published: localStory.published,
            featured: localStory.featured,
            sortOrder: localStory.sortOrder,
            photoAssetId: storyAssetId,
            mediaAssetId: localStory.mediaAssetId,
          }
        });
        console.log(`    ✅ Created story: ${localStory.storyTitle}`);
      }
    } else {
      console.log(`  ⏭️  Skipped existing participant: ${localP.name}`);
    }
  }

  // Verify
  console.log("\n=== VERIFICATION ===");
  const verifyParticipants = await neonPrisma.programParticipant.findMany({
    where: { programId: neonAheza.id },
    include: { photoAsset: true }
  });
  console.log(`Neon participants: ${verifyParticipants.length}`);

  const verifyStories = await neonPrisma.programTestimonial.findMany({
    where: { programId: neonAheza.id, published: true, slug: { not: null } },
    include: { photoAsset: true, participant: true }
  });
  console.log(`Neon stories: ${verifyStories.length}`);

  await neonPrisma.$disconnect();
  await neonPool.end();

  console.log("\n✅ TRANSFER COMPLETE");
}

main().catch(e => {
  console.error("❌ ERROR:", e.message);
  process.exit(1);
});