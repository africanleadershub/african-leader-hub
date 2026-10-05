import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimitApply } from "@/lib/auth/rate-limit";
import { isAllowedApplicationFile, storeApplicationFile } from "@/lib/application-upload";
import { isProgramAcceptingApplications } from "@/lib/programs";

function firstFile(form: FormData, name: string): File | null {
  const value = form.get(name);
  return value instanceof File && value.size > 0 ? value : null;
}

function allFiles(form: FormData, name: string): File[] {
  return form
    .getAll(name)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

export async function POST(request: NextRequest) {
  try {
    const limited = await rateLimitApply(request);
    if (!limited.success) return limited.response;

    const form = await request.formData();
    const firstName = String(form.get("firstName") || "").trim();
    const lastName = String(form.get("lastName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const location = String(form.get("location") || "").trim();
    const motivation = String(form.get("motivation") || "").trim();
    const programId = String(form.get("programId") || "").trim();
    const resume = firstFile(form, "resume");
    const extras = allFiles(form, "additionalDocuments");

    if (!programId) {
      return NextResponse.json({ error: "Program is required" }, { status: 400 });
    }
    if (!firstName || !lastName || !email || !motivation) {
      return NextResponse.json({ error: "Enter your name, email, and motivation" }, { status: 400 });
    }

    const program = await prisma.program.findUnique({ where: { id: programId } });
    if (
      !program ||
      program.status !== "PUBLISHED" ||
      program.applicationMethod !== "BUILT_IN_FORM" ||
      !isProgramAcceptingApplications(program)
    ) {
      return NextResponse.json({ error: "This program is not accepting applications" }, { status: 400 });
    }

    const files = [resume, ...extras].filter((file): file is File => Boolean(file));
    if (files.some((file) => !isAllowedApplicationFile(file))) {
      return NextResponse.json(
        { error: "Use PDF, Word, RTF, or image files under 8MB" },
        { status: 400 }
      );
    }

    const resumeAsset = resume ? await storeApplicationFile(resume) : null;
    const additionalAssets = [];
    for (const file of extras) {
      additionalAssets.push(await storeApplicationFile(file));
    }

    await prisma.programApplication.create({
      data: {
        programId,
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        location: location || undefined,
        motivation,
        resumeAssetId: resumeAsset?.id,
        additionalAssetIds: additionalAssets.map((asset) => asset.id),
      },
    });

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Program application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
