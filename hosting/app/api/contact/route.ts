import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, interestedIn, message } = await request.json();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (!process.env.DISCORD_CONTACT_WEBHOOK_URL) {
      console.error('DISCORD_CONTACT_WEBHOOK_URL is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(process.env.DISCORD_CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [{
          title: '\ud83d\udcec New Contact Form Submission',
          color: 0x0891b2,
          fields: [
            { name: 'Name', value: `${firstName} ${lastName}`, inline: true },
            { name: 'Email', value: email, inline: true },
            { name: 'Interested In', value: interestedIn || 'Not specified', inline: true },
            { name: 'Message', value: message || 'No message provided' },
          ],
          timestamp: new Date().toISOString(),
        }],
      }),
    });

    if (!response.ok) {
      console.error('Discord webhook error:', await response.text());
      return NextResponse.json(
        { error: 'Failed to submit' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit' },
      { status: 500 }
    );
  }
}
