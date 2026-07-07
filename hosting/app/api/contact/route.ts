import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { saveMarketingContact } from '../../../lib/marketingContact';
import { sendContactWelcomeEmail } from '../../../lib/contactWelcomeEmail';
import { verifyChallenge } from '../../../lib/spamGuard';

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

async function notifySlack(input: {
  firstName: string;
  lastName: string;
  email: string;
  interestedIn?: string;
  message?: string;
  marketingOptIn: boolean;
}): Promise<void> {
  const webhookUrl = process.env.SLACK_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  const name = `${input.firstName} ${input.lastName}`;

  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: `New contact form submission from ${name} (${input.email})`,
      blocks: [
        {
          type: 'header',
          text: { type: 'plain_text', text: 'New Contact Form Submission', emoji: true },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Name:*\n${name}` },
            { type: 'mrkdwn', text: `*Email:*\n${input.email}` },
            { type: 'mrkdwn', text: `*Interested In:*\n${input.interestedIn || 'Not specified'}` },
            { type: 'mrkdwn', text: `*Marketing opt-in:*\n${input.marketingOptIn ? 'Yes' : 'No'}` },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${input.message || '_No message provided_'}`,
          },
        },
      ],
    }),
  });
}

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      interestedIn,
      message,
      marketingOptIn,
      captchaToken,
      captchaAnswer,
      honeypot,
    } = await request.json();

    const guardResult = verifyChallenge({ token: captchaToken, answer: captchaAnswer, honeypot });
    if (!guardResult.ok) {
      if (guardResult.reason === 'honeypot') {
        console.warn('Contact submission blocked: honeypot triggered');
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 400 }
      );
    }

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

    await notifySlack(payload);

    if (payload.marketingOptIn) {
      const emailResult = await sendContactWelcomeEmail({
        firstName: payload.firstName,
        email: payload.email,
      });
      if (!emailResult.ok) {
        console.error('Contact welcome email failed:', emailResult.error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
