'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, MessageSquare, Calendar, Shield, DollarSign } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-brand-navy">
            <Header />

            {/* Hero */}
            <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
                    Democratizing home ownership.
                </h1>
                <p className="text-xl text-gray-500">
                    We're changing the way people buy homes by putting control—and savings—back in your hands.
                </p>
            </section>

            {/* About Us Content */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold font-serif mb-8">About Us</h2>
                            <div className="prose prose-lg text-gray-500">
                                <p className="mb-6">
                                    Our founder and principal broker is <strong className="text-brand-navy">Kayla Brown</strong>. She has assisted in over 250 transactions throughout 8 active years as a full service agent in Nashville. She was proud to provide excellent service to her clients, but saw a gaping hole in the options available to consumers.
                                </p>
                                <p className="mb-6">
                                    She felt that simpler/more decisive clients were subsidizing those with more complex needs, and she wanted to find a solution for that... so she trimmed the fat to find a way to provide amazing service to buyers, make life easier for the listing agents on the other side, and do it all for a fraction of the price!
                                </p>
                                <p>
                                    We've outsourced showings and given the BUYER control of their transaction. The buyer customer can still represent themselves, but now they have full transaction manager and experienced local broker in their pocket! The best part - all fees are flat. It doesn't matter if the home costs $400k or $2million - the price is the price.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative">
                                {/* Placeholder for Kayla Image - Using branded backdrop style */}
                                <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                                    <div className="text-center p-8">
                                        <div className="text-6xl font-serif text-brand-blue/20 rotate-12 mb-4">BuyUnrepped</div>
                                        <div className="text-sm font-bold text-brand-navy uppercase tracking-widest">Kayla Brown</div>
                                        <div className="text-xs text-gray-500">Founder & Principal Broker</div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative circle element behind */}
                            <div className="absolute -z-10 top-10 -right-10 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why BuyUnrepped */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-serif mb-4">Why BuyUnrepped?</h2>
                        <p className="text-lg text-gray-500">Everything you need to succeed without an agent.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Offer Help</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Know which terms are in the standard state purchase and sale agreement, and gain insight into what is common.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <MessageSquare className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Expert Advice</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Have access to our staff local agents for consultations when you need them! No need to rely on ChatGPT, Zillow, TikTok or otherwise...</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                                <Calendar className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Transaction Help</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Keep track of all deadlines through calendar and email reminders - plus tips, insights, and assistance for each milestone!</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Lower Risk</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Unrepresented buyers create high risk for listing agents, who owe a fiduciary duty to the SELLER - the line between loyalty and ethics can easily blur... BuyUnrepped solves this!</p>
                        </div>

                        {/* Card 5 (Wide? Or just normal grid? Design says grid of 5. It will likely wrap.) */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all md:col-span-2 lg:col-span-2 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">SAVINGS!</h3>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-lg">It's no secret that home prices are high, and interest rates will never be back in the 2s, 3s, or 4s. We aim to give consumers a way to increase their leverage without feeling lost in their purchase.</p>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 z-0"></div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
