import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Payment Estimator | BuyUnrepped',
  description:
    'Calculate your monthly mortgage payment including principal, interest, property taxes, insurance, and PMI. Free tool for Tennessee home buyers.',
  openGraph: {
    title: 'Mortgage Payment Estimator | BuyUnrepped',
    description: 'Calculate your monthly mortgage payment including principal, interest, property taxes, insurance, and PMI. Free for Tennessee home buyers.',
    url: 'https://www.buyunrepped.com/tools/mortgage-payment-estimator',
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com/tools/mortgage-payment-estimator',
  },
};

export default function MortgageEstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
