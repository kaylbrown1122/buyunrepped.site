export const metadata = {
  title: 'Pricing | Flat-Fee Home Buying Support in Tennessee',
  description: 'BuyUnrepped offers flat-fee home buying support starting at $995. Get professional offer assistance and full transaction coordination without paying 3% buyer agent commission. Serving all of Tennessee.',
  openGraph: {
    title: 'Pricing | Flat-Fee Home Buying Support in Tennessee',
    description: 'Starting at $995 — professional home buying support without the 3% buyer agent commission. Flat fee regardless of home price.',
    url: 'https://www.buyunrepped.com/pricing',
    images: [
      {
        url: 'https://www.buyunrepped.com/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'BuyUnrepped - Home Buying Built for the Buyer',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
