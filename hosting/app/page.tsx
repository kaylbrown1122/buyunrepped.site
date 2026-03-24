'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import SectionBadge from './components/SectionBadge';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronDown, Check, FileText, Clock, MessageSquare, FileCheck, BarChart3, CalendarCheck } from 'lucide-react';
import { useWaitlist } from './components/WaitlistModal';

const faqs = [
  {
    question: "How much do I actually save?",
    answer: "When a seller lists their home, they may agree to pay a commission that includes compensation for a buyer's agent. If you buy without an agent, that buyer's agent commission doesn't need to be paid. Smart buyers request this as a credit at closing or a reduction in the purchase price.",
  },
  {
    question: "Is this legal?",
    answer: "Absolutely. You are never required by law to have a real estate agent. We provide the standard forms and guidance you need to execute the contract legally.",
  },
  {
    question: "What if things get complicated?",
    answer: "Our Full Strategy Pass includes access to our staffed licensed REALTORs who are on call to answer specific questions and help you navigate tricky inspection or appraisal issues.",
  },
  {
    question: "What documents do I need to buy a home without an agent?",
    answer: "You'll need a purchase agreement, disclosure forms, and closing documents. Our platform generates all required Tennessee-specific legal documents for you, so you never have to worry about missing paperwork.",
  },
  {
    question: "How does BuyUnrepped make money?",
    answer: "We charge a simple flat fee for our platform. No hidden commissions, no percentage-based fees. You keep the savings.",
  },
];

