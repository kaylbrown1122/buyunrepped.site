'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import SavingsCalculator from './components/SavingsCalculator';
import ProductWalkthrough from './components/ProductWalkthrough';
import RolloutTierLadder from './components/RolloutTierLadder';
import { WaitlistButton } from './components/WaitlistModal';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getFitCheckUrl } from '../lib/appUrl';
import { OFFER_FEE, TRANSACTION_FEE_FULL } from '../lib/fees';
import type { RolloutTiersResult } from '../lib/rolloutTier.types';

export default function LandingPageClient({ tiersData }: { tiersData: RolloutTiersResult }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do I need a buyer's agent in Tennessee?",
      a: "No. Buyers are not required to use a buyer's agent. You can purchase a home directly in Tennessee. BuyUnrepped gives you the structure and licensed oversight you'd otherwise miss, without the commission.",
    },
    {
      q: 'Is BuyUnrepped representing me as my agent?',
      a: "No. BuyUnrepped provides licensed brokerage services on a non-representational basis within your purchased tier. We do not act as a buyer's agent or speak for you in negotiations. We remain licensed real estate professionals and owe the duties Tennessee law requires for the services we provide, including honesty, good faith, reasonable skill and care, confidentiality where applicable, and required disclosures. If you want full representation, you should hire a traditional buyer's agent. (This is not legal advice. Consult a licensed attorney for legal questions.)",
    },
    {
      q: 'What do I do vs what does BuyUnrepped do?',
      a: 'You stay in control of the purchase. You choose the property, decide your offer terms, negotiate directly, and decide how to respond at each step. BuyUnrepped provides offer-preparation support, transaction coordination, reminders, pricing guidance, broker oversight, document organization, and other services within your purchased package. You remain responsible for decisions and for communications made on your own behalf with the listing side and other parties. We support the process, but do not replace your judgment or act as your buyer\'s agent.',
    },
    {
      q: 'How does the flat fee compare to a traditional commission?',
      a: "Buyer-side compensation is negotiable and not set by law or any MLS, but it is often around 3% of the purchase price. On a $500K home that's $15,000. BuyUnrepped launch tier pricing starts lower during early access, with a standard price of $995 for the Offer Package and $2,495 for Transaction Guidance after launch. Either way, the cost doesn't move with the home's price.",
    },
    {
      q: "What's included in each tier?",
      a: 'Launch tier pricing applies during early access. The standard price after launch is $995 for the Offer Package and $2,495 for Transaction Guidance. Each includes offer-preparation guidance using Tennessee residential forms, a strategy consultation, a comparative market analysis, and a broker price opinion (BPO). You decide the terms, approve the documents, and submit your own offer. CMAs and BPOs are informational only, not appraisals or guarantees of value.',
    },
    {
      q: 'When is $995 due? When is the coordination fee due?',
      a: `$${OFFER_FEE} is the standard Offer Package price after launch and is due upfront when you start in the app. The $${TRANSACTION_FEE_FULL.toLocaleString()} Transaction Guidance fee is due after your offer is accepted, not at signup. During launch, your active tier price applies at checkout.`,
    },
    {
      q: 'Who is behind BuyUnrepped?',
      a: 'Kayla Brown, CEO and Principal Broker, is a licensed Tennessee broker who has assisted in over 185 transactions amounting to over $100 million in sales. She is the sole public point of contact. All services are provided under her supervision through BuyUnrepped (Firm Lic. #267134). Email info@buyunrepped.com or use the contact form with questions.',
    },
    {
      q: 'Where is BuyUnrepped available?',
      a: 'Early access · Middle Tennessee. We are rolling out in phases across the Nashville metro and surrounding counties. Start with a Fit Check if you are unsure whether BuyUnrepped is the right fit for your purchase.',
    },
  ];

  const fitCheckUrl = getFitCheckUrl();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

          <div className="relative mx-auto max-w-7xl px-4 pt-[1.2718125rem] pb-[1.2544rem] sm:px-6 md:pt-[1.7805375rem] md:pb-[1.75616rem] lg:px-8 lg:pt-[2.2892625rem] lg:pb-[2.25792rem]">
            <div className="grid origin-top items-center gap-12 scale-[0.95] lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] lg:gap-20">

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
                  BuyUnrepped bridges the gap between full-service buyer&apos;s agent and full DIY real
                  estate. You control the property, the terms, and all communication with the listing side.
                  We provide our proprietary app, state REALTOR® forms, licensed offer and strategy guidance,
                  and administrative support through closing with transparent, flat-fee pricing.
                </p>

                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-4">
                  <p className="text-[13px] leading-relaxed text-white/75">
                    Pay for the offer upfront, then pay for transaction guidance once you&apos;re under
                    contract or at closing, with no obligatory buyer-agency relationship.
                  </p>
                </div>

                <div className="mt-7 max-w-xl">
                  <p className="text-[1.15rem] font-semibold leading-snug text-white">
                    Our brokers keep you confident.{' '}
                    <span className="font-normal text-white/65">
                      Our app keeps you organized, so you never miss a beat.
                    </span>
                  </p>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={fitCheckUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-gold px-8 py-3 text-[1rem] font-bold text-brand-navy shadow-lg shadow-brand-gold/20 transition-all hover:bg-[#e8b93d] hover:shadow-xl hover:shadow-brand-gold/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                  >
                    Check your fit
                  </a>
                  <Link
                    href="/pricing"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/25 px-7 py-3 text-[1rem] font-medium text-white/85 transition-colors hover:border-white/40 hover:bg-white/[0.07]"
                  >
                    View Pricing
                  </Link>
                </div>

              </div>

              {/* Right: launch tier ladder */}
              <RolloutTierLadder
                tiersData={tiersData}
                variant="compact"
                showCta={false}
                showCompactNote
              />
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM + SAVINGS (first proof, directly under hero) ─────── */}
        <section
          id="savings"
          className="border-b border-gray-100 bg-white py-16 md:py-20"
          aria-labelledby="savings-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-navy">
                Why buyers are done overpaying
              </p>
              <h2
                id="savings-heading"
                className="mx-auto mt-2 max-w-xl text-xl font-extrabold tracking-tight text-brand-navy sm:text-2xl"
              >
                A buyer&apos;s agent costs about 3%. That&apos;s{' '}
                <span className="rounded bg-brand-gold/20 px-1.5 py-0.5 text-brand-navy">$28,500</span> on a $950,000 home.
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[13px] leading-snug text-gray-500">
                Since the 2024 commission changes, that fee is increasingly yours to pay for someone to
                write an offer and relay messages. BuyUnrepped is flat: ${OFFER_FEE.toLocaleString()} to build
                and submit your offer, ${TRANSACTION_FEE_FULL.toLocaleString()} only if it&apos;s accepted and you
                want full coordination. Slide to your price.
              </p>
            </div>

            <SavingsCalculator />

            <p className="mx-auto mt-3 max-w-xl text-center text-[11px] leading-snug text-gray-600">
              Buyer-side commissions are negotiable and not set by law or any MLS. Figures use a hypothetical 3% illustration and are not a quote or a promise of savings.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={fitCheckUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-brand-gold px-5 py-2 text-[13px] font-bold text-brand-navy shadow-sm transition-all hover:bg-[#e8b93d]"
              >
                Check your fit
              </a>
              <Link
                href="/pricing"
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-brand-navy/20 px-5 py-2 text-[13px] font-medium text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-brand-gray"
              >
                See full pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ── BROKER TRUST STRIP (slim credibility band) ───────────────────── */}
        <section
          className="border-b border-brand-navy/20 bg-brand-navy py-6 md:py-7"
          aria-label="Kayla Brown broker experience and BuyUnrepped brokerage credentials"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mt-4 grid max-w-3xl grid-cols-3 gap-6 sm:gap-10">
              <div className="text-center sm:text-left">
                <p className="text-base font-extrabold tracking-tight text-white">Kayla Brown</p>
                <p className="mt-2 text-[12px] leading-snug text-white/70">Assisted sales &gt;</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">$100 Million+</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">185+ Homes</p>
              </div>
            </div>

            <div className="mx-auto mt-5 flex max-w-4xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
                <Image
                  src="/images/buyunrepped-cropped.png"
                  alt=""
                  width={4249}
                  height={1200}
                  className="h-7 w-auto max-w-none shrink-0 object-contain object-left opacity-90"
                  sizes="(max-width: 640px) 120px, 140px"
                  aria-hidden
                />
                <p className="text-center text-[12px] text-white/70 sm:text-left">
                  Built and run by{' '}
                  <span className="font-semibold text-white/85">Kayla Brown</span>
                  {' '}
                  · Licensed Tennessee Principal Broker · Broker Lic. #339134 · Firm Lic. #267134
                </p>
              </div>
              <Link
                href="/about"
                className="shrink-0 text-[12px] font-semibold text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
              >
                About the brokerage →
              </Link>
            </div>
          </div>
        </section>

        {/* ── PRODUCT WALKTHROUGH (real app, screen by screen) ─────────────── */}
        <ProductWalkthrough />

        {/* ── THREE OPTIONS (positioning, where BuyUnrepped fits) ─────────── */}
        <section
          className="border-b border-gray-100 bg-white py-14 md:py-16"
          aria-labelledby="options-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy">The model</p>
              <h2
                id="options-heading"
                className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
              >
                Now, there are 3 ways to buy a home.
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-500">
                Before BuyUnrepped, the consumer had 2 options: hire a buyer&apos;s agent, or go it alone... We&apos;re
                the new (and much needed) middle ground.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <article className="rounded-xl border border-gray-200 bg-brand-gray/60 p-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-600">
                  Full-service representation
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                  A buyer&apos;s agent represents you, advises on strategy, and typically manages much of the dialogue
                  with the listing side.
                </p>
                <p className="mt-3 text-[13px] text-gray-600">Best when you want full advocacy as your agent.</p>
              </article>
              <article className="rounded-xl border border-brand-gold/50 bg-brand-gold/[0.08] p-5 ring-1 ring-brand-gold/30">
                <span className="inline-flex rounded-full bg-brand-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand-navy">
                  Best fit
                </span>
                <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy">BuyUnrepped</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
                  Unrepresented in the traditional sense, but supported: standardized documentation, sequencing, and
                  licensed oversight within your tier, not buyer agency.
                </p>
                <p className="mt-3 text-[13px] font-medium text-gray-500">
                  Control of the conversation + professional structure.
                </p>
              </article>
              <article className="rounded-xl border border-gray-200 bg-brand-gray/60 p-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-600">On your own</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                  You coordinate everything, from offer through closing, without a buyer&apos;s agent and without a
                  brokerage-backed workflow.
                </p>
                <p className="mt-3 text-[13px] text-gray-600">Higher execution risk when details slip.</p>
              </article>
            </div>

            <p className="mt-8 text-[15px] text-gray-600">
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

        {/* ── WHERE ARE YOU (routing choice) ───────────────────────────────── */}
        <section
          className="border-b border-brand-navy/20 bg-brand-navy py-12 md:py-14"
          aria-labelledby="stage-heading"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2
                id="stage-heading"
                className="text-2xl font-extrabold text-white sm:text-3xl"
              >
                Where are you right now?
              </h2>
              <p className="mt-2 text-[15px] text-white/70">Start where you are.</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: 'Just starting',
                  desc: 'Understand the process before you jump in',
                  cta: 'Learn first',
                  href: '/resources',
                  featured: false,
                },
                {
                  label: 'Found a home',
                  desc: "Let's build your offer the right way",
                  cta: 'Check your fit',
                  href: fitCheckUrl,
                  external: true,
                  featured: true,
                },
                {
                  label: 'Already under contract',
                  desc: "We'll help you finish strong",
                  cta: 'Check your fit',
                  href: fitCheckUrl,
                  external: true,
                  featured: false,
                },
              ].map(({ label, desc, cta, href, featured, external }) => (
                <div
                  key={label}
                  className={`rounded-xl border p-6 transition-colors ${
                    featured
                      ? 'border-brand-gold/50 bg-brand-gold/5'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  {featured && (
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                      ★ Most common
                    </p>
                  )}
                  <h3 className="text-lg font-bold text-white">{label}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/70">
                    {desc}
                  </p>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 inline-flex items-center gap-1 text-[13px] font-semibold transition-colors ${
                        featured
                          ? 'text-brand-gold hover:text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {cta} →
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={`mt-4 inline-flex items-center gap-1 text-[13px] font-semibold transition-colors ${
                        featured
                          ? 'text-brand-gold hover:text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {cta} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ──────────────────────────────────────────────── */}
        <section className="border-b border-gray-100 bg-brand-gray py-10 md:py-12" aria-labelledby="included-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy">Scope</p>
              <h2
                id="included-heading"
                className="mt-2 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl"
              >
                What&apos;s included
              </h2>
              <p className="mt-2 text-[1rem] leading-relaxed text-gray-500">
                BuyUnrepped is designed around the actual stages of the purchase. Here&apos;s what&apos;s included before
                submission, and what becomes available after acceptance.
              </p>
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div>
                <h3 className="border-b border-gray-200 pb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                  Before you submit your offer
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-gray-600 marker:text-brand-blue/70">
                  <li>Tennessee property intake and address confirmation</li>
                  <li>Onboarding disclosures and guided questionnaire</li>
                  <li>Tennessee offer documents based on your 1:1 broker call</li>
                  <li>Strategy call scheduling and broker review</li>
                  <li>Pricing guidance, broker price opinion, and supporting property data</li>
                  <li>Submission prep so your offer package is ready to send</li>
                </ul>
              </div>
              <div>
                <h3 className="border-b border-gray-200 pb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                  After your offer is accepted
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-gray-600 marker:text-brand-blue/70">
                  <li>Transaction setup inside your dashboard</li>
                  <li>Contract timeline tracking and next-step guidance</li>
                  <li>Document organization and key-date reminders</li>
                  <li>Coordination support through inspections, escrow, appraisal, and closing prep</li>
                  <li>Licensed broker support where it counts</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-gray-600">
              BuyUnrepped supports the process and coordination of your purchase within the scope you select. We do not
              act as your buyer&apos;s agent, negotiate on your behalf, or provide legal advice.
            </p>

          </div>
        </section>

        {/* ── UNIVERSAL CAPTURE (start now, or stay in touch) ──────────────── */}
        <section
          className="border-b border-gray-100 bg-white py-10 md:py-12"
          aria-labelledby="capture-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-6 md:grid-cols-[1.4fr_auto] md:gap-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy">
                  Live in Tennessee · expanding
                </p>
                <h2
                  id="capture-heading"
                  className="mt-2 text-xl font-extrabold tracking-tight text-brand-navy sm:text-2xl"
                >
                  Buying in Tennessee? Start today.
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                  Anyone can buy a Tennessee home with BuyUnrepped, wherever you live now. Not in TN yet, or
                  just exploring? Leave your email and we&apos;ll tell you the moment we launch in your state,
                  plus tips to buy for less.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:min-w-[220px]">
                <a
                  href={fitCheckUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-6 py-2.5 text-[15px] font-bold text-brand-navy shadow-sm transition-all hover:bg-[#e8b93d]"
                >
                  Check your fit
                </a>
                <WaitlistButton className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 px-6 py-2.5 text-[15px] font-semibold text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-brand-gray">
                  Keep me posted →
                </WaitlistButton>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section
          className="border-b border-gray-100 bg-brand-gray py-12 md:py-16"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2
                id="faq-heading"
                className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl"
              >
                Questions and answers
              </h2>
              <p className="mt-3 text-[15px] text-gray-500">
                Straight answers before you move forward.
              </p>
            </div>

            <div className="mt-8 divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
              {faqs.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-6 p-5 text-left text-[15px] font-semibold text-brand-navy transition-colors hover:bg-brand-gray/60"
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
                        className={`border-l-4 bg-brand-cream px-5 pb-5 pt-1 transition-colors ${open ? 'border-brand-gold' : 'border-transparent'}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                      >
                        <p className="text-[14px] leading-relaxed text-gray-600">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
