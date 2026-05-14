import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tennessee Closing Cost Calculator | BuyUnrepped',
  description:
    'Estimate your Tennessee home buyer closing costs with our free calculator. Get a detailed breakdown of lender fees, title insurance, state taxes, and more.',
  openGraph: {
    title: 'Tennessee Closing Cost Calculator | BuyUnrepped',
    description: 'Estimate your Tennessee home buyer closing costs with our free calculator. Detailed breakdown of lender fees, title insurance, and state taxes.',
    url: 'https://www.buyunrepped.com/tools/closing-cost-calculator',
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com/tools/closing-cost-calculator',
  },
};

export default function ClosingCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
