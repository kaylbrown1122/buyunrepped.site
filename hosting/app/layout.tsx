import './globals.css';
import { Inter } from 'next/font/google';
import { WaitlistProvider } from './components/WaitlistModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: {
    default: 'BuyUnrepped - Buy a Home in Tennessee Without a Buyer\'s Agent',
    template: '%s | BuyUnrepped',
  },
  description: 'BuyUnrepped is a licensed Tennessee brokerage providing non-representational flat-fee support for unrepresented buyers. Currently available in Middle Tennessee; contact us to confirm availability elsewhere.',
  keywords: [
    'buy home without agent Tennessee',
    'unrepresented buyer Tennessee',
    'buy home without a real estate agent TN',
    'flat fee home buying Tennessee',
    'Nashville home buyer no agent',
    'Tennessee buyer agent alternative',
    'save on home purchase Tennessee',
    'FSBO buyer Tennessee',
  ],
  authors: [{ name: 'Kayla Brown', url: 'https://www.buyunrepped.com/about' }],
  creator: 'BuyUnrepped',
  publisher: 'BuyUnrepped',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.buyunrepped.com',
    siteName: 'BuyUnrepped',
    title: 'BuyUnrepped - Buy a Home in Tennessee Without a Buyer\'s Agent',
    description: 'Licensed Tennessee brokerage providing non-representational flat-fee support for unrepresented buyers. Currently available in Middle Tennessee; contact us to confirm availability elsewhere.',
    images: [
      {
        url: 'https://www.buyunrepped.com/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'BuyUnrepped - Home Buying Built for the Buyer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuyUnrepped - Buy a Home in Tennessee Without a Buyer\'s Agent',
    description: 'Licensed Tennessee brokerage providing non-representational flat-fee support for unrepresented buyers. Currently available in Middle Tennessee.',
    images: ['https://www.buyunrepped.com/images/og-default.png'],
    creator: '@buyunrepped',
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BuyUnrepped',
  description: 'Non-representational flat-fee home-buying support for unrepresented buyers from a licensed Tennessee brokerage.',
  url: 'https://www.buyunrepped.com',
  logo: 'https://www.buyunrepped.com/images/logo.png',
  founder: {
    '@type': 'Person',
    name: 'Kayla Brown',
    jobTitle: 'Principal Broker',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nashville',
    addressRegion: 'TN',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Nashville' },
    { '@type': 'City', name: 'Franklin' },
    { '@type': 'City', name: 'Murfreesboro' },
  ],
  priceRange: '$995 - $3,490',
  serviceType: 'Real Estate Transaction Support',
  sameAs: [
    'https://www.instagram.com/buyunrepped',
    'https://www.tiktok.com/@buyunrepped',
    'https://x.com/buyunrepped',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:font-bold focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
