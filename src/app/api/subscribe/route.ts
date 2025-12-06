import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    const body = await request.json();
    const { email, source } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (existingSubscriber) {
      // If subscriber exists but is inactive, reactivate them
      if (!existingSubscriber.isActive) {
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = new Date();
        if (source) {
          existingSubscriber.source = source;
        }
        await existingSubscriber.save();
        return NextResponse.json(
          { message: 'Successfully resubscribed to newsletter!' },
          { status: 200 }
        );
      }
      // If already active, return success message
      return NextResponse.json(
        { message: 'You are already subscribed to our newsletter!' },
        { status: 200 }
      );
    }

    // Create new subscriber
    const subscriber = new Subscriber({
      email: email.toLowerCase(),
      source: source || 'other',
      isActive: true,
    });

    await subscriber.save();

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing subscription:', error);

    // Handle duplicate key error (email already exists)
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all subscribers (admin only - requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Check for API key authentication
    const apiKey = request.headers.get('x-api-key');
    const expectedApiKey = process.env.ADMIN_API_KEY;

    // If no API key is configured, deny access
    if (!expectedApiKey) {
      return NextResponse.json(
        { error: 'API key not configured. Access denied.' },
        { status: 503 }
      );
    }

    // Verify API key
    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: 'Unauthorized. Valid API key required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const query = activeOnly ? { isActive: true } : {};

    const subscribers = await Subscriber.find(query)
      .select('-__v')
      .sort({ subscribedAt: -1 });

    return NextResponse.json(
      { 
        count: subscribers.length,
        subscribers 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

