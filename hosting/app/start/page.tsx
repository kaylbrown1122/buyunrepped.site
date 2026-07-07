'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, ClipboardCheck, Search, Calendar, MessageSquare, Home } from 'lucide-react';
import { getAppUrl } from '../../lib/appUrl';
import { OFFER_FEE, TRANSACTION_FEE_FULL, BUYUNREPPED_MAX_TOTAL } from '../../lib/fees';
import Reveal from '../components/Reveal';

const services = [
  {
    icon: <TrendingUp className="size-6 text-brand-blue" />,
    title: 'Offer Strategy',
    body: 'What to offer, how to structure it, and how to stay competitive without overpaying.',
  },
  {
    icon: <ClipboardCheck className="size-6 text-brand-blue" />,
    title: 'Contracts Done Right',
    body: 'All Tennessee-approved forms, completed correctly, nothing missed, nothing ambiguous.',
  },
  {
    icon: <Search className="size-6 text-brand-blue" />,
    title: 'Inspection Guidance',
    body: 'What matters, what doesn’t, and how to respond once you have results in hand.',
  },
  {
    icon: <Calendar className="size-6 text-brand-blue" />,
    title: 'Transaction Coordination',
    body: 'Deadlines, title, lender, closing, all tracked so nothing falls through.',
  },
  {
    icon: <MessageSquare className="size-6 text-brand-blue" />,
    title: 'Real-Time Support',
    body: 'Questions answered by a licensed broker at the moments that actually matter.',
  },
];

const steps = [
  {
    num: '01',
    title: 'You find the home',
    body: 'Zillow, Realtracs, listing agents, however you prefer to search. You set up showings directly. We’re not involved at this stage.',
  },
  {
    num: '02',
    title: 'We build your offer together',
    body: 'We run comps, structure the terms, and prepare all your documents. You get an offer that listing agents take seriously.',
  },
  {
    num: '03',
    title: 'You submit directly',
    body: 'You communicate with the listing agent. That’s the model, you’re in control, we’ve prepared you thoroughly for this moment.',
  },
  {
    num: '04',
    title: 'We guide you to close',
    body: 'We track every deadline, coordinate your inspection team, and stay in contact with lender and title so nothing gets missed between contract and keys.',
  },
];

const notFor = [
  {
    title: 'Buyers who want full-service representation',
    body: "If you want a licensed agent who owes you fiduciary duties and speaks on your behalf, you need a buyer's agent, that's a completely legitimate path.",
  },
  {
    title: 'Buyers uncomfortable communicating directly with listing agents',
    body: "You'll be the one in that conversation. We prepare you thoroughly, but we're not on the call. If that dynamic doesn't feel right, a buyer's agent is the better fit.",
  },
  {
    title: 'Buyers who want someone negotiating on their behalf',
    body: 'We consult, coordinate, and manage. We do not negotiate or act as your agent, there’s an important, intentional legal distinction there.',
  },
];

