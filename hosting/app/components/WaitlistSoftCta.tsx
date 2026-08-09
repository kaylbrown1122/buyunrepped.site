'use client';

import { WaitlistButton } from './WaitlistModal';

interface WaitlistSoftCtaProps {
  source: string;
  headline?: string;
  description?: string;
  buttonLabel?: string;
  className?: string;
}

export default function WaitlistSoftCta({
  source,
  headline = 'Not in Tennessee yet?',
  description = 'Join the list for expansion updates and buyer resources when BuyUnrepped launches in your market.',
  buttonLabel = 'Keep me posted',
  className = '',
}: WaitlistSoftCtaProps) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-brand-gray/60 px-6 py-8 text-center ${className}`}>
      <h2 className="text-xl font-bold text-brand-navy">{headline}</h2>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-gray-600">{description}</p>
      <WaitlistButton
        source={source}
        className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-brand-navy/20 px-6 py-2.5 text-[15px] font-semibold text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-white"
      >
        {buttonLabel} →
      </WaitlistButton>
    </div>
  );
}
