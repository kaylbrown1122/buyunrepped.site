import Link from 'next/link';
import { Calculator, PiggyBank, Home, DollarSign, ArrowRight } from 'lucide-react';

const tools = [
  {
    title: 'Closing Cost Calculator',
    description:
      'Estimate your Tennessee buyer closing costs with a detailed, editable breakdown of lender fees, taxes, and prepaids.',
    href: '/tools/closing-cost-calculator',
    icon: Calculator,
    available: true,
  },
  {
    title: 'Savings Calculator',
    description:
      "Compare a hypothetical buyer-side representation fee with BuyUnrepped's flat fees.",
    href: '/savings',
    icon: PiggyBank,
    available: true,
  },
  {
    title: 'Mortgage Payment Estimator',
    description:
      'Calculate your monthly mortgage payment including principal, interest, taxes, and insurance.',
    href: '/tools/mortgage-payment-estimator',
    icon: Home,
    available: true,
  },
  {
    title: 'Home Affordability Calculator',
    description:
      'Find out how much home you can afford based on your income, debts, and down payment.',
    href: '/tools/home-affordability-calculator',
    icon: DollarSign,
    available: true,
  },
];

export default function ToolCards() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const content = (
          <div
            key={tool.title}
            className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all ${
              tool.available ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : 'opacity-60'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5">
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">{tool.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{tool.description}</p>
            {tool.available ? (
              <span className="inline-flex items-center gap-1 text-brand-blue font-bold text-sm">
                Open tool <ArrowRight className="w-4 h-4" />
              </span>
            ) : (
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                Coming Soon
              </span>
            )}
          </div>
        );

        return tool.available ? (
          <Link key={tool.title} href={tool.href} className="block">
            {content}
          </Link>
        ) : (
          <div key={tool.title}>{content}</div>
        );
      })}
    </div>
  );
}
