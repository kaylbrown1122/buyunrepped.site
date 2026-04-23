'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const BUYUNREPPED_FLAT = 3490;
const COMPARISON_RATE = 0.03;

export default function LandingPage() {
  const [sliderValue, setSliderValue] = useState(750000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const assumedBuyerSide = Math.round(sliderValue * COMPARISON_RATE);
  const spread = assumedBuyerSide - BUYUNREPPED_FLAT;

  const faqs = [
    {
      q: "Do I need a buyer's agent in Tennessee?",
      a: "No. Buyers are not required to use a buyer's agent. You can purchase a home directly in Tennessee. BuyUnrepped gives you the structure and licensed oversight you'd otherwise miss—without the commission.",
    },
    {
      q: 'Is BuyUnrepped representing me as my agent?',
      a: "No. BuyUnrepped consults, coordinates, and manages behind the scenes. We do not act as a buyer's agent, do not speak for you in negotiations, and do not owe buyer agency fiduciary duties. If you want full representation, you should hire a traditional buyer's agent.",
    },
    {
      q: 'What does non-representational support mean?',
      a: 'We do not establish a buyer agency relationship. Support is non-representational and scoped to the tier you purchase. It is not legal advice—consult a licensed attorney for legal questions.',
    },
    {
      q: 'How does the flat fee compare to a traditional commission?',
      a: "Traditional buyer-side compensation is often around 3% of the purchase price. On a $500K home that's $15,000. BuyUnrepped is $3,490 all in for both tiers combined—compare that to a percentage-based buyer-side line item.",
    },
    {
      q: 'What does the Offer Package include?',
      a: 'The $995 Offer Package includes a ready-to-submit offer using Tennessee forms, a strategy consultation, a comparative market analysis, and a broker price opinion (BPO).',
    },
    {
      q: 'What does Transaction Management include?',
      a: 'The $2,495 Transaction Management includes full coordination from contract through closing, platform access with templates and self-guided assistance, and direct broker support when you need it most.',
    },
    {
      q: 'Who is behind BuyUnrepped?',
      a: 'Kayla Brown, a licensed Tennessee broker with 175+ transactions and $100M+ in Middle Tennessee sales. All services are provided under her supervision through BuyUnrepped (Firm Lic. #267134).',
    },
  ];

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
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                    <span className="size-1.5 rounded-full bg-brand-blue" aria-hidden />
                    Tennessee · Licensed brokerage · Flat fee
                  </p>
                  <Image
                    src="/images/buyunrepped-cropped.png"
                    alt="BuyUnrepped"
                    width={4249}
                    height={1200}
                    className="h-8 w-auto max-w-none shrink-0 object-contain object-left opacity-95 sm:h-9"
                    priority
                    sizes="(max-width: 640px) 120px, 140px"
                  />
                </div>

                <h1
                  id="hero-heading"
                  className="max-w-xl text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]"
                >
                  <span className="block">Keep control.</span>
                  <span className="block text-brand-gold">Keep your leverage.</span>
                </h1>

                <p className="mt-6 max-w-xl text-[1.125rem] leading-relaxed text-white/65 md:text-[1.2rem]">
                  Buy without a buyer&apos;s agent and deal directly with the listing side when you choose to.
                  BuyUnrepped works behind the scenes to organize the contract, timing, and details—without acting as
                  your buyer&apos;s agent. Flat fee. Defined process. Licensed oversight.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-gold px-8 py-3 text-[1rem] font-bold text-brand-navy shadow-lg shadow-brand-gold/20 transition-all hover:bg-[#e8b93d] hover:shadow-xl hover:shadow-brand-gold/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                  >
                    Reach Out
                  </Link>
                  <Link
                    href="/schedule"
                    className="text-[14px] font-medium text-white/50 underline-offset-4 transition-colors hover:text-white/80"
                  >
                    Start an offer →
                  </Link>
                </div>

                <dl className="mt-10 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-4 sm:items-stretch">
                  {[
                    ['Non-representation', 'No buyer agency relationship.'],
                    ['Flat fee', 'Not a % of price—tiered pricing, confirmed in writing.'],
                    ['Structured support', 'Checkpoints, paperwork, and broker-backed workflow.'],
                  ].map(([t, d]) => (
                    <div
                      key={t}
                      className="flex min-h-[5.5rem] flex-col justify-center text-center sm:min-h-[6rem] sm:text-left"
                    >
                      <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue sm:text-[12px]">
                        {t}
                      </dt>
                      <dd className="mt-2 text-[15px] leading-snug text-white/50 sm:text-[15px]">{d}</dd>
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
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                  Flat fee — no commission
                </p>

                <div className="mt-5 space-y-0">
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 py-5">
                    <div>
                      <p className="font-semibold text-white">Offer Package</p>
                      <p className="mt-0.5 text-[13px] text-white/45">
                        Strategy, forms, CMA + BPO
                      </p>
                    </div>
                    <p className="shrink-0 text-[1.35rem] font-bold text-white">
                      $995
                    </p>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 py-5">
                    <div>
                      <p className="font-semibold text-white">
                        Transaction Management
                      </p>
                      <p className="mt-0.5 text-[13px] text-white/45">
                        Contract through closing
                      </p>
                    </div>
                    <p className="shrink-0 text-[1.35rem] font-bold text-white">
                      $2,495
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-xl border-l-4 border-brand-gold bg-white/[0.08] px-4 py-4 mt-2">
                    <p className="font-bold text-brand-gold">All in, combined</p>
                    <p className="shrink-0 text-[1.5rem] font-extrabold text-brand-gold">
                      $3,490
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[12px] leading-relaxed text-white/35">
                  vs. ~3% buyer-side commission. On average, $10,000+ in found
                  leverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden border-b border-gray-100 bg-brand-gray"
          role="region"
          aria-label="Kayla Brown experience and BuyUnrepped model metrics"
        >
          <div
            className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-navy/10 to-transparent pointer-events-none"
            aria-hidden
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10 py-24 md:flex-row md:items-stretch md:gap-0 md:py-32">
              <div className="flex flex-1 flex-col justify-center md:border-r md:border-gray-200 md:pr-10 lg:pr-14">
                <p
                  id="stats-experience-heading"
                  className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 md:text-left"
                >
                  Experience · Kayla Brown
                </p>
                <div className="mt-6 grid min-h-[7rem] grid-cols-2 items-center gap-6 sm:gap-8">
                  <div className="flex h-full flex-col justify-center text-center md:text-left">
                    <p className="text-4xl font-extrabold tracking-tight text-brand-navy md:text-5xl">
                      $100M+
                    </p>
                    <p className="mt-2 text-[14px] leading-snug text-gray-400">
                      Middle Tennessee transaction volume
                    </p>
                  </div>
                  <div className="flex h-full flex-col justify-center text-center md:text-left">
                    <p className="text-4xl font-extrabold tracking-tight text-brand-navy md:text-5xl">
                      175+
                    </p>
                    <p className="mt-2 text-[14px] leading-snug text-gray-400">
                      Transactions facilitated
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center md:pl-10 lg:pl-14">
                <p
                  id="stats-model-heading"
                  className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 md:text-left"
                >
                  BuyUnrepped model
                </p>
                <div className="mt-6 grid min-h-[7rem] grid-cols-2 items-center gap-6 sm:gap-8">
                  <div className="flex h-full flex-col justify-center text-center md:text-left">
                    <p className="text-4xl font-extrabold tracking-tight text-brand-navy md:text-5xl">
                      $3,490
                    </p>
                    <p className="mt-2 text-[14px] leading-snug text-gray-400">
                      All-in flat fee
                    </p>
                  </div>
                  <div className="flex h-full flex-col justify-center text-center md:text-left">
                    <p className="text-4xl font-extrabold tracking-tight text-brand-navy md:text-5xl">
                      $10K+
                    </p>
                    <p className="mt-2 text-[14px] leading-snug text-gray-400">
                      Average buyer leverage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STEPS 1–3 (three cards) ───────────────────────────────────────── */}
        <section
          className="border-b border-gray-100 bg-brand-gray py-12 md:py-16"
          aria-label="Steps: find the home, engage BuyUnrepped, and close"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ol className="grid list-none gap-8 lg:grid-cols-3 lg:gap-8">
              <li>
                <div className="overflow-hidden rounded-2xl border border-gray-100 border-l-4 border-l-brand-gold bg-white p-6 shadow-sm">
                  <div className="relative mx-auto h-56 w-full max-w-[11rem] overflow-hidden rounded-xl border border-gray-200 bg-gray-50 lg:mx-0">
                    <Image
                      src="/images/lifestyle-couple-viewing-home.png"
                      alt="Couple viewing a home from the sidewalk"
                      fill
                      className="object-cover object-center"
                      sizes="224px"
                    />
                  </div>
                  <p className="mt-2 text-[11px] leading-snug text-gray-400">
                    Illustration only—not a specific property.
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                    Step 1
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-brand-navy sm:text-xl">Find the home</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                    <span className="font-semibold text-brand-navy">You lead the search.</span> Tour, ask questions, and
                    decide what is worth pursuing—often working directly with the listing side. When you are ready to move,
                    the next step is a contract path that stays organized.
                  </p>
                </div>
              </li>
              <li>
                <div className="overflow-hidden rounded-2xl border border-gray-100 border-l-4 border-l-brand-gold bg-white p-6 shadow-sm">
                  <div className="relative mx-auto h-56 w-full max-w-[11rem] overflow-hidden rounded-xl border border-gray-200 bg-gray-50 lg:mx-0">
                    <Image
                      src="/images/lifestyle-couple-laptop.png"
                      alt="Couple reviewing a home purchase on a laptop at home"
                      fill
                      className="object-cover object-center"
                      sizes="224px"
                    />
                  </div>
                  <p className="mt-2 text-[11px] leading-snug text-gray-400">
                    Illustration only—not clients or a specific transaction.
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                    Step 2
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-brand-navy sm:text-xl">Engage BuyUnrepped</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                    <span className="font-semibold text-brand-navy">Choose a tier and confirm scope in writing.</span> We
                    align disclosures, Tennessee-appropriate forms, and the workflow to your stage—while you keep control
                    of negotiations and relationships you want to lead.
                  </p>
                </div>
              </li>
              <li>
                <div className="overflow-hidden rounded-2xl border border-gray-100 border-l-4 border-l-brand-gold bg-white p-6 shadow-sm">
                  <div className="relative mx-auto h-56 w-full max-w-[11rem] overflow-hidden rounded-xl border border-gray-200 bg-gray-50 lg:mx-0">
                    <Image
                      src="/images/lifestyle-sold.png"
                      alt="Couple with a sold sign in front of a home"
                      fill
                      className="object-cover object-center"
                      sizes="224px"
                    />
                  </div>
                  <p className="mt-2 text-[11px] leading-snug text-gray-400">
                    Illustration only—not a specific sale or outcome.
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                    Step 3
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-brand-navy sm:text-xl">Close</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                    <span className="font-semibold text-brand-navy">Target: settlement with a defensible file.</span> Clear
                    terms, organized contingencies, and fewer avoidable surprises at the closing table—still within
                    non-representational support.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* ── THREE OPTIONS ───────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden border-b border-gray-100 bg-brand-gray py-16 md:py-24"
          aria-labelledby="options-heading"
        >
          <div
            className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gray-100/80 to-transparent pointer-events-none"
            aria-hidden
          />
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
              <article className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">On your own</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                  You coordinate everything—offer through closing—without a buyer&apos;s agent and without a
                  brokerage-backed workflow.
                </p>
                <p className="mt-4 text-[13px] text-gray-400">Higher execution risk when details slip.</p>
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

        {/* ── HOW IT WORKS (phases + roles) ─────────────────────────────────── */}
        <section
          id="how-it-works"
          className="border-b border-gray-100 bg-white py-20 md:py-28"
          aria-labelledby="how-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                How it works
              </p>
              <h2
                id="how-heading"
                className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
              >
                Phases and roles
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-500">
                You stay in front of the listing side and own the negotiation. BuyUnrepped keeps the contract path,
                sequence, and checkpoints organized—without a buyer agency relationship.
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-3xl space-y-12 border-t border-gray-100 pt-12">
              {[
                {
                  name: 'Offer preparation',
                  you: [
                    'Choose the property, tour, and direct questions to the listing side.',
                    'Decide price, dates, earnest money, and contingencies you want on paper.',
                  ],
                  buyUnrepped: [
                    'Build out forms and addenda to reflect the terms you chose—within your tier.',
                    'Review structure with you before you send it—not as your agent in negotiation.',
                  ],
                },
                {
                  name: 'Offer and acceptance',
                  you: [
                    'Submit the offer and handle counters with the listing side until the contract is set.',
                    'Sign and return documents on your side of the transaction.',
                  ],
                  buyUnrepped: [
                    'Keep versions and signatures organized; surface dates you need to hit.',
                    'Answer process questions within purchased scope; we do not speak for you.',
                  ],
                },
                {
                  name: 'Under contract',
                  you: [
                    'Schedule inspections and decide how to handle property condition.',
                    'Work with your lender and title company; respond to what they require of you through contingencies and underwriting.',
                  ],
                  buyUnrepped: [
                    'Track contingency checkpoints against the contract.',
                    'Coordinate the transaction workflow under your tier through this period.',
                  ],
                },
                {
                  name: 'Closing preparation',
                  you: [
                    'Work with your lender and title company; respond to what they require of you to clear and fund.',
                    'Sign and attend closing per your instructions.',
                  ],
                  buyUnrepped: [
                    'Track closing preparation checkpoints against the contract.',
                    'Coordinate the workflow through closing prep under your tier.',
                  ],
                },
              ].map((phase) => (
                <div key={phase.name}>
                  <h3 className="text-lg font-extrabold text-brand-navy sm:text-xl">
                    {phase.name}
                  </h3>
                  <div className="mt-6 grid gap-8 border-t border-gray-100 pt-6 sm:grid-cols-2 sm:gap-10">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-navy">
                        You
                      </p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-gray-600 marker:text-brand-blue/80">
                        {phase.you.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-navy">
                        BuyUnrepped
                      </p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-gray-600 marker:text-brand-blue/80">
                        {phase.buyUnrepped.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHERE ARE YOU ────────────────────────────────────────────────── */}
        <section
          className="bg-brand-navy py-20 md:py-28"
          aria-labelledby="stage-heading"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2
                id="stage-heading"
                className="text-3xl font-extrabold text-white sm:text-4xl"
              >
                Where are you right now?
              </h2>
              <p className="mt-3 text-lg text-white/50">Start where you are.</p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {[
                {
                  label: 'Just starting',
                  desc: 'Understand the process before you jump in',
                  cta: 'Learn first',
                  href: '/guides',
                  featured: false,
                },
                {
                  label: 'Found a home',
                  desc: "Let's build your offer the right way",
                  cta: 'Build your offer',
                  href: '/contact',
                  featured: true,
                },
                {
                  label: 'Already under contract',
                  desc: "We'll help you finish strong",
                  cta: 'Set up your transaction',
                  href: '/contact',
                  featured: false,
                },
              ].map(({ label, desc, cta, href, featured }) => (
                <div
                  key={label}
                  className={`rounded-2xl border p-8 transition-colors ${
                    featured
                      ? 'border-brand-gold bg-brand-gold/10'
                      : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  {featured && (
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                      ★ Most common
                    </p>
                  )}
                  <h3 className="text-xl font-bold text-white">{label}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/55">
                    {desc}
                  </p>
                  <Link
                    href={href}
                    className={`mt-6 inline-flex items-center gap-1 text-[14px] font-semibold transition-colors ${
                      featured
                        ? 'text-brand-gold hover:text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {cta} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BROKERAGE TRUST STRIP ────────────────────────────────────────── */}
        <div className="border-y border-gray-100 bg-white py-8">
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

        {/* ── WHAT'S INCLUDED ──────────────────────────────────────────────── */}
        <section className="border-b border-gray-100 bg-brand-gray py-16 md:py-24" aria-labelledby="included-heading">
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
                Grouped by how the work shows up in your purchase. Exact deliverables depend on tier.
              </p>
            </div>

            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {[
                {
                  title: 'Offer preparation',
                  items: [
                    'Tennessee-appropriate contract and addenda aligned to common residential transactions',
                    'Offer assembly support so submissions read complete and professional',
                  ],
                },
                {
                  title: 'Transaction coordination',
                  items: ['Contract timeline tracking for key dates', 'Workflow from acceptance through closing prep'],
                },
                {
                  title: 'Guidance & access',
                  items: [
                    'Licensed support for questions within purchased scope',
                    'Next-step guidance without negotiating for you as your agent',
                  ],
                },
                {
                  title: 'Tools & documentation',
                  items: ['Template-driven document generation where included', 'Reference materials where included in tier'],
                },
              ].map((col) => (
                <div key={col.title}>
                  <h3 className="border-b border-gray-200 pb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="text-[14px] leading-relaxed text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-12 max-w-2xl text-[13px] leading-relaxed text-gray-400">
              Non-representational support is not legal advice. For legal questions, consult a licensed attorney.
            </p>
          </div>
        </section>

        {/* ── SAVINGS CALCULATOR ───────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden border-b border-white/10 py-20 md:py-28"
          aria-labelledby="savings-heading"
          style={{
            background:
              'radial-gradient(ellipse at 60% 40%, #24709d 0%, #1b5373 50%, #0a1f2c 100%)',
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Planning comparison
              </p>
              <h2
                id="savings-heading"
                className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                How much could you save?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed text-white/60">
                Slide to your purchase price. Traditional buyer-side compensation is often 3%. BuyUnrepped is $3,490 all in.
              </p>
            </div>

            <div className="mt-12 rounded-3xl border border-white/10 bg-white p-8 shadow-xl shadow-black/20 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div>
                  <label
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400"
                    htmlFor="price-slider"
                  >
                    Purchase price (illustrative)
                  </label>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-sm text-gray-400">$250K</span>
                    <span className="text-3xl font-extrabold tabular-nums text-brand-navy">
                      {sliderValue >= 1_000_000
                        ? `$${(sliderValue / 1_000_000).toFixed(
                            sliderValue % 1_000_000 === 0 ? 0 : 1
                          )}M`
                        : `$${(sliderValue / 1000).toFixed(0)}K`}
                    </span>
                    <span className="text-sm text-gray-400">$3M</span>
                  </div>
                  <input
                    id="price-slider"
                    type="range"
                    min={250000}
                    max={3000000}
                    step={10000}
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="mt-4 w-full accent-brand-navy"
                    aria-valuemin={250000}
                    aria-valuemax={3000000}
                    aria-valuenow={sliderValue}
                  />
                  <p className="mt-3 text-xs text-gray-400">
                    Assumes 3% buyer-side for illustration. Actual market terms
                    vary.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 p-5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      At 3%
                    </p>
                    <p className="mt-2 text-xl font-extrabold tabular-nums text-gray-700">
                      ${assumedBuyerSide.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl border-2 border-brand-gold/40 bg-brand-navy/5 p-5 text-center ring-1 ring-brand-gold/30">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-brand-navy/60">
                      BuyUnrepped
                    </p>
                    <p className="mt-2 text-xl font-extrabold tabular-nums text-brand-navy">
                      $3,490
                    </p>
                  </div>
                  <div className="rounded-2xl bg-brand-green/10 p-5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-brand-green/70">
                      You keep
                    </p>
                    <p className="mt-2 text-xl font-extrabold tabular-nums text-brand-green">
                      ${Math.max(spread, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-100 pt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-8 py-3 text-[15px] font-bold text-brand-navy shadow-sm transition-all hover:bg-[#e8b93d] hover:shadow-md"
                >
                  Reach Out
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 px-7 py-3 text-[15px] font-medium text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-gray-50"
                >
                  See full pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section
          className="border-b border-gray-100 bg-brand-gray py-20 md:py-28"
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
          className="relative overflow-hidden bg-brand-navy py-24 md:py-32"
          aria-labelledby="cta-heading"
          style={{
            background:
              'radial-gradient(ellipse at 30% 70%, #24709d 0%, #1b5373 55%, #0a1f2c 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            aria-hidden
            style={{
              backgroundImage:
                'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="absolute left-0 bottom-0 h-[3px] w-full bg-brand-gold" aria-hidden />

          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2
              id="cta-heading"
              className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
            >
              Ready to buy without an agent?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[1.1rem] leading-relaxed text-white/55">
              We confirm fit, tier, and scope in writing before you move forward.
              No pressure, no obligation.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-gold px-10 py-3.5 text-[1rem] font-bold text-brand-navy shadow-lg shadow-brand-gold/20 transition-all hover:bg-[#e8b93d] hover:shadow-xl hover:shadow-brand-gold/30"
              >
                Reach Out
              </Link>
              <Link
                href="/pricing"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/20 px-8 py-3.5 text-[1rem] font-medium text-white/85 transition-colors hover:border-white/40 hover:bg-white/[0.07]"
              >
                See pricing →
              </Link>
            </div>
            <p className="mt-12 text-[11px] text-white/25">
              BuyUnrepped · Tennessee · Firm license #267134 · Principal Broker:
              Kayla Brown · License #339134
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
