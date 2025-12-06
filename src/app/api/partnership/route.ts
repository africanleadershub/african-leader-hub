import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail, sendNotificationEmail, type PartnershipFormData } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.orgName || !body.orgType || !body.contactName || !body.contactEmail || 
        !body.contactPhone || !body.orgLocation || !body.orgDescription || 
        !body.partnershipInterest || !body.partnershipGoals) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const formData: PartnershipFormData = {
      orgName: body.orgName,
      orgType: body.orgType,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      orgLocation: body.orgLocation,
      orgDescription: body.orgDescription,
      partnershipInterest: body.partnershipInterest,
      partnershipGoals: body.partnershipGoals,
    };

    // Send confirmation email to user
    await sendConfirmationEmail(
      formData.contactEmail,
      'partnership',
      formData.contactName
    );

    // Send notification email to admin
    await sendNotificationEmail('partnership', formData);

    return NextResponse.json(
      { message: 'Partnership inquiry submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing partnership form:', error);
    return NextResponse.json(
      { error: 'Failed to process partnership inquiry' },
      { status: 500 }
    );
  }
}

