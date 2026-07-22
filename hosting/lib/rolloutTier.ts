import 'server-only';

import { getAppUrl } from './appUrl';
import { ROLLOUT_TIERS_FIXTURE, ROLLOUT_TIERS_NEUTRAL_FALLBACK } from './rolloutTier.fixture';
import type { RolloutTiersResponse, RolloutTiersResult } from './rolloutTier.types';

export type {
  RolloutTierPublic,
  RolloutTierStatus,
  RolloutTiersResponse,
  RolloutTiersResult,
} from './rolloutTier.types';
export {
  formatTierDollars,
  getActiveTier,
  getActiveTierBadgeLabel,
  getFromPriceHeadline,
} from './rolloutTier.types';

function parseRolloutTiersResponse(payload: unknown): RolloutTiersResponse | null {
  if (!payload || typeof payload !== 'object') return null;
  const data = payload as RolloutTiersResponse;
  if (!Array.isArray(data.tiers)) return null;
  return {
    tiers: data.tiers,
    active_tier_number: data.active_tier_number ?? null,
  };
}

export async function fetchRolloutTiers(): Promise<RolloutTiersResult> {
  const useFixture = process.env.ROLLOUT_TIERS_USE_FIXTURE === '1';
  const isProd = process.env.NODE_ENV === 'production';

  if (useFixture) {
    return { ...ROLLOUT_TIERS_FIXTURE };
  }

  try {
    const response = await fetch(`${getAppUrl()}/api/rollout/tiers`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (isProd) {
        return { ...ROLLOUT_TIERS_NEUTRAL_FALLBACK, isNeutralFallback: true };
      }
      return { ...ROLLOUT_TIERS_FIXTURE };
    }

    const parsed = parseRolloutTiersResponse(await response.json());
    if (!parsed) {
      if (isProd) {
        return { ...ROLLOUT_TIERS_NEUTRAL_FALLBACK, isNeutralFallback: true };
      }
      return { ...ROLLOUT_TIERS_FIXTURE };
    }

    return parsed;
  } catch {
    if (isProd) {
      return { ...ROLLOUT_TIERS_NEUTRAL_FALLBACK, isNeutralFallback: true };
    }
    return { ...ROLLOUT_TIERS_FIXTURE };
  }
}
