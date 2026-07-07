'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { getAppUrl } from '../../lib/appUrl';

export default function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full min-w-0 border-b border-gray-200/80 bg-brand-cream/90 backdrop-blur-md">
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
                                unoptimized
                            />
                        </Link>
                    </div>

                    {/* Navigation - center */}
                    <nav className="hidden flex-none items-center gap-7 md:flex" aria-label="Primary">
                        <Link
                            href="/guides"
                            className={`text-sm font-medium transition-colors ${pathname.startsWith('/guides') ? 'text-brand-navy' : 'text-gray-600 hover:text-brand-navy'}`}
                        >
                            Guides
                        </Link>
                        <Link
                            href="/resources"
                            className={`text-sm font-medium transition-colors ${pathname === '/resources' ? 'text-brand-navy' : 'text-gray-600 hover:text-brand-navy'}`}
                        >
                            Resources
                        </Link>
                        <Link
                            href="/tools"
                            className={`text-sm font-medium transition-colors ${pathname.startsWith('/tools') ? 'text-brand-navy' : 'text-gray-600 hover:text-brand-navy'}`}
                        >
                            Tools
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
                    <div className="flex min-h-0 min-w-0 flex-1 basis-0 items-center justify-end gap-3">
                        <a
                            href={getAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden min-h-[40px] items-center justify-center rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-navy/90 md:inline-flex"
                        >
                            Start in app
                        </a>
                        <Link
                            href="/contact"
                            className="hidden min-h-[40px] items-center justify-center rounded-md bg-[#f7c74a] px-5 py-2 text-sm font-semibold text-brand-navy shadow-sm transition-colors hover:bg-[#e8b93d] md:inline-flex"
                        >
                            Reach Out
                        </Link>
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
                <div id="mobile-menu" className="md:hidden bg-brand-cream border-t border-gray-100 px-4 py-6 space-y-4">
                    <Link href="/guides" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-brand-navy">Guides</Link>
                    <Link href="/resources" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-brand-navy">Resources</Link>
                    <Link href="/tools" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-brand-navy">Tools</Link>
                    <Link href="/for-agents" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-brand-navy">For Agents</Link>
                    <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-brand-navy">About</Link>
                    <a
                        href={getAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="block w-full rounded-md bg-brand-navy py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-navy/90"
                    >
                        Start in app
                    </a>
                    <Link href="/contact" onClick={() => setMobileOpen(false)} className="block w-full rounded-md bg-[#f7c74a] py-3 text-center text-sm font-semibold text-brand-navy transition-colors hover:bg-[#e8b93d]">
                        Reach Out
                    </Link>
                </div>
            )}
        </header>
    );
}
