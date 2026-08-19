'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, ShieldCheck, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { getSignInUrl } from '../../lib/appUrl';
import {
  OFFER_FEE,
  TRANSACTION_FEE_FULL,
  BUNDLE_FEE,
} from '../../lib/fees';

const FOUNDING_BUNDLE = 1225;
const FOUNDING_OFFER = 650;
const FOUNDING_TXN = 875;
const FOUNDING_ALACARTE = FOUNDING_OFFER + FOUNDING_TXN;
const BUNDLE_SAVE_VS_ALACARTE = FOUNDING_ALACARTE - FOUNDING_BUNDLE;

function CheckIcon({ className = '' }: { className?: string }) {
  return <Check className={`mt-0.5 size-3.5 shrink-0 text-brand-blue ${className}`} aria-hidden />;
}

function Dash() {
  return <span className="text-gray-300">&mdash;</span>;
}

type Availability = 'bundle' | 'offer' | 'txn';

const comparisonRows: { label: string; bold?: boolean; available: Availability[] }[] = [
  { label: 'Up to 2 offers*', bold: true, available: ['bundle'] },
  { label: 'Complimentary restart if deal falls through*', bold: true, available: ['bundle'] },
  { label: 'One payment, no second checkout', bold: true, available: ['bundle'] },
  { label: 'Strategy consultation', available: ['bundle', 'offer'] },
  { label: '1-on-1 broker call', available: ['bundle', 'offer'] },
  { label: 'CMA + broker price opinion', available: ['bundle', 'offer'] },
  { label: 'Property tax record', available: ['bundle', 'offer'] },
  { label: 'Available MLS docs', available: ['bundle', 'offer'] },
  { label: 'List of questions to ask the listing agent', available: ['bundle', 'offer'] },
  { label: 'Access to Offer Dashboard inside our App', available: ['bundle', 'offer'] },
  { label: 'TN offer forms + submission prep', available: ['bundle', 'offer'] },
  { label: 'Full transaction coordination', available: ['bundle', 'txn'] },
  { label: 'Inspection + escrow + closing support', available: ['bundle', 'txn'] },
  { label: 'Contract timeline tracking + reminders', available: ['bundle', 'txn'] },
  { label: 'Closing-day checklist + wire-fraud guidance', available: ['bundle', 'txn'] },
  { label: 'Live BuyUnrepped agent during key moments', available: ['bundle', 'txn'] },
  { label: 'Inspections scheduled for you', available: ['bundle', 'txn'] },
  { label: 'Docs circulated to lender and title company', available: ['bundle', 'txn'] },
  { label: 'TN REALTOR amendments + addendums when needed', available: ['bundle', 'txn'] },
  { label: 'BuyUnrepped Transaction Tracking App', available: ['bundle', 'txn'] },
  { label: 'Live agent support for inspection negotiations', available: ['bundle', 'txn'] },
  { label: 'Templates + scripts for each step', available: ['bundle', 'txn'] },
];

const pricingFaqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What's the difference between BuyUnrepped and a traditional agent?",
    a: (
      <>
        <p>
          A traditional buyer&apos;s agent shows you houses, sets you up on searches, speaks on your behalf, and
          negotiates for you. They owe you fiduciary-level duties: loyalty, obedience to your lawful instructions,
          scheduling showings, forwarding all offers and counter-offers, and guiding you through every form and step to
          closing.
        </p>
        <p className="mt-2">
          BuyUnrepped is different. We don&apos;t represent you, show homes, or negotiate on your behalf. We provide{' '}
          <strong>non-representational brokerage support</strong> — which means we still owe you important duties under
          Tennessee law:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>Reasonable skill and care in providing services</li>
          <li>Disclosure of adverse facts we actually know about</li>
          <li>Confidentiality of your information</li>
          <li>Honesty and good faith</li>
          <li>Market condition info from public records when you ask</li>
          <li>Timely accounting of earnest money and property</li>
          <li>Disclosure of any personal interest or referral compensation before recommending a vendor</li>
        </ul>
        <p className="mt-2">
          The tradeoff: you handle your own showings, communicate directly with the listing agent, and make your own
          decisions — but you get professional offer prep, transaction coordination, and broker support at a flat fee
          instead of a percentage-based commission.
        </p>
      </>
    ),
  },
  {
    q: 'How does the tiered pricing work?',
    a: (
      <>
        <p>
          We launch with four pricing tiers that fill in order: <strong>Founding, Level 2, Level 3,</strong> and{' '}
          <strong>Standard</strong>. Each tier has a limited number of spots. Once a tier fills, the next tier&apos;s
          pricing takes effect automatically.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                <th className="pb-2 pr-3 text-left">Tier</th>
                <th className="pb-2 px-3 text-right">Bundle</th>
                <th className="pb-2 px-3 text-right">Offer</th>
                <th className="pb-2 pl-3 text-right">Txn</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-3 font-semibold">Founding</td>
                <td className="py-1.5 px-3 text-right">${FOUNDING_BUNDLE.toLocaleString()}</td>
                <td className="py-1.5 px-3 text-right">${FOUNDING_OFFER.toLocaleString()}</td>
                <td className="py-1.5 pl-3 text-right">${FOUNDING_TXN.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-3">Level 2</td>
                <td className="py-1.5 px-3 text-right">$1,925</td>
                <td className="py-1.5 px-3 text-right">$950</td>
                <td className="py-1.5 pl-3 text-right">$1,375</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-3">Level 3</td>
                <td className="py-1.5 px-3 text-right">$2,625</td>
                <td className="py-1.5 px-3 text-right">$1,150</td>
                <td className="py-1.5 pl-3 text-right">$1,875</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3">Standard</td>
                <td className="py-1.5 px-3 text-right">${BUNDLE_FEE.toLocaleString()}</td>
                <td className="py-1.5 px-3 text-right">${OFFER_FEE.toLocaleString()}</td>
                <td className="py-1.5 pl-3 text-right">${TRANSACTION_FEE_FULL.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          The price shown at checkout is the price that applies to your purchase. Once you pay, your Offer Package price
          and paired Transaction Guidance price are locked for that property per our terms.
        </p>
      </>
    ),
  },
  {
    q: 'How fast can I get an offer out?',
    a: 'Usually about a day. Most buyers are ready within 24 hours, depending on property complexity and timely inputs.',
  },
  {
    q: 'How does the flat fee compare to a traditional commission?',
    a: 'Illustrative example: a hypothetical 3% buyer-side fee on a $500K home is $15,000. Buyer-side compensation is negotiable and varies; savings are not guaranteed.',
  },
  {
    q: 'Where is BuyUnrepped available?',
    a: 'Early access: Middle Tennessee — Nashville, Franklin, Murfreesboro, Brentwood, Mt Juliet, Hendersonville, Lebanon, Nolensville, Smyrna, Gallatin, Clarksville, and surrounding counties.',
  },
  {
    q: 'Who is the public point of contact?',
    a: (
      <>
        Kayla Brown, CEO and Principal Broker. Email{' '}
        <a
          href="mailto:info@buyunrepped.com"
          className="font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue"
        >
          info@buyunrepped.com
        </a>
        .
      </>
    ),
  },
  {
    q: 'Do you have set hours?',
    a: (
      <>
        <p>
          Yes — and here&apos;s the beautiful thing about real estate: unless you&apos;re submitting an offer (we hold
          extended hours for strategy calls and offer assistance), you don&apos;t need us on the weekends or after hours.
          The real estate transaction stops at 5 PM — banks are closed, title companies are closed, performance deadlines
          roll to the following business day.
        </p>
        <p className="mt-2">
          We work <strong>Monday–Friday until 6 PM Central</strong> on transactions. Plenty of full-service agents carry
          these same hours — this isn&apos;t a BuyUnrepped-exclusive schedule.
        </p>
      </>
    ),
  },
  {
    q: 'What if I need to cancel or want a refund?',
    a: (
      <>
        <p>
          Email info@buyunrepped.com to cancel. Here&apos;s a summary of the current policy:
        </p>
        <p className="mt-2">
          <strong>Offer Package:</strong> Full refund available until your broker price opinion (BPO) is published. After
          the BPO is published, the Offer Package fee is nonrefundable.
        </p>
        <p className="mt-2">
          <strong>Transaction Guidance:</strong> Not refunded in cash. If your transaction ends before closing, you may
          qualify for an account credit based on how far coordination progressed:
        </p>
        <ul className="mt-1.5 list-disc space-y-1 pl-5">
          <li>
            <strong>100%</strong> — offer rejected/cancelled, or accepted but never onboarded
          </li>
          <li>
            <strong>75%</strong> — transaction onboarded but ended before much coordination was delivered
          </li>
          <li>
            <strong>50%</strong> — inspections coordinated but deal ended before repair negotiation
          </li>
          <li>
            <strong>20%</strong> — repair negotiation underway or further; issued at our discretion
          </li>
        </ul>
        <p className="mt-2">
          Credits are issued after we review a verifiable uploaded termination notice and signed earnest money release.
          Credits can be used toward a future offer, transaction, or bundle.
        </p>
        <p className="mt-2">
          <strong>Bundle:</strong> If you don&apos;t use your second offer or your restart, those don&apos;t convert to
          cash or credit — they&apos;re bundle perks, not refundable line items. If your deal falls through and you still
          have your restart available, you use the restart instead of the credit ladder above.
        </p>
        <p className="mt-2 text-[11px] text-gray-400">
          This is a summary and is subject to change. The full, binding refund and cancellation terms are in our{' '}
          <Link
            href="/terms#fees-cancellation-refunds"
            className="font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue"
          >
            Terms of Use
          </Link>
          .
        </p>
      </>
    ),
  },
];

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <details className="group rounded-lg border border-gray-200">
      <summary className="flex cursor-pointer items-center justify-between px-5 py-3 text-[14px] font-bold">
        {q}
        <ChevronDown className="size-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="border-t border-gray-100 px-5 pb-4 pt-2 text-[13px] leading-relaxed text-gray-600">
        {typeof a === 'string' ? <p>{a}</p> : a}
      </div>
    </details>
  );
}

