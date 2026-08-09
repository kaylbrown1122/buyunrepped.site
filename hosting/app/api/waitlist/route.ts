import { NextResponse } from 'next/server';
import { saveMarketingContact, markWelcomeEmailSent } from '../../../lib/marketingContact';
import { sendContactWelcomeEmail } from '../../../lib/contactWelcomeEmail';
import { notifySlackWaitlistSignup } from '../../../lib/slackNotify';
import { normalizeLeadQualifier } from '../../../lib/leadQualifiers';
import { verifyChallenge } from '../../../lib/spamGuard';

const WAITLIST_SOURCE = 'website_waitlist';

export async function POST(request: Request) {
  try {
    const {
      email,
      firstName,
      lastName,
      city,
      state,
      source,
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
        console.warn('Waitlist submission blocked: honeypot triggered');
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 });
    }

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
      return NextResponse.json({ error: 'Last name is required' }, { status: 400 });
    }

    const normalizedQualifier = normalizeLeadQualifier(interestedIn);
    if (!normalizedQualifier) {
      return NextResponse.json({ error: 'Please select what best describes you' }, { status: 400 });
    }

    if (marketingOptIn !== true) {
      return NextResponse.json({ error: 'Email consent is required to join the waitlist' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const normalizedSource = typeof source === 'string' && source.trim() ? source.trim() : WAITLIST_SOURCE;
    const normalizedCity = typeof city === 'string' ? city.trim() : '';
    const normalizedState = typeof state === 'string' ? state.trim().toUpperCase() : '';
    const normalizedMessage = typeof message === 'string' ? message.trim() : '';

    if (normalizedSource.startsWith('website_locations') && (!normalizedCity || !normalizedState)) {
      return NextResponse.json({ error: 'City and state are required' }, { status: 400 });
    }

    const input = {
      email: normalizedEmail,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      city: normalizedCity || undefined,
      state: normalizedState || undefined,
      interestedIn: normalizedQualifier,
      message: normalizedMessage || undefined,
      source: normalizedSource,
    };

    const supabaseResult = await saveMarketingContact(input);
    if (supabaseResult.ok === false) {
      if (supabaseResult.error.includes('unsubscribed')) {
        return NextResponse.json({ error: supabaseResult.error }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    if (supabaseResult.isNew) {
      await notifySlackWaitlistSignup(input);

      const emailResult = await sendContactWelcomeEmail({
        firstName: input.firstName,
        email: input.email,
        interestedIn: input.interestedIn,
        city: input.city,
        state: input.state,
        message: input.message,
        location:
          input.city && input.state ? `${input.city}, ${input.state}` : undefined,
      });
      if (emailResult.ok) {
        await markWelcomeEmailSent(input.email);
      } else {
        console.error('Waitlist welcome email failed:', emailResult.error ?? 'Unknown error');
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
