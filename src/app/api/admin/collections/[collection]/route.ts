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
  if (name === "programs") {
    return {
      imageAsset: true,
      bannerAsset: true,
      brochureAsset: true,
      brochurePreviewAsset: true,
      partners: { include: { logoAsset: true } },
      galleryImages: { include: { asset: true }, orderBy: { sortOrder: "asc" as const } },
    };
  }
  if (name === "team") return { imageAsset: true };
  if (name === "partners") return { logoAsset: true };
  return {};
}

function coerce(body: Record<string, unknown>, collection?: CollectionName) {
  if (body.published === "true") body.published = true;
  if (body.published === "false") body.published = false;
  if (body.featured === "true") body.featured = true;
  if (body.featured === "false") body.featured = false;
  if (body.applicationsEnabled === "true") body.applicationsEnabled = true;
  if (body.applicationsEnabled === "false") body.applicationsEnabled = false;
  if (body.applicationDeadline === "") body.applicationDeadline = null;
  if (body.publishedAt === "") body.publishedAt = null;
  if (body.applicationsOpenAt === "") body.applicationsOpenAt = null;
  if (body.applicationsCloseAt === "") body.applicationsCloseAt = null;
  if (body.applicationMethod === "NONE" || body.applicationMethod === "") body.applicationMethod = null;
  if (body.applicationEmail === "") body.applicationEmail = null;
  if (body.applicationUrl === "") body.applicationUrl = null;
  if (body.brochureAssetId === "") body.brochureAssetId = null;
  if (body.brochurePreviewAssetId === "") body.brochurePreviewAssetId = null;
  if (typeof body.sortOrder === "string" && body.sortOrder !== "") {
    body.sortOrder = Number(body.sortOrder);
  }
  if (typeof body.contentHtmlJson !== "undefined") {
    body.contentJson = body.contentHtmlJson;
  }
  if (typeof body.detailsHtmlJson !== "undefined") {
    body.detailsJson = body.detailsHtmlJson;
  }
  if (typeof body.timelineHtmlJson !== "undefined") {
    body.timelineJson = body.timelineHtmlJson;
  }
  if (typeof body.applicationGuidelinesHtmlJson !== "undefined") {
    body.applicationGuidelinesJson = body.applicationGuidelinesHtmlJson;
  }
  if (collection === "posts") {
    const imageId = body.featuredImageId || body.bannerImageId || null;
    body.featuredImageId = imageId;
    body.bannerImageId = imageId;
  }
  if (collection === "programs") {
    const imageId = body.imageAssetId || body.bannerAssetId || null;
    body.imageAssetId = imageId;
    body.bannerAssetId = imageId;
  }
  const keepJson = new Set(["contentJson", "detailsJson", "timelineJson", "applicationGuidelinesJson"]);
  for (const key of Object.keys(body)) {
    if (key.endsWith("Json") && !keepJson.has(key)) {
      delete body[key];
    }
  }
  [
    "imageAsset",
    "bannerAsset",
    "brochureAsset",
    "brochurePreviewAsset",
    "featuredImage",
    "bannerImage",
    "logoAsset",
    "applications",
    "galleryImages",
    "budget",
    "createdAt",
    "updatedAt",
    "_count",
  ].forEach((key) => {
    delete body[key];
  });
}

function galleryItems(body: Record<string, unknown>) {
  const hasIds = Array.isArray(body.galleryAssetIds);
  const hasImages = Array.isArray(body.galleryImages);
  if (!hasIds && !hasImages) {
    delete body.galleryAssets;
    return undefined;
  }
  const fromImages = hasImages ? body.galleryImages : [];
  const source = (hasIds ? body.galleryAssetIds : fromImages) as unknown[];
  const assetIds = source
    .map((image) => {
      if (typeof image === "string") return image;
      if (!image || typeof image !== "object") return "";
      if ("assetId" in image && typeof image.assetId === "string") return image.assetId;
      if ("asset" in image && image.asset && typeof image.asset === "object" && "id" in image.asset) {
        return String(image.asset.id);
      }
      if ("id" in image && "url" in image) return String(image.id);
      return "";
    })
    .filter((id) => id.length > 0);
  delete body.galleryAssetIds;
  delete body.galleryImages;
  delete body.galleryAssets;
  return [...new Set(assetIds)].slice(0, 5).map((assetId, sortOrder) => ({ assetId, sortOrder }));
}