export default function StartLandingPage() {
  const appUrl = getAppUrl();

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      {/* Minimal top bar, logo only, no site nav, to keep ad traffic focused */}
      <div className="border-b border-gray-100 bg-white/95 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-4 sm:px-6">
          <Link href="/" className="block">
            <Image
              src="/images/buyunrepped-cropped.png"
              alt="BuyUnrepped"
              width={4249}
              height={1200}
              className="h-8 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-brand-navy"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #24709d 0%, #1b5373 50%, #0a1f2c 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          aria-hidden
          style={{
            backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute left-0 top-0 h-[3px] w-full bg-brand-gold" aria-hidden />

        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
            <span className="size-1.5 rounded-full bg-brand-blue" aria-hidden />
            175+ transactions · $100M+ experience · Licensed TN brokerage
          </p>
          <h1 className="mt-7 text-[2.25rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-[3.25rem]">
            Buy a home without a buyer&apos;s agent{' '}
            <span className="text-brand-gold">without being on your own.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[1.1rem] leading-relaxed text-white/70">
            BuyUnrepped is a licensed Tennessee real estate brokerage. We consult, coordinate, and manage, we do
            not speak on your behalf. Our goal is to make sure you&apos;re a great unrepresented buyer.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[14px] italic text-white/50">
            This isn&apos;t about replacing agents. It&apos;s about supporting buyers who don&apos;t want or need
            full-service representation.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-gold px-8 py-3 text-[1rem] font-bold text-brand-navy shadow-lg shadow-brand-gold/20 transition-all hover:bg-[#e8b93d]"
            >
              Continue to App →
            </a>
            <a
              href="#how"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/25 px-7 py-3 text-[1rem] font-medium text-white/85 transition-colors hover:border-white/40 hover:bg-white/[0.07]"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      <main>
        {/* The problem */}
        <Reveal as="section" className="border-b border-gray-100 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl">
              You don&apos;t need a full-service agent. But you also shouldn&apos;t go in{' '}
              <em className="not-italic text-[#B5522B]">without structure.</em>
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-600">
              More buyers are choosing to work directly with listing agents. Sometimes it&apos;s about control.
              Sometimes it&apos;s about cost. Sometimes it just feels more straightforward. But here&apos;s the
              reality:
            </p>
            <div className="mt-6 space-y-3 rounded-2xl border border-gray-200 bg-brand-gray p-6">
              <p className="text-[15px] leading-relaxed text-gray-700">
                <strong className="font-semibold text-brand-navy">The listing agent represents the seller</strong>, not you.
              </p>
              <p className="text-[15px] leading-relaxed text-gray-700">
                <strong className="font-semibold text-brand-navy">The contract still matters</strong>, every word of it.
              </p>
              <p className="text-[15px] leading-relaxed text-gray-700">
                <strong className="font-semibold text-brand-navy">Deadlines still matter</strong>, missing one can cost you the deal.
              </p>
              <p className="text-[15px] leading-relaxed text-gray-700">
                <strong className="font-semibold text-brand-navy">Strategy still matters</strong>, how you offer determines what you pay.
              </p>
            </div>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-gray-600">
              That&apos;s where most unrepresented buyers get exposed. Not because they couldn&apos;t do it, but
              because they didn&apos;t have the right structure behind them.
            </p>
          </div>
        </Reveal>

        {/* Positioning */}
        <Reveal as="section" className="border-b border-gray-100 bg-brand-cream py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl">
              This is where BuyUnrepped fits.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-600">
              We stay behind the scenes, helping you structure your offer, understand your options, and move
              through the transaction correctly.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">You</p>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-700">
                  Stay in control. Communicate directly. Make the decisions.
                </p>
              </div>
              <div className="rounded-2xl border border-brand-gold/40 bg-brand-navy p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">BuyUnrepped</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/90">
                  Makes sure you&apos;re doing it right with structured, professional support.
                </p>
              </div>
            </div>
            <p className="mt-6 text-[14px] italic text-gray-500">
              We consult, coordinate, and manage, we do not represent you or speak on your behalf.
            </p>
          </div>
        </Reveal>

        {/* Services */}
        <Reveal as="section" className="border-b border-gray-100 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              We don&apos;t represent you. <span className="text-brand-gold">We support you.</span>
            </h2>
            <p className="mt-3 text-[1.05rem] text-gray-500">
              Five ways we make sure you&apos;re positioned to close, behind the scenes.
            </p>
            <div className="mt-10 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.title} className="rounded-2xl border border-gray-200 bg-brand-gray p-6">
                  <span className="flex size-11 items-center justify-center rounded-full bg-brand-blue/10">
                    {s.icon}
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-brand-navy">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-gray-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* How it works */}
        <Reveal as="section" id="how" className="scroll-mt-8 border-b border-gray-100 bg-brand-cream py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              Simple. Structured. Clear.
            </h2>
            <p className="mt-3 text-center text-[1.05rem] text-gray-500">
              Four steps from finding the home to closing day.
            </p>
            <div className="mt-10 space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-[13px] font-bold text-white">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-brand-navy">{step.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-gray-600">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Pricing */}
        <Reveal
          as="section"
          className="border-b border-gray-100 bg-brand-navy py-16 md:py-20"
          style={{ background: 'radial-gradient(ellipse at 30% 70%, #24709d 0%, #1b5373 55%, #0a1f2c 100%)' }}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Flat-fee support. <span className="text-brand-gold">No commission.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-[1rem] leading-relaxed text-white/70">
              <strong className="text-white">${OFFER_FEE}</strong> ready-to-submit offer (strategy, CMA + BPO,
              Tennessee forms). <strong className="text-white">${TRANSACTION_FEE_FULL.toLocaleString()}</strong>{' '}
              transaction coordination with platform, templates, self-guided help, and broker support.{' '}
              <strong className="text-brand-gold">${BUYUNREPPED_MAX_TOTAL.toLocaleString()}</strong> all in versus
              typical 3%.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-7">
                <h3 className="text-lg font-bold text-white">Offer Package</h3>
                <p className="mt-2 text-3xl font-extrabold text-white">
                  <sup className="text-lg font-semibold text-white/60">$</sup>{OFFER_FEE}
                </p>
                <ul className="mt-5 space-y-2 text-[14px] leading-relaxed text-white/75">
                  <li>Ready-to-submit offer + Tennessee contracts</li>
                  <li>Strategy consultation</li>
                  <li>CMA + broker price opinion (BPO)</li>
                  <li>Submission guidance</li>
                </ul>
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-6 text-[15px] font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]"
                >
                  Continue to App →
                </a>
              </div>
              <div className="rounded-2xl border border-brand-gold/40 bg-white p-7">
                <p className="inline-block rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-navy">
                  After Contract
                </p>
                <h3 className="mt-3 text-lg font-bold text-brand-navy">Transaction Management</h3>
                <p className="mt-2 text-3xl font-extrabold text-brand-navy">
                  <sup className="text-lg font-semibold text-gray-400">$</sup>{TRANSACTION_FEE_FULL.toLocaleString()}
                </p>
                <ul className="mt-5 space-y-2 text-[14px] leading-relaxed text-gray-600">
                  <li>Full coordination from mutual acceptance to closing</li>
                  <li>Platform: templates + self-guided assistance</li>
                  <li>Inspection + repair guidance</li>
                  <li>Deadlines, lender, title, closing team</li>
                  <li>Broker support when you need it most</li>
                </ul>
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-6 text-[15px] font-bold text-white transition-colors hover:bg-brand-navy/90"
                >
                  Continue to App →
                </a>
              </div>
            </div>
            <p className="mt-6 text-center text-[13px] text-white/50">
              ${OFFER_FEE} offer + ${TRANSACTION_FEE_FULL.toLocaleString()} transaction = $
              {BUYUNREPPED_MAX_TOTAL.toLocaleString()} all in. Compare to ~3% buyer-side commission.
            </p>
          </div>
        </Reveal>

        {/* Differentiation */}
        <Reveal as="section" className="border-b border-gray-100 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              Why this works
            </h2>
            <p className="mt-2 text-center text-[1.05rem] text-gray-500">Same transaction. Different structure.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-brand-gray p-6">
                <h3 className="text-[13px] font-bold uppercase tracking-wide text-gray-400">Traditional model</h3>
                <ul className="mt-3 space-y-2.5 text-[14px] leading-relaxed text-gray-600">
                  <li>You hire an agent</li>
                  <li>They represent you</li>
                  <li>They speak on your behalf</li>
                  <li>They take a percentage of the purchase price</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-brand-gold/40 bg-brand-navy p-6">
                <h3 className="text-[13px] font-bold uppercase tracking-wide text-brand-gold">BuyUnrepped</h3>
                <ul className="mt-3 space-y-2.5 text-[14px] leading-relaxed text-white/85">
                  <li>You stay unrepresented</li>
                  <li>We support you behind the scenes</li>
                  <li>You communicate directly</li>
                  <li>You pay a flat fee</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-center text-[15px] text-gray-600">
              Same transaction. <strong className="font-semibold text-brand-navy">Different structure. Different cost.</strong>
            </p>
          </div>
        </Reveal>

        {/* Who this is not for */}
        <Reveal as="section" className="border-b border-gray-100 bg-brand-cream py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              This is not for everyone.
            </h2>
            <p className="mt-2 text-center text-[1.05rem] text-gray-500">
              We&apos;d rather tell you that up front than have you find out mid-transaction.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {notFor.map((n) => (
                <div key={n.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="text-[14px] font-bold leading-snug text-brand-navy">{n.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-gray-600">{n.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-[15px] italic text-gray-600">
              If you want control with <em className="not-italic font-semibold text-brand-navy">professional support behind the scenes</em>, you&apos;ll fit here.
            </p>
          </div>
        </Reveal>

        {/* Final CTA */}
        <Reveal
          as="section"
          className="relative overflow-hidden bg-brand-navy py-16 md:py-20"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, #24709d 0%, #1b5373 50%, #0a1f2c 100%)' }}
        >
          <div className="absolute left-0 top-0 h-[3px] w-full bg-brand-gold" aria-hidden />
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
              Licensed TN brokerage · Firm Lic. #267134
            </p>
            <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
              If you&apos;re already looking at homes,{' '}
              <span className="text-brand-gold">don&apos;t wait until you&apos;re writing the offer.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed text-white/70">
              The difference between a clean deal and a messy one usually comes down to how the offer is structured
              from the start. That&apos;s the moment we&apos;re built for.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-gold px-8 py-3 text-[1rem] font-bold text-brand-navy shadow-lg shadow-brand-gold/20 transition-all hover:bg-[#e8b93d]"
              >
                Continue to App →
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/25 px-7 py-3 text-[1rem] font-medium text-white/85 transition-colors hover:border-white/40 hover:bg-white/[0.07]"
              >
                Ask a Question First
              </Link>
            </div>
          </div>
        </Reveal>
      </main>

      {/* Minimal landing-page footer, licensing + EHO only, no site nav */}
      <footer className="bg-white py-8">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[13px] font-semibold text-brand-navy">
            BuyUnrepped™ <span className="font-normal text-gray-500">| Kayla Brown, Principal Broker</span>
          </p>
          <p className="mt-1.5 text-[12px] text-gray-500">
            TN Firm Lic. #267134 · Broker Lic. #339134 ·{' '}
            <a href="tel:6152083390" className="text-brand-blue hover:underline">615-208-3390</a> · 2509 Cruzen St, Nashville, TN 37211
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[11px] leading-relaxed text-gray-400">
            BuyUnrepped is a licensed Tennessee real estate brokerage. We consult, coordinate, and manage, we do
            not represent buyers or speak on their behalf. All services are provided under the supervision of
            Principal Broker Kayla Brown (Lic. #339134). Full-service buyer agents continue to play an important
            role in many transactions; BuyUnrepped exists to support a different, but equally legitimate, buyer
            path. This page is for informational purposes and does not constitute legal or financial advice.
          </p>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <Home className="size-3.5" aria-hidden /> Equal Housing Opportunity
          </p>
        </div>
      </footer>
    </div>
  );
}
