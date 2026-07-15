import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import Link from 'next/link';
import { Calculator, PiggyBank, Home, DollarSign, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Buying Tools | BuyUnrepped',
  description:
    'Free tools for Tennessee home buyers, closing cost calculator, savings estimator, and more. Make smarter decisions with BuyUnrepped.',
  openGraph: {
    title: 'Home Buying Tools | BuyUnrepped',
    description: 'Free tools for Tennessee home buyers, closing cost calculator, savings estimator, and more.',
    url: 'https://www.buyunrepped.com/tools',
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com/tools',
  },
};

const tools = [
  {
    title: 'Closing Cost Calculator',
    description: 'Estimate your Tennessee buyer closing costs with a detailed, editable breakdown of lender fees, taxes, and prepaids.',
    href: '/tools/closing-cost-calculator',
    icon: Calculator,
    available: true,
  },
  {
    title: 'Savings Calculator',
    description: 'Compare a hypothetical buyer-side representation fee with BuyUnrepped\'s flat fees.',
    href: '/savings',
    icon: PiggyBank,
    available: true,
  },
  {
    title: 'Mortgage Payment Estimator',
    description: 'Calculate your monthly mortgage payment including principal, interest, taxes, and insurance.',
    href: '/tools/mortgage-payment-estimator',
    icon: Home,
    available: true,
  },
  {
    title: 'Home Affordability Calculator',
    description: 'Find out how much home you can afford based on your income, debts, and down payment.',
    href: '/tools/home-affordability-calculator',
    icon: DollarSign,
    available: true,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      <main className="pb-20">
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
          <SectionBadge>Tools</SectionBadge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4 leading-tight">
            Free tools for <br />
            <span className="text-brand-blue">smarter home buying.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Crunch the numbers before you make an offer. Our calculators help
            Tennessee buyers understand costs, savings, and affordability.
          </p>
        </section>

        {/* Tools Grid */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const content = (
                <div
                  key={tool.title}
                  className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all ${
                    tool.available
                      ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                      : 'opacity-60'
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
