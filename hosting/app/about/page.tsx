'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

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
  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      <Header />

      <main id="main-content">
        <section className="border-b border-gray-100 px-4 pb-16 pt-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">About</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-[2.5rem]">
              Built by an Experienced Nashville Broker.
            </h1>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-500">
              BuyUnrepped is founded by Kayla Brown, Principal Broker and Realtor®, who has assisted in 175+
              transactions during 10 active years as a full-service agent in Nashville.
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
