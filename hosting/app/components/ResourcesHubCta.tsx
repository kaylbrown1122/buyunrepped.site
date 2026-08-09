'use client';

import { WaitlistButton } from './WaitlistModal';

interface ResourcesHubCtaProps {
  fitCheckUrl: string;
}

export default function ResourcesHubCta({ fitCheckUrl }: ResourcesHubCtaProps) {
  return (
    <section className="bg-brand-navy py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">Get Started</p>
        <h2 className="mb-4 mt-4 text-3xl font-bold">Ready to put it into practice?</h2>
        <p className="mb-8 text-lg text-gray-300">
          BuyUnrepped gives you the tools, agreements, and support to buy your Tennessee home with
          transparent flat-fee pricing.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={fitCheckUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-8 py-3 text-base font-bold text-brand-navy shadow-lg transition-all hover:bg-[#e8b93d]"
          >
            Check your fit
          </a>
          <WaitlistButton
            source="website_resources"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/25 px-8 py-3 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
          >
            Stay in the loop
          </WaitlistButton>
        </div>
      </div>
    </section>
  );
}
