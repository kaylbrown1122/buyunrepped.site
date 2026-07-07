'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, HelpCircle, Home, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import { getAppUrl } from '../../lib/appUrl';
import { OFFER_FEE, TRANSACTION_FEE_FULL, TRANSACTION_FEE_SPLIT, BUYUNREPPED_MAX_TOTAL } from '../../lib/fees';

const startHereCards = [
  {
    icon: <HelpCircle className="size-5 text-brand-blue" />,
    title: 'Just starting',
    body: 'Understand the process before you jump in.',
    cta: 'Learn first',
    href: '/guides',
  },
  {
    icon: <Home className="size-5 text-brand-blue" />,
    title: 'Found a home',
    body: "Let's build your offer the right way.",
    cta: 'Build your offer',
    external: true,
  },
  {
    icon: <ClipboardCheck className="size-5 text-brand-blue" />,
    title: 'Already under contract',
    body: 'We will help you finish strong.',
    cta: 'Set up your transaction',
    href: '/pricing#transaction-management',
  },
] as const;

const pricingFaqs = [
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
    q: 'When is $995 due? When is the coordination fee due?',
    a: `$${OFFER_FEE} is due upfront when you start the offer package in the app. The $${TRANSACTION_FEE_FULL.toLocaleString()} transaction coordination fee is due after your offer is accepted—not at signup.`,
  },
  {
    q: 'Where is BuyUnrepped available?',
    a: 'Early access · Middle Tennessee. We are rolling out in phases across the Nashville metro and surrounding counties.',
  },
  {
    q: 'What data sources power the CMA?',
    a: 'Realtracs/MLS where we have access; otherwise public records. We do not promise a universal MLS agent sheet on every property.',
  },
  {
    q: 'How should I read the savings calculator?',
    a: 'The calculator uses an ~3% buyer-side fee illustration. It compares that line item to BuyUnrepped flat fees, not your full transaction cost.',
  },
  {
    q: 'Who is the public point of contact?',
    a: 'Kayla Brown, CEO and Principal Broker. Email info@buyunrepped.com.',
  },
  {
    q: 'Is there a free or lite offer option?',
    a: 'No. BuyUnrepped offers a single $995 offer package at signup—no free estimate or lite tier.',
  },
] as const;

export default function PricingPage() {
  const appUrl = getAppUrl();
  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      <Header />

      <main id="main-content">
        <section className="border-b border-gray-100 bg-white px-4 pb-12 pt-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">Pricing</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-[2.5rem]">
              Offer Package and Transaction Management
            </h1>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-500">
              Flat fee — no commission.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl" aria-labelledby="start-here-heading">
            <p id="start-here-heading" className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
              Where are you right now?
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {startHereCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-gray-200 bg-brand-gray p-5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-blue/10">
                    {card.icon}
                  </span>
                  <h3 className="mt-3 text-[15px] font-bold text-brand-navy">{card.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-gray-500">{card.body}</p>
                  {'external' in card && card.external ? (
                    <a
                      href={appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-blue hover:underline"
                    >
                      {card.cta} →
                    </a>
                  ) : (
                    <Link
                      href={'href' in card ? card.href : '#'}
                      className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-blue hover:underline"
                    >
                      {card.cta} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-bold text-brand-navy">Offer Package</h2>
                <p className="mt-1 text-sm text-gray-500">Strategy, forms, CMA + BPO</p>
                <p className="mt-6 text-4xl font-extrabold tracking-tight text-brand-navy">$995</p>
                <Link
                  href="/schedule"
                  className="mt-8 flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-6 text-[15px] font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]"
                >
                  Schedule a call
                </Link>
                <ul className="mt-8 space-y-3 text-[14px] leading-relaxed text-gray-600">
                  {[
                    'Ready-to-submit offer using Tennessee forms',
                    'Strategy consultation',
                    'Comparative market analysis',
                    'Broker price opinion (BPO)',
                  ].map((text) => (
                    <li key={text} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div id="transaction-management" className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-bold text-brand-navy">Transaction Management</h2>
                <p className="mt-1 text-sm text-gray-500">Contract through closing</p>
                <p className="mt-6 text-4xl font-extrabold tracking-tight text-brand-navy">$2,495</p>
                <Link
                  href="/schedule"
                  className="mt-8 flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-6 text-[15px] font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]"
                >
                  Schedule a call
                </Link>
                <ul className="mt-8 space-y-3 text-[14px] leading-relaxed text-gray-600">
                  {[
                    'Full coordination from contract through closing',
                    'Platform access with templates and self-guided assistance',
                    'Direct broker support when you need it most',
                  ].map((text) => (
                    <li key={text} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-brand-gold/30 bg-brand-gold/[0.09] px-6 py-5 text-center ring-1 ring-inset ring-brand-gold/25">
              <p className="text-sm font-semibold text-brand-navy">All in, combined</p>
              <p className="mt-1 text-3xl font-extrabold text-brand-navy">$3,490</p>
            </div>

            <div className="mt-10 rounded-2xl border border-gray-200 bg-brand-gray p-8">
              <h2 className="text-xl font-bold text-brand-navy">Fee timing</h2>
              <p className="mt-2 text-[14px] text-gray-500">
                Total up to ${BUYUNREPPED_MAX_TOTAL.toLocaleString()} — not one SKU at offer time.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-gray-200 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      <th className="pb-3 pr-4">Stage</th>
                      <th className="pb-3 pr-4">Amount</th>
                      <th className="pb-3">When due</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pr-4 font-semibold text-brand-navy">Offer package</td>
                      <td className="py-4 pr-4">${OFFER_FEE.toLocaleString()}</td>
                      <td className="py-4">Upfront at signup in the app</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pr-4 font-semibold text-brand-navy">Transaction (full)</td>
                      <td className="py-4 pr-4">${TRANSACTION_FEE_FULL.toLocaleString()}</td>
                      <td className="py-4">After acceptance — coordination fee</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4 font-semibold text-brand-navy">Transaction (split)</td>
                      <td className="py-4 pr-4">
                        ${TRANSACTION_FEE_SPLIT[0].toLocaleString()} + ${TRANSACTION_FEE_SPLIT[1].toLocaleString()}
                      </td>
                      <td className="py-4">
                        Contract upload + closing or within 60 days (same total when offered)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-8 text-[15px] font-bold text-white transition-colors hover:bg-brand-navy/90"
              >
                Start in the app
              </a>
              <Link
                href="/#savings"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 px-7 text-[15px] font-medium text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-gray-50"
              >
                See savings calculator
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-brand-gray py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold text-brand-navy sm:text-3xl">Questions</h2>
            <div className="mt-10 space-y-8">
              {pricingFaqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-lg font-bold text-brand-navy">{faq.q}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
