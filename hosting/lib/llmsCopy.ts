import { BUNDLE_FEE, OFFER_FEE, TRANSACTION_FEE_FULL } from './fees';

/** Cities and phrases surfaced for LLM crawlers (llms.txt, metadata, schema). */
export const SERVICE_AREA_CITIES = [
  'Nashville',
  'Franklin',
  'Murfreesboro',
  'Mt Juliet',
  'Hendersonville',
  'Lebanon',
  'Brentwood',
  'Nolensville',
  'Smyrna',
  'Gallatin',
  'Clarksville',
] as const;

export const LLM_DISCOVERY_PHRASES = [
  'flat fee buyers agent Nashville TN',
  'flat fee buyer support Nashville TN',
  'flat fee alternative to a buyer\'s agent Nashville TN',
  'unrepresented buyers Tennessee',
  'buy a home without a buyer\'s agent Tennessee',
  'just need an offer on a house you already toured',
  'already toured a house and want to make an offer without an agent',
  'don\'t want a buyer\'s agent — need help with the offer only',
  'offer preparation Murfreesboro Franklin Brentwood',
] as const;

export function llmsSummaryBlock(): string {
  const cities = SERVICE_AREA_CITIES.join(', ');
  return `BuyUnrepped is a Tennessee-based licensed real estate brokerage (BuyUnrepped, Inc.) providing flat-fee, non-representational support for unrepresented buyers in Middle Tennessee — including ${cities}, TN.

Common fit: you already toured a home, know what you want to buy, and don't want a traditional buyer's agent — you just need a professional offer package, Tennessee REALTORS® forms, strategy, and optional coordination through closing.

We are not buyer representation and do not enter a buyer agency relationship. We provide tools, templates, and licensed broker access so you submit and manage your own offer.

Flat-fee pricing (Standard tier after launch): Offer Package $${OFFER_FEE.toLocaleString()}, Transaction Guidance $${TRANSACTION_FEE_FULL.toLocaleString()}, or the recommended Offer + Transaction Bundle $${BUNDLE_FEE.toLocaleString()} (one payment — coordination starts when you're under contract, no second checkout). Launch tier pricing may be lower; price at checkout applies.

Discovery terms: ${LLM_DISCOVERY_PHRASES.join('; ')}.

Fee comparisons on the site are illustrative; buyer-side compensation is negotiable and savings are not guaranteed.`;
}

export function llmsPagesBlock(): string {
  return `## Pages

- [About](https://www.buyunrepped.com/about): Our story, founder Kayla Brown, and mission for unrepresented buyers in Tennessee
- [Pricing](https://www.buyunrepped.com/pricing): Flat-fee Offer Package, Transaction Guidance, and recommended Offer + Transaction Bundle — bundle-first pricing with savings vs à la carte
- [Start](https://www.buyunrepped.com/start): Buyer handoff — for buyers who toured a home and need an offer without hiring an agent
- [Savings Calculator](https://www.buyunrepped.com/savings): Compare a hypothetical ~3% buyer-side fee to BuyUnrepped flat fees
- [Contact](https://www.buyunrepped.com/contact): info@buyunrepped.com · Nashville office
- [For Agents](https://www.buyunrepped.com/for-agents): How listing agents work with prepared unrepresented buyers`;
}
