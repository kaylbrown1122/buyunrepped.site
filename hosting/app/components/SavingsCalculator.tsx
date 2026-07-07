'use client';

import { useState } from 'react';
import {
  BUYER_AGENT_PCT_DEFAULT,
  OFFER_FEE,
  TRANSACTION_FEE_FULL,
  TRANSACTION_FEE_SPLIT,
  buyUnreppedTotalFull,
  buyUnreppedTotalSplit,
  savings,
  traditionalBuyerSide,
} from '../../lib/fees';

function formatPrice(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
}

export default function SavingsCalculator() {
  const [price, setPrice] = useState(950_000);
  const [mode, setMode] = useState<'full' | 'split'>('full');

  const traditional = traditionalBuyerSide(price);
  const buyUnreppedTotal = mode === 'full' ? buyUnreppedTotalFull() : buyUnreppedTotalSplit();
  const youKeep = savings(price, mode);
  const pctLabel = `${(BUYER_AGENT_PCT_DEFAULT * 100).toFixed(0)}%`;

  return (
    <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label
          className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400"
          htmlFor="savings-price-slider"
        >
          Purchase price (illustrative)
        </label>
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5">
          <button
            type="button"
            onClick={() => setMode('full')}
            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              mode === 'full' ? 'bg-brand-navy text-white' : 'text-gray-500 hover:text-brand-navy'
            }`}
          >
            Pay in full
          </button>
          <button
            type="button"
            onClick={() => setMode('split')}
            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              mode === 'split' ? 'bg-brand-navy text-white' : 'text-gray-500 hover:text-brand-navy'
            }`}
          >
            Split billing
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-2">
        <span className="text-[11px] text-gray-400">$250K</span>
        <span className="text-xl font-extrabold tabular-nums text-brand-navy sm:text-2xl">
          {formatPrice(price)}
        </span>
        <span className="text-[11px] text-gray-400">$3M</span>
      </div>
      <input
        id="savings-price-slider"
        type="range"
        min={250_000}
        max={3_000_000}
        step={10_000}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="mt-1 w-full accent-brand-navy"
        aria-valuemin={250_000}
        aria-valuemax={3_000_000}
        aria-valuenow={price}
      />

      <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
        <div className="rounded-xl bg-gray-50 px-2 py-2.5 sm:px-3">
          <p className="text-[8px] font-bold uppercase tracking-wide text-gray-400 sm:text-[9px]">
            Traditional
          </p>
          <p className="mt-0.5 text-base font-extrabold tabular-nums text-gray-700 sm:text-lg">
            ${traditional.toLocaleString()}
          </p>
          <p className="mt-0.5 text-[9px] leading-tight text-gray-400">~{pctLabel} illustration</p>
        </div>

        <div className="rounded-xl border border-brand-gold/40 bg-brand-navy/5 px-2 py-2.5 ring-1 ring-brand-gold/25 sm:px-3">
          <p className="text-[8px] font-bold uppercase tracking-wide text-brand-navy/60 sm:text-[9px]">
            BuyUnrepped
          </p>
          <p className="mt-0.5 text-base font-extrabold tabular-nums text-brand-navy sm:text-lg">
            ${buyUnreppedTotal.toLocaleString()}
          </p>
          <p className="mt-0.5 text-[9px] leading-tight text-gray-500">
            ${OFFER_FEE.toLocaleString()} offer
            {mode === 'full'
              ? ` · $${TRANSACTION_FEE_FULL.toLocaleString()} after`
              : ` · $${TRANSACTION_FEE_SPLIT[0].toLocaleString()}+$${TRANSACTION_FEE_SPLIT[1].toLocaleString()}`}
          </p>
        </div>

        <div className="rounded-xl bg-brand-green/10 px-2 py-2.5 text-center sm:px-3">
          <p className="text-[8px] font-bold uppercase tracking-wide text-brand-green/70 sm:text-[9px]">
            You keep
          </p>
          <p className="mt-0.5 text-base font-extrabold tabular-nums text-brand-green sm:text-lg">
            ${youKeep.toLocaleString()}
          </p>
          <p className="mt-0.5 text-[9px] leading-tight text-brand-green/60">Illustration</p>
        </div>
      </div>

      <p className="mt-2.5 text-[9px] leading-snug text-gray-400">
        Illustration only - not whole transaction cost. Seller compensation, concessions, and lender/title
        charges vary.
      </p>
    </div>
  );
}
