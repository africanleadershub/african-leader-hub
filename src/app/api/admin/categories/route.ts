import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { slugify } from "@/lib/slug";
import { CategoryKind } from "@/generated/prisma/enums";

const KINDS = ["NEWS", "PROGRAM"] as const;
type Kind = (typeof KINDS)[number];

function parseKind(value: string | null): Kind | null {
  if (value === "NEWS" || value === "PROGRAM") return value;
  return null;
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;

  const kind = parseKind(new URL(request.url).searchParams.get("kind"));
  const categories = await prisma.contentCategory.findMany({
    where: kind ? { kind } : undefined,
    orderBy: [{ kind: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const body = (await request.json()) as { kind?: string; name?: string; description?: string };
  const kind = parseKind(body.kind || null);
  const name = String(body.name || "").trim();
  if (!kind || !name) {
    return NextResponse.json({ error: "Kind and name are required" }, { status: 400 });
  }

  const slug = slugify(name);
  const existing = await prisma.contentCategory.findUnique({
    where: { kind_slug: { kind, slug } },
  });
  if (existing) {
    return NextResponse.json({ error: "A category with this name already exists" }, { status: 409 });
  }

  const last = await prisma.contentCategory.findFirst({
    where: { kind },
    orderBy: { sortOrder: "desc" },
  });

  const category = await prisma.contentCategory.create({
    data: {
      kind,
      name,
      slug,
      description: body.description?.trim() || null,
      sortOrder: (last?.sortOrder ?? 0) + 1,
    },
  });
  return NextResponse.json({ category }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const body = (await request.json()) as {
    id?: string;
    name?: string;
    description?: string;
    sortOrder?: number;
  };
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const current = await prisma.contentCategory.findUnique({ where: { id: body.id } });
  if (!current) return NextResponse.json({ error: "Category not found" }, { status: 404 });

  const name = body.name !== undefined ? String(body.name).trim() : current.name;
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const slug = slugify(name);

  if (slug !== current.slug) {
    const clash = await prisma.contentCategory.findUnique({
      where: { kind_slug: { kind: current.kind, slug } },
    });
    if (clash && clash.id !== current.id) {
      return NextResponse.json({ error: "A category with this name already exists" }, { status: 409 });
    }
  }

  const category = await prisma.contentCategory.update({
    where: { id: body.id },
    data: {
      name,
      slug,
      description: body.description !== undefined ? body.description.trim() || null : undefined,
      sortOrder: body.sortOrder,
    },
  });

  if (name !== current.name) {
    if (current.kind === CategoryKind.NEWS) {
      await prisma.post.updateMany({
        where: { category: current.name },
        data: { category: name },
      });
    } else {
      await prisma.program.updateMany({
        where: { category: current.name },
        data: { category: name },
      });
    }
  }

  return NextResponse.json({ category });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const current = await prisma.contentCategory.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: "Category not found" }, { status: 404 });

  const inUse =
    current.kind === CategoryKind.NEWS
      ? await prisma.post.count({ where: { category: current.name } })
      : await prisma.program.count({ where: { category: current.name } });

  if (inUse > 0) {
    return NextResponse.json(
      { error: `Cannot delete a category used by ${inUse} ${current.kind === "NEWS" ? "article" : "program"}(s)` },
      { status: 409 }
    );
  }

  await prisma.contentCategory.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
