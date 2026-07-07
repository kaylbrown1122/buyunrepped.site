import { NextResponse } from 'next/server';
import { saveMarketingContact } from '../../../lib/marketingContact';

const WAITLIST_SOURCE = 'website_waitlist';

async function notifyDiscord(
  email: string,
  source: string,
  firstName?: string,
  lastName?: string
): Promise<void> {
  if (!process.env.DISCORD_WAITLIST_WEBHOOK_URL) {
    return;
  }

  const name = [firstName, lastName].filter(Boolean).join(' ');

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
            ...(name ? [{ name: 'Name', value: name }] : []),
            { name: 'Email', value: email },
            { name: 'Source', value: source },
            { name: 'Timestamp', value: new Date().toISOString() },
          ],
        },
      ],
    }),
  });
}

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, source } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 });
    }

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
      return NextResponse.json({ error: 'Last name is required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const input = {
      email: normalizedEmail,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      source: typeof source === 'string' && source.trim() ? source.trim() : WAITLIST_SOURCE,
    };

    const supabaseResult = await saveMarketingContact(input);
    if (!supabaseResult.ok) {
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    await notifyDiscord(normalizedEmail, input.source, input.firstName, input.lastName);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
