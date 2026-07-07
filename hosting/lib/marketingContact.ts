import { getSupabaseAdmin } from './supabaseAdmin';

export interface MarketingContactInput {
  email: string;
  firstName?: string;
  lastName?: string;
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
    .select('id')
    .eq('email', email)
    .maybeSingle();

  const now = new Date().toISOString();
  const firstName = input.firstName?.trim() || null;
  const lastName = input.lastName?.trim() || null;

  if (existing) {
    const updates: Record<string, string | boolean | null> = {
      email_subscribed: true,
      unsubscribed_at: null,
      updated_at: now,
    };

    if (firstName) updates.first_name = firstName;
    if (lastName) updates.last_name = lastName;

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
