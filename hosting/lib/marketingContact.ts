import { getSupabaseAdmin } from './supabaseAdmin';

export interface MarketingContactInput {
  email: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  interestedIn?: string;
  message?: string;
  source: string;
}

export async function saveMarketingContact(
  input: MarketingContactInput
): Promise<{ ok: true; isNew: boolean } | { ok: false; error: string }> {
  const supabase = getSupabaseAdmin();
  const email = input.email.trim().toLowerCase();

  if (!supabase) {
    console.warn('Supabase is not configured; skipping marketing contact persistence');
    return { ok: true, isNew: true };
  }

  const { data: existing } = await supabase
    .from('marketing_waitlist')
    .select('id, email_subscribed, unsubscribed_at')
    .eq('email', email)
    .maybeSingle();

  const now = new Date().toISOString();
  const firstName = input.firstName?.trim() || null;
  const lastName = input.lastName?.trim() || null;
  const city = input.city?.trim() || null;
  const state = input.state?.trim().toUpperCase() || null;
  const interestedIn = input.interestedIn?.trim() || null;
  const message = input.message?.trim() || null;

  if (existing) {
    if (!existing.email_subscribed || existing.unsubscribed_at) {
      return { ok: false, error: 'This email has been unsubscribed. Please contact us if you would like to rejoin.' };
    }

    const updates: Record<string, string | boolean | null> = {
      updated_at: now,
    };

    if (firstName) updates.first_name = firstName;
    if (lastName) updates.last_name = lastName;
    if (city) updates.city = city;
    if (state) updates.state = state;
    if (interestedIn) updates.interested_in = interestedIn;
    if (message) updates.message = message;

    const { error } = await supabase
      .from('marketing_waitlist')
      .update(updates)
      .eq('email', email);

    if (error) {
      console.error('Supabase marketing contact error:', error);
      return { ok: false, error: error.message };
    }

    return { ok: true, isNew: false };
  }

  const { error } = await supabase.from('marketing_waitlist').insert({
    email,
    source: input.source,
    first_name: firstName,
    last_name: lastName,
    city,
    state,
    interested_in: interestedIn,
    message,
    email_subscribed: true,
    subscribed_at: now,
    updated_at: now,
  });

  if (error) {
    console.error('Supabase marketing contact error:', error);
    return { ok: false, error: error.message };
  }

  return { ok: true, isNew: true };
}

export async function markWelcomeEmailSent(email: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return;
  }

  const now = new Date().toISOString();
  const { error } = await supabase
    .from('marketing_waitlist')
    .update({ welcome_email_sent_at: now, updated_at: now })
    .eq('email', email.trim().toLowerCase());

  if (error) {
    console.error('Failed to mark welcome email sent:', error);
  }
}
