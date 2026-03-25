import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { getAllPosts } from '../../lib/posts';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Resources & Insights | BuyUnrepped',
  description: 'Expert guides, tips, and insights for Tennessee home buyers looking to save on their next purchase.',
};

const POSTS_PER_PAGE = 9;

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

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
        <SectionBadge>Resources</SectionBadge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4">
          Resources & <span className="text-brand-blue">Insights</span>
        </h1>
        <p className="text-xl text-gray-500">
          Expert guides and practical tips to help Tennessee buyers navigate the home buying process with confidence.
        </p>
      </section>

      {/* Posts Grid */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
                <h2 className="text-xl font-bold mb-3 group-hover:text-brand-blue transition-colors">
                  {post.frontmatter.title}
                </h2>
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

          {posts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400">No posts yet</h3>
              <p className="text-gray-400">Check back soon for helpful resources.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              {/* Prev */}
              {page > 1 ? (
                <Link
                  href={page === 2 ? '/resources' : `/resources?page=${page - 1}`}
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold border border-gray-200 bg-white hover:border-brand-blue hover:text-brand-blue transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold border border-gray-100 text-gray-300 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </span>
              )}

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={n === 1 ? '/resources' : `/resources?page=${n}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    n === page
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'border border-gray-200 bg-white hover:border-brand-blue hover:text-brand-blue'
                  }`}
                >
                  {n}
                </Link>
              ))}

              {/* Next */}
              {page < totalPages ? (
                <Link
                  href={`/resources?page=${page + 1}`}
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold border border-gray-200 bg-white hover:border-brand-blue hover:text-brand-blue transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold border border-gray-100 text-gray-300 cursor-not-allowed">
                  Next <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </div>

            <p className="text-center text-sm text-gray-400 mt-4">
              Showing {(page - 1) * POSTS_PER_PAGE + 1}–{Math.min(page * POSTS_PER_PAGE, allPosts.length)} of {allPosts.length} articles
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionBadge>Get Started</SectionBadge>
          <h2 className="text-3xl font-bold mb-4 mt-4">Ready to start saving?</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Put these insights into action. Our platform gives you all the tools you need to buy your next home without paying agent fees.
          </p>
          <Link
            href="/schedule"
            className="px-8 py-4 bg-brand-blue text-white text-base font-bold rounded-full hover:bg-cyan-700 transition-all shadow-lg hover:shadow-xl inline-block"
          >
            Schedule a Call
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
