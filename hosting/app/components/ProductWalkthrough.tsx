import Image from 'next/image';
import { OFFER_FEE } from '../../lib/fees';

type Owner = 'you' | 'we';

type Step = {
  n: number;
  phase: string;
  title: string;
  body: string;
  img: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  owner: Owner;
  ownerLabel: string;
  emphasis?: boolean;
  pending?: boolean;
};

const steps: Step[] = [
  {
    n: 1,
    phase: 'Start here',
    title: 'Enter the property address',
    body: `You enter the Tennessee address for the home you want to pursue. BuyUnrepped confirms the property, pulls available MLS and county records, and opens your $${OFFER_FEE.toLocaleString()} offer package.`,
    img: '/images/product/buyunrepped-app-make-offer-tennessee-address.png',
    width: 1600,
    height: 978,
    alt: 'BuyUnrepped app screen where a buyer enters a Tennessee property address to start an offer',
    owner: 'you',
    ownerLabel: 'You pick the home',
  },
  {
    n: 2,
    phase: 'The honest part',
    title: 'Sign onboarding disclosures',
    body: 'You review and e-sign the transaction-broker and facilitator disclosure. BuyUnrepped documents the non-representational scope in plain English before any offer work begins.',
    img: '/images/product/buyunrepped-app-onboarding-transaction-broker.png',
    width: 1600,
    height: 912,
    alt: 'BuyUnrepped onboarding screen explaining transaction broker and facilitator disclosure',
    owner: 'we',
    ownerLabel: 'We set the ground rules',
    emphasis: true,
  },
  {
    n: 3,
    phase: 'Build the offer',
    title: 'Complete the offer questionnaire',
    body: 'You answer guided questions on price, closing date, contingencies, and other terms. BuyUnrepped drafts your Tennessee offer documents from those answers.',
    img: '/images/product/buyunrepped-app-offer-questionnaire.png',
    width: 1600,
    height: 1383,
    alt: 'BuyUnrepped offer questionnaire screen collecting price, closing, and contingency terms',
    owner: 'you',
    ownerLabel: 'You answer, we draft',
  },
  {
    n: 4,
    phase: 'Licensed oversight',
    title: 'Review pricing and strategy',
    body: 'You schedule your strategy call and decide what offer number you want to pursue. BuyUnrepped provides broker price opinion, pricing guidance, and licensed review on your dashboard.',
    img: '/images/product/buyunrepped-app-broker-price-opinion.png',
    width: 1119,
    height: 1600,
    alt: 'BuyUnrepped dashboard showing broker price opinion, pricing guidance, and strategy review',
    owner: 'we',
    ownerLabel: 'We advise',
    emphasis: true,
  },
  {
    n: 5,
    phase: 'Submit',
    title: 'Send your offer to the listing agent',
    body: 'You send the offer to the listing agent from your own email account. BuyUnrepped prepares the packet and draft message. We never contact the listing side on your behalf.',
    img: '/images/product/buyunrepped-app-send-offer-modal.png',
    width: 1024,
    height: 726,
    alt: 'BuyUnrepped Send your offer modal with email draft and document attachment steps for the listing agent',
    owner: 'you',
    ownerLabel: 'You send, we prepare',
  },
  {
    n: 6,
    phase: 'The decision point',
    title: 'Log the seller response',
    body: 'You record what the seller or listing agent said after your offer goes in. BuyUnrepped updates your offer file and surfaces the next step in the workflow.',
    img: '/images/product/buyunrepped-app-log-seller-response.png',
    width: 1600,
    height: 540,
    alt: 'BuyUnrepped screen where the buyer logs the seller response after offer submission',
    owner: 'you',
    ownerLabel: 'You decide, we log it',
  },
  {
    n: 7,
    phase: 'The decision point',
    title: 'Respond to a counteroffer',
    body: 'You choose how to respond: accept, counter, keep negotiating directly, or walk away. BuyUnrepped tracks your decision and keeps your file aligned with the path you pick.',
    img: '/images/product/buyunrepped-app-counter-offer-response.png',
    width: 1600,
    height: 1123,
    alt: 'BuyUnrepped counteroffer screen showing response options for the buyer',
    owner: 'you',
    ownerLabel: 'You decide, we log it',
  },
  {
    n: 8,
    phase: 'Under contract',
    title: 'Upload your signed contract',
    body: 'You upload the fully executed purchase agreement after acceptance. BuyUnrepped sets up your transaction with deadlines, documents, and next steps in one dashboard.',
    img: '/images/product/buyunrepped-app-upload-bound-contract.png',
    width: 1024,
    height: 679,
    alt: 'BuyUnrepped screen where the buyer uploads a signed purchase agreement after acceptance',
    owner: 'we',
    ownerLabel: 'You upload, we build',
    emphasis: true,
  },
  {
    n: 9,
    phase: 'The payoff',
    title: 'Coordinate through closing',
    body: 'You handle inspections, lender requests, and signing on your side of the deal. BuyUnrepped tracks the closing timeline, organizes documents, sends reminders, and provides licensed broker support within your package scope.',
    img: '/images/product/buyunrepped-app-transaction-closing-timeline.png',
    width: 1600,
    height: 1391,
    alt: 'BuyUnrepped transaction dashboard with closing timeline, deadlines, documents, and next steps',
    owner: 'we',
    ownerLabel: 'We run it to the finish',
    emphasis: true,
  },
];

