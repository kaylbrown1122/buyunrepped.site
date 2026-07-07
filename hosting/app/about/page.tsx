'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import Image from 'next/image';
import Link from 'next/link';
import { getAppUrl } from '../../lib/appUrl';
import { OFFER_FEE, TRANSACTION_FEE_FULL } from '../../lib/fees';
import Reveal from '../components/Reveal';

const areasServed = [
  { county: 'Davidson County', cities: 'Nashville' },
  { county: 'Cheatham County', cities: 'Ashland City' },
  { county: 'Robertson County', cities: 'Springfield' },
  { county: 'Sumner County', cities: 'Gallatin, Hendersonville, Cottontown' },
  { county: 'Wilson County', cities: 'Lebanon, Mt. Juliet' },
  { county: 'Williamson County', cities: 'Franklin, Brentwood, Spring Hill' },
  { county: 'Rutherford County', cities: 'Murfreesboro, Smyrna, La Vergne' },
  { county: 'Maury County', cities: 'Columbia, Spring Hill' },
  { county: 'Dickson County', cities: 'Dickson, White Bluff' },
] as const;

const credentials = [
  { label: 'Licensed since', value: 'Tennessee Real Estate Broker, License #339134' },
  { label: 'Brokerage', value: 'BuyUnrepped, Firm License #267134' },
  { label: 'Education', value: 'B.S. Microbiology, minor in Chemistry' },
  { label: 'Volume', value: '$100M+ facilitated in Middle Tennessee' },
] as const;

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

        <Reveal
          as="section"
          id="what-is-buyunrepped"
          className="border-b border-gray-100 bg-brand-gray py-16 md:py-20"
          aria-labelledby="what-is-buyunrepped-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">Quick facts</p>
            <h2 id="what-is-buyunrepped-heading" className="mt-2 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              What is BuyUnrepped?
            </h2>
            <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-gray-600">
              BuyUnrepped is a licensed Tennessee real estate brokerage that helps buyers purchase homes without
              hiring a traditional buyer&apos;s agent. Also known as: unrepresented buyer support, buying without a
              realtor, flat-fee buyer assistance.
            </p>

            <div className="mt-10 grid gap-10 sm:grid-cols-3">
              <div>
                <h3 className="border-b border-gray-200 pb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                  What we do
                </h3>
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14px] leading-relaxed text-gray-600 marker:text-brand-blue/70">
                  <li>Offer strategy and pricing analysis</li>
                  <li>Contract preparation using Tennessee forms</li>
                  <li>Inspection guidance and repair decisions</li>
                  <li>Deadline tracking and transaction coordination</li>
                  <li>Direct access to a licensed broker</li>
                </ul>
              </div>
              <div>
                <h3 className="border-b border-gray-200 pb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                  What we don&apos;t do
                </h3>
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14px] leading-relaxed text-gray-600 marker:text-brand-blue/70">
                  <li>Represent you as a buyer&apos;s agent</li>
                  <li>Negotiate or speak on your behalf</li>
                  <li>Charge a commission</li>
                </ul>
              </div>
              <div>
                <h3 className="border-b border-gray-200 pb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                  Who this is for
                </h3>
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14px] leading-relaxed text-gray-600 marker:text-brand-blue/70">
                  <li>Buyers who want control</li>
                  <li>Buyers comfortable communicating directly</li>
                  <li>Buyers who want to avoid commission</li>
                </ul>
              </div>
            </div>

            <p className="mt-10 max-w-2xl text-[14px] leading-relaxed text-gray-500">
              BuyUnrepped is a member of the <strong className="font-semibold text-brand-navy">National Association
              of REALTORS® (NAR)</strong>, the <strong className="font-semibold text-brand-navy">Tennessee
              Association of REALTORS® (TAR)</strong>, and the <strong className="font-semibold text-brand-navy">
              Greater Nashville Association of REALTORS® (GNAR)</strong>. Our forms and brokerage policies are
              guided by those associations&apos; standards and the REALTOR® Code of Ethics, alongside Tennessee
              real estate license law.
            </p>
          </div>
        </Reveal>

        <Reveal as="section" className="border-b border-gray-100 py-16 md:py-24">
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
                  Pricing is flat fee, not commission based. Whether the home costs $400,000 or $2 million, the price is
                  the same.
                </p>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                <Image src="/images/kayla-buyunrepped.png" alt="Kayla Brown" fill className="object-cover" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="border-b border-gray-100 bg-brand-cream py-16 md:py-24" aria-labelledby="about-origin-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">The origin story</p>
            <h2 id="about-origin-heading" className="mt-2 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              Why I do this, the real version
            </h2>
            <blockquote className="mt-6 border-l-4 border-brand-gold pl-5 text-[1.15rem] font-medium italic leading-relaxed text-brand-navy">
              &ldquo;Dental school was the plan, until it wasn&apos;t. Cancer brought me home. Buying our first home
              while I was in treatment is what hooked me on the transaction. Real estate became the career;
              challenging how the industry serves buyers became the mission.&rdquo;
            </blockquote>
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-gray-600">
              <p>
                I have a degree in Microbiology with a minor in Chemistry, and I was about a year into dental
                school, on track toward orthodontics, when I was diagnosed with a rare cancer called Ewing&apos;s
                Sarcoma. I came back to Nashville for treatment. During that season, my then-fiancé and I bought
                our first home. That&apos;s when I fell in love with the real estate transaction, and realized I
                wasn&apos;t going back to the path I&apos;d mapped out.
              </p>
              <p>
                The same critical thinking and problem-solving that made me strong in a lab translated to
                negotiations and contracts: every variable matters, every detail has a consequence, and
                preparation is everything.
              </p>
              <p>
                Over 175+ transactions and $100M+ in Middle Tennessee sales, I&apos;ve built genuine relationships
                with lenders, inspectors, attorneys, title companies, and agents across this market. I know who
                does excellent work and who doesn&apos;t. The through-line has always been honesty, and a
                willingness to say what others won&apos;t.
              </p>
              <p>
                BuyUnrepped is where that becomes a disruptor&apos;s playbook: buyers deserve real structure and
                licensed support even when they don&apos;t want a traditional buyer&apos;s agent.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-gray-200 pt-8 sm:grid-cols-4">
              {credentials.map((c) => (
                <div key={c.label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue">{c.label}</p>
                  <p className="mt-1.5 text-[13px] leading-snug text-gray-600">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="border-b border-gray-100 bg-white py-16 md:py-20" aria-labelledby="about-areas-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">Where I&apos;ve worked</p>
            <h2 id="about-areas-heading" className="mt-2 text-2xl font-extrabold text-brand-navy sm:text-3xl">
              Areas served
            </h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-gray-500">
              I&apos;ve sold homes across all of these Middle Tennessee counties.
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {areasServed.map((area) => (
                <li key={area.county} className="text-[14px] leading-relaxed text-gray-600">
                  <span className="font-semibold text-brand-navy">{area.county}:</span> {area.cities}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal as="section" className="border-b border-gray-100 bg-white py-16 md:py-20">
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
                unlocks transaction management through closing with flat-fee pricing, not commission-based pricing.
              </p>
              <p>Early access · Middle Tennessee.</p>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="border-b border-gray-100 bg-brand-gray py-16 md:py-24" aria-labelledby="about-scope-heading">
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
                  Deliverables after payment: offer packet prep, strategy consult, and, after acceptance, transaction
                  coordination through closing prep.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="border-b border-gray-100 py-16 md:py-20">
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
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
