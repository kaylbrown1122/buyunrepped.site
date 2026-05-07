import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Compass, FileText, Handshake, Home, MessageSquare, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Seller Agent Matchmaking',
  description: 'A seller-side path for finding the right listing strategy, support model, and agent fit through BuyUnrepped.',
};

const matchCards = [
  {
    icon: Compass,
    title: 'Strategy first',
    body: 'Start with your home, timeline, equity goals, and tolerance for prep before deciding what kind of listing support fits.',
  },
  {
    icon: Handshake,
    title: 'Agent fit',
    body: 'Get matched with seller-side help that makes sense for your property, not a generic referral handoff.',
  },
  {
    icon: ShieldCheck,
    title: 'Broker oversight',
    body: 'Keep the sale grounded with licensed Tennessee brokerage context and a clear path to next steps.',
  },
];

export default function SellersPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      <Header />
      <main id="main-content" className="overflow-hidden">
        <section className="relative bg-brand-cream">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-8">
            <div>
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-blue/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
                Sellers
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                Find the right selling path before you list.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
                BuyUnrepped helps sellers pressure-test the plan: pricing, prep, marketing, negotiation support, and who should be at the table.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/questionnaires?tab=seller" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-gold px-7 text-sm font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]">
                  Start seller questionnaire
                </Link>
                <Link href="/bu-seller-intake" className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-brand-navy/15 bg-white px-7 text-sm font-bold text-brand-navy transition-colors hover:bg-gray-50">
                  Explore Listing Pilot
                </Link>
              </div>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white shadow-xl lg:min-h-[520px]">
              <Image
                src="/images/seller-agent-handshake-living-room.jpg"
                alt="Seller meeting with an agent in a living room"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-3">
              {matchCards.map(({ icon: Icon, title, body }) => (
                <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <Icon className="size-7 text-brand-blue" />
                  <h2 className="mt-5 text-xl font-bold">{title}</h2>
                  <p className="mt-3 leading-relaxed text-gray-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-navy py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">How it works</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">A cleaner front door for sellers.</h2>
              <p className="mt-5 text-white/65">
                The goal is simple: understand the property and match the listing plan to the real constraints before momentum takes over.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                ['Tell us about the property', Home],
                ['Clarify timeline, condition, and support needs', FileText],
                ['Talk through the strongest path to market', MessageSquare],
              ].map(([text, Icon], index) => (
                <div key={text as string} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-extrabold text-brand-navy">{index + 1}</div>
                  <div>
                    <Icon className="size-5 text-brand-blue" />
                    <p className="mt-2 font-semibold">{text as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-cream py-16">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Ready to map the sale?</h2>
              <p className="mt-3 text-gray-600">Start with the seller questionnaire so the first conversation is specific.</p>
            </div>
            <Link href="/questionnaires?tab=seller" className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-xl bg-brand-gold px-7 text-sm font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]">
              Begin now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
