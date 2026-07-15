'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import Script from 'next/script';

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
      <Header />

      <section id="main-content" className="pt-16 pb-8 md:pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Left column: heading + info */}
            <div className="pt-4">
              <SectionBadge>Schedule a Call</SectionBadge>
              <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4 leading-tight">
                Talk to Kayla
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                This call is your starting point. We&apos;ll review your situation, walk through how BuyUnrepped works, and figure out the best path forward for your home purchase.
              </p>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">What we&apos;ll cover</p>
                <ul className="space-y-2">
                  {[
                    'How the BuyUnrepped model works',
                    'A quick look at your situation and goals',
                    'Your clearest next step',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Good to know</p>
                <ul className="space-y-1.5">
                  {[
                    '15-minute fit call only',
                    'No offer drafting or negotiation',
                    'No agency relationship is created',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column: Calendly embed */}
            <div className="md:col-span-2">
              <p className="mb-3 text-sm leading-relaxed text-gray-500">
                Scheduling is provided through{' '}
                <a
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue underline"
                >
                  Calendly
                </a>
                . Information you submit there is also subject to Calendly&apos;s privacy practices.
              </p>
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/buyunrepped/introcallprogramfit?primary_color=f7c74a&hide_event_type_details=1"
                style={{ minWidth: '320px', height: 'calc(100vh - 120px)', minHeight: '700px' }}
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
