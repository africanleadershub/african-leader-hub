import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail, sendNotificationEmail, type VolunteerFormData } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.phone || 
        !body.location || !body.skills || !body.interest || !body.availability || !body.motivation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const formData: VolunteerFormData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      location: body.location,
      skills: body.skills,
      interest: body.interest,
      availability: body.availability,
      motivation: body.motivation,
    };

    // Send confirmation email to user
    await sendConfirmationEmail(
      formData.email,
      'volunteer',
      `${formData.firstName} ${formData.lastName}`
    );

    // Send notification email to admin
    await sendNotificationEmail('volunteer', formData);

    return NextResponse.json(
      { message: 'Volunteer application submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing volunteer form:', error);
    return NextResponse.json(
      { error: 'Failed to process volunteer application' },
      { status: 500 }
    );
  }
}

