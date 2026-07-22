export type RolloutTierStatus = 'draft' | 'active' | 'sold_out' | 'retired';

export type RolloutTierPublic = {
  tier_number: number;
  tier_name: string;
  offer_price_cents: number;
  transaction_price_cents: number;
  status: RolloutTierStatus;
};

export type RolloutTiersResponse = {
  tiers: RolloutTierPublic[];
  active_tier_number: number | null;
};

export type RolloutTiersResult = RolloutTiersResponse & {
  isNeutralFallback?: boolean;
};

const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatTierDollars(cents: number): string {
  return dollarFormatter.format(cents / 100);
}

export function getActiveTier(data: RolloutTiersResponse): RolloutTierPublic | null {
  if (data.active_tier_number == null) return null;
  return data.tiers.find((tier) => tier.tier_number === data.active_tier_number) ?? null;
}

export function getActiveTierBadgeLabel(tier: RolloutTierPublic): string {
  return tier.tier_name === 'Founding' ? 'Founding price' : 'Current entry tier';
}

export function getFromPriceHeadline(data: RolloutTiersResult): string | null {
  if (data.isNeutralFallback || data.active_tier_number == null) return null;
  const active = getActiveTier(data);
  if (!active) return null;
  return `From ${formatTierDollars(active.offer_price_cents)}`;
}
