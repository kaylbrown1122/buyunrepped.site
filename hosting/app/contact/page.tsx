'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
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
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">First Name</label>
                                        <input
                                            type="text"
                                            placeholder="Jane"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="jane@example.com"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2">Interested In</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all appearance-none bg-white">
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="w-full py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-cyan-700 transition-colors shadow-lg"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
