'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { Check } from 'lucide-react';
import { useWaitlist } from '../components/WaitlistModal';

export default function ForAgentsPage() {
  const { openModal } = useWaitlist();

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Hero */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionBadge>For Listing Agents</SectionBadge>
          <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-6 leading-tight">
            Built with listing agents in mind
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            If you&apos;re a listing agent, an unrepresented buyer can be, err, <em>tough</em> to manage.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — text */}
            <div className="text-lg text-gray-500 space-y-6 leading-relaxed">
              <p>
                BuyUnrepped acts as a stabilizing resource. Ensuring the buyer is using forms you&apos;re familiar with, while keeping them prepared, informed, and on schedule — so <em>you don&apos;t have to</em>.
              </p>
              <p>
                BuyUnrepped is not after your commissions. We&apos;re here to fill a need for a group of buyers who currently have very few options.
              </p>
              <p>
                Unrepresented buyers are not going away. BuyUnrepped helps ensure that when an unrepresented buyer enters a transaction, they are prepared, informed, and easier to work with.
              </p>
              <p>
                BuyUnrepped is not competing for buyer-side commissions. It is a stabilizing resource when an unrepped buyer shows up.
              </p>
            </div>

            {/* Right — benefits list */}
            <div>
              <p className="font-bold text-lg mb-6">For listing agents, this means:</p>
              <ul className="space-y-4">
                {[
                  'Clearer communication',
                  'Fewer missed deadlines',
                  'Less back-and-forth',
                  'Reduced confusion',
                  'Fewer avoidable issues',
                  'A smoother path to closing',
                  'Forms you know and expect',
                  'No dual agent gray area',
                  'Less work!',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-blue" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-blue to-cyan-700 rounded-3xl p-12 md:p-16 text-center">
            <SectionBadge className="bg-white/20 text-white">Get in Touch</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4">
              Have questions about how it works?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              We&apos;re happy to walk you through how BuyUnrepped supports your transactions.
            </p>
            <button
              onClick={openModal}
              className="px-8 py-4 bg-white text-brand-blue font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Early Access
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
