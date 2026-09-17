import { NextResponse } from "next/server";
import {
  getPublishedPrograms,
  getPublishedPosts,
  getPublishedTeam,
  getPublishedFaqs,
  getPublishedCareers,
  getPublishedPartners,
  getPublishedImpact,
  getContentCategories,
} from "@/lib/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  switch (type) {
    case "programs":
      return NextResponse.json({ items: await getPublishedPrograms() });
    case "posts":
      return NextResponse.json({ items: await getPublishedPosts() });
    case "team":
      return NextResponse.json({ items: await getPublishedTeam() });
    case "faqs":
      return NextResponse.json({ items: await getPublishedFaqs() });
    case "careers":
      return NextResponse.json({ items: await getPublishedCareers() });
    case "partners":
      return NextResponse.json({ items: await getPublishedPartners() });
    case "impact":
      return NextResponse.json({ items: await getPublishedImpact() });
    case "categories": {
      const kindParam = new URL(_request.url).searchParams.get("kind");
      const kind = kindParam === "NEWS" || kindParam === "PROGRAM" ? kindParam : undefined;
      return NextResponse.json({ items: await getContentCategories(kind) });
    }
    default:
      return NextResponse.json({ error: "Unknown type" }, { status: 404 });
  }
}
