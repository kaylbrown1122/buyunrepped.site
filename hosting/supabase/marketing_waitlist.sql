-- Run in Supabase SQL editor for project gxdqsonpcngzjiugfhzy
-- Collects website signups now; email sending can be added later from your backend.

create table if not exists public.marketing_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'website_waitlist',
  first_name text,
  last_name text,
  email_subscribed boolean not null default true,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  user_id uuid references auth.users (id) on delete set null,
  welcome_email_sent_at timestamptz,
  last_emailed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email)
);

create index if not exists marketing_waitlist_created_at_idx
  on public.marketing_waitlist (created_at desc);

create index if not exists marketing_waitlist_email_subscribed_idx
  on public.marketing_waitlist (email_subscribed)
  where email_subscribed = true;

alter table public.marketing_waitlist enable row level security;

-- No public policies: marketing site API uses the secret key server-side only.
