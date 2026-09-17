import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      careerId?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      coverLetter?: string;
    };
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    await prisma.careerApplication.create({
      data: {
        careerId: body.careerId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        coverLetter: body.coverLetter,
      },
    });
    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