export default function PricingPageClient() {
  const signInUrl = getSignInUrl();

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      <Header />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-white px-4 pb-4 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">Pricing</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">No agent? No problem.</h1>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-gray-500">
              Flat fee solutions for unrepresented home buyers.
            </p>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="bg-white px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-5 md:grid-cols-2">
              {/* BUNDLE */}
              <article className="relative flex flex-col rounded-2xl border-2 border-brand-blue bg-white p-6 sm:p-8">
                <span className="absolute -top-3 left-5 inline-flex rounded-full bg-brand-blue px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  Recommended
                </span>

                <h2 className="mt-1 text-xl font-bold">Offer + Transaction Bundle</h2>
                <p className="mt-1.5 text-[14px] leading-relaxed text-gray-600">
                  One payment — offer prep through closing. Coordination starts the moment your offer is accepted.
                </p>

                <div className="mt-4">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-4xl font-extrabold tracking-tight">
                      ${FOUNDING_BUNDLE.toLocaleString()}
                    </span>
                    <span className="text-base font-semibold text-gray-400 line-through">
                      ${BUNDLE_FEE.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
                    Includes Offer Package (
                    <span className="line-through">${OFFER_FEE.toLocaleString()}</span> $
                    {FOUNDING_OFFER.toLocaleString()}) + Transaction Guidance (
                    <span className="line-through">${TRANSACTION_FEE_FULL.toLocaleString()}</span> $
                    {FOUNDING_TXN.toLocaleString()}) — you save ${BUNDLE_SAVE_VS_ALACARTE.toLocaleString()} and get a
                    complimentary restart if your offer or transaction falls through.*
                  </p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#f7c74a] px-3 py-1 text-[12px] font-semibold text-brand-navy">
                    🚀 Founding tier pricing — limited spots, then prices increase.
                  </p>
                </div>

                <div className="mt-5 space-y-2 text-[13px] leading-relaxed text-gray-700">
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Strategy consultation + 1-on-1 broker call</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <span>CMA, broker price opinion, TN offer forms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Full coordination: inspections, escrow, closing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Up to 2 offers + restart if deal falls through*</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Live BuyUnrepped agent access during key moments</span>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={signInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-navy/90"
                  >
                    Get started
                  </a>
                </div>
              </article>

              {/* A LA CARTE */}
              <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Or pay as you go</p>
                <h2 className="mt-2 text-xl font-bold">Offer + Transaction Separately</h2>
                <p className="mt-1.5 text-[14px] leading-relaxed text-gray-600">
                  Two payments. Coordination starts after your second checkout.
                </p>

                <div className="mt-4 rounded-lg border border-gray-200 bg-brand-gray px-4 py-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[13px] font-bold">Offer Package</p>
                      <p className="text-[11px] text-gray-500">Strategy, forms, CMA + BPO</p>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold">${FOUNDING_OFFER.toLocaleString()}</span>
                      <span className="text-xs font-semibold text-gray-400 line-through">
                        ${OFFER_FEE.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 rounded-lg border border-gray-200 bg-brand-gray px-4 py-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[13px] font-bold">Transaction Guidance</p>
                      <p className="text-[11px] text-gray-500">Contract through closing</p>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold">${FOUNDING_TXN.toLocaleString()}</span>
                      <span className="text-xs font-semibold text-gray-400 line-through">
                        ${TRANSACTION_FEE_FULL.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-center text-[12px] text-gray-500">
                  Combined: <strong>${FOUNDING_ALACARTE.toLocaleString()}</strong> — $
                  {BUNDLE_SAVE_VS_ALACARTE.toLocaleString()} more than the bundle
                </p>
                <p className="mt-2 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7c74a] px-3 py-1 text-[11px] font-semibold text-brand-navy">
                    🚀 Founding tier pricing — limited spots, then prices increase.
                  </span>
                </p>

                <div className="mt-4 space-y-2 text-[13px] leading-relaxed text-gray-700">
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Strategy consultation + 1-on-1 broker call</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <span>CMA, broker price opinion, TN offer forms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Full coordination: inspections, escrow, closing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Live BuyUnrepped agent access during key moments</span>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={signInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 px-6 text-[14px] font-semibold text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-gray-50"
                  >
                    Get started
                  </a>
                </div>
              </article>
            </div>

            {/* COMPARISON TABLE */}
            <div className="mt-10">
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Compare what&apos;s included
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-gray-200 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      <th className="pb-2.5 pr-4" />
                      <th className="pb-2.5 px-3 text-center text-brand-blue">Bundle</th>
                      <th className="pb-2.5 px-3 text-center">Offer Only</th>
                      <th className="pb-2.5 px-3 text-center">Txn Only</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {comparisonRows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-brand-blue/[0.05]' : ''}`}
                      >
                        <td className={`py-2.5 pr-4 ${row.bold ? 'font-bold' : ''}`}>{row.label}</td>
                        <td className="py-2.5 px-3 text-center">
                          {row.available.includes('bundle') ? (
                            <Check className="mx-auto size-4 text-brand-blue" aria-hidden />
                          ) : (
                            <Dash />
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {row.available.includes('offer') ? (
                            <Check className="mx-auto size-4 text-brand-blue" aria-hidden />
                          ) : (
                            <Dash />
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {row.available.includes('txn') ? (
                            <Check className="mx-auto size-4 text-brand-blue" aria-hidden />
                          ) : (
                            <Dash />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-gray-400">
                <Check className="mb-0.5 mr-0.5 inline size-3 text-brand-blue" aria-hidden /> Included &nbsp;·&nbsp;
                <span className="text-gray-300">—</span> Not included
              </p>
            </div>

            {/* DISCLAIMERS */}
            <details className="mt-6">
              <summary className="cursor-pointer text-center text-[11px] font-medium text-gray-400 hover:text-gray-500">
                Disclaimers &amp; fine print
              </summary>
              <p className="mx-auto mt-2 max-w-2xl text-center text-[10px] leading-relaxed text-gray-400">
                *Restrictions apply. Restart and second offer subject to terms; see Terms of Use for details. Founding
                pricing is limited. Prices are subject to change; the price at checkout is the price that applies. Spots
                are not guaranteed. Once a tier fills, the next tier&apos;s pricing takes effect. We provide
                non-representational brokerage support. You remain responsible for decisions and communications. CMAs and
                BPOs are informational, not appraisals.
              </p>
            </details>
          </div>
        </section>

        {/* NOT THE RIGHT FIT */}
        <section className="border-y border-gray-100 bg-brand-gray px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-3 rounded-2xl border border-brand-blue/15 bg-white p-5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <ShieldCheck className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="text-[14px] font-bold">Not the right fit? We&apos;ll tell you.</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
                  If your situation calls for full-service representation, we&apos;ll connect you with an agent through
                  our matchmaking service.
                </p>
                <Link
                  href="/agent-match"
                  className="mt-1.5 inline-flex text-[12px] font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue"
                >
                  See how agent matching works →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-xl font-extrabold sm:text-2xl">Questions</h2>
            <div className="mt-6 space-y-2">
              {pricingFaqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <a
              href={signInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-navy px-7 text-[14px] font-bold text-white transition-colors hover:bg-brand-navy/90"
            >
              Get started
            </a>
            <Link
              href="/#savings"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-brand-navy/20 px-6 text-[14px] font-medium text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-gray-50"
            >
              See savings calculator
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
