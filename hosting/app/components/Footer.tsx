'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Home } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-brand-navy p-1.5 rounded-lg">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-brand-navy font-serif tracking-tight">BuyUnrepped</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Empowering Tennessee home buyers to purchase directly, negotiate better, and save the 3% buyer agent commission.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-sm font-bold text-brand-navy tracking-wider uppercase mb-4">Product</h3>
                            <ul className="space-y-3">
                                <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Pricing</Link></li>
                                <li><Link href="#" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Offer Generator</Link></li>
                                <li><Link href="#" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Market Analysis</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-brand-navy tracking-wider uppercase mb-4">Resources</h3>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">About Us</Link></li>
                                <li><Link href="#" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Blog</Link></li>
                                <li><Link href="#" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Guides</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-brand-navy tracking-wider uppercase mb-4">Company</h3>
                            <ul className="space-y-3">
                                <li><Link href="/contact" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Contact</Link></li>
                                <li><Link href="/terms" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Terms</Link></li>
                                <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Privacy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                        &copy; 2025 BuyUnrepped. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
