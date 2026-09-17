import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = body.email?.toLowerCase().trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      if (!existing.isActive) {
        await prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: { isActive: true, source: body.source || existing.source, subscribedAt: new Date() },
        });
        return NextResponse.json({ message: "Successfully resubscribed to newsletter!" });
      }
      return NextResponse.json({ message: "You are already subscribed to our newsletter!" });
    }

    await prisma.newsletterSubscriber.create({
      data: { email, source: body.source || "other", isActive: true },
    });

    return NextResponse.json({ message: "Successfully subscribed to newsletter!" }, { status: 201 });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return NextResponse.json({ error: "Failed to process subscription. Please try again later." }, { status: 500 });
  }
}
