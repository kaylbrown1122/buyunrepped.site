import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SectionBadge from '../../components/SectionBadge';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = 'https://buyunrepped.com';

interface CityData {
  name: string;
  slug: string;
  county: string;
  medianPrice: number;
  marketDescription: string;
  localContext: string;
  savingsNote: string;
  neighborhoods: string[];
  nearbyAreas: string[];
}

const cities: Record<string, CityData> = {
  nashville: {
    name: 'Nashville',
    slug: 'nashville',
    county: 'Davidson County',
    medianPrice: 530000,
    marketDescription: 'Nashville is one of the fastest-growing real estate markets in the Southeast. With median home prices around $530,000 in Davidson County, a 3% buyer\'s agent commission can cost you over $15,000.',
    localContext: 'The Nashville metro area continues to attract buyers from across the country. In a competitive market with low inventory and high demand, keeping your purchase costs down gives you more negotiating flexibility.',
    savingsNote: 'On a $530,000 Nashville home, a traditional 3% buyer\'s agent commission adds up to $15,900. With BuyUnrepped, you pay a flat fee starting at $995 — keeping more money in your pocket or giving you leverage to negotiate a better price.',
    neighborhoods: ['Green Hills', '12 South', 'East Nashville', 'Germantown', 'The Nations', 'Sylvan Park', 'Hillsboro Village', 'Donelson'],
    nearbyAreas: ['Brentwood', 'Franklin', 'Hendersonville', 'Mount Juliet', 'Antioch'],
  },
  franklin: {
    name: 'Franklin',
    slug: 'franklin',
    county: 'Williamson County',
    medianPrice: 935000,
    marketDescription: 'Franklin is one of Tennessee\'s most sought-after markets, with median home prices near $935,000. Williamson County consistently ranks among the wealthiest counties in the Southeast.',
    localContext: 'Franklin\'s strong schools, amenities, and proximity to Nashville make it one of the highest-demand submarkets in Tennessee. With home prices well above the state average, the dollar impact of skipping a buyer\'s agent commission is significant.',
    savingsNote: 'On a $935,000 Franklin home, a 3% buyer\'s agent commission is nearly $28,000. BuyUnrepped\'s flat-fee model means that savings can come back to you as a price reduction or closing credit.',
    neighborhoods: ['Westhaven', 'Downtown Franklin', 'Fieldstone Farms', 'Berry Farms', 'Ladd Park', 'Leipers Fork'],
    nearbyAreas: ['Brentwood', 'Spring Hill', 'Nolensville', 'Thompson\'s Station', 'Nashville'],
  },
  murfreesboro: {
    name: 'Murfreesboro',
    slug: 'murfreesboro',
    county: 'Rutherford County',
    medianPrice: 450000,
    marketDescription: 'Murfreesboro is one of the fastest-growing cities in Tennessee, with a growing inventory of new construction and resale homes. Median prices around $450,000 make it accessible relative to Nashville while still carrying significant commission costs.',
    localContext: 'As MTSU\'s home and a major employment hub, Murfreesboro attracts a wide range of buyers. Rutherford County\'s growth means new listings are entering the market regularly — giving prepared, unrepresented buyers real opportunity.',
    savingsNote: 'On a $450,000 Murfreesboro home, skipping a 3% buyer\'s agent commission saves you $13,500. With BuyUnrepped\'s flat fee, most of that savings stays with you.',
    neighborhoods: ['Blackman', 'Cason Lane', 'Northwest Murfreesboro', 'Midland', 'Downtown Murfreesboro'],
    nearbyAreas: ['Smyrna', 'La Vergne', 'Rockvale', 'Christiana', 'Nashville'],
  },
  knoxville: {
    name: 'Knoxville',
    slug: 'knoxville',
    county: 'Knox County',
    medianPrice: 315000,
    marketDescription: 'Knoxville offers some of the most accessible home prices among Tennessee\'s major metros, with median sale prices around $315,000. East Tennessee\'s outdoor lifestyle and University of Tennessee presence make it a strong market for long-term value.',
    localContext: 'Knox County\'s diverse inventory — from historic Sequoyah Hills properties to new construction in the suburbs — gives buyers real options. Knoxville\'s market has seen growing demand from out-of-state buyers priced out of larger metros.',
    savingsNote: 'On a $315,000 Knoxville home, a 3% buyer\'s agent commission totals $9,450. BuyUnrepped lets you use that savings to strengthen your offer or reduce your out-of-pocket costs.',
    neighborhoods: ['Sequoyah Hills', 'Old North Knoxville', 'Bearden', 'West Knoxville', 'Fountain City', 'South Knoxville'],
    nearbyAreas: ['Farragut', 'Maryville', 'Oak Ridge', 'Powell', 'Lenoir City'],
  },
  chattanooga: {
    name: 'Chattanooga',
    slug: 'chattanooga',
    county: 'Hamilton County',
    medianPrice: 310000,
    marketDescription: 'Chattanooga has emerged as one of Tennessee\'s most dynamic real estate markets, with significant inventory growth and median home prices near $310,000. The city\'s riverfront development, outdoor recreation, and growing tech sector have driven sustained buyer demand.',
    localContext: 'Hamilton County\'s inventory has expanded significantly, meaning buyers have more choices. Chattanooga\'s mix of urban neighborhoods and surrounding mountain communities creates a diverse market where being an informed, prepared buyer is a real advantage.',
    savingsNote: 'On a $310,000 Chattanooga home, a 3% buyer\'s agent commission is $9,300. BuyUnrepped\'s flat fee lets you bring that money to the table as a stronger offer.',
    neighborhoods: ['North Shore', 'St. Elmo', 'Northgate', 'East Brainerd', 'Red Bank', 'Hixson', 'Signal Mountain'],
    nearbyAreas: ['Ooltewah', 'East Ridge', 'Soddy-Daisy', 'Cleveland', 'Ringgold (GA)'],
  },
  clarksville: {
    name: 'Clarksville',
    slug: 'clarksville',
    county: 'Montgomery County',
    medianPrice: 314000,
    marketDescription: 'Clarksville is Northwest Tennessee\'s largest city and one of the state\'s most active real estate markets. Proximity to Fort Campbell drives consistent demand, with median home prices near $314,000 and a balanced 4-5 month supply of inventory.',
    localContext: 'Montgomery County\'s market is shaped in part by military buyers and relocating families. The combination of consistent demand and reasonable inventory means prepared, unrepresented buyers can move decisively without overpaying for representation.',
    savingsNote: 'On a $314,000 Clarksville home, a 3% buyer\'s agent commission is $9,420. BuyUnrepped\'s flat fee gets you professional support while keeping most of that savings in your hands.',
    neighborhoods: ['Downtown Clarksville', 'St. Bethlehem', 'Sango', 'Ringgold', 'Northeast Clarksville'],
    nearbyAreas: ['Oak Grove (KY)', 'Hopkinsville (KY)', 'Springfield', 'Ashland City', 'Nashville'],
  },
  memphis: {
    name: 'Memphis',
    slug: 'memphis',
    county: 'Shelby County',
    medianPrice: 230000,
    marketDescription: 'Memphis is Tennessee\'s most affordable major market, with median home prices around $230,000. Shelby County\'s active market — often with homes going under contract in 25 to 40 days — rewards buyers who know what they\'re doing.',
    localContext: 'West Tennessee\'s largest city offers significant value compared to other Tennessee markets. Memphis\'s diverse neighborhoods, from Midtown bungalows to East Memphis suburbs, give buyers real choices at accessible price points.',
    savingsNote: 'On a $230,000 Memphis home, a 3% buyer\'s agent commission is $6,900. With BuyUnrepped\'s flat fee starting at $995, you keep the bulk of that savings while still having expert support.',
    neighborhoods: ['Midtown', 'East Memphis', 'Cooper-Young', 'Germantown', 'Collierville', 'Bartlett', 'Cordova'],
    nearbyAreas: ['Germantown', 'Collierville', 'Bartlett', 'Southaven (MS)', 'Oakland'],
  },
  'johnson-city': {
    name: 'Johnson City',
    slug: 'johnson-city',
    county: 'Washington County',
    medianPrice: 295000,
    marketDescription: 'Johnson City anchors the Tri-Cities region of Northeast Tennessee along with Kingsport and Bristol. With median home prices near $295,000 and a steady market driven by ETSU and Ballad Health, it\'s one of Tennessee\'s most stable markets for buyers.',
    localContext: 'Washington County\'s mix of established neighborhoods and newer suburban development gives buyers a wide range of options. The Tri-Cities area has seen steady in-migration from buyers seeking affordability and access to the Appalachian outdoors.',
    savingsNote: 'On a $295,000 Johnson City home, a 3% buyer\'s agent commission totals $8,850. BuyUnrepped\'s flat fee means most of that savings goes back into your pocket or your offer.',
    neighborhoods: ['Downtown Johnson City', 'Boones Creek', 'Gray', 'Elizabethton', 'Jonesborough', 'Colonial Heights'],
    nearbyAreas: ['Kingsport', 'Bristol', 'Elizabethton', 'Jonesborough', 'Greeneville'],
  },
  jackson: {
    name: 'Jackson',
    slug: 'jackson',
    county: 'Madison County',
    medianPrice: 245000,
    marketDescription: 'Jackson is West Tennessee\'s second-largest city and an important regional hub between Memphis and Nashville. With median home prices around $245,000, it offers affordability alongside a growing local economy anchored by healthcare and manufacturing.',
    localContext: 'Madison County\'s market is characterized by steady demand and reasonable inventory. Jackson buyers benefit from competitive pricing relative to other Tennessee metros, and the flat-commission savings add up quickly even at lower price points.',
    savingsNote: 'On a $245,000 Jackson home, a 3% buyer\'s agent commission is $7,350. With BuyUnrepped\'s flat fee starting at $995, you keep the majority of those savings.',
    neighborhoods: ['North Jackson', 'South Jackson', 'Midtown Jackson', 'Downtown Jackson', 'Airways', 'Old Hickory'],
    nearbyAreas: ['Humboldt', 'Milan', 'Medina', 'Henderson', 'Lexington'],
  },
};

