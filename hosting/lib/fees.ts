export const OFFER_FEE = 995;
export const TRANSACTION_FEE_FULL = 2495;
export const BUYUNREPPED_MAX_TOTAL = OFFER_FEE + TRANSACTION_FEE_FULL;
export const BUYER_AGENT_PCT_DEFAULT = 0.03;

export function traditionalBuyerSide(
  price: number,
  pct: number = BUYER_AGENT_PCT_DEFAULT
): number {
  return Math.round(price * pct);
}

export function buyUnreppedTotalFull(): number {
  return OFFER_FEE + TRANSACTION_FEE_FULL;
}

export function savings(price: number): number {
  const traditional = traditionalBuyerSide(price);
  return Math.max(traditional - buyUnreppedTotalFull(), 0);
}
