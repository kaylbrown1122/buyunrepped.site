export default function BrokerageDisclosureBar() {
  return (
    <div className="border-b border-gray-200 bg-brand-navy/95 px-4 py-1.5 text-center text-[11px] leading-snug text-white/80">
      <span className="font-semibold text-white">BuyUnrepped, Inc.</span>
      {' · '}
      TN Firm Lic. #267134 · Broker Lic. #339134 ·{' '}
      <a href="tel:6152083390" className="underline decoration-white/30 underline-offset-2 hover:text-white">
        615-208-3390
      </a>
      {' · '}
      Licensed Tennessee real estate brokerage · Non-representational buyer support
    </div>
  );
}
