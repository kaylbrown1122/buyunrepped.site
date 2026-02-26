'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { FileText, MessageSquare, Calendar, Shield, DollarSign, ClipboardCheck, Users } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
            <Header />

            {/* Hero */}
            <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
                <SectionBadge>About</SectionBadge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4">
                    Democratizing home ownership.
                </h1>
                <p className="text-xl text-gray-500">
                    We&apos;re changing the way people buy homes by putting control—and savings—back in your hands.
                </p>
            </section>

            {/* About Us Content */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <SectionBadge>Our Story</SectionBadge>
                            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8 leading-tight">About Us</h2>
                            <div className="text-lg text-gray-500 space-y-6 leading-relaxed">
                                <p>
                                    Our founder and principal broker is <strong className="text-brand-navy">Kayla Brown</strong>. She has assisted in over 250 transactions throughout 8 active years as a full service agent in Nashville. She was proud to provide excellent service to her clients, but saw a gaping hole in the options available to consumers.
                                </p>
                                <p>
                                    She felt that simpler/more decisive clients were subsidizing those with more complex needs, and she wanted to find a solution for that... so she trimmed the fat to find a way to provide amazing service to buyers, make life easier for the listing agents on the other side, and do it all for a fraction of the price!
                                </p>
                                <p>
                                    We&apos;ve outsourced showings and given the BUYER control of their transaction. The buyer customer can still represent themselves, but now they have full transaction manager and experienced local broker in their pocket! The best part - all fees are flat. It doesn&apos;t matter if the home costs $400k or $2million - the price is the price.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative">
                                <Image
                                    src="/images/kayla-buyunrepped.png"
                                    alt="Kayla Brown"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why BuyUnrepped */}
            <section className="py-24 bg-brand-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <SectionBadge>Why BuyUnrepped</SectionBadge>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">Why BuyUnrepped?</h2>
                        <p className="text-lg text-gray-500">Everything you need to succeed without an agent.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: <FileText className="w-5 h-5 text-brand-blue" />,
                                title: 'Offer Help',
                                description: 'Know which terms are in the standard state purchase and sale agreement, and gain insight into what is common.',
                            },
                            {
                                icon: <MessageSquare className="w-5 h-5 text-brand-blue" />,
                                title: 'Expert Advice',
                                description: 'Have access to our staff local agents for consultations when you need them! No need to rely on ChatGPT, Zillow, TikTok or otherwise...',
                            },
                            {
                                icon: <Calendar className="w-5 h-5 text-brand-blue" />,
                                title: 'Transaction Help',
                                description: 'Keep track of all deadlines through calendar and email reminders - plus tips, insights, and assistance for each milestone!',
                            },
                            {
                                icon: <Shield className="w-5 h-5 text-brand-blue" />,
                                title: 'Lower Risk',
                                description: 'Unrepresented buyers create high risk for listing agents, who owe a fiduciary duty to the SELLER - the line between loyalty and ethics can easily blur... BuyUnrepped solves this!',
                            },
                            {
                                icon: <DollarSign className="w-5 h-5 text-brand-blue" />,
                                title: 'SAVINGS!',
                                description: "It's no secret that home prices are high, and interest rates will never be back in the 2s, 3s, or 4s. We aim to give consumers a way to increase their leverage without feeling lost in their purchase.",
                            },
                            {
                                icon: <ClipboardCheck className="w-5 h-5 text-brand-blue" />,
                                title: 'Compliant Forms',
                                description: "REALTORs are trained on specific forms, and there's nothing scarier to a real estate professional than a legal document they've never seen. We're here to fix that! BuyUnrepped buyers will have TREC approved forms from start to finish.",
                            },
                            {
                                icon: <Users className="w-5 h-5 text-brand-blue" />,
                                title: 'Trusted Referrals',
                                description: "Access trusted referrals — lenders, title companies, vendors who are active and effective in your market! Working with the same professionals that your top agents leverage will help you close on time and with fewer surprises.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
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
