-- Marketing site lead capture (buyunrepped.com)

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
  city text,
  state text,
  interested_in text,
  message text,
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

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  interested_in text,
  message text,
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_email_idx
  on public.contact_submissions (email);

alter table public.contact_submissions enable row level security;
