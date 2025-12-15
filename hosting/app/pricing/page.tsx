'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-brand-navy">
            <Header />

            {/* Hero */}
            <section className="pt-20 pb-16 text-center max-w-3xl mx-auto px-4">
                <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
                    Simple, transparent pricing
                </h1>
                <p className="text-xl text-gray-500">
                    Pay a fraction of the cost of a traditional realtor commission. Most buyers save over $15,000 using our platform.
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="py-12 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        {/* DIY Toolkit */}
                        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-shadow relative">
                            <h3 className="text-2xl font-bold font-serif mb-2">DIY Toolkit</h3>
                            <p className="text-sm text-gray-500 mb-8">Essential tools for the confident self-starter.</p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold tracking-tight">$299</span>
                                <span className="text-gray-500 text-sm">/one-time</span>
                            </div>

                            <button className="w-full py-4 rounded-xl border-2 border-gray-100 font-bold hover:border-brand-navy hover:bg-gray-50 transition-colors mb-10">
                                Get Started
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
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        ) : (
                                            <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
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

                            <h3 className="text-2xl font-bold font-serif mb-2">Full Support</h3>
                            <p className="text-sm text-gray-400 mb-8">Expert guidance from offer to closing table.</p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold tracking-tight">$999</span>
                                <span className="text-gray-400 text-sm">/one-time</span>
                            </div>

                            <button className="w-full py-4 rounded-xl bg-brand-blue text-white font-bold hover:bg-cyan-500 transition-colors mb-10 shadow-lg">
                                Get Full Support
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
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold font-serif text-center mb-16">Frequently Asked Questions</h2>
                    <div className="space-y-10">
                        <div>
                            <h3 className="text-lg font-bold mb-2">How much do I actually save?</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Typically, a buyer's agent takes 2.5% to 3% of the home price. On a $500,000 home, that is $15,000. By representing yourself with our tools, you can ask the seller to reduce the price by that amount.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2">Is this legal?</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Absolutely. You are never required by law to have a real estate agent. We provide the standard forms and guidance you need to execute the contract legally.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2">What if things get complicated?</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Our Full Support plan includes access to licensed real estate experts who can answer specific questions and help you navigate tricky inspection or appraisal issues.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
