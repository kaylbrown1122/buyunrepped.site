'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import SectionBadge from './components/SectionBadge';
import Link from 'next/link';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronDown, Check, FileText, Clock, MessageSquare, FileCheck, Lock, BarChart3, Star } from 'lucide-react';
import { useWaitlist } from './components/WaitlistModal';

const testimonials = [
  {
    quote: "I was skeptical at first, but the step-by-step guidance made it incredibly easy. The seller was happy to save too.",
    name: "James S.",
    location: "Memphis, TN",
    initials: "JS",
    savings: "$14,500",
  },
  {
    quote: "BuyUnrepped gave me the confidence to negotiate directly. The tools are professional grade and easy to use.",
    name: "Sarah M.",
    location: "Knoxville, TN",
    initials: "SM",
    savings: "$22,100",
  },
  {
    quote: "The process was smoother than my last purchase with an agent. Why pay fees when you can do this?",
    name: "Marcus R.",
    location: "Nashville, TN",
    initials: "MR",
    savings: "$9,800",
  },
];

const faqs = [
  {
    question: "How much do I actually save?",
    answer: "Typically, a buyer's agent takes 2.5% to 3% of the home price. On a $500,000 home, that is $15,000. By representing yourself with our tools, you can ask the seller to reduce the price by that amount.",
  },
  {
    question: "Is this legal?",
    answer: "Absolutely. You are never required by law to have a real estate agent. We provide the standard forms and guidance you need to execute the contract legally.",
  },
  {
    question: "What if things get complicated?",
    answer: "Our Full Support plan includes access to licensed real estate experts who can answer specific questions and help you navigate tricky inspection or appraisal issues.",
  },
  {
    question: "What documents do I need to buy a home without an agent?",
    answer: "You'll need a purchase agreement, disclosure forms, and closing documents. Our platform generates all required Tennessee-specific legal documents for you, so you never have to worry about missing paperwork.",
  },
  {
    question: "How does BuyUnrepped make money?",
    answer: "We charge a simple flat fee for our platform — either $299 for our DIY Toolkit or $999 for Full Support. No hidden commissions, no percentage-based fees. You keep the savings.",
  },
];

