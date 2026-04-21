'use client';

import Link from 'next/link';
import { Twitter, Instagram, Home } from 'lucide-react';

function EqualHousingIcon() {
    return (
        <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" className="size-8 shrink-0 text-white/40">
            <path d="M32 4 L60 28 H52 V60 H12 V28 H4 Z" stroke="currentColor" strokeWidth="3" fill="none" />
            <rect x="22" y="36" width="20" height="3" rx="1" />
            <rect x="22" y="43" width="20" height="3" rx="1" />
        </svg>
    );
}

const brokerageFields: [string, React.ReactNode][] = [
    ['Firm Legal Name', 'BuyUnrepped'],
    ['Firm License No.', '267134'],
    ['Firm Phone', <a key="phone" href="tel:6152083390" className="hover:text-white transition-colors">615-208-3390</a>],
    ['Firm Address', '2509 Cruzen St, Nashville, TN 37211'],
    ['State of Licensure', 'Tennessee'],
    ['Principal Broker', 'Kayla Brown · License #339134'],
    ['Entity Type', 'Licensed Tennessee Real Estate Brokerage'],
    ['IDX Listings', 'Not currently in use on this site'],
];

export default function Footer() {
    return (
        <footer className="bg-brand-navy">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="bg-white/10 p-1.5 rounded-lg">
                                <Home className="size-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-white tracking-tight">BuyUnrepped</span>
                        </Link>
                        <p className="text-sm text-gray-400 text-pretty max-w-xs">
                            Licensed Tennessee brokerage: offer prep and transaction coordination for buyers who stay unrepresented.
                        </p>
                        <div className="flex gap-2">
                            <a
                                href="https://www.instagram.com/buyunrepped"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="size-9 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors"
                            >
                                <Instagram className="size-4" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@buyunrepped"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="size-9 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors"
                            >
                                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                                </svg>
                            </a>
                            <a
                                href="https://x.com/buyunrepped"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter)"
                                className="size-9 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors"
                            >
                                <Twitter className="size-4" />
                            </a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                        <div>
                            <p className="text-xs font-semibold text-white/50 tracking-widest uppercase mb-4">Tools</p>
                            <ul role="list" className="space-y-2.5">
                                {[
                                    ['Closing Cost Calculator', '/tools/closing-cost-calculator'],
                                    ['Mortgage Estimator', '/tools/mortgage-payment-estimator'],
                                    ['Affordability Calculator', '/tools/home-affordability-calculator'],
                                    ['Savings Calculator', '/savings'],
                                ].map(([label, href]) => (
                                    <li key={href}>
                                        <Link href={href} className="text-sm font-normal text-gray-400 hover:text-white transition-colors">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white/50 tracking-widest uppercase mb-4">Company</p>
                            <ul role="list" className="space-y-2.5">
                                {[
                                    ['About Us', '/about'],
                                    ['Contact', '/contact'],
                                    ['Guides', '/guides'],
                                    ['Blog', '/resources'],
                                ].map(([label, href]) => (
                                    <li key={href}>
                                        <Link href={href} className="text-sm font-normal text-gray-400 hover:text-white transition-colors">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {/* Compliance zone */}
            <div className="border-t border-white/8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* Brokerage Disclosure */}
                    <p className="text-[0.6875rem] font-semibold tracking-widest uppercase text-amber-400/80 mb-5">
                        Brokerage Information
                    </p>
                    <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4 mb-6">
                        {brokerageFields.map(([label, value]) => (
                            <div key={label}>
                                <dt className="text-[0.6875rem] font-medium text-white/35 mb-0.5">{label}</dt>
                                <dd className="text-sm text-gray-300">{value}</dd>
                            </div>
                        ))}
                    </dl>

                    {/* Credentials */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {['TREC licensed brokerage', 'Realtracs access'].map((badge) => (
                            <span
                                key={badge}
                                className="px-3 py-1 border border-white/10 text-gray-400 text-xs font-normal rounded-full"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Equal Housing */}
                    <div className="flex items-start gap-4 mb-8 p-4 rounded-xl border border-white/8 bg-white/3">
                        <EqualHousingIcon />
                        <div>
                            <p className="text-sm font-semibold text-white mb-1.5">Equal Housing Opportunity</p>
                            <p className="text-sm text-gray-400 text-pretty">
                                BuyUnrepped is committed to full compliance with the Federal Fair Housing Act, the Tennessee Human Rights Act, and all applicable fair housing laws. We do not discriminate on the basis of race, color, religion, sex, disability, familial status, national origin, sexual orientation, gender identity, or any other protected class.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 text-pretty">
                        All information on this website is deemed reliable but not guaranteed and should be independently verified. Services are provided in accordance with Tennessee real estate law and regulations.
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="flex items-center gap-5">
                        <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} BuyUnrepped. All rights reserved.
                        </p>
                        <Link href="/terms" className="text-sm font-normal text-gray-500 hover:text-gray-300 transition-colors">Terms</Link>
                        <Link href="/privacy" className="text-sm font-normal text-gray-500 hover:text-gray-300 transition-colors">Privacy</Link>
                    </div>
                    <p className="text-sm text-gray-600">
                        Tennessee · Firm license #267134
                    </p>
                </div>
            </div>
        </footer>
    );
}
