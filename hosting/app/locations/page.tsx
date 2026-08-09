import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import LocationContactInline from '../components/LocationContactInline';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { savings as illustrativeNetDifference } from '../../lib/fees';

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
    medianPriceNum: 530_000,
    description: 'Tennessee\'s capital and one of the fastest-growing markets in the Southeast.',
  },
  {
    name: 'Franklin',
    slug: 'franklin',
    county: 'Williamson County',
    medianPriceNum: 935_000,
    description: 'One of Tennessee\'s most sought-after markets with strong schools and proximity to Nashville.',
  },
  {
    name: 'Murfreesboro',
    slug: 'murfreesboro',
    county: 'Rutherford County',
    medianPriceNum: 450_000,
    description: 'One of Tennessee\'s fastest-growing cities with active new construction and resale markets.',
  },
  {
    name: 'Knoxville',
    slug: 'knoxville',
    county: 'Knox County',
    medianPriceNum: 315_000,
    description: 'East Tennessee\'s largest market with outdoor lifestyle and accessible prices.',
  },
  {
    name: 'Chattanooga',
    slug: 'chattanooga',
    county: 'Hamilton County',
    medianPriceNum: 310_000,
    description: 'A dynamic Southeast Tennessee market with growing inventory and strong demand.',
  },
  {
    name: 'Clarksville',
    slug: 'clarksville',
    county: 'Montgomery County',
    medianPriceNum: 314_000,
    description: 'Northwest Tennessee\'s largest city with consistent demand driven by Fort Campbell.',
  },
  {
    name: 'Memphis',
    slug: 'memphis',
    county: 'Shelby County',
    medianPriceNum: 230_000,
    description: 'West Tennessee\'s largest market with the most accessible prices among major TN metros.',
  },
  {
    name: 'Johnson City',
    slug: 'johnson-city',
    county: 'Washington County',
    medianPriceNum: 295_000,
    description: 'Anchor of the Northeast Tennessee Tri-Cities region, with a stable market and strong affordability.',
  },
  {
    name: 'Jackson',
    slug: 'jackson',
    county: 'Madison County',
    medianPriceNum: 245_000,
    description: 'West Tennessee\'s regional hub between Memphis and Nashville, with steady demand and accessible prices.',
  },
] as const;

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
            {cities.map((city) => {
              const medianPrice = `$${city.medianPriceNum.toLocaleString()}`;
              const netDifference = `$${illustrativeNetDifference(city.medianPriceNum).toLocaleString()}`;
              return (
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
                    <p className="font-bold text-brand-navy">{medianPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Illustrative net diff.</p>
                    <p className="font-bold text-brand-blue">{netDifference}</p>
                  </div>
                </div>
              </Link>
            );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-2xl px-4">
          <LocationContactInline
            formId="website_locations"
            headline="Don't see your city?"
            description="Tell us your city, state, and what you're looking for. We'll reply by email — no open scheduling."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
