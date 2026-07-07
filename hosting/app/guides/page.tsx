import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import Link from 'next/link';
import { getAllGuides } from '../../lib/guides';
import { Clock, ArrowRight, MessageSquareText } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Buying Guides for Tennessee | BuyUnrepped',
  description:
    'Comprehensive guides for Tennessee home buyers: going unrepresented, city-specific playbooks, first-time buyer resources, and more.',
  openGraph: {
    title: 'Home Buying Guides for Tennessee | BuyUnrepped',
    description: 'Comprehensive guides for Tennessee home buyers: going unrepresented, city-specific playbooks, first-time buyer resources, and more.',
    url: 'https://www.buyunrepped.com/guides',
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com/guides',
  },
};

const CATEGORY_ORDER = ['Guides', 'Finance', 'Market Insights'];

function categoryColor(category: string) {
  switch (category) {
    case 'Finance':
      return 'bg-emerald-50 text-emerald-700';
    case 'Market Insights':
      return 'bg-purple-50 text-purple-700';
    default:
      return 'bg-brand-blue/10 text-brand-blue';
  }
}

export default function GuidesPage() {
  const guides = getAllGuides();

  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof guides>>((acc, cat) => {
    const matches = guides.filter((g) => g.frontmatter.category === cat);
    if (matches.length) acc[cat] = matches;
    return acc;
  }, {});

  // Catch any categories not in CATEGORY_ORDER
  guides.forEach((g) => {
    const cat = g.frontmatter.category;
    if (!grouped[cat]) grouped[cat] = [];
    if (!grouped[cat].includes(g)) grouped[cat].push(g);
  });

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionBadge>Guides</SectionBadge>
        <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-5">
          The complete playbook for Tennessee home buyers
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Comprehensive, Tennessee-specific guides covering every major decision in the home buying
          process, from understanding what an agent actually costs to closing without one.
        </p>
      </section>

      {/* Featured: Playbook */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <Link
          href="/playbook"
          className="group flex flex-col gap-5 rounded-2xl border border-brand-gold/40 bg-brand-navy p-6 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
              <MessageSquareText className="size-5" aria-hidden />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Featured · Scripts &amp; etiquette</span>
              <h3 className="mt-1 text-xl font-bold leading-snug text-white">The buyer playbook: what to say, do, and expect before the offer</h3>
              <p className="mt-1.5 max-w-xl text-sm text-white/70">
                Copy-paste scripts for scheduling a showing, talking to listing agents, and handling multiple
                offers, plus what to wear and how to find the agent on Zillow or Homes.com.
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-brand-gold px-5 py-2.5 text-sm font-bold text-brand-navy transition-transform group-hover:translate-x-0.5 sm:self-center">
            Open the playbook <ArrowRight className="size-4" aria-hidden />
          </span>
        </Link>
      </section>

      {/* Guide grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {Object.entries(grouped).map(([category, categoryGuides]) => (
          <div key={category} className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 pb-3 border-b border-gray-200">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${categoryColor(guide.frontmatter.category)}`}
                    >
                      {guide.frontmatter.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                  </div>
                  <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                    {guide.frontmatter.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {guide.frontmatter.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.frontmatter.readingTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to put it into practice?</h2>
          <p className="text-gray-300 text-lg mb-8">
            BuyUnrepped gives you the tools, agreements, and support to buy your Tennessee home
            without paying a full buyer's agent commission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="px-8 py-3 bg-brand-blue text-white font-bold rounded-full hover:bg-cyan-500 transition-colors shadow-lg"
            >
              See Pricing
            </Link>
            <Link
              href="/savings"
              className="px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors"
            >
              Calculate Your Savings
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
