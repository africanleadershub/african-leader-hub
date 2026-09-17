import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { rateLimitApi } from "@/lib/auth/rate-limit";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Prisma } from "@/generated/prisma/client";

function kindFromMime(mime: string): "IMAGE" | "FILE" {
  return mime.startsWith("image/") ? "IMAGE" : "FILE";
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const kind = searchParams.get("kind");
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(96, Math.max(1, Number(searchParams.get("limit") || 24)));
  const skip = (page - 1) * limit;

  const where: Prisma.AssetWhereInput = {
    active: true,
    ...(kind === "IMAGE" || kind === "FILE" ? { kind } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { alt: { contains: search, mode: "insensitive" } },
            { originalFilename: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [assets, total] = await Promise.all([
    prisma.asset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.asset.count({ where }),
  ]);

  return NextResponse.json({
    assets,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  const limited = await rateLimitApi(request);
  if (!limited.success) return limited.response;

  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const formData = await request.formData();
  const files = formData.getAll("files").filter((value): value is File => value instanceof File);
  const folder = String(formData.get("folder") || "african-leaders-hub");
  const title = String(formData.get("title") || "");

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const assets = [];
  for (const file of files) {
    if (file.size > 15 * 1024 * 1024) {
      continue;
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const isImage = file.type.startsWith("image/");
    const upload = await uploadToCloudinary(buffer, {
      folder,
      resourceType: isImage ? "image" : "raw",
      filename: file.name,
    });

    const asset = await prisma.asset.create({
      data: {
        source: "CLOUDINARY",
        kind: kindFromMime(file.type),
        publicId: upload.public_id,
        url: upload.secure_url,
        urlRaw: upload.url,
        title: title || file.name,
        alt: title || file.name,
        folder,
        originalFilename: file.name,
        mimeType: file.type,
        width: upload.width,
        height: upload.height,
        format: upload.format,
        bytes: upload.bytes,
        uploadedById: auth.auth.userId,
      },
    });
    assets.push(asset);
  }

  if (!assets.length) {
    return NextResponse.json({ error: "No valid files were uploaded" }, { status: 400 });
  }

  return NextResponse.json({ success: true, assets }, { status: 201 });
}
