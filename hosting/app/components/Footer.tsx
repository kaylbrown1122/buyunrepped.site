'use client';

import Link from 'next/link';
import { Twitter, Instagram, Home } from 'lucide-react';

const companyLinks: [string, string][] = [
  ['About Us', '/about'],
  ['Contact', '/contact'],
  ['Resources', '/resources'],
  ['Playbook', '/playbook'],
  ['Tools', '/tools'],
  ['Agent Matchmaking', '/agent-match'],
  ['Vendor List', '/vendors'],
];

const socialClass =
  'flex size-8 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-sm text-gray-400">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 md:pt-10 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-6 lg:gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="rounded-lg bg-white/10 p-1.5">
                <Home className="size-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">BuyUnrepped</span>
            </Link>
            <p className="mt-2 max-w-sm text-pretty text-xs leading-relaxed text-gray-400">
              Licensed Tennessee brokerage providing non-representational support for unrepresented buyers. We do
              not act as your buyer&apos;s agent or communicate on your behalf, and remain subject to the duties
              Tennessee law requires for the services we provide.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <a
                href="https://www.instagram.com/buyunrepped"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={socialClass}
              >
                <Instagram className="size-3.5" />
              </a>
              <a
                href="https://www.tiktok.com/@buyunrepped"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className={socialClass}
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>
              <a
                href="https://x.com/buyunrepped"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className={socialClass}
              >
                <Twitter className="size-3.5" />
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-6 sm:gap-8 md:col-span-7 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-white">BuyUnrepped</p>
              <address className="mt-2 space-y-1.5 not-italic text-sm leading-relaxed text-gray-400">
                <p>TN Firm Lic. #267134 · Broker Lic. #339134</p>
                <p>
                  <a href="tel:6152083390" className="transition-colors hover:text-white">
                    615-208-3390
                  </a>
                </p>
                <p>2509 Cruzen St, Nashville, TN 37211</p>
                <p>
                  <a
                    href="mailto:info@buyunrepped.com"
                    className="transition-colors hover:text-white"
                  >
                    info@buyunrepped.com
                  </a>
                </p>
                <p className="flex items-center gap-1.5 pt-0.5 text-gray-400">
                  <Home className="size-3.5 shrink-0" aria-hidden /> Equal Housing Opportunity
                </p>
              </address>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">Company</p>
              <ul role="list" className="mt-2 space-y-1.5">
                {companyLinks.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-gray-400 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-500 sm:text-left">
            © {new Date().getFullYear()} BuyUnrepped · Tennessee · Firm license #267134
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-gray-500 transition-colors hover:text-gray-300">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-gray-500 transition-colors hover:text-gray-300">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