export default function LandingPage() {
  const { openModal } = useWaitlist();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [sliderValue, setSliderValue] = useState(450000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroEmail, setHeroEmail] = useState('');
  const [heroStatus, setHeroStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const traditionalFee = sliderValue * 0.03;
  const buyUnreppedFee = 500;
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
                Buying unrepresented does not have to mean <span className="text-brand-blue">buying alone.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-xl leading-relaxed">
                BuyUnrepped supports confident buyers who choose not to use full-service representation, by helping transactions stay clear, professional, and predictable for everyone involved.
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
                  <div className="col-span-12 md:col-span-8 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
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
                        <p className="font-bold text-sm">$450,000</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-[10px] text-green-600 uppercase font-bold mb-1">Savings</p>
                        <p className="font-bold text-green-600 text-sm">+$13,500</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Closing</p>
                        <p className="font-bold text-sm">Oct 24</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar Cards */}
                  <div className="col-span-12 md:col-span-4 space-y-4">
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">$</div>
                      <div>
                        <p className="text-xs font-bold">Seller Agreed</p>
                        <p className="text-[10px] text-gray-400">Save $12k fees</p>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">%</div>
                      <div>
                        <p className="text-xs font-bold">Rates Dropped</p>
                        <p className="text-[10px] text-gray-400">Lock in 5.2%</p>
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
              <p className="text-3xl md:text-4xl font-bold text-brand-navy">$15K+</p>
              <p className="text-sm text-gray-500 mt-1">Average Buyer Savings</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-navy">100%</p>
              <p className="text-sm text-gray-500 mt-1">Legal Compliance</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-navy">3%</p>
              <p className="text-sm text-gray-500 mt-1">Commission You Keep</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-navy">24/7</p>
              <p className="text-sm text-gray-500 mt-1">Expert Support</p>
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
                Not every buyer needs the same level of assistance.
              </h2>
              <div className="text-lg text-gray-500 space-y-4 leading-relaxed">
                <p>Some buyers prefer full-service support. Others prefer a more independent approach.</p>
                <p>BuyUnrepped exists for buyers who choose to move forward unrepresented but still want a structured, informed, and well-managed transaction.</p>
                <p>This approach benefits not only buyers, but also listing agents and sellers by reducing confusion, missed deadlines, and unnecessary friction.</p>
              </div>
            </div>

            {/* Right — image placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-gray-300">
                <svg className="w-16 h-16 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-sm font-medium">Image or graphic</p>
              </div>
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
                description: 'Clear purchase timelines and defined next steps throughout the process.',
              },
              {
                title: 'Educational consultations',
                description: 'Educational consultations focused on pricing, offer terms, and overall transaction strategy.',
              },
              {
                title: 'Deadline tracking',
                description: 'Support staying on track with contractual deadlines once under contract.',
              },
              {
                title: 'Standardized forms',
                description: 'Preparation and use of state-standardized REALTOR® forms that listing agents are familiar with and expect to see.',
              },
              {
                title: 'Professional access',
                description: 'Optional access to licensed real estate professionals for consultative guidance when it makes sense.',
              },
              {
                title: 'Practical tools',
                description: 'Tools and resources designed to support real-world residential transactions, not theory.',
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

      {/* C2. For Listing Agents */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <SectionBadge>For Listing Agents</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                Built with listing agents in mind
              </h2>
              <div className="text-lg text-gray-500 space-y-4 leading-relaxed mb-8">
                <p>Unrepresented buyers are not going away.</p>
                <p>BuyUnrepped helps ensure that when an unrepresented buyer enters a transaction, they are prepared, informed, and easier to work with.</p>
              </div>
              <p className="text-gray-500 leading-relaxed">
                BuyUnrepped is not competing for buyer-side commissions. It is a stabilizing resource when an unrepped buyer shows up.
              </p>
            </div>

            {/* Right — benefits grid */}
            <div>
              <p className="font-bold text-lg mb-6">For listing agents, this means:</p>
              <ul className="space-y-4">
                {[
                  'Clearer communication',
                  'Fewer missed deadlines',
                  'Less back-and-forth',
                  'Reduced confusion',
                  'Fewer avoidable issues',
                  'A smoother path to closing',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-blue" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
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
            {[
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
                title: 'Not a replacement for full-service buyer agents',
                description: 'Full-service buyer agents provide dedicated advocacy, negotiation, and hands-on support throughout a transaction. BuyUnrepped does not replace that relationship — it serves buyers who have already decided not to use one.',
              },
              {
                title: 'Not anti-agent',
                description: 'We respect the value that experienced agents bring to real estate. BuyUnrepped exists alongside the traditional model, not in opposition to it. Listing agents are key partners in every transaction we support.',
              },
              {
                title: 'Not a discount brokerage',
                description: 'We do not offer reduced-commission buyer representation. BuyUnrepped provides structured, non-representational support — a fundamentally different service model built for a different type of buyer.',
              },
              {
                title: 'Not legal representation',
                description: 'BuyUnrepped does not provide legal advice or act as an attorney. We use state-standardized forms and established practices, but buyers should consult a licensed attorney for legal questions specific to their transaction.',
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
                  'Generate compliant purchase agreements in minutes',
                  'Access the same market data agents use',
                  'Expert support when you need it most',
                  'Secure document signatures electronically',
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
                { icon: <FileText className="w-6 h-6 text-brand-blue" />, title: 'Legal Documents', desc: 'Every form you need, state-specific and legally approved.' },
                { icon: <Clock className="w-6 h-6 text-brand-blue" />, title: 'Market Data', desc: 'Access the same data agents use to determine fair market value.' },
                { icon: <MessageSquare className="w-6 h-6 text-brand-blue" />, title: 'Expert Support', desc: 'Licensed experts available to answer your questions.' },
                { icon: <FileCheck className="w-6 h-6 text-brand-blue" />, title: 'Smart Contracts', desc: 'Attorney-approved templates for Tennessee transactions.' },
                { icon: <Lock className="w-6 h-6 text-brand-blue" />, title: 'Secure Data', desc: 'Bank-grade encryption for all your financial data.' },
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

      {/* F. Testimonial Carousel */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionBadge>Testimonials</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              Buyers who took control
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Real stories from Tennessee buyers who saved thousands with BuyUnrepped.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 text-center">
              {/* Quote mark */}
              <svg className="w-12 h-12 text-brand-blue/20 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
              </svg>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-gold fill-brand-gold" />
                ))}
              </div>

              {/* Avatar + info */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">
                  {testimonials[activeTestimonial].initials}
                </div>
                <div>
                  <p className="font-bold">{testimonials[activeTestimonial].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[activeTestimonial].location}</p>
                </div>
                <span className="inline-block px-3 py-1 bg-green-50 text-brand-green text-sm font-bold rounded-full">
                  Saved {testimonials[activeTestimonial].savings}
                </span>
              </div>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setActiveTestimonial(activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeTestimonial ? 'bg-brand-blue' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial(activeTestimonial === testimonials.length - 1 ? 0 : activeTestimonial + 1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* G. Savings Calculator */}
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
                  <span>$100K</span>
                  <span className="font-bold text-brand-navy text-lg">${(sliderValue / 1000).toFixed(0)}K</span>
                  <span>$1.5M</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={1500000}
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
                <p className="text-sm text-blue-100">Flat platform fee</p>
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
