'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import Link from 'next/link';
import { Star, Lock } from 'lucide-react';
import { useSpamGuard } from '../../lib/useSpamGuard';
import Reveal from '../components/Reveal';

const VENDOR_SOURCE = 'buyers_vendor_list';
const UNLOCK_KEY = 'bu_vendor_list_unlocked';

interface TitleCompany {
  name: string;
  rating: number;
  href: string;
}

const titleCompanies: TitleCompany[] = [
  { name: 'Magnolia Title & Escrow', rating: 5.0, href: 'https://magnoliatitle.com/' },
  { name: 'Chapman & Rosenthal', rating: 4.8, href: 'https://chapmanrosenthal.com/' },
  { name: 'Windmill Title', rating: 4.6, href: 'https://www.windmilltitle.com/' },
  { name: 'Wilson Berry Title', rating: 5.0, href: 'https://wilsonberrytitle.com/' },
  { name: 'Cedar City Title', rating: 5.0, href: 'https://cedarcitytitle.com/' },
  { name: 'Wagon Wheel Title', rating: 4.9, href: 'https://wagonwheeltitle.com/' },
];

interface Lender {
  name: string;
  company: string;
  kind: string;
  email: string;
  phone: string;
  tags: string[];
}

const lenders: Lender[] = [
  {
    name: 'Jackie Hurtis',
    company: 'Guild Mortgage',
    kind: 'Broker',
    email: 'jhurtis@guildmortgage.net',
    phone: '(608) 347-0756',
    tags: ['First-time buyers', 'Bridge loans', 'Credit repair', 'Conventional', 'Move-up buyers'],
  },
  {
    name: 'TJ Dyer',
    company: 'Cadence Bank',
    kind: 'Bank',
    email: 'tj.dyer@cadencebank.com',
    phone: '(615) 540-5884',
    tags: ['Conventional', 'Jumbo', 'HELOC', 'Professional loans', 'VA'],
  },
  {
    name: 'Anna Cook',
    company: 'CrossCountry Mortgage',
    kind: 'Broker',
    email: 'anna.cook@ccm.com',
    phone: '(615) 504-4792',
    tags: ['First-time buyers', 'Move-up buyers', 'Credit repair', 'HELOC'],
  },
  {
    name: 'Keith Collins',
    company: 'The Lending Collective',
    kind: 'Broker',
    email: 'keith@tlcco.com',
    phone: '(916) 253-7820',
    tags: ['Jumbo', 'Asset-based', 'Non-traditional income', 'Move-up buyers', 'Relocation'],
  },
  {
    name: 'Kent Stone',
    company: 'Smart Bank',
    kind: 'Bank',
    email: 'kent.stone@smartbank.com',
    phone: '(615) 521-6470',
    tags: ['Professional loans', 'Jumbo', 'HELOC', 'VA'],
  },
  {
    name: 'Orly Cohen',
    company: 'First Bank',
    kind: 'Bank',
    email: 'orly.cohen@firstbankonline.com',
    phone: '(615) 243-3303',
    tags: ['USDA / THDA', 'First-time buyers', 'Professional loans'],
  },
  {
    name: 'Amanda Gilbert',
    company: 'Steadfast Mortgage',
    kind: 'Broker',
    email: 'amanda@steadfastmortgage.com',
    phone: '(615) 423-5443',
    tags: ['First-time buyers', 'Conventional'],
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      <span className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-3.5 ${i < full ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}`}
          />
        ))}
      </span>
      <span className="text-[12px] font-semibold text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function VendorsPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const spamGuard = useSpamGuard();

  useEffect(() => {
    if (window.localStorage.getItem(UNLOCK_KEY) === 'true') {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !consent) return;

    setStatus('loading');
    setErrorMessage('');

    const [firstName, ...rest] = name.trim().split(/\s+/);
    const lastName = rest.join(' ') || firstName;

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, source: VENDOR_SOURCE, ...spamGuard.getPayload() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        spamGuard.refreshChallenge();
        throw new Error(data?.error || 'Failed to submit');
      }

      window.localStorage.setItem(UNLOCK_KEY, 'true');
      setUnlocked(true);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionBadge>For Buyers · Vendor list</SectionBadge>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
            Kayla&apos;s go-to <span className="text-brand-gold">title, lenders &amp; warranty</span> notes
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
            Middle Tennessee partners and contacts Kayla reaches for often, not endorsements of every transaction
            outcome, and not a substitute for your own due diligence.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        {!unlocked ? (
          <div className="rounded-3xl border border-brand-gold/40 bg-brand-cream p-8 shadow-sm md:p-10">
            <div className="mx-auto max-w-md text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-navy/5 text-brand-navy">
                <Lock className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight">Unlock the list</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
                Enter your details and subscribe to emails from BuyUnrepped. You&apos;ll see title company picks,
                lender contacts, and how Kayla thinks about home warranty selection right after.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4">
              <input {...spamGuard.honeypotFieldProps} />
              <div>
                <label htmlFor="vendor-name" className="mb-1.5 block text-sm font-semibold text-gray-700">Name</label>
                <input
                  id="vendor-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              <div>
                <label htmlFor="vendor-email" className="mb-1.5 block text-sm font-semibold text-gray-700">Email</label>
                <input
                  id="vendor-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              <div>
                <label htmlFor="vendor-phone" className="mb-1.5 block text-sm font-semibold text-gray-700">Phone (optional)</label>
                <input
                  id="vendor-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              <div className="flex items-start gap-2.5">
                <input
                  id="vendor-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 size-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
                <label htmlFor="vendor-consent" className="text-[13px] leading-snug text-gray-600">
                  I agree to receive email updates from BuyUnrepped. I can unsubscribe anytime.
                </label>
              </div>

              {spamGuard.question && (
                <div>
                  <label htmlFor="vendor-captcha" className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Quick check: {spamGuard.question}
                  </label>
                  <input
                    id="vendor-captcha"
                    type="text"
                    inputMode="numeric"
                    value={spamGuard.captchaAnswer}
                    onChange={(e) => spamGuard.setCaptchaAnswer(e.target.value)}
                    autoComplete="off"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
              )}

              {status === 'error' && (
                <p role="alert" className="text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-brand-gold py-3.5 text-[15px] font-bold text-brand-navy shadow-sm transition-colors hover:bg-[#e8b93d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'loading' ? 'Unlocking…' : 'Unlock the list'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Title companies */}
            <Reveal as="section" aria-labelledby="vendor-titles-heading">
              <h2 id="vendor-titles-heading" className="text-2xl font-bold tracking-tight">Title companies</h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-gray-500">
                Closing teams Kayla trusts to communicate clearly and run a tight file. Always confirm fees, wire
                instructions, and timing directly with the office handling <em>your</em> transaction.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {titleCompanies.map((t) => (
                  <a
                    key={t.name}
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand-blue/30 hover:shadow-md"
                  >
                    <h3 className="text-[15px] font-bold leading-snug text-brand-navy group-hover:text-brand-blue">
                      {t.name}
                    </h3>
                    <div className="mt-2">
                      <Stars rating={t.rating} />
                    </div>
                    <span className="mt-3 inline-block text-[13px] font-semibold text-brand-blue">Website →</span>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Lenders */}
            <Reveal as="section" aria-labelledby="vendor-lenders-heading">
              <h2 id="vendor-lenders-heading" className="text-2xl font-bold tracking-tight">Lenders</h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-gray-500">
                Loan officers who understand Middle Tennessee files and pick up the phone. Shop rates and programs
                with at least two sources, use this as a starting point for conversations, not a single quote.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {lenders.map((l) => (
                  <div key={l.name} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="text-[15px] font-bold leading-snug text-brand-navy">
                      {l.name} <span className="font-medium text-gray-400"> · {l.company}</span>
                    </h3>
                    <p className="mt-1 text-[12px] font-semibold uppercase tracking-wide text-gray-400">{l.kind}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-gray-600">
                      <a href={`mailto:${l.email}`} className="text-brand-blue hover:underline">{l.email}</a>
                      {' · '}
                      <a href={`tel:${l.phone.replace(/[^\d]/g, '')}`} className="text-brand-blue hover:underline">{l.phone}</a>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {l.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-blue"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Warranty */}
            <Reveal as="section" aria-labelledby="vendor-warranty-heading">
              <h2 id="vendor-warranty-heading" className="text-2xl font-bold tracking-tight">Home warranty selection</h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-gray-500">
                The right warranty depends on the age of major systems, what your inspection flagged, and how long
                you plan to own the home, there isn&apos;t one SKU that fits every deal.
              </p>
              <div className="mt-5 rounded-2xl border border-gray-200 bg-brand-cream p-6">
                <p className="text-[14px] leading-relaxed text-gray-600">
                  Kayla typically walks buyers through a short checklist: structural vs. systems coverage,
                  trade-call fees, caps and exclusions, and whether the seller is offering a plan as part of your
                  contract. Comparing options side by side,{' '}
                  <strong className="font-semibold text-brand-navy">Achosa</strong> and{' '}
                  <strong className="font-semibold text-brand-navy">2-10</strong> are the usual starting points and
                  usually surfaces the best questions to ask before you bind coverage.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-gray-600">
                  Have a specific property under contract?{' '}
                  <Link href="/contact" className="font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue">
                    Reach out
                  </Link>{' '}
                  and Kayla will help you pressure-test the option that fits <em>that</em> house.
                </p>
              </div>
            </Reveal>

            <p className="border-t border-gray-200 pt-8 text-[13px] leading-relaxed text-gray-400">
              Educational reference only. BuyUnrepped does not receive compensation for listings on this page unless
              disclosed separately in writing. Vendors, programs, and licensing change, verify details directly
              before you engage any third party. Not legal or tax advice.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
