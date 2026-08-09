import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import ToolCards from '../components/ToolCards';
import ResourcesHubCta from '../components/ResourcesHubCta';
import { getAllPosts } from '../../lib/posts';
import { getFitCheckUrl } from '../../lib/appUrl';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, MessageSquareText } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources for Tennessee Home Buyers | BuyUnrepped',
  description:
    'Tools, scripts, and articles for Tennessee home buyers: going unrepresented, offer strategy, contracts, and more.',
  openGraph: {
    title: 'Resources for Tennessee Home Buyers | BuyUnrepped',
    description:
      'Tools, scripts, and articles for Tennessee home buyers: going unrepresented, offer strategy, contracts, and more.',
    url: 'https://www.buyunrepped.com/resources',
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com/resources',
  },
};

const POSTS_PER_PAGE = 9;

function pageHref(n: number) {
  return n === 1 ? '/resources' : `/resources?page=${n}`;
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const allPosts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const page = Math.min(Math.max(1, parseInt(pageParam || '1', 10)), totalPages);
  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const isHubPage = page === 1;
  const fitCheckUrl = getFitCheckUrl();

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {isHubPage ? (
        <>
          {/* Hub hero */}
          <section id="main-content" className="mx-auto max-w-4xl px-4 pb-16 pt-20 text-center sm:px-6 lg:px-8">
            <SectionBadge>Resources</SectionBadge>
            <h1 className="mb-5 mt-4 text-5xl font-bold md:text-6xl">
              The complete playbook for Tennessee home buyers
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-500">
              Tools, scripts, and Tennessee-specific articles covering every major decision in the home
              buying process, from understanding what an agent actually costs to closing without one.
            </p>
          </section>

          {/* Featured: Playbook */}
          <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
            <Link
              href="/playbook"
              className="group flex flex-col gap-5 rounded-2xl border border-brand-gold/40 bg-brand-navy p-6 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
                  <MessageSquareText className="size-5" aria-hidden />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                    Featured · Scripts &amp; etiquette
                  </span>
                  <h2 className="mt-1 text-xl font-bold leading-snug text-white">
                    The buyer playbook: what to say, do, and expect before the offer
                  </h2>
                  <p className="mt-1.5 max-w-xl text-sm text-white/70">
                    Copy-paste scripts for scheduling a showing, talking to listing agents, and handling
                    multiple offers, plus what to wear and how to find the agent on Zillow or Homes.com.
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-brand-gold px-5 py-2.5 text-sm font-bold text-brand-navy transition-transform group-hover:translate-x-0.5 sm:self-center">
                Open the playbook <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          </section>

          {/* Tools */}
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <SectionBadge>Tools</SectionBadge>
              <h2 className="mb-4 mt-4 text-4xl font-bold leading-tight md:text-5xl">
                Free tools for smarter home buying.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-500">
                Crunch the numbers before you make an offer. Our calculators help Tennessee buyers
                understand costs, savings, and affordability.
              </p>
            </div>
            <ToolCards />
          </section>
        </>
      ) : (
        /* Paginated articles header */
        <section id="main-content" className="mx-auto max-w-7xl px-4 pb-8 pt-20 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline"
          >
            <ChevronLeft className="size-4" aria-hidden /> Back to Resources hub
          </Link>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">Articles</h1>
          <p className="mt-2 text-gray-500">
            Page {page} of {totalPages} · Tennessee buyer guides and breakdowns
          </p>
        </section>
      )}

      {/* Articles */}
      <section className={isHubPage ? 'pb-12' : 'pb-8'}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isHubPage && (
            <div className="mb-10 max-w-3xl">
              <SectionBadge>Blog Posts</SectionBadge>
              <h2 className="mb-4 mt-4 text-4xl font-bold leading-tight md:text-5xl">
                Expert breakdowns for Tennessee buyers
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-500">
                Deep dives on offers, contracts, listing agents, closing costs, inspections, and what
                unrepresented buyers should know at each stage.
              </p>
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/${post.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
                    {post.frontmatter.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.frontmatter.readingTime}</span>
                </div>
                <h2 className="mb-3 text-xl font-bold group-hover:text-brand-blue transition-colors">
                  {post.frontmatter.title}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-gray-500">
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
                  <ArrowRight className="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-brand-blue" />
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="py-16 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="text-xl font-bold text-gray-400">No posts yet</h3>
              <p className="text-gray-400">Check back soon for helpful resources.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className={isHubPage ? 'pb-16' : 'pb-24'}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
              {page > 1 ? (
                <Link
                  href={pageHref(page - 1)}
                  aria-label="Go to previous page"
                  className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold transition-colors hover:border-brand-blue hover:text-brand-blue"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Prev
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center gap-1 rounded-full border border-gray-100 px-4 py-2 text-sm font-bold text-gray-300"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Prev
                </span>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={pageHref(n)}
                  aria-label={`Page ${n}`}
                  aria-current={n === page ? 'page' : undefined}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    n === page
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'border border-gray-200 bg-white hover:border-brand-blue hover:text-brand-blue'
                  }`}
                >
                  {n}
                </Link>
              ))}

              {page < totalPages ? (
                <Link
                  href={pageHref(page + 1)}
                  aria-label="Go to next page"
                  className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold transition-colors hover:border-brand-blue hover:text-brand-blue"
                >
                  Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center gap-1 rounded-full border border-gray-100 px-4 py-2 text-sm font-bold text-gray-300"
                >
                  Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
              )}
            </nav>

            <p className="mt-4 text-center text-sm text-gray-400">
              Showing {(page - 1) * POSTS_PER_PAGE + 1}–{Math.min(page * POSTS_PER_PAGE, allPosts.length)}{' '}
              of {allPosts.length} articles
            </p>
          </div>
        </section>
      )}

      {/* Bottom CTA — hub page only */}
      {isHubPage && <ResourcesHubCta fitCheckUrl={fitCheckUrl} />}

      <Footer />
    </div>
  );
}
