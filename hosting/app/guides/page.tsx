import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import ToolCards from '../components/ToolCards';
import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';
import { ArrowRight, MessageSquareText } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources for Tennessee Home Buyers | BuyUnrepped',
  description:
    'Tools, scripts, and articles for Tennessee home buyers: going unrepresented, offer strategy, contracts, and more.',
  openGraph: {
    title: 'Resources for Tennessee Home Buyers | BuyUnrepped',
    description: 'Tools, scripts, and articles for Tennessee home buyers: going unrepresented, offer strategy, contracts, and more.',
    url: 'https://www.buyunrepped.com/guides',
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com/guides',
  },
};

export default function GuidesPage() {
  const orderedPosts = getAllPosts();

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionBadge>Resources</SectionBadge>
        <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-5">
          The complete playbook for Tennessee home buyers
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Tools, scripts, and Tennessee-specific articles covering every major decision in the home
          buying process, from understanding what an agent actually costs to closing without one.
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

      {/* Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mb-8">
          <SectionBadge>Tools</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 leading-tight">
            Free tools for smarter home buying.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Crunch the numbers before you make an offer. Our calculators help Tennessee buyers
            understand costs, savings, and affordability.
          </p>
        </div>
        <ToolCards />
      </section>

      {/* Blog posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-3xl mb-10">
          <SectionBadge>Blog Posts</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 leading-tight">
            Expert breakdowns for Tennessee buyers
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Deep dives on commissions, contracts, negotiations, closing costs, and what changed
            after the NAR settlement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/resources/${post.slug}`}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-full uppercase tracking-wider">
                  {post.frontmatter.category}
                </span>
                <span className="text-xs text-gray-400">{post.frontmatter.readingTime}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-brand-blue transition-colors">
                {post.frontmatter.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {post.frontmatter.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
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
