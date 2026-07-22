import type { RolloutTiersResponse } from './rolloutTier.types';

export const ROLLOUT_TIERS_FIXTURE: RolloutTiersResponse = {
  tiers: [
    {
      tier_number: 1,
      tier_name: 'Founding',
      offer_price_cents: 35000,
      transaction_price_cents: 87500,
      status: 'active',
    },
    {
      tier_number: 2,
      tier_name: 'Level 2',
      offer_price_cents: 55000,
      transaction_price_cents: 137500,
      status: 'draft',
    },
    {
      tier_number: 3,
      tier_name: 'Level 3',
      offer_price_cents: 75000,
      transaction_price_cents: 187500,
      status: 'draft',
    },
    {
      tier_number: 4,
      tier_name: 'Standard',
      offer_price_cents: 99500,
      transaction_price_cents: 249500,
      status: 'draft',
    },
  ],
  active_tier_number: 1,
};

export const ROLLOUT_TIERS_NEUTRAL_FALLBACK: RolloutTiersResponse = {
  tiers: ROLLOUT_TIERS_FIXTURE.tiers.map((tier) => ({
    ...tier,
    status: 'draft',
  })),
  active_tier_number: null,
};
