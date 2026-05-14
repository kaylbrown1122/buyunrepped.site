'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';
import Link from 'next/link';

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
] as const;

export default function PricingPage() {
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

          <div className="mx-auto mt-12 max-w-5xl">
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

              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
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
