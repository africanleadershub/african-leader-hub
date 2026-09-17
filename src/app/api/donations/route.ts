import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      amount?: string;
      message?: string;
    };
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    await prisma.donationInquiry.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        amount: body.amount,
        message: body.message,
      },
    });
    return NextResponse.json({ message: "Donation inquiry submitted successfully" });
  } catch (error) {
    console.error("Donation inquiry error:", error);
    return NextResponse.json({ error: "Failed to submit donation inquiry" }, { status: 500 });
  }
}
