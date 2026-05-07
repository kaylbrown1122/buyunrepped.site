import Image from 'next/image';
import Link from 'next/link';
import { Camera, CheckCircle2, ClipboardList, FileSignature, Megaphone, ShieldCheck, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Listing Pilot',
  description: 'Listing Pilot is BuyUnrepped seller intake for preparing a sharper, cleaner sale.',
  robots: {
    index: false,
    follow: true,
  },
};

const features = [
  ['Property intake', ClipboardList, 'Collect the details that affect pricing, prep, disclosures, and timing.'],
  ['Launch assets', Camera, 'Coordinate the photos and listing inputs that make the home easier to evaluate.'],
  ['Offer workflow', FileSignature, 'Keep incoming interest, offer terms, and next steps organized.'],
  ['Broker guidance', ShieldCheck, 'Use licensed context where it matters without losing the simple seller workflow.'],
];

export default function ListingPilotPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      <Header />
      <main id="main-content" className="overflow-hidden">
        <section
          className="relative bg-brand-navy text-white"
          style={{
            background:
              'radial-gradient(ellipse at 60% 40%, #24709d 0%, #1b5373 50%, #0a1f2c 100%)',
          }}
        >
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:px-8">
            <div>
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
                Listing Pilot
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                A seller intake system for cleaner listings.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
                Gather the right facts, prep the home, and move toward market with a more organized seller-side process.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/questionnaires?tab=seller" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-gold px-7 text-sm font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]">
                  Start intake
                </Link>
                <Link href="/sellers" className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/15 px-7 text-sm font-bold text-white transition-colors hover:bg-white/10">
                  Seller matchmaking
                </Link>
              </div>
            </div>
            <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:min-h-[460px]">
              <Image
                src="/images/seller-intake-home.png"
                alt="Seller standing in front of a home with a BuyUnrepped sign"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-brand-cream py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-xl sm:min-h-[430px]">
              <Image
                src="/images/seller-intake-photographer-kitchen.jpg"
                alt="Real estate photographer preparing listing photos in a kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Product flow</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">From property details to listing readiness.</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Listing Pilot gives the seller process a single lane: intake, prep priorities, launch materials, and follow-up.
              </p>
              <div className="mt-7 space-y-4">
                {['Property facts are captured once', 'Prep work turns into a clear punch list', 'Listing launch has a practical checklist'].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-green" />
                    <p className="font-semibold text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <Sparkles className="size-7 text-brand-blue" />
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">What it organizes</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map(([title, Icon, body]) => (
                <article key={title as string} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <Icon className="size-7 text-brand-blue" />
                  <h3 className="mt-5 text-lg font-bold">{title as string}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{body as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-navy py-16 text-white">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div>
              <Megaphone className="size-7 text-brand-gold" />
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Start with the seller questionnaire.</h2>
              <p className="mt-3 text-white/65">The intake form sends property details to the lead endpoint for follow-up.</p>
            </div>
            <Link href="/questionnaires?tab=seller" className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-xl bg-brand-gold px-7 text-sm font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]">
              Begin intake
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
