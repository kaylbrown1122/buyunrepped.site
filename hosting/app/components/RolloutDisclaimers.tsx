type RolloutDisclaimersProps = {
  showOptionalFeedback?: boolean;
};

export default function RolloutDisclaimers({ showOptionalFeedback = true }: RolloutDisclaimersProps) {
  return (
    <div className="space-y-3 text-xs leading-relaxed text-gray-500 sm:text-sm">
      <p>
        Launch pricing. Tiered prices are limited, subject to availability, and may change at
        BuyUnrepped&apos;s discretion. The price shown at checkout is the price that applies to your purchase.
        Once paid, your Offer Package price and paired Transaction Guidance price are locked for that property
        per our terms.
      </p>
      <p>
        If something does not look right, a wrong price, a stuck screen, or missing data, email{' '}
        <a
          href="mailto:info@buyunrepped.com"
          className="font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue"
        >
          info@buyunrepped.com
        </a>{' '}
        so we can assist you and fix the issue.
      </p>
      {showOptionalFeedback && (
        <p className="text-[11px] text-gray-400 sm:text-xs">
          If you have a positive experience, we may invite you to share optional feedback on Google.
        </p>
      )}
    </div>
  );
}