export function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }));
}

export function generateMetadata({ params }: { params: { city: string } }) {
  const city = cities[params.city];
  if (!city) return {};

  const savings = Math.round(city.medianPrice * 0.03);
  const formattedPrice = city.medianPrice.toLocaleString();
  const formattedSavings = savings.toLocaleString();

  return {
    title: `Buy a Home in ${city.name}, TN Without a Buyer's Agent | BuyUnrepped`,
    description: `${city.name} home buyers: purchase without a buyer's agent and save up to $${formattedSavings} on a $${formattedPrice} home. Flat-fee support from a licensed Tennessee broker. Professional forms, offer strategy, and transaction coordination.`,
    keywords: [
      `buy home without agent ${city.name} TN`,
      `unrepresented buyer ${city.name} Tennessee`,
      `home buyer no realtor ${city.name}`,
      `flat fee home buying ${city.name}`,
      `${city.name} Tennessee real estate without agent`,
      `buy house ${city.name} TN`,
      `${city.county} home buyer`,
    ],
    openGraph: {
      title: `Buy a Home in ${city.name}, TN Without a Buyer's Agent`,
      description: `Save up to $${formattedSavings} when buying a home in ${city.name}. Flat-fee support from a licensed TN broker — no buyer's agent commission required.`,
      url: `${BASE_URL}/locations/${city.slug}`,
    },
    alternates: {
      canonical: `${BASE_URL}/locations/${city.slug}`,
    },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = cities[params.city];
  if (!city) notFound();

  const savings = Math.round(city.medianPrice * 0.03);
  const formattedPrice = city.medianPrice.toLocaleString();
  const formattedSavings = savings.toLocaleString();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `BuyUnrepped - ${city.name}, Tennessee`,
    description: `Flat-fee home buying support for unrepresented buyers in ${city.name}, TN. Licensed broker assistance without traditional buyer agent commissions.`,
    url: `${BASE_URL}/locations/${city.slug}`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Tennessee',
      },
    },
    priceRange: '$995 - $3,595',
    serviceType: 'Real Estate Transaction Support',
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-16 text-center max-w-3xl mx-auto px-4">
        <SectionBadge>{city.name}, TN</SectionBadge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4 leading-tight">
          Buy a Home in {city.name} Without a Buyer&apos;s Agent
        </h1>
        <p className="text-xl text-gray-500 mb-8">
          Save up to <strong className="text-brand-blue">${formattedSavings}</strong> on a ${formattedPrice} {city.name} home. Flat-fee support from a licensed Tennessee broker.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white px-8 py-4 rounded-full font-bold hover:bg-brand-blue transition-colors"
          >
            Schedule a Free Call <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 border-2 border-brand-navy text-brand-navy px-8 py-4 rounded-full font-bold hover:bg-brand-navy hover:text-white transition-colors"
          >
            See Pricing
          </Link>
        </div>
      </section>

      {/* Market Context */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionBadge>The {city.name} Market</SectionBadge>
          <h2 className="text-4xl font-bold mt-4 mb-6">What Buyers Need to Know in {city.name}</h2>
          <p className="text-lg text-gray-500 mb-6 leading-relaxed">{city.marketDescription}</p>
          <p className="text-lg text-gray-500 leading-relaxed">{city.localContext}</p>
        </div>
      </section>

      {/* Savings Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-brand-navy text-white rounded-3xl p-10 md:p-14">
            <SectionBadge className="bg-white/10 text-white border-white/20">Your Savings</SectionBadge>
            <h2 className="text-4xl font-bold mt-4 mb-6">How Much Can You Save in {city.name}?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">{city.savingsNote}</p>
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-2xl p-6">
                <p className="text-sm text-gray-400 mb-1">Median Home Price</p>
                <p className="text-3xl font-bold">${formattedPrice}</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <p className="text-sm text-gray-400 mb-1">Traditional 3% Commission</p>
                <p className="text-3xl font-bold text-red-400">${formattedSavings}</p>
              </div>
              <div className="bg-brand-blue rounded-2xl p-6">
                <p className="text-sm text-blue-100 mb-1">BuyUnrepped Flat Fee</p>
                <p className="text-3xl font-bold">from $995</p>
              </div>
            </div>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 bg-white text-brand-navy px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionBadge>How It Works</SectionBadge>
            <h2 className="text-4xl font-bold mt-4">Buy Your {city.name} Home in 3 Steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Schedule a Free Call',
                description: 'Talk through your home search with a licensed Tennessee broker. We\'ll explain the process and answer your questions.',
              },
              {
                step: '2',
                title: 'Find Your Home',
                description: `Search ${city.name} listings on Zillow, Realtor.com, or directly through listing agents. You control your search.`,
              },
              {
                step: '3',
                title: 'Submit a Professional Offer',
                description: 'We provide TREC-approved Tennessee forms, offer strategy, and full transaction support through closing.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-blue font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionBadge>What&apos;s Included</SectionBadge>
            <h2 className="text-4xl font-bold mt-4">Professional Support for {city.name} Buyers</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'TREC-approved Tennessee purchase agreement',
              'Offer strategy and market data',
              'Licensed REALTOR® on-call support',
              'Transaction coordination from contract to close',
              'Deadline tracking and reminders',
              'Inspection and appraisal guidance',
              'Closing coordination',
              'Flat fee — same price regardless of home cost',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-brand-blue" />
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionBadge>Areas We Serve</SectionBadge>
          <h2 className="text-4xl font-bold mt-4 mb-6">
            Serving {city.name} and Surrounding Areas
          </h2>
          <p className="text-gray-500 mb-8">
            BuyUnrepped helps buyers in {city.name} neighborhoods and the broader {city.county} market, including:
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {city.neighborhoods.map((n) => (
              <span key={n} className="px-4 py-2 bg-brand-cream border border-gray-200 rounded-full text-sm font-medium text-brand-navy">
                {n}
              </span>
            ))}
          </div>
          <p className="text-gray-500 mb-4 font-medium">Also serving nearby areas:</p>
          <div className="flex flex-wrap gap-3">
            {city.nearbyAreas.map((a) => (
              <span key={a} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-4xl font-bold mt-4">Common Questions from {city.name} Buyers</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                question: `Is it legal to buy a home in ${city.name} without a buyer's agent?`,
                answer: `Absolutely. Tennessee law does not require you to have a buyer's agent. Many ${city.name} buyers successfully purchase homes without representation. BuyUnrepped gives you the professional forms and expert guidance you need to do it right.`,
              },
              {
                question: `How do I submit an offer without an agent in ${city.name}?`,
                answer: `BuyUnrepped provides Tennessee TREC-approved purchase agreements and offer strategy guidance. We walk you through the terms, help you understand what's standard in the ${city.name} market, and support you through the entire transaction.`,
              },
              {
                question: 'Will the seller or listing agent treat me differently?',
                answer: `With BuyUnrepped, you\'re not truly "unrepresented" — you have a licensed Tennessee broker supporting your transaction. Our TREC-approved forms signal professionalism to listing agents, and our support keeps the deal on track from contract to close.`,
              },
              {
                question: 'How much does BuyUnrepped cost?',
                answer: `Our flat fee starts at $995 for offer support and goes up to $3,595 for full transaction coordination. The fee is the same regardless of the home\'s price — whether you\'re buying a $300,000 home or a $1 million home in ${city.name}.`,
              },
            ].map((faq, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-blue font-bold text-sm">?</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <SectionBadge>Get Started</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Ready to Buy in {city.name}?
          </h2>
          <p className="text-xl text-gray-500 mb-8">
            Schedule a free call with a licensed Tennessee broker. No commitment required.
          </p>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 bg-brand-navy text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-blue transition-colors"
          >
            Schedule a Free Call <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            Serving {city.name} and all of Tennessee
          </p>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">BuyUnrepped Across Tennessee</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.values(cities)
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/locations/${c.slug}`}
                  className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-brand-navy hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
