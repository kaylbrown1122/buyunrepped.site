import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | BuyUnrepped',
  description: 'The page you are looking for could not be found.',
};

const links: [string, string][] = [
  ['Browse the blog', '/resources'],
  ['See pricing', '/pricing'],
  ['How it works', '/about'],
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      <main
        id="main-content"
        className="mx-auto flex max-w-2xl flex-col items-center px-4 pb-24 pt-24 text-center sm:px-6"
      >
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-blue">Error 404</p>
        <h1 className="mt-4 text-5xl font-bold md:text-6xl">This page moved or no longer exists</h1>
        <p className="mt-6 text-xl text-gray-500">
          We recently refreshed our resources, so some older links have changed. Here are a few good
          places to pick back up.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-brand-blue px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-cyan-700"
          >
            Back to home
          </Link>
          <Link
            href="/resources"
            className="rounded-full border border-gray-300 bg-white px-8 py-4 text-base font-bold text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            Browse the blog
          </Link>
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 transition-colors hover:text-brand-blue"
              >
                {label}
                <ArrowRight className="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-brand-blue" />
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
