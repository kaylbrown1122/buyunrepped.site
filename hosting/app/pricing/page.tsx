'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { Check } from 'lucide-react';
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
                        'Choosing not to use full service can free up real buying power',
                        'That flexibility can matter in price, terms, or cash at closing',
                        'You still want a clean, professional process',
                        'Flat fee — it doesn\'t matter if the home costs $400,000 or $2 million',
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

                        {/* Ready to Submit Offer */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-shadow relative">
                            <h3 className="text-2xl font-bold mb-2">Ready to Submit Offer</h3>
                            <p className="text-sm text-gray-500 mb-8">Everything you need to put in a professional, compliant offer.</p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold tracking-tight">$995</span>
                                <span className="text-gray-500 text-sm">/one-time</span>
                            </div>

                            <button onClick={openModal} className="w-full py-4 rounded-full border-2 border-gray-200 font-bold hover:border-brand-navy hover:bg-gray-50 transition-colors mb-10">
                                Join Early Access
                            </button>

                            <ul className="space-y-4">
                                {[
                                    'Informed and compliant purchase agreement',
                                    'REALTOR® forms — state-standardized',
                                    'Smart scripts for submitting your offer',
                                    'Market data access',
                                    'Offer strategy guidance',
                                    'Email support',
                                ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-800">
                                        <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-brand-blue" />
                                        </div>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Full Strategy Pass */}
                        <div className="bg-brand-navy text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
                            <div className="absolute top-4 right-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>

                            <h3 className="text-2xl font-bold mb-2">Full Strategy Pass</h3>
                            <p className="text-sm text-gray-400 mb-8">Offer support plus full transaction coordination and app access.</p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold tracking-tight">$3,595</span>
                                <span className="text-gray-400 text-sm">/one-time</span>
                            </div>

                            <button onClick={openModal} className="w-full py-4 rounded-full bg-brand-blue text-white font-bold hover:bg-cyan-500 transition-colors mb-10 shadow-lg">
                                Join Early Access
                            </button>

                            <ul className="space-y-4">
                                {[
                                    'Everything in Ready to Submit Offer',
                                    'Transaction coordination from contract to close',
                                    'Self-guided app access',
                                    'Deadline tracking and reminders',
                                    'Licensed REALTOR® on-call support',
                                    'Inspection and appraisal guidance',
                                    'Closing coordination',
                                    'Unlimited offers',
                                ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-brand-blue" />
                                        </div>
                                        {text}
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
                                answer: "When a seller agrees to pay buyer agent compensation as part of their listing, that amount may be available to you as a credit at closing or a reduction in the purchase price. BuyUnrepped helps you navigate that conversation professionally.",
                            },
                            {
                                question: 'Is this legal?',
                                answer: 'Absolutely. You are never required by law to have a real estate agent. We provide the standard forms and guidance you need to execute the contract legally.',
                            },
                            {
                                question: 'What if things get complicated?',
                                answer: 'Our Full Strategy Pass includes access to our staffed licensed REALTORs who are on call to answer specific questions and help you navigate tricky inspection or appraisal issues.',
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
