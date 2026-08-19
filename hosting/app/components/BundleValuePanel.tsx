'use client';

import { Check } from 'lucide-react';
import {
  BUNDLE_FEE,
  bundleSavingsVsAlacarte,
  ILLUSTRATIVE_HOME_PRICE,
  OFFER_FEE,
  savings,
  TRANSACTION_FEE_FULL,
  traditionalBuyerSide,
} from '../../lib/fees';

type BundleValuePanelProps = {
  offerCents?: number;
  transactionCents?: number;
  bundleCents?: number;
  compact?: boolean;
};

export default function BundleValuePanel({
  offerCents = OFFER_FEE * 100,
  transactionCents = TRANSACTION_FEE_FULL * 100,
  bundleCents = BUNDLE_FEE * 100,
  compact = false,
}: BundleValuePanelProps) {
  const offer = offerCents / 100;
  const txn = transactionCents / 100;
  const bundle = bundleCents / 100;
  const alacarte = offer + txn;
  const saveVsAlacarte = bundleSavingsVsAlacarte(offer, txn, bundle);
  const traditional = traditionalBuyerSide(ILLUSTRATIVE_HOME_PRICE);
  const saveVsCommission = savings(ILLUSTRATIVE_HOME_PRICE);

  const inclusions = [
    'Up to two offers — strategy call, CMA + BPO, Tennessee offer forms',
    'Full transaction coordination from mutual acceptance through closing',
    'One restart if the deal falls through before closing',
    'Coordination starts the moment you\'re under contract — no second checkout',
  ];

  return (
    <div className={`grid gap-5 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2 md:gap-8'}`}>
      <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/[0.09] p-5 ring-1 ring-inset ring-brand-gold/25 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">What you save</p>
        <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-gray-700">
          <li>
            <span className="line-through text-gray-400">${alacarte.toLocaleString()}</span>{' '}
            <span className="font-extrabold text-brand-navy">${bundle.toLocaleString()}</span>
            {saveVsAlacarte > 0 && (
              <span className="ml-1 font-bold text-[#047857]"> — ${saveVsAlacarte.toLocaleString()} off</span>
            )}{' '}
            vs offer + transaction separately
          </li>
          <li>One payment upfront — not two checkouts after acceptance</li>
          <li>
            vs ~3% on $500K:{' '}
            <span className="line-through text-gray-400">${traditional.toLocaleString()}</span>{' '}
            <span className="font-extrabold text-brand-navy">${bundle.toLocaleString()}</span>
            <span className="block text-[11px] text-gray-500 mt-0.5">
              Illustrative difference ${saveVsCommission.toLocaleString()}; not a savings guarantee
            </span>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">What you get</p>
        <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-gray-600">
          {inclusions.map((text) => (
            <li key={text} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11px] leading-relaxed text-gray-400">
          Most buyers don&apos;t land the first house they write on. The bundle covers setbacks without paying twice.
          Unused bundle inclusions are not refundable.
        </p>
      </div>
    </div>
  );
}

/** For tier ladder chip — cents in, dollars saved out. */
export function formatTierBundleSavings(
  offerCents: number,
  transactionCents: number,
  bundleCents: number
): string | null {
  const saved = bundleSavingsVsAlacarte(
    offerCents / 100,
    transactionCents / 100,
    bundleCents / 100
  );
  if (saved <= 0) return null;
  return `Save $${saved.toLocaleString()} vs à la carte`;
}
