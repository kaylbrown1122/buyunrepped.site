'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFitCheckUrl, getSignInUrl } from '../../lib/appUrl';

export default function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full min-w-0 border-b border-gray-200/80 bg-white/95 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-[0_2px_20px_rgba(21,59,82,.08)]' : ''}`}
        >
            <div className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6 lg:px-8">
                <div className="flex h-[4.25rem] w-full min-w-0 items-center">
                    {/* Logo - left: basis-0 + min-w-0 so flex can’t collapse or clip the mark */}
                    <div className="flex min-h-0 min-w-0 flex-1 basis-0 items-center">
                        <Link href="/" className="block w-fit min-w-0 max-w-full">
                            <Image
                                src="/images/buyunrepped-cropped.png"
                                alt="BuyUnrepped"
                                width={4249}
                                height={1200}
                                className="h-11 w-auto max-w-full object-contain object-left sm:h-12"
                                priority
                                sizes="200px"
                            />
                        </Link>
                    </div>

                    {/* Navigation - center */}
                    <nav className="hidden flex-none items-center gap-7 md:flex" aria-label="Primary">
                        <Link
                            href="/pricing"
                            className={`text-sm font-medium transition-colors ${pathname === '/pricing' ? 'text-brand-navy' : 'text-gray-600 hover:text-brand-navy'}`}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/resources"
                            className={`text-sm font-medium transition-colors ${pathname.startsWith('/resources') ? 'text-brand-navy' : 'text-gray-600 hover:text-brand-navy'}`}
                        >
                            Resources
                        </Link>
                        <Link
                            href="/for-agents"
                            className={`text-sm font-medium transition-colors ${pathname === '/for-agents' ? 'text-brand-navy' : 'text-gray-600 hover:text-brand-navy'}`}
                        >
                            For Agents
                        </Link>
                        <Link
                            href="/about"
                            className={`text-sm font-medium transition-colors ${pathname === '/about' ? 'text-brand-navy' : 'text-gray-600 hover:text-brand-navy'}`}
                        >
                            About
                        </Link>
                    </nav>

                    {/* CTA - right */}
                    <div className="flex min-h-0 min-w-0 flex-1 basis-0 items-center justify-end gap-2 sm:gap-3">
                        <a
                            href={getSignInUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[36px] shrink-0 items-center justify-center rounded-full bg-brand-navy px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-navy/90 md:hidden"
                        >
                            Login
                        </a>
                        <a
                            href={getFitCheckUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[36px] shrink-0 items-center justify-center rounded-full bg-brand-gold px-4 py-2 text-xs font-bold text-brand-navy shadow-sm transition-colors hover:bg-[#e8b93d] md:hidden"
                        >
                            Check your fit
                        </a>
                        <a
                            href={getSignInUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden min-h-[40px] items-center justify-center rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-navy/90 md:inline-flex"
                        >
                            Login
                        </a>
                        <a
                            href={getFitCheckUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden min-h-[40px] items-center justify-center rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm transition-colors hover:bg-[#e8b93d] md:inline-flex"
                        >
                            Check your fit
                        </a>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-lg"
                            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div id="mobile-menu" className="md:hidden border-t border-gray-100 bg-white px-4 py-6 space-y-4">
                    <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-brand-navy">Pricing</Link>
                    <Link href="/resources" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-brand-navy">Resources</Link>
                    <Link href="/for-agents" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-brand-navy">For Agents</Link>
                    <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-brand-navy">About</Link>
                </div>
            )}
        </header>
    );
}
