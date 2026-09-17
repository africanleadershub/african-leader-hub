import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { slugify } from "@/lib/slug";
import { Prisma } from "@/generated/prisma/client";

type CollectionName =
  | "posts"
  | "programs"
  | "careers"
  | "team"
  | "legal"
  | "faqs"
  | "partners"
  | "impact";

function parseCollection(name: string): CollectionName | null {
  switch (name) {
    case "posts":
    case "programs":
    case "careers":
    case "team":
    case "legal":
    case "faqs":
    case "partners":
    case "impact":
      return name;
    default:
      return null;
  }
}

function delegate(name: CollectionName) {
  switch (name) {
    case "posts":
      return prisma.post;
    case "programs":
      return prisma.program;
    case "careers":
      return prisma.career;
    case "team":
      return prisma.teamMember;
    case "legal":
      return prisma.legalPage;
    case "faqs":
      return prisma.faq;
    case "partners":
      return prisma.partner;
    case "impact":
      return prisma.impactStat;
  }
}

function includes(name: CollectionName): Prisma.PostInclude | object {
  if (name === "posts") return { featuredImage: true, bannerImage: true };
  if (name === "programs") return { imageAsset: true, bannerAsset: true };
  if (name === "team") return { imageAsset: true };
  if (name === "partners") return { logoAsset: true };
  return {};
}

function coerce(body: Record<string, unknown>) {
  if (body.published === "true") body.published = true;
  if (body.published === "false") body.published = false;
  if (body.featured === "true") body.featured = true;
  if (body.featured === "false") body.featured = false;
  if (body.applicationDeadline === "") body.applicationDeadline = null;
  if (body.publishedAt === "") body.publishedAt = null;
  if (typeof body.sortOrder === "string" && body.sortOrder !== "") {
    body.sortOrder = Number(body.sortOrder);
  }
  if (typeof body.contentHtmlJson !== "undefined") {
    body.contentJson = body.contentHtmlJson;
  }
  if (typeof body.detailsHtmlJson !== "undefined") {
    body.detailsJson = body.detailsHtmlJson;
  }
  for (const key of Object.keys(body)) {
    if (key.endsWith("Json") && key !== "contentJson" && key !== "detailsJson") {
      delete body[key];
    }
  }
  [
    "imageAsset",
    "bannerAsset",
    "featuredImage",
    "bannerImage",
    "logoAsset",
    "createdAt",
    "updatedAt",
    "_count",
  ].forEach((key) => {
    delete body[key];
  });
}

function withSlug(name: CollectionName, body: Record<string, unknown>) {
  if (!("slug" in (delegate(name) as object)) && name !== "posts" && name !== "programs" && name !== "careers" && name !== "team" && name !== "legal") {
    return body;
  }
  if ((name === "faqs" || name === "partners" || name === "impact")) return body;
  const title = String(body.title || body.name || "");
  if (!body.slug && title) body.slug = slugify(title);
  return body;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const auth = await requireAuth(request, { requireCSRF: false });
  if (!auth.success) return auth.response;
  const parsed = parseCollection((await params).collection);
  if (!parsed) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const collection = parsed;
  const model = delegate(collection);
  if (!model) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });

  const items = await (model as typeof prisma.post).findMany({
    orderBy: { createdAt: "desc" },
    include: includes(collection),
  });
  return NextResponse.json({ items });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  const parsed = parseCollection((await params).collection);
  if (!parsed) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const collection = parsed;
  const model = delegate(collection);
  if (!model) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const body = withSlug(collection, (await request.json()) as Record<string, unknown>);
  coerce(body);
  const item = await (model as typeof prisma.post).create({
    data: body as never,
    include: includes(collection),
  });
  return NextResponse.json({ item }, { status: 201 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  const parsed = parseCollection((await params).collection);
  if (!parsed) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const collection = parsed;
  const model = delegate(collection);
  if (!model) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const body = (await request.json()) as Record<string, unknown>;
  const id = String(body.id || "");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  delete body.id;
  coerce(body);
  const item = await (model as typeof prisma.post).update({
    where: { id },
    data: withSlug(collection, body) as never,
    include: includes(collection),
  });
  return NextResponse.json({ item });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth.success) return auth.response;
  const parsed = parseCollection((await params).collection);
  if (!parsed) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const collection = parsed;
  const model = delegate(collection);
  if (!model) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await (model as typeof prisma.post).delete({ where: { id } });
  return NextResponse.json({ success: true });
}
