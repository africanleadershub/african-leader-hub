import { NextResponse } from "next/server";
import { getProgramBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  const brochure = program?.brochureAsset;
  if (!program || !brochure?.url) {
    return NextResponse.json({ error: "Brochure not found" }, { status: 404 });
  }

  const filename =
    brochure.originalFilename ||
    brochure.title ||
    `${program.slug}-brochure.pdf`;

  const fileResponse = await fetch(brochure.url);
  if (!fileResponse.ok || !fileResponse.body) {
    return NextResponse.json({ error: "Brochure could not be downloaded" }, { status: 502 });
  }

  return new NextResponse(fileResponse.body, {
    headers: {
      "Content-Type": brochure.mimeType || "application/pdf",
      "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
