import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the schema for form validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <contact@yourdomain.com>',
      to: process.env.CONTACT_EMAIL!, // Your email address
      reply_to: validatedData.email,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Message: ${validatedData.message}
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 