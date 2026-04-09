import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { getPostSlugs, getPostBySlugWithHtml } from '../../../lib/posts';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugWithHtml(slug);
  return {
    title: `${post.frontmatter.title} | BuyUnrepped`,
    description: post.frontmatter.description,
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `https://www.buyunrepped.com/resources/${slug}`,
      publishedTime: post.frontmatter.date,
      authors: ['https://www.buyunrepped.com/about'],
    },
    alternates: {
      canonical: `https://www.buyunrepped.com/resources/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlugWithHtml(slug);

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-full uppercase tracking-wider">
              {post.frontmatter.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {post.frontmatter.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.frontmatter.readingTime}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-navy prose-li:marker:text-brand-blue"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 bg-white rounded-2xl text-center shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold mb-3">Ready to buy smarter?</h3>
          <p className="text-gray-500 mb-6">
            Get access to all the tools you need to purchase your Tennessee home without paying agent fees.
          </p>
          <Link
            href="/schedule"
            className="px-8 py-3 bg-brand-blue text-white font-bold rounded-full hover:bg-cyan-700 transition-colors inline-block shadow-lg"
          >
            Schedule a Call
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
