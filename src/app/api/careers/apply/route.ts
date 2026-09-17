import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimitApply } from "@/lib/auth/rate-limit";
import { isAllowedApplicationFile, storeApplicationFile } from "@/lib/application-upload";

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
    const additionalInfo = String(form.get("additionalInfo") || "").trim();
    const careerId = String(form.get("careerId") || "").trim() || undefined;
    const resume = firstFile(form, "resume");
    const coverLetter = firstFile(form, "coverLetter");
    const extras = allFiles(form, "additionalDocuments");

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Enter your name and email" }, { status: 400 });
    }
    if (!resume) {
      return NextResponse.json({ error: "Upload your resume or CV" }, { status: 400 });
    }

    const files = [resume, coverLetter, ...extras].filter((file): file is File => Boolean(file));
    if (files.some((file) => !isAllowedApplicationFile(file))) {
      return NextResponse.json(
        { error: "Use PDF, Word, RTF, or image files under 8MB" },
        { status: 400 }
      );
    }

    const resumeAsset = await storeApplicationFile(resume);
    const coverLetterAsset = coverLetter ? await storeApplicationFile(coverLetter) : null;
    const additionalAssets = [];
    for (const file of extras) {
      additionalAssets.push(await storeApplicationFile(file));
    }

    await prisma.careerApplication.create({
      data: {
        careerId,
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        additionalInfo: additionalInfo || undefined,
        resumeAssetId: resumeAsset.id,
        coverLetterAssetId: coverLetterAsset?.id,
        additionalAssetIds: additionalAssets.map((asset) => asset.id),
      },
    });

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
