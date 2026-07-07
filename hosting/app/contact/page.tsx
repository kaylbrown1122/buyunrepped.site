'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getAppUrl } from '../../lib/appUrl';

const INTEREST_OPTIONS = [
    'Offer Package',
    'Transaction Management',
    'Agent Matchmaking',
    'General inquiry',
    'Offer question',
    'Transaction question',
];

export default function ContactPage() {
    const appUrl = getAppUrl();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        interestedIn: 'Offer Package',
        message: '',
        marketingOptIn: false,
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const interest = params.get('interest');
        const role = params.get('role');
        if (interest && INTEREST_OPTIONS.includes(interest)) {
            setFormData((prev) => ({
                ...prev,
                interestedIn: interest,
                message:
                    role === 'seller'
                        ? "I'm a seller interested in agent matchmaking. "
                        : role === 'buyer'
                          ? "I'm a buyer interested in full-service agent matchmaking. "
                          : prev.message,
            }));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', interestedIn: 'Offer Package', message: '', marketingOptIn: false });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue/20">
            <Header />

            {/* Hero */}
            <section id="main-content" className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
                <SectionBadge>Contact</SectionBadge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4">
                    Get in touch
                </h1>
                <p className="text-xl text-gray-500">
                    Have questions about how to buy without an agent? We&apos;re here to help you navigate the process.
                </p>
                <p className="mt-4 text-[15px] font-semibold text-brand-navy">
                    Kayla Brown, CEO — primary public contact
                </p>
                <a
                    href="mailto:info@buyunrepped.com"
                    className="mt-2 inline-block text-lg font-bold text-brand-blue hover:underline"
                >
                    info@buyunrepped.com
                </a>
                <p className="mt-2 text-gray-500">+1 (615) 208-3390 · 2509 Cruzen St, Nashville, TN 37211</p>
                <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-8 text-[15px] font-bold text-white transition-colors hover:bg-brand-navy/90"
                >
                    Start in the app
                </a>
            </section>

            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 lg:gap-24">

                        {/* Left Column - Info */}
                        <div>

                            <div className="space-y-10">
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-brand-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Email</h4>
                                        <a href="mailto:info@buyunrepped.com" className="text-brand-blue font-semibold hover:underline">info@buyunrepped.com</a>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-brand-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Phone</h4>
                                        <p className="text-gray-500">+1 (615) 208-3390</p>
                                        <p className="text-xs text-gray-400 mt-1">Mon-Fri 9am-5pm CST</p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-brand-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Office</h4>
                                        <p className="text-gray-500">2509 Cruzen St</p>
                                        <p className="text-gray-500">Nashville, TN 37211</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            {status === 'success' ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-gray-500 mb-6">We&apos;ll get back to you as soon as possible.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-brand-blue font-semibold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-bold mb-2">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                placeholder="Jane"
                                                required
                                                aria-required="true"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-bold mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                placeholder="Doe"
                                                required
                                                aria-required="true"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="contactEmail" className="block text-sm font-bold mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="contactEmail"
                                            placeholder="jane@example.com"
                                            required
                                            aria-required="true"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="interestedIn" className="block text-sm font-bold mb-2">Interested In</label>
                                        <div className="relative">
                                            <select
                                                id="interestedIn"
                                                value={formData.interestedIn}
                                                onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all appearance-none bg-white"
                                            >
                                                {INTEREST_OPTIONS.map((opt) => (
                                                    <option key={opt}>{opt}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500" aria-hidden="true">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-bold mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            placeholder="Your message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.marketingOptIn}
                                            onChange={(e) => setFormData({ ...formData, marketingOptIn: e.target.checked })}
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                                        />
                                        <span className="text-sm text-gray-600">
                                            Also send me BuyUnrepped updates and buyer tips by email.
                                        </span>
                                    </label>

                                    {status === 'error' && (
                                        <p id="contact-error" role="alert" className="text-red-600 text-sm">Something went wrong. Please try again.</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full min-h-[48px] rounded-xl bg-brand-gold py-4 text-[15px] font-bold text-brand-navy transition-colors hover:bg-[#e8b93d] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            <p className="mx-auto max-w-7xl px-4 pb-12 text-center text-[12px] text-gray-400 sm:px-6 lg:px-8">
                In-app messages may route to your coordination team as the product grows.
            </p>

            <Footer />
        </div>
    );
}
