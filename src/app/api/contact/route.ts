import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail, sendNotificationEmail, type ContactFormData } from '@/lib/email';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      organization: body.organization,
      message: body.message,
      newsletter: body.newsletter || false,
    };

    await prisma.contactInquiry.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        organization: formData.organization,
        message: formData.message,
        newsletter: Boolean(formData.newsletter),
      },
    });

    if (formData.newsletter) {
      try {
        await prisma.newsletterSubscriber.upsert({
          where: { email: formData.email.toLowerCase() },
          update: { isActive: true, source: "contact-form", subscribedAt: new Date() },
          create: {
            email: formData.email.toLowerCase(),
            source: "contact-form",
            isActive: true,
          },
        });
      } catch (error) {
        console.error("Error subscribing to newsletter:", error);
      }
    }

    // Send confirmation email to user
    await sendConfirmationEmail(
      formData.email,
      'contact',
      `${formData.firstName} ${formData.lastName}`
    );

    // Send notification email to admin
    await sendNotificationEmail('contact', formData);

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
}

