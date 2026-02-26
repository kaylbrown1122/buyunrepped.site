'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Home } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-brand-navy pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-white/10 p-1.5 rounded-lg">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">BuyUnrepped</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Empowering Tennessee home buyers to purchase directly, negotiate better, and save the 3% buyer agent commission.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Resources</h3>
                            <ul className="space-y-3">
                                <li><Link href="/resources" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                                <li><Link href="/savings" className="text-sm text-gray-400 hover:text-white transition-colors">Savings Calculator</Link></li>
                                <li><Link href="/tools" className="text-sm text-gray-400 hover:text-white transition-colors">Tools</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Company</h3>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Credentials */}
                <div className="border-t border-white/10 pt-8 mb-8">
                    <p className="text-sm font-semibold text-white mb-4">Licensed real estate brokerage</p>
                    <div className="flex flex-wrap gap-3">
                        {[
                            'Approved by TREC',
                            'Member of GNAR, TAR, NAR',
                            'Backed by award winning principal broker',
                            'Access to Realtracs',
                        ].map((badge, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white/10 text-gray-300 text-xs font-medium rounded-full">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Equal Housing & Compliance */}
                <div className="border-t border-white/10 pt-8 mb-8">
                    <p className="text-sm font-semibold text-white mb-3">Equal Housing Opportunity.</p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                        BuyUnrepped is committed to full compliance with the Federal Fair Housing Act, the Tennessee Human Rights Act, and all applicable federal, state, and local fair housing laws. We provide equal professional service to all persons and do not discriminate on the basis of race, color, religion, sex, disability, familial status, national origin, sexual orientation, gender identity, or any other protected class.
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-1">
                        BuyUnrepped is a licensed real estate brokerage in the State of Tennessee.
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-1">
                        Firm License No. 267134 / Principal Broker: Kayla Brown / 2509 Cruzen St, Nashville, TN 37211
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed mt-4">
                        All information contained on this website is deemed reliable but is not guaranteed and should be independently verified. Services are provided in accordance with Tennessee real estate law and regulations.
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} BuyUnrepped. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500">
                        Home buying built for the buyer, not the agent.
                    </p>
                </div>
            </div>
        </footer>
    );
}
