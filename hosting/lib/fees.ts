export const OFFER_FEE = 995;
export const TRANSACTION_FEE_FULL = 2495;
export const TRANSACTION_FEE_SPLIT = [1295, 1295] as const;
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

export function buyUnreppedTotalSplit(): number {
  return OFFER_FEE + TRANSACTION_FEE_SPLIT[0] + TRANSACTION_FEE_SPLIT[1];
}

export function savings(price: number, mode: 'full' | 'split'): number {
  const traditional = traditionalBuyerSide(price);
  const total = mode === 'full' ? buyUnreppedTotalFull() : buyUnreppedTotalSplit();
  return Math.max(traditional - total, 0);
}
