import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_BYTES = 8 * 1024 * 1024;

export function isAllowedApplicationFile(file: File) {
  if (file.size > MAX_BYTES) return false;
  if (ALLOWED_TYPES.has(file.type)) return true;
  const name = file.name.toLowerCase();
  return [".pdf", ".doc", ".docx", ".rtf", ".txt", ".jpg", ".jpeg", ".png", ".webp"].some((ext) =>
    name.endsWith(ext)
  );
}

export async function storeApplicationFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const isImage = file.type.startsWith("image/");
  const upload = await uploadToCloudinary(buffer, {
    folder: "african-leaders-hub/applications",
    resourceType: isImage ? "image" : "raw",
    filename: file.name,
  });

  return prisma.asset.create({
    data: {
      source: "CLOUDINARY",
      kind: isImage ? "IMAGE" : "FILE",
      publicId: upload.public_id,
      url: upload.secure_url,
      urlRaw: upload.url,
      title: file.name,
      alt: file.name,
      folder: "african-leaders-hub/applications",
      originalFilename: file.name,
      mimeType: file.type || "application/octet-stream",
      width: upload.width,
      height: upload.height,
      format: upload.format,
      bytes: upload.bytes,
    },
  });
}