export default function LandingPage() {
  const { openModal } = useWaitlist();
  const [sliderValue, setSliderValue] = useState(750000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroEmail, setHeroEmail] = useState('');
  const [heroStatus, setHeroStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const traditionalFee = sliderValue * 0.03;
  const buyUnreppedFee = 3595;
  const savings = traditionalFee - buyUnreppedFee;

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* A. Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div className="z-10">
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-bold leading-[1.08] mb-6 tracking-tight">
                Buying a home without an agent doesn't mean <span className="text-brand-blue">buying alone.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-xl leading-relaxed">
                BuyUnrepped provides docs and professional insight to confident buyers without representation. We&apos;re not your agent, we&apos;re your advantage!
              </p>

              {heroStatus === 'success' ? (
                <div className="flex items-center gap-3 px-5 py-4 bg-green-50 border border-green-200 rounded-full max-w-xl">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm font-medium text-green-700">You&apos;re on the list! We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!heroEmail) return;
                    setHeroStatus('loading');
                    try {
                      const res = await fetch('/api/waitlist', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: heroEmail }),
                      });
                      if (res.ok) {
                        setHeroStatus('success');
                        setHeroEmail('');
                      } else {
                        setHeroStatus('error');
                      }
                    } catch {
                      setHeroStatus('error');
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-xl"
                >
                  <input
                    type="email"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-5 py-4 rounded-full border border-gray-200 bg-white text-base outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={heroStatus === 'loading'}
                    className="px-8 py-4 bg-brand-blue text-white text-base font-bold rounded-full hover:bg-cyan-700 transition-all shadow-lg hover:shadow-xl text-center disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {heroStatus === 'loading' ? 'Joining...' : 'Join Early Access'}
                  </button>
                </form>
              )}
              {heroStatus === 'error' && (
                <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
              )}
              <div className="mt-4">
                <Link
                  href="#how-it-works"
                  className="text-brand-blue font-bold text-sm hover:underline"
                >
                  Learn how it works &rarr;
                </Link>
              </div>
            </div>

            {/* Right - Purchase offer mockup card */}
            <div className="relative z-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                  {/* Suggestion Card */}
                  <div className="col-span-12 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1">Purchase Offer</h3>
                        <p className="text-gray-400 text-xs">123 Berry St, Nashville TN</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded tracking-wider">Drafting</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Offer Price</p>
                        <p className="font-bold text-sm">$750,000</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-[10px] text-green-600 uppercase font-bold mb-1">Savings</p>
                        <p className="font-bold text-green-600 text-sm">+$21,500</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Closing</p>
                        <p className="font-bold text-sm">May 5</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. Stats Bar */}
      <section className="py-12 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-navy">$18k+</p>
              <p className="text-sm text-gray-500 mt-1">Average Buyer Savings</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-navy">100%</p>
              <p className="text-sm text-gray-500 mt-1">State Compliance</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-navy">8 Steps</p>
              <p className="text-sm text-gray-500 mt-1">Structured Purchase Plan</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-navy">24/7</p>
              <p className="text-sm text-gray-500 mt-1">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* A2. Who This Is For */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — intro text */}
            <div>
              <SectionBadge>Who This Is For</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                Full Service Representation isn&apos;t for Everyone&hellip; That&apos;s where we come in!
              </h2>
              <div className="text-lg text-gray-500 space-y-4 leading-relaxed">
                <p>You may not need or want a Realtor to speak to the listing agent on your behalf, but everyone could use local experienced support behind the scenes. We do just that. You find the home, schedule a showing with the listing agent, and we help you formulate a tailored &mdash; Realtor friendly &mdash; offer and email template that you can submit. Once under contract, we map out all of your deadlines, help you coordinate inspections and keep your team in contact so you don&apos;t miss a beat.</p>
                <p>Many consumers would be equally, if not more, successful in their home purchase if they just had someone to coordinate their deadlines and help them with their offer and transaction process&hellip; It&apos;s like having an agent in your pocket!</p>
                <p>Partnering with us benefits everyone involved in a transaction by reducing confusion, missed deadlines, and unnecessary friction.</p>
              </div>
            </div>

            {/* Right — Dashboard overview image */}
            <div className="relative z-0">
              <Image
                src="/images/dashboard-overview.png"
                alt="BuyUnrepped dashboard overview showing closing preparation, timeline, and tasks"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl border border-gray-100"
                unoptimized
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 bg-gray-100 rounded-xl px-6 py-4 border border-gray-200">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="font-bold text-gray-500">Disclaimer:</span> BuyUnrepped is a licensed real estate brokerage. We do not act as the buyer&apos;s agent or enter into a buyer agency relationship. Instead, we provide structured, non-representational support for buyers who choose to proceed without full-service buyer representation, using state-standardized REALTOR® forms and established transaction practices to promote clarity, compliance, and predictability for all parties.
            </p>
          </div>
        </div>
      </section>

      {/* A3. What BuyUnrepped Provides */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge>What We Provide</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              What BuyUnrepped provides
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Clear timelines',
                description: 'Defined milestones and next steps from contract to closing.',
              },
              {
                title: 'Strategic consultations',
                description: 'Focused guidance on pricing, offer structure, and negotiation positioning.',
              },
              {
                title: 'Deadline management',
                description: 'Structured tracking of critical contractual dates so nothing slips.',
              },
              {
                title: 'State-compliant documentation',
                description: 'Preparation and execution of standardized state REALTOR® forms listing agents expect.',
              },
              {
                title: 'Licensed oversight',
                description: 'On-demand access to real estate professionals when strategic input matters.',
              },
              {
                title: 'Transaction-ready tools',
                description: 'Practical resources built for real residential purchases, not theory.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. How It Works - 3-Step Process */}
      <section id="how-it-works" className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge>How It Works</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            [
              {
                step: '01',
                title: 'Decide your path',
                description: 'Buyers choose whether a full-service agent makes sense or if an independent approach makes the most sense for their situation.',
              },
              {
                step: '02',
                title: 'Use BuyUnrepped for support',
                description: 'If moving forward unrepresented, BuyUnrepped provides structure, tools, and access to guidance to help buyers navigate each phase confidently.',
              },
              {
                step: '03',
                title: 'Close with clarity',
                description: 'Transactions stay organized, informed, and predictable for all parties involved.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 relative overflow-hidden hover:shadow-lg transition-shadow">
                <span className="absolute top-4 right-4 text-8xl font-bold text-gray-100 leading-none select-none">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D2. What We Are Not */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge>What We Are Not</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              What BuyUnrepped is not
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Transparency matters. Here is what you should know about what we do and do not offer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto mb-12">
            {[
              {
                title: 'Not anti-agent',
                description: 'We respect the value that experienced agents bring to real estate. BuyUnrepped exists alongside the traditional model, not in opposition to it. Listing agents are key partners in every transaction we support.',
              },
              {
                title: 'Not a discount brokerage',
                description: 'Discount brokerages lower commission by lowering service. BuyUnrepped is different. We are built by top-tier agents who are accustomed to white-glove execution. The structure is streamlined, but the expertise is not discounted. You\u2019re not paying less for less. You\u2019re choosing a smarter model backed by top-tier expertise.',
              },
              {
                title: 'Not legal representation',
                description: 'BuyUnrepped does not provide legal advice or act as an attorney. We use state-standardized forms and established practices, but buyers should consult a licensed attorney for legal questions specific to their transaction.',
              },
              {
                title: 'We don\u2019t represent you',
                description: 'A traditional buyer agent would represent you and speak on your behalf, acting as a middle man to convey your wants and needs to the listing agent. With BuyUnrepped, we provide structure, preparation, and strategic guidance behind the scenes, while you maintain control of conversations, negotiations, and decisions for a supported, self-directed purchase.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Full-service buyer agents continue to play an important role in many transactions. BuyUnrepped exists to support a different, but equally legitimate, buyer path.
          </p>
        </div>
      </section>

      {/* E. Features Section */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <SectionBadge>Features</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                Everything you need to buy with confidence
              </h2>
              <ul className="space-y-5 mb-8">
                {[
                  'Informed and compliant purchase agreement',
                  'Access the same market data agents use',
                  'Expert support when you need it most',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-blue" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={openModal} className="px-8 py-3 bg-brand-blue text-white font-bold rounded-full hover:bg-cyan-700 transition-colors shadow-lg">
                Join Early Access
              </button>
            </div>

            {/* Right - Feature cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <FileText className="w-6 h-6 text-brand-blue" />, title: 'REALTOR Forms', desc: 'Every form you need, state-specific and legally approved.' },
                { icon: <Clock className="w-6 h-6 text-brand-blue" />, title: 'Market Data', desc: 'Access the same data agents use to determine fair market value.' },
                { icon: <MessageSquare className="w-6 h-6 text-brand-blue" />, title: 'Expert Support', desc: 'Licensed experts available to answer your questions.' },
                { icon: <FileCheck className="w-6 h-6 text-brand-blue" />, title: 'Smart Scripts', desc: 'Agent-approved templates for Tennessee transactions.' },
                { icon: <CalendarCheck className="w-6 h-6 text-brand-blue" />, title: 'Transaction Management', desc: 'Reminders and prompts to ensure you understand and hit every deadline.' },
                { icon: <BarChart3 className="w-6 h-6 text-brand-blue" />, title: 'Cost Analysis', desc: 'Real-time closing cost and savings estimates.' },
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h4 className="font-bold mb-1">{feature.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* F. Savings Calculator */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <SectionBadge>Savings Calculator</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                See how much you could save
              </h2>
              <p className="text-lg text-gray-500 mb-8">
                Drag the slider to your home price and see the difference between a traditional agent and BuyUnrepped.
              </p>

              {/* Slider */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>$250K</span>
                  <span className="font-bold text-brand-navy text-lg">
                    {sliderValue >= 1000000
                      ? `$${(sliderValue / 1000000).toFixed(sliderValue % 1000000 === 0 ? 0 : 1)}M`
                      : `$${(sliderValue / 1000).toFixed(0)}K`}
                  </span>
                  <span>$3M</span>
                </div>
                <input
                  type="range"
                  min={250000}
                  max={3000000}
                  step={10000}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <Link href="/savings" className="text-brand-blue font-bold text-sm hover:underline">
                View full savings breakdown &rarr;
              </Link>
            </div>

            {/* Right - Comparison cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-3">Traditional Agent</span>
                <p className="text-3xl font-bold">${traditionalFee.toLocaleString()}</p>
                <p className="text-sm text-gray-500">3% buyer agent commission</p>
              </div>

              <div className="bg-brand-blue rounded-2xl p-6 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-3">BuyUnrepped</span>
                <p className="text-3xl font-bold">${buyUnreppedFee.toLocaleString()}</p>
                <p className="text-sm text-blue-100">BuyUnrepped fee</p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-bold rounded-full mb-3">Your Savings</span>
                <p className="text-3xl font-bold text-brand-green">${savings.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Money back in your pocket</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H. FAQ Accordion */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-gray-500">
              Everything you need to know about buying a home without an agent.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* I. CTA Banner */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-blue to-cyan-700 rounded-3xl p-12 md:p-16 text-center">
            <SectionBadge className="bg-white/20 text-white">Get Started</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4">
              Ready to save thousands on your next home?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of Tennessee buyers who are taking control of their home purchase and keeping the 3% commission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openModal}
                className="px-8 py-4 bg-white text-brand-blue font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Join Early Access
              </button>
              <Link
                href="/pricing"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors text-center"
              >
                View Pricing
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              No credit card required. Join early access today.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
