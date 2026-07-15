import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Tennessee Locations | Buy a Home Without a Buyer\'s Agent | BuyUnrepped',
  description: 'BuyUnrepped is licensed in Tennessee and currently offers early-access flat-fee support in Middle Tennessee. Contact us to confirm availability in other Tennessee markets.',
  openGraph: {
    title: 'Tennessee Locations | BuyUnrepped',
    description: 'Licensed Tennessee brokerage with early-access flat-fee support in Middle Tennessee. Contact us to confirm availability in other markets.',
    url: 'https://www.buyunrepped.com/locations',
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com/locations',
  },
};

const cities = [
  {
    name: 'Nashville',
    slug: 'nashville',
    county: 'Davidson County',
    medianPrice: '$530,000',
    savings: '$15,900',
    description: 'Tennessee\'s capital and one of the fastest-growing markets in the Southeast.',
  },
  {
    name: 'Franklin',
    slug: 'franklin',
    county: 'Williamson County',
    medianPrice: '$935,000',
    savings: '$28,050',
    description: 'One of Tennessee\'s most sought-after markets with strong schools and proximity to Nashville.',
  },
  {
    name: 'Murfreesboro',
    slug: 'murfreesboro',
    county: 'Rutherford County',
    medianPrice: '$450,000',
    savings: '$13,500',
    description: 'One of Tennessee\'s fastest-growing cities with active new construction and resale markets.',
  },
  {
    name: 'Knoxville',
    slug: 'knoxville',
    county: 'Knox County',
    medianPrice: '$315,000',
    savings: '$9,450',
    description: 'East Tennessee\'s largest market with outdoor lifestyle and accessible prices.',
  },
  {
    name: 'Chattanooga',
    slug: 'chattanooga',
    county: 'Hamilton County',
    medianPrice: '$310,000',
    savings: '$9,300',
    description: 'A dynamic Southeast Tennessee market with growing inventory and strong demand.',
  },
  {
    name: 'Clarksville',
    slug: 'clarksville',
    county: 'Montgomery County',
    medianPrice: '$314,000',
    savings: '$9,420',
    description: 'Northwest Tennessee\'s largest city with consistent demand driven by Fort Campbell.',
  },
  {
    name: 'Memphis',
    slug: 'memphis',
    county: 'Shelby County',
    medianPrice: '$230,000',
    savings: '$6,900',
    description: 'West Tennessee\'s largest market with the most accessible prices among major TN metros.',
  },
  {
    name: 'Johnson City',
    slug: 'johnson-city',
    county: 'Washington County',
    medianPrice: '$295,000',
    savings: '$8,850',
    description: 'Anchor of the Northeast Tennessee Tri-Cities region, with a stable market and strong affordability.',
  },
  {
    name: 'Jackson',
    slug: 'jackson',
    county: 'Madison County',
    medianPrice: '$245,000',
    savings: '$7,350',
    description: 'West Tennessee\'s regional hub between Memphis and Nashville, with steady demand and accessible prices.',
  },
];

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      <section className="pt-20 pb-16 text-center max-w-3xl mx-auto px-4">
        <SectionBadge>Locations</SectionBadge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4 leading-tight">
          Buying a Home in Tennessee Without a Buyer&apos;s Agent
        </h1>
        <p className="text-xl text-gray-500">
          BuyUnrepped is licensed in Tennessee and currently offers early-access flat-fee support in Middle
          Tennessee. Select a market for local educational resources, or contact us to confirm availability.
        </p>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-brand-blue/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold">{city.name}</h2>
                    <p className="text-sm text-gray-400">{city.county}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                </div>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{city.description}</p>
                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">Median Price</p>
                    <p className="font-bold text-brand-navy">{city.medianPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">3% illustration</p>
                    <p className="font-bold text-brand-blue">{city.savings}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don&apos;t See Your City?</h2>
          <p className="text-gray-500 mb-8">
            If your market isn&apos;t listed, contact us to confirm whether BuyUnrepped&apos;s current services are
            available there.
          </p>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-4 rounded-full font-bold hover:bg-brand-blue transition-colors"
          >
            Schedule a Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
