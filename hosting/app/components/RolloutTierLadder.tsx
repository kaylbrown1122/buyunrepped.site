'use client';

import Link from 'next/link';
import { getFitCheckUrl } from '../../lib/appUrl';
import {
  formatTierDollars,
  getActiveTierBadgeLabel,
  getFromPriceHeadline,
  type RolloutTiersResult,
} from '../../lib/rolloutTier.types';

type RolloutTierLadderProps = {
  tiersData: RolloutTiersResult;
  variant: 'compact' | 'full';
  showCta?: boolean;
  showCompactNote?: boolean;
};

function tierBadge(
  tier: RolloutTiersResult['tiers'][number],
  isActive: boolean,
  isNeutralFallback: boolean
): { label: string; className: string } | null {
  if (isNeutralFallback) return null;

  if (isActive) {
    return {
      label: getActiveTierBadgeLabel(tier),
      className: 'bg-brand-gold text-brand-navy',
    };
  }

  if (tier.status === 'sold_out' || tier.status === 'retired') {
    return {
      label: 'Filled',
      className: 'bg-gray-100 text-gray-400',
    };
  }

  if (tier.status === 'draft') {
    return {
      label: 'Upcoming',
      className: 'bg-brand-blue/10 text-brand-blue',
    };
  }

  return null;
}

function TierRow({
  tier,
  isActive,
  isNeutralFallback,
  variant,
}: {
  tier: RolloutTiersResult['tiers'][number];
  isActive: boolean;
  isNeutralFallback: boolean;
  variant: 'compact' | 'full';
}) {
  const filled = tier.status === 'sold_out' || tier.status === 'retired';
  const muted = filled || tier.status === 'draft';
  const badge = tierBadge(tier, isActive, isNeutralFallback);
  const compact = variant === 'compact';

  const rowClasses = compact
    ? `flex flex-col gap-2 border-b border-white/10 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between ${
        isActive && !isNeutralFallback ? 'rounded-lg bg-brand-gold/10 px-3 ring-2 ring-brand-gold/60' : ''
      }`
    : `rounded-xl border p-4 sm:p-5 ${
        isActive && !isNeutralFallback
          ? 'border-brand-gold ring-2 ring-brand-gold bg-brand-gold/5'
          : filled
            ? 'border-gray-200 bg-white'
            : 'border-gray-200 bg-white'
      }`;

  const nameClasses = compact
    ? `text-[13px] font-semibold sm:text-sm ${muted && !isActive ? 'text-white/50' : 'text-white'}`
    : `text-base font-bold sm:text-lg ${muted && !isActive ? 'text-gray-400' : 'text-brand-navy'}`;

  const priceClasses = compact
    ? `text-[13px] sm:text-sm ${
        filled
          ? 'text-white/40 line-through'
          : isActive && !isNeutralFallback
            ? 'font-bold text-white'
            : muted
              ? 'text-white/50'
              : 'text-white/85'
      }`
    : `text-sm sm:text-[15px] ${
        filled
          ? 'text-gray-400 line-through'
          : isActive && !isNeutralFallback
            ? 'font-bold text-brand-navy'
            : muted
              ? 'text-gray-400'
              : 'text-gray-600'
      }`;

  return (
    <div className={rowClasses}>
      <div className="flex flex-wrap items-center gap-2">
        <p className={nameClasses}>{tier.tier_name}</p>
        {badge && (
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${badge.className} ${
              compact ? 'border border-white/10' : ''
            }`}
          >
            {badge.label}
          </span>
        )}
      </div>
      <p className={priceClasses}>
        {formatTierDollars(tier.offer_price_cents)} offer ·{' '}
        {formatTierDollars(tier.transaction_price_cents)} transaction guidance
      </p>
    </div>
  );
}

export default function RolloutTierLadder({
  tiersData,
  variant,
  showCta = true,
  showCompactNote = false,
}: RolloutTierLadderProps) {
  const fitCheckUrl = getFitCheckUrl();
  const isNeutralFallback = Boolean(tiersData.isNeutralFallback);
  const fromHeadline = getFromPriceHeadline(tiersData);
  const compact = variant === 'compact';

  const shellClasses = compact
    ? 'rounded-2xl border border-white/10 p-7 backdrop-blur-sm lg:p-8'
    : 'space-y-3';

  const shellStyle = compact
    ? {
        background:
          'linear-gradient(160deg, rgba(57, 182, 255, 0.12) 0%, rgba(27, 83, 115, 0.22) 100%)',
      }
    : undefined;

  return (
    <div className={shellClasses} style={shellStyle}>
      {compact && (
        <>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
            Launch tier pricing
          </p>
          {fromHeadline && (
            <p className="mt-2 text-xl font-extrabold tracking-tight text-white">{fromHeadline}</p>
          )}
          {isNeutralFallback && (
            <p className="mt-2 text-[13px] leading-relaxed text-white/75">
              Check your fit for current pricing.
            </p>
          )}
        </>
      )}

      {!compact && (
        <div className="mb-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
            Launch tier pricing
          </p>
          {fromHeadline && (
            <p className="mt-2 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              {fromHeadline}
            </p>
          )}
          {isNeutralFallback && (
            <p className="mt-2 text-sm text-gray-500">Check your fit for current pricing.</p>
          )}
        </div>
      )}

      <div className={compact ? 'mt-3 space-y-0' : 'space-y-3'}>
        {tiersData.tiers.map((tier) => (
          <TierRow
            key={tier.tier_number}
            tier={tier}
            isActive={!isNeutralFallback && tiersData.active_tier_number === tier.tier_number}
            isNeutralFallback={isNeutralFallback}
            variant={variant}
          />
        ))}
      </div>

      {showCompactNote && (
        <p className="mt-4 text-[12px] leading-relaxed text-white/70">
          Early Adopter pricing is limited.{' '}
          <Link
            href="/pricing"
            className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
          >
            View pricing →
          </Link>
        </p>
      )}

      {showCta && (
        <a
          href={fitCheckUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            compact
              ? 'mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-brand-gold px-6 text-[14px] font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]'
              : 'mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-brand-gold px-6 text-[15px] font-bold text-brand-navy transition-colors hover:bg-[#e8b93d] sm:w-auto'
          }
        >
          Check your fit →
        </a>
      )}
    </div>
  );
}
