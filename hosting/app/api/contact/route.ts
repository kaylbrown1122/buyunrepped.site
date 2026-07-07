import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { saveMarketingContact } from '../../../lib/marketingContact';

const CONTACT_SOURCE = 'website_contact';

async function saveContactSubmission(input: {
  firstName: string;
  lastName: string;
  email: string;
  interestedIn?: string;
  message?: string;
  marketingOptIn: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.warn('Supabase is not configured; skipping contact submission persistence');
    return { ok: true };
  }

  const { error } = await supabase.from('contact_submissions').insert({
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    interested_in: input.interestedIn || null,
    message: input.message || null,
    marketing_opt_in: input.marketingOptIn,
  });

  if (error) {
    console.error('Supabase contact submission error:', error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

async function notifyDiscord(input: {
  firstName: string;
  lastName: string;
  email: string;
  interestedIn?: string;
  message?: string;
  marketingOptIn: boolean;
}): Promise<void> {
  if (!process.env.DISCORD_CONTACT_WEBHOOK_URL) {
    return;
  }

  await fetch(process.env.DISCORD_CONTACT_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      embeds: [
        {
          title: 'New Contact Form Submission',
          color: 0x0891b2,
          fields: [
            { name: 'Name', value: `${input.firstName} ${input.lastName}`, inline: true },
            { name: 'Email', value: input.email, inline: true },
            { name: 'Interested In', value: input.interestedIn || 'Not specified', inline: true },
            { name: 'Marketing opt-in', value: input.marketingOptIn ? 'Yes' : 'No', inline: true },
            { name: 'Message', value: input.message || 'No message provided' },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, interestedIn, message, marketingOptIn } =
      await request.json();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      interestedIn: typeof interestedIn === 'string' ? interestedIn.trim() : undefined,
      message: typeof message === 'string' ? message.trim() : undefined,
      marketingOptIn: Boolean(marketingOptIn),
    };

    const submissionResult = await saveContactSubmission(payload);
    if (!submissionResult.ok) {
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    if (payload.marketingOptIn) {
      const marketingResult = await saveMarketingContact({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        source: CONTACT_SOURCE,
      });

      if (!marketingResult.ok) {
        return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
      }
    }

    await notifyDiscord(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
