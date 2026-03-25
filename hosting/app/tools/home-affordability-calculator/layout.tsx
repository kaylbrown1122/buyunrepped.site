import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Affordability Calculator | BuyUnrepped',
  description:
    'Find out how much home you can afford based on your income, debts, and down payment. Free calculator for Tennessee home buyers.',
};

export default function AffordabilityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
