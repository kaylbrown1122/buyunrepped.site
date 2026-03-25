'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface GuideFrontmatter {
  title: string;
  date: string;
  description: string;
  category: string;
  readingTime: string;
}

interface GuideData {
  frontmatter: GuideFrontmatter;
  contentHtml: string;
  headings: Heading[];
}

function TableOfContents({ headings, activeId }: { headings: Heading[]; activeId: string }) {
  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">On this page</p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block text-sm py-1 border-l-2 transition-all duration-150 ${
            h.level === 3 ? 'pl-6' : 'pl-3'
          } ${
            activeId === h.id
              ? 'border-brand-blue text-brand-blue font-semibold'
              : 'border-transparent text-gray-400 hover:text-brand-navy hover:border-gray-300'
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    fetch(`/api/guides/${params.slug}`)
      .then((r) => r.json())
      .then(setGuide);
  }, [params.slug]);

  useEffect(() => {
    if (!guide) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );
    document.querySelectorAll('h2[id], h3[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [guide]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-brand-cream font-sans text-brand-navy">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-32 text-center text-gray-400">Loading...</div>
        <Footer />
      </div>
    );
  }

  const { frontmatter, contentHtml, headings } = guide;

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/guides" className="hover:text-brand-blue transition-colors">Guides</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-navy font-medium truncate max-w-xs">{frontmatter.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            {frontmatter.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-xl text-gray-500 mb-6 leading-relaxed">{frontmatter.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {frontmatter.readingTime}
            </div>
            <span>·</span>
            <span>
              Updated{' '}
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16 xl:gap-24">

          {/* Main content */}
          <article>
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-brand-navy
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
                prose-strong:text-brand-navy
                prose-li:text-gray-600 prose-li:marker:text-brand-blue
                prose-table:text-sm prose-th:text-brand-navy prose-th:font-bold
                prose-blockquote:border-brand-blue prose-blockquote:text-gray-500"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Bottom CTA */}
            <div className="mt-16 p-8 bg-brand-navy text-white rounded-2xl">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold mb-3">Ready to buy on your own terms?</h3>
                <p className="text-gray-300 mb-6">
                  Get Tennessee-specific purchase agreements, closing coordination, and professional
                  support without the full-commission price tag.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className="px-6 py-3 bg-brand-blue text-white font-bold rounded-full hover:bg-cyan-500 transition-colors"
                  >
                    See Pricing
                  </Link>
                  <Link
                    href="/savings"
                    className="px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors"
                  >
                    Calculate Your Savings
                  </Link>
                </div>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-blue transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all guides
              </Link>
            </div>
          </article>

          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} activeId={activeId} />

              <div className="mt-10 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm font-bold text-brand-navy mb-1">Questions?</p>
                <p className="text-sm text-gray-500 mb-4">
                  Our team works with Tennessee buyers every day.
                </p>
                <Link
                  href="/contact"
                  className="block text-center text-sm px-4 py-2.5 bg-brand-blue text-white font-bold rounded-full hover:bg-cyan-500 transition-colors"
                >
                  Reach Out
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>

      <Footer />
    </div>
  );
}
