'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="bg-brand-cream/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-20">
                    {/* Logo - left */}
                    <div className="flex-1">
                        <Link href="/" className="w-fit block">
                            <Image
                                src="/images/buyunrepped-cropped.png"
                                alt="BuyUnrepped"
                                width={4249}
                                height={1200}
                                className="h-14 w-auto"
                                priority
                                unoptimized
                            />
                        </Link>
                    </div>

                    {/* Navigation - center */}
                    <nav className="hidden md:flex items-center space-x-8 flex-none">
                        <Link
                            href="/"
                            className={`text-xs font-bold uppercase tracking-wide transition-colors ${pathname === '/' ? 'text-brand-navy' : 'text-gray-500 hover:text-brand-navy'}`}
                        >
                            How it Works
                        </Link>
                        <Link
                            href="/about"
                            className={`text-xs font-bold uppercase tracking-wide transition-colors ${pathname === '/about' ? 'text-brand-navy' : 'text-gray-500 hover:text-brand-navy'}`}
                        >
                            About
                        </Link>
                        <Link
                            href="/resources"
                            className={`text-xs font-bold uppercase tracking-wide transition-colors ${pathname === '/resources' ? 'text-brand-navy' : 'text-gray-500 hover:text-brand-navy'}`}
                        >
                            Resources
                        </Link>
                        <Link
                            href="/tools"
                            className={`text-xs font-bold uppercase tracking-wide transition-colors ${pathname.startsWith('/tools') ? 'text-brand-navy' : 'text-gray-500 hover:text-brand-navy'}`}
                        >
                            Tools
                        </Link>
                        <Link
                            href="/for-agents"
                            className={`text-xs font-bold uppercase tracking-wide transition-colors ${pathname === '/for-agents' ? 'text-brand-navy' : 'text-gray-500 hover:text-brand-navy'}`}
                        >
                            For Agents
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-xs font-bold uppercase tracking-wide transition-colors ${pathname === '/contact' ? 'text-brand-navy' : 'text-gray-500 hover:text-brand-navy'}`}
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* CTA - right */}
                    <div className="flex-1 flex justify-end items-center gap-3">
                        <Link
                            href="/schedule"
                            className="hidden md:inline-flex px-6 py-2.5 bg-brand-blue text-white text-sm font-bold rounded-full hover:bg-cyan-700 transition-all shadow-md hover:shadow-lg"
                        >
                            Schedule a Call
                        </Link>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-brand-navy"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-brand-cream border-t border-gray-100 px-4 py-6 space-y-4">
                    <Link href="/" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-gray-700 hover:text-brand-blue">How it Works</Link>
                    <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-gray-700 hover:text-brand-blue">About</Link>
                    <Link href="/resources" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-gray-700 hover:text-brand-blue">Resources</Link>
                    <Link href="/tools" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-gray-700 hover:text-brand-blue">Tools</Link>
                    <Link href="/for-agents" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-gray-700 hover:text-brand-blue">For Agents</Link>
                    <Link href="/contact" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-gray-700 hover:text-brand-blue">Contact</Link>
                    <Link href="/schedule" onClick={() => setMobileOpen(false)} className="block w-full px-6 py-3 bg-brand-blue text-white text-sm font-bold rounded-full hover:bg-cyan-700 transition-all text-center">
                        Schedule a Call
                    </Link>
                </div>
            )}
        </header>
    );
}
