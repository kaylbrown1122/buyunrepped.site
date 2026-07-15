'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { getAppUrl } from '../../lib/appUrl';
import { OFFER_FEE, TRANSACTION_FEE_FULL, BUYUNREPPED_MAX_TOTAL } from '../../lib/fees';
import Reveal from '../components/Reveal';

const pricingFaqs = [
  {
    q: 'How does the flat fee compare to a traditional commission?',
    a: "This is an illustrative comparison: a hypothetical 3% buyer-side fee on a $500K home is $15,000, while BuyUnrepped is up to $3,490 for both tiers combined. Buyer-side compensation is negotiable and varies by transaction; savings are not guaranteed.",
  },
  {
    q: 'What does the Offer Package include?',
    a: 'The $995 Offer Package includes offer-preparation guidance using Tennessee residential forms, a strategy consultation, a comparative market analysis, and a broker price opinion (BPO). You decide the terms, approve the documents, and submit your own offer.',
  },
  {
    q: 'What does Transaction Management include?',
    a: 'The $2,495 Transaction Management includes full coordination from contract through closing, platform access with templates and self-guided assistance, and direct broker support when you need it most.',
  },
  {
    q: 'When is $995 due? When is the coordination fee due?',
    a: `$${OFFER_FEE} is due upfront when you start the offer package in the app. The $${TRANSACTION_FEE_FULL.toLocaleString()} transaction coordination fee is due after your offer is accepted, not at signup.`,
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
    a: 'No. BuyUnrepped offers a single $995 offer package at signup, with no free estimate or lite tier.',
  },
  {
    q: 'What if I need to cancel, or want a refund?',
    a: "Cancellation and refund specifics depend on where you are in the process. Reach out before you pay if you want terms confirmed for your situation — email info@buyunrepped.com.",
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
              Flat fee, no commission.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-bold text-brand-navy">Offer Package</h2>
                <p className="mt-1 text-sm text-gray-500">Strategy, forms, CMA + BPO</p>
                <p className="mt-6 text-4xl font-extrabold tracking-tight text-brand-navy">$995</p>
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-6 text-[15px] font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]"
                >
                  Continue to App
                </a>
                <ul className="mt-8 space-y-3 text-[14px] leading-relaxed text-gray-600">
                  {[
                    'Offer-preparation guidance using Tennessee residential forms',
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
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-6 text-[15px] font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]"
                >
                  Continue to App
                </a>
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
              <p className="mt-1 text-[12px] text-gray-500">
                Two separate charges, ${OFFER_FEE.toLocaleString()} then ${TRANSACTION_FEE_FULL.toLocaleString()},
                not one combined invoice.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-brand-gold/40 bg-brand-cream p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                  <ShieldCheck className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-[15px] font-bold text-brand-navy">Not the right fit? We&apos;ll tell you.</h2>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-gray-600">
                    If your situation calls for full-service representation — a complex negotiation, an unusual
                    financing picture, more hand-holding than a flat fee covers — we&apos;ll say so and connect you
                    with a full-service buyer&apos;s agent instead. We&apos;re not trying to upsell everyone into
                    self-representation regardless of fit.
                  </p>
                  <Link
                    href="/agent-match"
                    className="mt-2.5 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue"
                  >
                    See how agent matching works →
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">Scope</p>
              <h2 className="mt-2 text-xl font-bold text-brand-navy sm:text-2xl">What&apos;s included</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
                Transaction setup starts the moment your offer is accepted. Full coordination support activates
                once you add Transaction Guidance.
              </p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
                <div>
                  <h3 className="border-b border-gray-200 pb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                    Before you submit your offer
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-gray-600 marker:text-brand-blue/70">
                    <li>
                      We can recommend providers we&apos;ve had positive experiences with — see{' '}
                      <Link href="/vendors" className="font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue">
                        available contacts
                      </Link>
                      . You are always free to choose any lender, title company, inspector, warranty provider, or
                      other vendor. Material relationships or compensation are disclosed before a referral.
                    </li>
                    <li>Tennessee property intake and address confirmation</li>
                    <li>Onboarding disclosures and guided questionnaire</li>
                    <li>Tennessee offer documents based on your 1:1 broker call</li>
                    <li>Strategy call scheduling and broker review</li>
                    <li>Pricing guidance, broker price opinion, and supporting property data</li>
                    <li>Cash buyer? A fast qualification check keeps your offer competitive</li>
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
                    <li>Coordination support through inspections, escrow, and closing prep</li>
                    <li>Optional third-party repair-quote resources after inspection; any material relationship or compensation is disclosed before a referral</li>
                    <li>Closing-day checklist, including wire-fraud safety guidance</li>
                    <li>Termination-notice drafting if the deal falls through</li>
                    <li>&quot;Ask Kayla&quot; bookable broker calls — quick questions, post-inspection strategy, final walkthrough help</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-[13px] leading-relaxed text-gray-400">
                Appraisal appeals are available as a separate paid add-on. A missed or late-cancelled strategy call may
                carry a $200 rescheduling fee. BuyUnrepped supports the process and coordination of your purchase
                within the scope you select. We provide non-representational brokerage support; we do not act as your
                buyer&apos;s agent, negotiate, submit offers, or communicate with the listing side on your behalf. We
                provide transaction coordination, reminders, and guidance; you remain responsible for decisions and
                for communications made on your own behalf with the listing side and other parties. We do not provide
                legal advice. CMAs and BPOs are for informational purposes only, not appraisals or guarantees of
                value, acceptance, or appraisal outcome.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-gray-200 bg-brand-gray p-8">
              <h2 className="text-xl font-bold text-brand-navy">Fee timing</h2>
              <p className="mt-2 text-[14px] text-gray-500">
                Total up to ${BUYUNREPPED_MAX_TOTAL.toLocaleString()}, not one SKU at offer time.
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
                    <tr>
                      <td className="py-4 pr-4 font-semibold text-brand-navy">Transaction</td>
                      <td className="py-4 pr-4">${TRANSACTION_FEE_FULL.toLocaleString()}</td>
                      <td className="py-4">After acceptance, coordination fee</td>
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
                Continue to App
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

        <Reveal as="section" className="border-b border-gray-100 bg-brand-gray py-16 md:py-20">
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
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
