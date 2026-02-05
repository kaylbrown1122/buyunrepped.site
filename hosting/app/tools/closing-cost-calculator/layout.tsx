import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tennessee Closing Cost Calculator | BuyUnrepped',
  description:
    'Estimate your Tennessee home buyer closing costs with our free calculator. Get a detailed breakdown of lender fees, title insurance, state taxes, and more.',
};

export default function ClosingCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
