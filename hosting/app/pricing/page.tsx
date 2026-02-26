'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { Check, X } from 'lucide-react';
import { useWaitlist } from '../components/WaitlistModal';

export default function PricingPage() {
    const { openModal } = useWaitlist();
    return (
        <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
            <Header />

            {/* Hero */}
            <section className="pt-20 pb-16 text-center max-w-3xl mx-auto px-4">
                <SectionBadge>Pricing</SectionBadge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4">
                    Flexible support, without full-service commitments
                </h1>
                <p className="text-xl text-gray-500 mb-8">
                    Why some buyers choose BuyUnrepped
                </p>
                <ul className="space-y-3 text-left max-w-xl mx-auto">
                    {[
                        'Buyer agent fees are typically 2.5\u20133%',
                        'Choosing not to use full service can free up real buying power',
                        'That flexibility can matter in price, terms, or cash at closing',
                        'You still want a clean, professional process',
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 mt-0.5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-brand-blue" />
                            </div>
                            <span className="text-gray-600">{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="text-lg font-bold text-brand-blue mt-6">
                    This is what BuyUnrepped is built for.
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="py-12 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        {/* DIY Toolkit */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-shadow relative">
                            <h3 className="text-2xl font-bold mb-2">DIY Toolkit</h3>
                            <p className="text-sm text-gray-500 mb-8">Essential tools for the confident self-starter.</p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold tracking-tight">$299</span>
                                <span className="text-gray-500 text-sm">/one-time</span>
                            </div>

                            <button onClick={openModal} className="w-full py-4 rounded-full border-2 border-gray-200 font-bold hover:border-brand-navy hover:bg-gray-50 transition-colors mb-10">
                                Join Early Access
                            </button>

                            <ul className="space-y-4">
                                {[
                                    { included: true, text: 'Offer Generator' },
                                    { included: true, text: 'Contract Templates' },
                                    { included: true, text: 'Market Data Analysis' },
                                    { included: true, text: 'Step-by-Step Checklist' },
                                    { included: false, text: 'Negotiation Script Library' },
                                    { included: false, text: 'Review by Licensed Expert' },
                                    { included: false, text: 'Closing Coordinator' },
                                    { included: false, text: 'Unlimited Offers' },
                                ].map((feature, i) => (
                                    <li key={i} className={`flex items-center gap-3 text-sm ${feature.included ? 'text-gray-800' : 'text-gray-400'}`}>
                                        {feature.included ? (
                                            <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-brand-blue" />
                                            </div>
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <X className="w-3 h-3 text-gray-300" />
                                            </div>
                                        )}
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Full Support */}
                        <div className="bg-brand-navy text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
                            <div className="absolute top-4 right-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>

                            <h3 className="text-2xl font-bold mb-2">Full Support</h3>
                            <p className="text-sm text-gray-400 mb-8">Expert guidance from offer to closing table.</p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold tracking-tight">$999</span>
                                <span className="text-gray-400 text-sm">/one-time</span>
                            </div>

                            <button onClick={openModal} className="w-full py-4 rounded-full bg-brand-blue text-white font-bold hover:bg-cyan-500 transition-colors mb-10 shadow-lg">
                                Join Early Access
                            </button>

                            <ul className="space-y-4">
                                {[
                                    { included: true, text: 'Offer Generator' },
                                    { included: true, text: 'Contract Templates' },
                                    { included: true, text: 'Market Data Analysis' },
                                    { included: true, text: 'Step-by-Step Checklist' },
                                    { included: true, text: 'Negotiation Script Library' },
                                    { included: true, text: 'Review by Licensed Expert' },
                                    { included: true, text: 'Closing Coordinator' },
                                    { included: true, text: 'Unlimited Offers' },
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-brand-blue" />
                                        </div>
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-brand-cream">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <SectionBadge>FAQ</SectionBadge>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-8">
                        {[
                            {
                                question: 'How much do I actually save?',
                                answer: "When a seller lists their home, they may agree to pay a commission that includes compensation for a buyer's agent. If you buy without an agent, that buyer's agent commission doesn't need to be paid. Smart buyers request this as a credit at closing or a reduction in the purchase price.",
                            },
                            {
                                question: 'Is this legal?',
                                answer: 'Absolutely. You are never required by law to have a real estate agent. We provide the standard forms and guidance you need to execute the contract legally.',
                            },
                            {
                                question: 'What if things get complicated?',
                                answer: 'Our Full Support plan includes access to licensed real estate experts who can answer specific questions and help you navigate tricky inspection or appraisal issues.',
                            },
                        ].map((faq, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-brand-blue font-bold text-sm">?</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                                    <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
