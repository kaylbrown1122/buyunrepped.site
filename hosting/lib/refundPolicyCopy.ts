/** Authoritative refund/cancellation policy — keep in sync with porch src/constants/consent.js §13. */

export const REFUND_POLICY_SECTIONS = {
  intro:
    'Fees may be subject to tax and may be collected by us or by a third party through which you transact. All fees paid to BuyUnrepped are final. If you wish to cancel a paid service, contact us by email at info@buyunrepped.com; we may, in our sole discretion, issue a full or partial refund or account credit where this policy allows.',
  offerPackage:
    'Offer Package: you may receive a full refund until your broker price opinion (BPO) is published. After the BPO is published, the Offer Package fee is nonrefundable.',
  transactionGuidance:
    'Transaction Guidance is not refunded in cash. If your transaction ends before closing, you may qualify for an account credit based on how far coordination progressed, after you upload your termination document and we review it.',
  creditLadderIntro: 'Termination credit bands (applied to what you actually paid for Transaction Guidance):',
  creditBands: [
    '100% — offer rejected or cancelled, or accepted but transaction never onboarded',
    '75% — transaction onboarded but ended before much coordination was delivered',
    '50% — inspections were coordinated, but the deal ended before repair negotiation began',
    '20% — repair negotiation was underway or the deal progressed further; issued at our discretion only',
  ],
  creditUse:
    'Account credits are a spendable balance toward a future offer, transaction, or bundle. Credits are issued only after we review your uploaded termination notice or signed earnest money release.',
  bundle:
    'Offer and Transaction Bundle: unused bundle inclusions (an extra offer or restart) are not refundable and are not convertible to account credit. If you hold an unused bundle restart, that restart supersedes the termination credit ladder for that termination.',
  discretion:
    'The price shown at checkout is the price that applies to your purchase. Other service fees, including consultation rescheduling fees, are as stated at the time of purchase and are nonrefundable once the service has been performed.',
} as const;

export function refundPolicyParagraphs(): string[] {
  const s = REFUND_POLICY_SECTIONS;
  return [
    s.intro,
    s.offerPackage,
    s.transactionGuidance,
    `${s.creditLadderIntro} ${s.creditBands.join('; ')}.`,
    s.creditUse,
    s.bundle,
    s.discretion,
  ];
}
