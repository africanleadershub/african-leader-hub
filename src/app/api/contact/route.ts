import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail, sendNotificationEmail, type ContactFormData } from '@/lib/email';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

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

    // Handle newsletter subscription if checked
    if (formData.newsletter) {
      try {
        await connectDB();
        const existingSubscriber = await Subscriber.findOne({ email: formData.email.toLowerCase() });

        if (!existingSubscriber) {
          const subscriber = new Subscriber({
            email: formData.email.toLowerCase(),
            source: 'contact-form',
            isActive: true,
          });
          await subscriber.save();
        } else if (!existingSubscriber.isActive) {
          existingSubscriber.isActive = true;
          existingSubscriber.source = 'contact-form';
          existingSubscriber.subscribedAt = new Date();
          await existingSubscriber.save();
        }
      } catch (error) {
        // Log error but don't fail the contact form submission
        console.error('Error subscribing to newsletter:', error);
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

