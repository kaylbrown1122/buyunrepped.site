import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return email.includes('@') ? email : null;
}

export async function POST(request: Request) {
  try {
    const urlEmail = new URL(request.url).searchParams.get('email');
    let bodyEmail: unknown;

    if (!urlEmail) {
      const body = await request.json().catch(() => null);
      bodyEmail = body?.email;
    }

    const email = normalizeEmail(urlEmail ?? bodyEmail);
    if (!email) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Email preferences are temporarily unavailable' }, { status: 503 });
    }

    const { error } = await supabase
      .from('marketing_waitlist')
      .update({
        email_subscribed: false,
        unsubscribed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('email', email);

    if (error) {
      console.error('Marketing unsubscribe error:', error);
      return NextResponse.json({ error: 'Unable to update email preferences' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Marketing unsubscribe request error:', error);
    return NextResponse.json({ error: 'Unable to update email preferences' }, { status: 500 });
  }
}
