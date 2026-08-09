import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { notifySlackCalendlyBooking } from '../../../lib/slackNotify';

function verifyCalendlySignature(rawBody: string, signatureHeader: string | null, signingKey: string): boolean {
  if (!signatureHeader) {
    return false;
  }

  const parts = Object.fromEntries(
    signatureHeader.split(',').map((part) => {
      const [key, value] = part.split('=');
      return [key, value];
    })
  );

  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) {
    return false;
  }

  const payload = `${timestamp}.${rawBody}`;
  const expected = createHmac('sha256', signingKey).update(payload).digest('hex');

  if (signature.length !== expected.length) {
    return false;
  }

  try {
    return timingSafeEqual(
      new Uint8Array(Buffer.from(signature, 'hex')),
      new Uint8Array(Buffer.from(expected, 'hex'))
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY?.trim();
  if (!signingKey) {
    console.warn('CALENDLY_WEBHOOK_SIGNING_KEY is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get('Calendly-Webhook-Signature');

  if (!verifyCalendlySignature(rawBody, signatureHeader, signingKey)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: {
    event?: string;
    payload?: {
      name?: string;
      email?: string;
      scheduled_event?: {
        name?: string;
        start_time?: string;
      };
    };
  };

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (payload.event !== 'invitee.created') {
    return NextResponse.json({ success: true, ignored: true });
  }

  const invitee = payload.payload;
  const name = invitee?.name?.trim();
  const email = invitee?.email?.trim().toLowerCase();

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing invitee details' }, { status: 400 });
  }

  await notifySlackCalendlyBooking({
    name,
    email,
    eventType: invitee?.scheduled_event?.name,
    startTime: invitee?.scheduled_event?.start_time,
  });

  return NextResponse.json({ success: true });
}
