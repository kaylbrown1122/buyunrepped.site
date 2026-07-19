import { NextResponse } from 'next/server';
import { saveMarketingContact } from '../../../lib/marketingContact';
import { verifyChallenge } from '../../../lib/spamGuard';

const WAITLIST_SOURCE = 'website_waitlist';

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, source, marketingOptIn, captchaToken, captchaAnswer, honeypot } =
      await request.json();

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

    if (marketingOptIn !== true) {
      return NextResponse.json({ error: 'Email consent is required to join the waitlist' }, { status: 400 });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
