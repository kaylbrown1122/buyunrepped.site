'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        interestedIn: 'Offer Generator',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://discord.com/api/webhooks/1461986196099039306/QT25UXH1oq7R5Y7xhCm0xxWUsfCmGkjQErMzM3wVc_qnKpXvlT8Djoyf_AJsIhPfotrW', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embeds: [{
                        title: '📬 New Contact Form Submission',
                        color: 0x0891b2,
                        fields: [
                            { name: 'Name', value: `${formData.firstName} ${formData.lastName}`, inline: true },
                            { name: 'Email', value: formData.email, inline: true },
                            { name: 'Interested In', value: formData.interestedIn, inline: true },
                            { name: 'Message', value: formData.message || 'No message provided' },
                        ],
                        timestamp: new Date().toISOString(),
                    }],
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', interestedIn: 'Offer Generator', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-brand-navy">
            <Header />

            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 lg:gap-24">

                        {/* Left Column - Info */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Get in touch</h1>
                            <p className="text-lg text-gray-500 mb-12">
                                Have questions about how to buy without an agent? We're here to help you navigate the process.
                            </p>

                            <div className="space-y-10">
                                <div className="flex gap-5 group">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                        <Mail className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Email</h4>
                                        <p className="text-gray-500">team@buyunrepped.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-5 group">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                        <Phone className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Phone</h4>
                                        <p className="text-gray-500">+1 (555) 123-4567</p>
                                        <p className="text-xs text-gray-400 mt-1">Mon-Fri 9am-6pm CST</p>
                                    </div>
                                </div>

                                <div className="flex gap-5 group">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                        <MapPin className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Office</h4>
                                        <p className="text-gray-500">Nashville, TN</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100">
                            {status === 'success' ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-gray-500 mb-6">We'll get back to you as soon as possible.</p>
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
                                            <label className="block text-sm font-bold mb-2">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="Jane"
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Doe"
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Email</label>
                                        <input
                                            type="email"
                                            placeholder="jane@example.com"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Interested In</label>
                                        <div className="relative">
                                            <select
                                                value={formData.interestedIn}
                                                onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all appearance-none bg-white"
                                            >
                                                <option>Offer Generator</option>
                                                <option>Full Support</option>
                                                <option>General Inquiry</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Message</label>
                                        <textarea
                                            rows={4}
                                            placeholder="How can we help you save?"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    {status === 'error' && (
                                        <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-cyan-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
