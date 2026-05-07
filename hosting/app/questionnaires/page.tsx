import Link from 'next/link';
import { Home, KeyRound } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SellerQuestionnaire from '../components/SellerQuestionnaire';

export const metadata = {
  title: 'Questionnaires',
  description: 'BuyUnrepped buyer and seller questionnaires.',
};

export default function QuestionnairesPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const tab = searchParams?.tab === 'seller' ? 'seller' : 'buyer';

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue/20">
      <Header />
      <main id="main-content" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Questionnaires</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tell us what you are working on.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            A little structure upfront keeps the first conversation useful.
          </p>
        </div>

        <div className="mb-8 grid rounded-2xl border border-gray-200 bg-white p-1 shadow-sm sm:inline-grid sm:grid-cols-2">
          <Link
            href="/questionnaires"
            className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-colors ${tab === 'buyer' ? 'bg-brand-navy text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <KeyRound className="size-4" />
            Buyer
          </Link>
          <Link
            href="/questionnaires?tab=seller"
            className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-colors ${tab === 'seller' ? 'bg-brand-navy text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Home className="size-4" />
            Seller
          </Link>
        </div>

        {tab === 'seller' ? (
          <SellerQuestionnaire />
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Buyer questionnaire</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              Buyer intake is currently handled through the contact path. Reach out and we will point you to the right next step.
            </p>
            <Link href="/contact" className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-6 text-sm font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]">
              Contact BuyUnrepped
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