function partnerRelation(body: Record<string, unknown>, mode: "create" | "update") {
  const fromIds = Array.isArray(body.partnerIds) ? body.partnerIds : [];
  const fromPartners = Array.isArray(body.partners) ? body.partners : [];
  const partnerIds = [
    ...fromIds.filter((id): id is string => typeof id === "string" && id.length > 0),
    ...fromPartners
      .map((partner) => (partner && typeof partner === "object" && "id" in partner ? String(partner.id) : ""))
      .filter(Boolean),
  ];
  delete body.partnerIds;
  delete body.partners;
  const links = [...new Set(partnerIds)].map((id) => ({ id }));
  return mode === "create" ? { connect: links } : { set: links };
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

function validateRecord(collection: CollectionName, body: Record<string, unknown>) {
  if (collection === "posts" || collection === "programs") {
    const title = String(body.title || "").trim();
    const summary = String((collection === "posts" ? body.excerpt : body.description) || "").trim();
    const category = String(body.category || "").trim();
    if (!title) throw new Error("Title is required");
    if (title.length > 70) throw new Error("Title must be 70 characters or fewer");
    if (!summary) {
      throw new Error(collection === "posts" ? "Excerpt is required" : "Description is required");
    }
    if (summary.length > 160) {
      throw new Error(
        collection === "posts"
          ? "Excerpt must be 160 characters or fewer"
          : "Description must be 160 characters or fewer"
      );
    }
    if (!category) throw new Error("Category is required");
    if (body.seoTitle && String(body.seoTitle).length > 60) {
      throw new Error("SEO title must be 60 characters or fewer");
    }
    if (body.seoDescription && String(body.seoDescription).length > 160) {
      throw new Error("SEO description must be 160 characters or fewer");
    }
  }
  if (collection === "programs") {
    if (body.applicationsEnabled && !body.applicationMethod) {
      throw new Error("Choose an application method before receiving applications");
    }
    if (body.applicationMethod === "EXTERNAL_LINK" && !String(body.applicationUrl || "").trim()) {
      throw new Error("Add an application link");
    }
  }
}

async function assertBrochurePdf(brochureAssetId: unknown) {
  if (!brochureAssetId) return;
  const asset = await prisma.asset.findUnique({ where: { id: String(brochureAssetId) } });
  if (!asset) throw new Error("Brochure file not found");
  const filename = (asset.originalFilename || asset.title || "").toLowerCase();
  const isPdf =
    asset.mimeType === "application/pdf" ||
    asset.format === "pdf" ||
    filename.endsWith(".pdf");
  if (!isPdf) throw new Error("Brochure must be a PDF");
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
  coerce(body, collection);
  try {
    validateRecord(collection, body);
    if (collection === "programs") await assertBrochurePdf(body.brochureAssetId);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid record" }, { status: 400 });
  }
  const partners = collection === "programs" ? partnerRelation(body, "create") : undefined;
  const gallery = collection === "programs" ? galleryItems(body) : undefined;
  const item = await (model as typeof prisma.post).create({
    data: {
      ...body,
      ...(partners ? { partners } : {}),
      ...(gallery ? { galleryImages: { create: gallery } } : {}),
    } as never,
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
  coerce(body, collection);
  try {
    validateRecord(collection, body);
    if (collection === "programs") await assertBrochurePdf(body.brochureAssetId);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid record" }, { status: 400 });
  }
  const partners = collection === "programs" ? partnerRelation(body, "update") : undefined;
  const gallery = collection === "programs" ? galleryItems(body) : undefined;
  const item = await (model as typeof prisma.post).update({
    where: { id },
    data: withSlug(collection, {
      ...body,
      ...(partners ? { partners } : {}),
      ...(gallery ? { galleryImages: { deleteMany: {}, create: gallery } } : {}),
    }) as never,
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
