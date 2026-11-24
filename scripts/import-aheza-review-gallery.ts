import { config } from "dotenv";
import { readdir, readFile } from "node:fs/promises";
import { join, parse } from "node:path";

config({ path: ".env.local" });

async function main() {
  const [{ prisma }, { uploadToCloudinary }] = await Promise.all([
    import("../src/lib/prisma"),
    import("../src/lib/cloudinary"),
  ]);
  const sourceDir = join(process.env.USERPROFILE || "", "Desktop", "ALH", "AHEZA pictures");
  const files = (await readdir(sourceDir)).filter((name) => /\.(jpe?g|png|webp)$/i.test(name)).sort();
  const program = await prisma.program.findUnique({ where: { slug: "aheza" }, select: { id: true, title: true } });
  if (!program) throw new Error("AHEZA programme record not found in the local database.");
  const folder = "african-leaders-hub/aheza-review-demo";

  for (const [index, filename] of files.entries()) {
    let asset = await prisma.asset.findFirst({ where: { folder, originalFilename: filename } });
    if (!asset) {
      const buffer = await readFile(join(sourceDir, filename));
      const upload = await uploadToCloudinary(buffer, { folder, resourceType: "image", filename, tags: ["aheza-review-demo", "user-provided-event-photo"] });
      asset = await prisma.asset.create({ data: {
        source: "CLOUDINARY", kind: "IMAGE", publicId: upload.public_id, url: upload.secure_url, urlRaw: upload.url,
        title: `AHEZA activity photo — ${parse(filename).name}`, alt: `AHEZA programme activity photo — ${parse(filename).name}`,
        description: "User-provided programme event photograph. Not an individual participant profile portrait.",
        folder, originalFilename: filename, mimeType: `image/${parse(filename).ext.slice(1).toLowerCase()}`,
        width: upload.width, height: upload.height, format: upload.format, bytes: upload.bytes,
        tags: ["aheza-review-demo", "user-provided-event-photo"],
      } });
    }
    const gallery = await prisma.programGalleryImage.findFirst({ where: { programId: program.id, assetId: asset.id } });
    if (!gallery) await prisma.programGalleryImage.create({ data: {
      programId: program.id, assetId: asset.id, caption: `${parse(filename).name.replace(/[-_]/g, " ")} · demo review photo`,
      description: "A user-provided AHEZA programme activity photograph for the review gallery.",
      altText: `AHEZA programme activity photograph: ${parse(filename).name.replace(/[-_]/g, " ")}`,
      category: "Programme activities", published: true, featured: index < 5, sortOrder: index,
    } });
  }
  console.log(`Imported ${files.length} user-provided activity photos into ${program.title}; 5 are featured, the rest remain manageable in the local dashboard.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Photo import failed");
  process.exitCode = 1;
}).finally(async () => {
  const { prisma } = await import("../src/lib/prisma");
  await prisma.$disconnect();
});
