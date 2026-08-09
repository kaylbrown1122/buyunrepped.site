import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { saveMarketingContact, markWelcomeEmailSent } from '../../../lib/marketingContact';
import { sendContactWelcomeEmail } from '../../../lib/contactWelcomeEmail';
import { notifySlackContactForm } from '../../../lib/slackNotify';
import { normalizeLeadQualifier } from '../../../lib/leadQualifiers';
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

    const normalizedQualifier = normalizeLeadQualifier(interestedIn);
    if (!normalizedQualifier) {
      return NextResponse.json({ error: 'Please select what best describes you' }, { status: 400 });
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      interestedIn: normalizedQualifier,
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
        interestedIn: payload.interestedIn,
        message: payload.message,
        source: CONTACT_SOURCE,
      });

      if (!marketingResult.ok) {
        return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
      }
    }

    await notifySlackContactForm(payload);

    if (payload.marketingOptIn) {
      const emailResult = await sendContactWelcomeEmail({
        firstName: payload.firstName,
        email: payload.email,
        interestedIn: payload.interestedIn,
        message: payload.message,
      });
      if (emailResult.ok) {
        await markWelcomeEmailSent(payload.email);
      } else {
        console.error('Contact welcome email failed:', emailResult.error ?? 'Unknown error');
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
