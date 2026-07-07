'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import Image from 'next/image';
import Link from 'next/link';
import { getAppUrl } from '../../lib/appUrl';
import { OFFER_FEE, TRANSACTION_FEE_FULL } from '../../lib/fees';

const scopeColumns = [
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
] as const;

export default function AboutPage() {
  const appUrl = getAppUrl();

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      <Header />

      <main id="main-content">
        <section className="border-b border-gray-100 px-4 pb-16 pt-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionBadge>About</SectionBadge>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-[2.5rem]">
              Built by an Experienced Nashville Broker.
            </h1>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-500">
              BuyUnrepped is founded by Kayla Brown, Principal Broker and Realtor®, who has assisted in 175+
              transactions during 10 active years as a full-service agent in Nashville.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-blue">
              Kayla Brown, CEO · Principal Broker
            </p>
            <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Early access · Middle Tennessee
            </p>
          </div>
        </section>

        <section className="border-b border-gray-100 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
              <div className="text-lg leading-relaxed text-gray-600">
                <p>
                  Over the course of those transactions, Kayla began to notice a pattern: many buyers were highly
                  capable and preferred to find homes themselves, yet the traditional brokerage model required them to pay
                  for services they didn&apos;t always need.
                </p>
                <p className="mt-6">
                  BuyUnrepped was built to offer a better option. Buyers maintain control of their home search while
                  still having an experienced local broker and full transaction management support when it matters most.
                </p>
                <p className="mt-6">
                  Pricing is flat fee — not commission based. Whether the home costs $400,000 or $2 million, the price is
                  the same.
                </p>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                <Image src="/images/kayla-buyunrepped.png" alt="Kayla Brown" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">Pricing</p>
            <h2 className="mt-2 text-2xl font-extrabold text-brand-navy sm:text-3xl">How it works</h2>
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-gray-600">
              <p>
                <span className="font-semibold text-brand-navy">${OFFER_FEE.toLocaleString()} upfront</span> for the
                offer package when you start in the app. After acceptance, the{' '}
                <span className="font-semibold text-brand-navy">
                  ${TRANSACTION_FEE_FULL.toLocaleString()} coordination fee
                </span>{' '}
                unlocks transaction management through closing—not commission-based, flat fee pricing.
              </p>
              <p>
                Split billing ($1,295 at contract upload + $1,295 at closing or within 60 days) may be offered for
                the same total. Early access · Middle Tennessee.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-brand-gray py-16 md:py-24" aria-labelledby="about-scope-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">Scope</p>
              <h2
                id="about-scope-heading"
                className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
              >
                What&apos;s included
              </h2>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-gray-500">
                Grouped by how the work shows up in your purchase. Exact deliverables depend on tier.
              </p>
            </div>

            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {scopeColumns.map((col) => (
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

            <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                What&apos;s included (CMA &amp; deliverables)
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-brand-navy sm:text-2xl">
                Honest scope after ${OFFER_FEE.toLocaleString()}
              </h3>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-gray-600">
                <p>
                  CMA data from Realtracs/MLS where available; otherwise public records. No universal MLS agent
                  sheet promise.
                </p>
                <p>
                  Deliverables after payment: offer packet prep, strategy consult, and—after acceptance—transaction
                  coordination through closing prep.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-100 py-16 md:py-20">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-8 text-[15px] font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]"
            >
              Start in the app
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 px-7 text-[15px] font-medium text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-gray-50"
            >
              Questions → contact
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
