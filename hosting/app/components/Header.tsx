'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="bg-black p-1.5 rounded-lg">
                            <Home className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-black font-sans tracking-tight">BuyUnrepped</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-10">
                        <Link
                            href="/"
                            className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wide transition-colors"
                        >
                            How it Works
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wide transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wide transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wide transition-colors"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-8">
                        <Link href="/signin" className="text-sm font-bold text-gray-900 hover:text-brand-blue transition-colors">
                            Log In
                        </Link>
                        <Link
                            href="/pricing"
                            className="px-6 py-3 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
