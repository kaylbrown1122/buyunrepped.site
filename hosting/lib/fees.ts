export const OFFER_FEE = 1495;
export const TRANSACTION_FEE_FULL = 2495;
export const BUNDLE_FEE = 3490;
export const BUYUNREPPED_ALACARTE_TOTAL = OFFER_FEE + TRANSACTION_FEE_FULL;
/** @deprecated Use BUYUNREPPED_ALACARTE_TOTAL or BUNDLE_FEE explicitly */
export const BUYUNREPPED_MAX_TOTAL = BUYUNREPPED_ALACARTE_TOTAL;
export const BUYER_AGENT_PCT_DEFAULT = 0.03;
export const ILLUSTRATIVE_HOME_PRICE = 500_000;

export function traditionalBuyerSide(
  price: number,
  pct: number = BUYER_AGENT_PCT_DEFAULT
): number {
  return Math.round(price * pct);
}

/** Full-journey comparison price — bundle at Standard tier. */
export function buyUnreppedTotalFull(): number {
  return BUNDLE_FEE;
}

export function bundleSavingsVsAlacarte(
  offer = OFFER_FEE,
  txn = TRANSACTION_FEE_FULL,
  bundle = BUNDLE_FEE
): number {
  return Math.max(offer + txn - bundle, 0);
}

export function savings(price: number): number {
  const traditional = traditionalBuyerSide(price);
  return Math.max(traditional - buyUnreppedTotalFull(), 0);
}
