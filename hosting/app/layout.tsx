import './globals.css';
import { Inter } from 'next/font/google';
import { WaitlistProvider } from './components/WaitlistModal';
import BrokerageDisclosureBar from './components/BrokerageDisclosureBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL('https://www.buyunrepped.com'),
  title: {
    default: 'BuyUnrepped - Buy a Home in Tennessee Without a Buyer\'s Agent',
    template: '%s | BuyUnrepped',
  },
  description:
    'Flat-fee buyer support in Nashville TN for unrepresented buyers. Already toured a home and need an offer without an agent? Recommended Offer + Transaction Bundle: $3,490 Standard. Franklin, Murfreesboro, Brentwood, Clarksville, Mt Juliet, Hendersonville, Lebanon, Nolensville, Smyrna, Gallatin.',
  keywords: [
    'flat fee buyers agent Nashville TN',
    'flat fee buyer support Nashville TN',
    'flat fee alternative to buyer agent Nashville TN',
    'unrepresented buyers Tennessee',
    'buy home without agent Tennessee',
    'offer on house already toured Tennessee',
    'need offer without agent Nashville',
    'flat fee home buying Tennessee',
    'Nashville home buyer no agent',
    'Franklin TN unrepresented buyer',
    'Murfreesboro flat fee offer',
    'Brentwood buy without agent',
    'Clarksville unrepresented buyer',
    'Mt Juliet home offer help',
    'Hendersonville flat fee buyer',
    'Lebanon TN offer package',
    'Nolensville unrepresented buyer',
    'Smyrna flat fee home buying',
    'Gallatin buyer no agent',
    'Tennessee buyer agent alternative',
    'save on home purchase Tennessee',
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
    description:
      'Flat-fee support for unrepresented buyers in Middle Tennessee. Tour a home, need an offer, don\'t want a traditional buyer\'s agent — BuyUnrepped prepares your Tennessee offer and coordinates through closing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuyUnrepped - Buy a Home in Tennessee Without a Buyer\'s Agent',
    description:
      'Flat-fee support for unrepresented buyers in Nashville TN and Middle Tennessee. Already toured a home? Need an offer without an agent.',
    creator: '@buyunrepped',
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BuyUnrepped, Inc.',
  legalName: 'BuyUnrepped, Inc.',
  description:
    'Non-representational flat-fee home-buying support for unrepresented buyers in Nashville, Franklin, Murfreesboro, Brentwood, Clarksville, Mt Juliet, Hendersonville, Lebanon, Nolensville, Smyrna, and Gallatin, TN.',
  url: 'https://www.buyunrepped.com',
  logo: 'https://www.buyunrepped.com/images/logo.png',
  telephone: '+1-615-208-3390',
  founder: {
    '@type': 'Person',
    name: 'Kayla Brown',
    jobTitle: 'Principal Broker',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2509 Cruzen St',
    addressLocality: 'Nashville',
    addressRegion: 'TN',
    postalCode: '37211',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Nashville' },
    { '@type': 'City', name: 'Franklin' },
    { '@type': 'City', name: 'Murfreesboro' },
    { '@type': 'City', name: 'Mt Juliet' },
    { '@type': 'City', name: 'Hendersonville' },
    { '@type': 'City', name: 'Lebanon' },
    { '@type': 'City', name: 'Brentwood' },
    { '@type': 'City', name: 'Nolensville' },
    { '@type': 'City', name: 'Smyrna' },
    { '@type': 'City', name: 'Gallatin' },
    { '@type': 'City', name: 'Clarksville' },
  ],
  priceRange: '$650 - $3,990',
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
          <BrokerageDisclosureBar />
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