function OwnerPill({ owner, label }: { owner: Owner; label: string }) {
  const isYou = owner === 'you';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        isYou ? 'bg-brand-blue/8 text-brand-navy' : 'bg-brand-green/10 text-[#047857]'
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${isYou ? 'bg-brand-blue' : 'bg-brand-green'}`}
        aria-hidden
      />
      {label}
    </span>
  );
}

function BrowserFrame({
  src,
  alt,
  caption,
  width,
  height,
  pending = false,
}: {
  src?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  pending?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_40px_-16px_rgba(14,44,61,0.18)]">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
      </div>
      <div className="overflow-hidden bg-brand-gray">
        {pending || !src ? (
          <div className="flex aspect-[4/3] flex-col items-center justify-center px-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-600">
              Image coming soon
            </span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="block h-auto w-full"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        )}
      </div>
      {caption ? (
        <figcaption className="border-t border-gray-100 px-4 py-2.5 text-[12px] leading-snug text-gray-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function StepMedia({ step }: { step: Step }) {
  return (
    <BrowserFrame
      src={step.img}
      alt={step.alt}
      caption={step.caption}
      width={step.width}
      height={step.height}
      pending={step.pending}
    />
  );
}

export default function ProductWalkthrough() {
  return (
    <section
      id="how-it-works"
      className="border-b border-gray-100 bg-white py-24 md:py-32 lg:py-36"
      aria-labelledby="walkthrough-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy">
            The product · screen by screen
          </p>
          <h2
            id="walkthrough-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
          >
            See exactly how BuyUnrepped works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-gray-500">
            BuyUnrepped is a guided system for buying a home without a traditional buyer&apos;s agent. You stay in
            control of the property, the terms, and the communication. The app, the workflow, and your licensed broker
            support handle the structure behind the scenes, from offer prep to submission to closing coordination.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <OwnerPill owner="you" label="You keep control" />
            <OwnerPill owner="we" label="We handle the structure" />
          </div>
        </div>

        <ol className="mt-20 space-y-20 lg:mt-24 lg:space-y-28">
          {steps.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={s.n} className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-20">
                <div className={flip ? 'lg:order-2' : ''}>
                  <StepMedia step={s} />
                </div>
                <div className={`${flip ? 'lg:order-1 lg:text-right' : ''} lg:py-2`}>
                  <div className={`flex items-center gap-3 ${flip ? 'lg:justify-end' : ''}`}>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-navy text-[14px] font-bold tabular-nums text-white">
                      {s.n}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-navy">
                      {s.phase}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-[1.75rem]">
                    {s.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-sm text-[15px] leading-relaxed text-gray-600 ${flip ? 'lg:ml-auto' : ''}`}
                  >
                    {s.body}
                  </p>
                  <div className={`mt-4 ${flip ? 'lg:flex lg:justify-end' : ''}`}>
                    <OwnerPill owner={s.owner} label={s.ownerLabel} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
