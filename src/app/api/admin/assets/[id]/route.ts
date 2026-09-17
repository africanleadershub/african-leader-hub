import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  const { id } = await params;
  const body = (await request.json()) as {
    title?: string;
    alt?: string;
    description?: string;
    active?: boolean;
  };

  const asset = await prisma.asset.update({
    where: { id },
    data: {
      title: body.title,
      alt: body.alt,
      description: body.description,
      active: body.active,
    },
  });
  return NextResponse.json({ asset });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  const { id } = await params;
  const asset = await prisma.asset.findUnique({ where: { id } });
  if (!asset) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (asset.source === "CLOUDINARY" && asset.publicId) {
    await deleteFromCloudinary(
      asset.publicId,
      asset.kind === "IMAGE" ? "image" : "raw"
    );
  }

  await prisma.asset.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
