import './globals.css';
import { Inter } from 'next/font/google';
import { WaitlistProvider } from './components/WaitlistModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: {
    default: 'BuyUnrepped - Buy a Home in Tennessee Without a Buyer\'s Agent',
    template: '%s | BuyUnrepped',
  },
  description: 'BuyUnrepped helps Tennessee home buyers purchase homes without a buyer\'s agent. Save thousands with flat-fee support from a licensed Nashville broker. Serving Nashville, Franklin, Murfreesboro, Knoxville, Chattanooga, Clarksville, and Memphis.',
  keywords: [
    'buy home without agent Tennessee',
    'unrepresented buyer Tennessee',
    'buy home without realtor TN',
    'flat fee home buying Tennessee',
    'Nashville home buyer no agent',
    'Tennessee buyer agent alternative',
    'save on home purchase Tennessee',
    'FSBO buyer Tennessee',
  ],
  authors: [{ name: 'Kayla Brown', url: 'https://buyunrepped.com/about' }],
  creator: 'BuyUnrepped',
  publisher: 'BuyUnrepped',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buyunrepped.com',
    siteName: 'BuyUnrepped',
    title: 'BuyUnrepped - Buy a Home in Tennessee Without a Buyer\'s Agent',
    description: 'Tennessee home buyers: skip the buyer\'s agent and save thousands. Flat-fee support from a licensed Nashville broker. Professional forms, offer strategy, and transaction coordination.',
    images: [
      {
        url: 'https://buyunrepped.com/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'BuyUnrepped - Home Buying Built for the Buyer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuyUnrepped - Buy a Home in Tennessee Without a Buyer\'s Agent',
    description: 'Tennessee home buyers: skip the buyer\'s agent and save thousands. Flat-fee support from a licensed Nashville broker.',
    images: ['https://buyunrepped.com/images/og-default.png'],
    creator: '@buyunrepped',
  },
  alternates: {
    canonical: 'https://buyunrepped.com',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BuyUnrepped',
  description: 'Flat-fee home buying support for unrepresented buyers in Tennessee. Licensed broker assistance without traditional buyer agent commissions.',
  url: 'https://buyunrepped.com',
  logo: 'https://buyunrepped.com/images/logo.png',
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
    { '@type': 'State', name: 'Tennessee' },
    { '@type': 'City', name: 'Nashville' },
    { '@type': 'City', name: 'Franklin' },
    { '@type': 'City', name: 'Murfreesboro' },
    { '@type': 'City', name: 'Knoxville' },
    { '@type': 'City', name: 'Chattanooga' },
    { '@type': 'City', name: 'Clarksville' },
    { '@type': 'City', name: 'Memphis' },
  ],
  priceRange: '$995 - $3,595',
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
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
