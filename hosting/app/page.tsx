'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import SavingsCalculator from './components/SavingsCalculator';
import ProductWalkthrough from './components/ProductWalkthrough';
import { WaitlistButton } from './components/WaitlistModal';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getAppUrl } from '../lib/appUrl';
import { OFFER_FEE, TRANSACTION_FEE_FULL } from '../lib/fees';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do I need a buyer's agent in Tennessee?",
      a: "No. Buyers are not required to use a buyer's agent. You can purchase a home directly in Tennessee. BuyUnrepped gives you the structure and licensed oversight you'd otherwise miss—without the commission.",
    },
    {
      q: 'Is BuyUnrepped representing me as my agent?',
      a: "No. BuyUnrepped consults, coordinates, and manages behind the scenes—on a non-representational basis scoped to the tier you purchase. We do not act as a buyer's agent, do not speak for you in negotiations, and do not owe buyer agency fiduciary duties. If you want full representation, you should hire a traditional buyer's agent. (This is not legal advice—consult a licensed attorney for legal questions.)",
    },
    {
      q: 'What do I do vs what does BuyUnrepped do?',
      a: 'You stay in control of the purchase. You choose the property, decide your offer terms, communicate with the listing side, negotiate directly, and decide how to respond at each step. BuyUnrepped provides the structure behind the scenes: we help you complete the offer questionnaire, draft the Tennessee forms, provide pricing guidance and broker oversight, organize your documents, track deadlines, and coordinate the transaction within the scope of your package. We support the process, but we do not replace your judgment or act as your buyer\'s agent.',
    },
    {
      q: 'How does the flat fee compare to a traditional commission?',
      a: "Traditional buyer-side compensation is often around 3% of the purchase price. On a $500K home that's $15,000. BuyUnrepped charges a flat $995 for the Offer Package, with an optional $2,495 for Transaction Guidance if your offer is accepted and you'd like our help through closing—either way, the cost doesn't move with the home's price.",
    },
    {
      q: "What's included in each tier?",
      a: 'The $995 Offer Package includes a ready-to-submit offer using Tennessee forms, a strategy consultation, a comparative market analysis, and a broker price opinion (BPO). The $2,495 Transaction Management includes full coordination from contract through closing, platform access with templates and self-guided assistance, and direct broker support when you need it most.',
    },
    {
      q: 'When is $995 due? When is the coordination fee due?',
      a: `$${OFFER_FEE} is due upfront when you start the offer package in the app. The $${TRANSACTION_FEE_FULL.toLocaleString()} transaction coordination fee is due after your offer is accepted—not at signup. Split billing ($1,295 at contract upload + $1,295 at closing or within 60 days) may be offered for the same total.`,
    },
    {
      q: 'Who is behind BuyUnrepped?',
      a: 'Kayla Brown, CEO and Principal Broker—a licensed Tennessee broker with 175+ transactions and $100M+ in Middle Tennessee sales—is the sole public point of contact. All services are provided under her supervision through BuyUnrepped (Firm Lic. #267134). Email info@buyunrepped.com or use the contact form with questions.',
    },
    {
      q: 'Where is BuyUnrepped available?',
      a: 'Early access · Middle Tennessee. We are rolling out in phases across the Nashville metro and surrounding counties. Contact us if you are unsure whether your property qualifies.',
    },
  ];

  const appUrl = getAppUrl();

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      <Header />

      <main id="main-content" className="overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden bg-brand-navy"
          style={{
            background:
              'radial-gradient(ellipse at 60% 40%, #24709d 0%, #1b5373 50%, #0a1f2c 100%)',
          }}
        >
          {/* Dot-grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            aria-hidden
            style={{
              backgroundImage:
                'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Gold top accent */}
          <div className="absolute left-0 top-0 h-[3px] w-full bg-brand-gold" aria-hidden />

          <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 md:pt-14 md:pb-28 lg:px-8 lg:pt-[4.5rem] lg:pb-36">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] lg:gap-20">

              {/* Left copy */}
              <div>
                <div className="mb-7 flex flex-wrap items-center gap-3">
                  <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                    <span className="size-1.5 rounded-full bg-brand-blue" aria-hidden />
                    Tennessee · Licensed brokerage · Flat fee
                  </p>
                </div>

                <h1
                  id="hero-heading"
                  className="max-w-xl text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]"
                >
                  <span className="block">You found the house.</span>
                  <span className="block text-brand-gold">We&apos;ll help you buy it.</span>
                </h1>

                <p className="mt-7 max-w-xl text-[1.125rem] leading-relaxed text-white/65 md:text-[1.2rem]">
                  BuyUnrepped helps homebuyers make strong offers and close smoothly without paying a
                  traditional buyer&apos;s agent commission. You stay in control of the property, the terms,
                  and the communication. We provide our proprietary app, the state Realtor docs, licensed offer
                  and strategy guidance, and admin support from offer to closing for a tiered flat fee.
                </p>

                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue">
                    Support
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/75">
                    Pay for the offer upfront, then pay for transaction guidance once you&apos;re under
                    contract or at closing.
                  </p>
                </div>

                <div className="mt-7 max-w-xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue">
                    Reassurance
                  </p>
                  <p className="mt-2 text-[1.15rem] font-semibold leading-snug text-white">
                    Our brokers keep you confident.{' '}
                    <span className="font-normal text-white/65">
                      Our app keeps you organized, so you never miss a beat.
                    </span>
                  </p>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-gold px-8 py-3 text-[1rem] font-bold text-brand-navy shadow-lg shadow-brand-gold/20 transition-all hover:bg-[#e8b93d] hover:shadow-xl hover:shadow-brand-gold/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                  >
                    Start in the app
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/25 px-7 py-3 text-[1rem] font-medium text-white/85 transition-colors hover:border-white/40 hover:bg-white/[0.07]"
                  >
                    Questions about fees
                  </Link>
                </div>

                <dl className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3 sm:gap-4 sm:items-start">
                  {[
                    ['Non-representation', 'No buyer agency relationship.'],
                    ['Flat fee', 'Not a % of price—tiered pricing, confirmed in writing.'],
                    ['Structured support', 'Checkpoints, paperwork, and broker-backed workflow.'],
                  ].map(([t, d]) => (
                    <div key={t} className="text-center sm:text-left">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue sm:text-[11px]">
                        {t}
                      </dt>
                      <dd className="mt-1 text-[13px] leading-snug text-white/50">{d}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Right: pricing card */}
              <div
                className="rounded-2xl border border-white/10 p-7 backdrop-blur-sm lg:p-8"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(57, 182, 255, 0.12) 0%, rgba(27, 83, 115, 0.22) 100%)',
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">
                  Flat fee — no commission
                </p>

                <div className="mt-2 space-y-0">
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 pt-2">
                    <div>
                      <p className="font-semibold text-white">Offer Package</p>
                      <p className="mt-0.5 text-[13px] text-white/80">
                        Strategy, forms, price guidance
                      </p>
                    </div>
                    <p className="shrink-0 text-[1.35rem] font-bold text-white">
                      $995
                    </p>
                  </div>
                  <div className="flex items-start justify-between gap-4 py-5">
                    <div>
                      <p className="font-semibold text-white">
                        Transaction Guidance
                        <span className="ml-2 rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85">
                          Optional
                        </span>
                      </p>
                      <p className="mt-0.5 text-[13px] text-white/80">
                        Coordinate escrow, inspections, appraisal w/ broker and app assist
                      </p>
                    </div>
                    <p className="shrink-0 text-[1.35rem] font-bold text-white">
                      $2,495
                    </p>
                  </div>
                </div>

                <p className="mt-0 border-t border-b border-white/10 py-5 font-semibold text-white">
                  That&apos;s only $3,490 ALL IN for our full suite!
                </p>

                <p className="mt-3 text-[12px] leading-relaxed text-white/70">
                  Compare to a traditional buyer's agent ~3% commission. With BuyUnrepped, no matter the home's price, ours is always the same.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM + SAVINGS (why you need it) ──────────────────────── */}
        <section
          id="savings"
          className="border-b border-gray-100 bg-brand-gray py-8 md:py-10"
          aria-labelledby="savings-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                Why buyers are done overpaying
              </p>
              <h2
                id="savings-heading"
                className="mx-auto mt-2 max-w-xl text-xl font-extrabold tracking-tight text-brand-navy sm:text-2xl"
              >
                A buyer&apos;s agent costs about 3%. That&apos;s{' '}
                <span className="text-brand-gold">$28,500</span> on a $950,000 home.
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[13px] leading-snug text-gray-500">
                Since the 2024 commission changes, that fee is increasingly yours to pay—for someone to
                write an offer and relay messages. BuyUnrepped is flat: ${OFFER_FEE.toLocaleString()} to build
                and submit your offer, ${TRANSACTION_FEE_FULL.toLocaleString()} only if it&apos;s accepted and you
                want full coordination. Slide to your price.
              </p>
            </div>

            <SavingsCalculator />

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-brand-gold px-5 py-2 text-[13px] font-bold text-brand-navy shadow-sm transition-all hover:bg-[#e8b93d]"
              >
                Start your offer
              </a>
              <Link
                href="/pricing"
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-brand-navy/20 px-5 py-2 text-[13px] font-medium text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-white"
              >
                See full pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ── BROKERAGE TRUST STRIP (early proof) ──────────────────────────── */}
        <div className="border-b border-gray-100 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                <Image
                  src="/images/buyunrepped-cropped.png"
                  alt=""
                  width={4249}
                  height={1200}
                  className="h-8 w-auto max-w-none shrink-0 object-contain object-left opacity-90 sm:h-9"
                  sizes="(max-width: 640px) 120px, 140px"
                  aria-hidden
                />
                <p className="text-[13px] text-gray-500">
                  Built and run by{' '}
                  <span className="font-semibold text-brand-navy">Kayla Brown</span>
                  {' '}
                  · Licensed Tennessee Principal Broker · Lic. #339134 · 175+ transactions · $100M+ in TN sales
                </p>
              </div>
              <Link
                href="/about"
                className="shrink-0 text-[13px] font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-brand-blue"
              >
                About the brokerage →
              </Link>
            </div>
          </div>
        </div>

        {/* ── PRODUCT WALKTHROUGH (real app, screen by screen) ─────────────── */}
        <ProductWalkthrough />

        {/* ── THREE OPTIONS ───────────────────────────────────────────────── */}
        <section
          className="border-b border-gray-100 bg-white py-12 md:py-16"
          aria-labelledby="options-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">The model</p>
              <h2
                id="options-heading"
                className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
              >
                Three ways to buy
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-500">
                Same market—different roles, risks, and support. BuyUnrepped is the middle path: unrepresented, but not
                unstructured.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <article className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                  Full-service representation
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                  A buyer&apos;s agent represents you, advises on strategy, and typically manages much of the dialogue
                  with the listing side.
                </p>
                <p className="mt-4 text-[13px] text-gray-400">Best when you want full advocacy as your agent.</p>
              </article>
              <article
                className="relative overflow-hidden rounded-2xl p-6 ring-2 ring-brand-gold"
                style={{
                  background:
                    'linear-gradient(160deg, #24709d 0%, #1b5373 50%, #0a1f2c 100%)',
                }}
              >
                <span className="absolute right-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-navy">
                  Best fit
                </span>
                <h3 className="pr-20 text-xs font-bold uppercase tracking-[0.14em] text-white">BuyUnrepped</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white">
                  Unrepresented in the traditional sense, but supported: standardized documentation, sequencing, and
                  licensed oversight within your tier—not buyer agency.
                </p>
                <p className="mt-4 text-[13px] font-medium text-white/60">
                  Control of the conversation + professional structure.
                </p>
              </article>
              <article className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">On your own</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                  You coordinate everything—offer through closing—without a buyer&apos;s agent and without a
                  brokerage-backed workflow.
                </p>
                <p className="mt-4 text-[13px] text-gray-400">Higher execution risk when details slip.</p>
              </article>
            </div>

            <p className="mt-10 text-[15px] text-gray-600">
              Not sure which model fits?{' '}
              <Link
                href="/contact"
                className="font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue"
              >
                Reach out
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ──────────────────────────────────────────────── */}
        <section className="border-b border-gray-100 bg-brand-cream py-12 md:py-16" aria-labelledby="included-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">Scope</p>
              <h2
                id="included-heading"
                className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
              >
                What&apos;s included
              </h2>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-gray-500">
                BuyUnrepped is designed around the actual stages of the purchase. Here&apos;s what&apos;s included before
                submission, and what becomes available after acceptance.
              </p>
            </div>

            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:gap-12">
              <div>
                <h3 className="border-b border-gray-200 pb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                  Before you submit your offer
                </h3>
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14px] leading-relaxed text-gray-600 marker:text-brand-blue/70">
                  <li>Tennessee property intake and address confirmation</li>
                  <li>Onboarding disclosures and guided questionnaire</li>
                  <li>Tennessee offer documents based on your 1:1 broker call</li>
                  <li>Strategy call scheduling and broker review</li>
                  <li>Pricing guidance, broker price opinion, and supporting property data</li>
                  <li>Submission prep so your offer package is ready to send</li>
                </ul>
              </div>
              <div>
                <h3 className="border-b border-gray-200 pb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                  After your offer is accepted
                </h3>
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14px] leading-relaxed text-gray-600 marker:text-brand-blue/70">
                  <li>Transaction setup inside your dashboard</li>
                  <li>Contract timeline tracking and next-step guidance</li>
                  <li>Document organization and key-date reminders</li>
                  <li>Coordination support through inspections, escrow, appraisal, and closing prep</li>
                  <li>Licensed broker support where it counts</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-gray-400">
              BuyUnrepped supports the process and coordination of your purchase within the scope you select. We do not
              act as your buyer&apos;s agent, negotiate on your behalf, or provide legal advice.
            </p>
          </div>
        </section>

        {/* ── UNIVERSAL CAPTURE (start now, or stay in touch) ──────────────── */}
        <section
          className="border-b border-gray-100 bg-brand-cream py-16 md:py-20"
          aria-labelledby="capture-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-brand-gold/40 bg-white p-8 shadow-sm md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                    Live in Tennessee · expanding
                  </p>
                  <h2
                    id="capture-heading"
                    className="mt-2 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-[1.75rem]"
                  >
                    Buying in Tennessee? Start today.
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                    Anyone can buy a Tennessee home with BuyUnrepped—wherever you live now. Not in TN yet, or
                    just exploring? Leave your email and we&apos;ll tell you the moment we launch in your state,
                    plus tips to buy for less.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-gold px-8 py-3 text-[1rem] font-bold text-brand-navy shadow-sm transition-all hover:bg-[#e8b93d] hover:shadow-md"
                  >
                    Start your offer
                  </a>
                  <WaitlistButton className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-brand-navy/20 px-7 py-3 text-[1rem] font-semibold text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-brand-gray">
                    Keep me posted →
                  </WaitlistButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section
          className="border-b border-gray-100 bg-white py-16 md:py-20"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2
                id="faq-heading"
                className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
              >
                Questions and answers
              </h2>
              <p className="mt-4 text-[1rem] text-gray-500">
                Straight answers before you move forward.
              </p>
            </div>

            <div className="mt-12 divide-y divide-gray-200 overflow-hidden rounded-2xl bg-white shadow-sm">
              {faqs.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-6 p-6 text-left text-[16px] font-semibold text-brand-navy transition-colors hover:bg-brand-gray"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                    >
                      <span>{item.q}</span>
                      <span
                        className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-navy/8 text-brand-navy transition-transform duration-200 ${
                          open ? 'rotate-45' : ''
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    <div
                      id={`faq-panel-${i}`}
                      aria-hidden={!open}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96' : 'max-h-0'}`}
                    >
                      <div
                        className={`border-l-4 bg-brand-cream px-6 pb-6 pt-1 transition-colors ${open ? 'border-brand-gold' : 'border-transparent'}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                      >
                        <p className="text-[15px] leading-relaxed text-gray-600">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-brand-navy py-10 md:py-12"
          aria-labelledby="cta-heading"
          style={{
            background:
              'radial-gradient(ellipse at 30% 70%, #24709d 0%, #1b5373 55%, #0a1f2c 100%)',
          }}
        >
          <div className="absolute left-0 bottom-0 h-[3px] w-full bg-brand-gold" aria-hidden />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 px-4 sm:px-6 md:flex-row md:gap-8 lg:px-8">
            <h2
              id="cta-heading"
              className="text-center text-xl font-extrabold text-white sm:text-2xl md:text-left"
            >
              Found the perfect home?
            </h2>
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 min-h-[44px] items-center justify-center rounded-xl bg-brand-gold px-7 py-2.5 text-[15px] font-bold text-brand-navy shadow-sm transition-all hover:bg-[#e8b93d] hover:shadow-md"
            >
              Start your offer today →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
