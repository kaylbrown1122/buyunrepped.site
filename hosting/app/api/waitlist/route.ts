import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Submit to Loops.so
    const loopsResponse = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source: 'waitlist',
      }),
    });

    if (!loopsResponse.ok) {
      const loopsError = await loopsResponse.text();
      console.error('Loops.so error:', loopsError);
    }

    // Submit to Discord webhook
    if (process.env.DISCORD_WAITLIST_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WAITLIST_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `New waitlist signup: ${email}`,
          embeds: [
            {
              title: 'Waitlist Signup',
              color: 0x0891b2,
              fields: [
                {
                  name: 'Email',
                  value: email,
                },
                {
                  name: 'Timestamp',
                  value: new Date().toISOString(),
                },
              ],
            },
          ],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit' },
      { status: 500 }
    );
  }
}
