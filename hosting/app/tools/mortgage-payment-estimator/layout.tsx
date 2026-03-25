import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Payment Estimator | BuyUnrepped',
  description:
    'Calculate your monthly mortgage payment including principal, interest, property taxes, insurance, and PMI. Free tool for Tennessee home buyers.',
};

export default function MortgageEstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
