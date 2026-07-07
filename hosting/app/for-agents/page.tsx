'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { Check, ChevronDown, AlertTriangle, Clock, ShieldAlert, FileText, CalendarCheck, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: 'Is BuyUnrepped acting as the buyer\'s agent?',
    answer: 'No. BuyUnrepped is a coaching and guidance service, not licensed buyer representation. We do not enter into a buyer agency agreement, we do not negotiate on behalf of the buyer, and we do not insert ourselves into the agent relationship. There is no dual agency.',
  },
  {
    question: 'Will this affect my commission?',
    answer: 'No. BuyUnrepped does not take any portion of the buyer-side commission. We charge buyers a flat service fee directly. Your commission structure is completely unaffected.',
  },
  {
    question: 'What forms does BuyUnrepped use?',
    answer: 'We use standard Tennessee Association of Realtors (TAR) forms, the same forms you already know and work with. No custom paperwork, no surprises.',
  },
  {
    question: 'What if a buyer I\'m working with wants to use BuyUnrepped?',
    answer: 'Send them our way. A buyer who\'s prepared, deadline-aware, and using familiar forms is better for your transaction. BuyUnrepped exists to fill a gap, not to compete with you.',
  },
];

const painPoints = [
  {
    icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    bg: 'bg-amber-50',
    title: 'You end up doing their job',
    description: 'Explaining forms, chasing signatures, answering basic process questions, without any additional compensation.',
  },
  {
    icon: <Clock className="w-6 h-6 text-red-500" />,
    bg: 'bg-red-50',
    title: 'Deadlines get missed',
    description: 'Unrepped buyers frequently misunderstand timelines. Inspection periods lapse. Earnest money deadlines slip. Deals fall apart.',
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-orange-500" />,
    bg: 'bg-orange-50',
    title: 'Dual agency gray area',
    description: 'Helping an unrepresented buyer too much creates liability. Not helping enough creates chaos. It\'s a frustrating no-win situation.',
  },
];

const steps = [
  {
    step: '01',
    icon: <FileText className="w-6 h-6 text-brand-blue" />,
    title: 'Buyer signs up with BuyUnrepped',
    description: 'The buyer enrolls and gets access to our structured purchase program, forms, timelines, and guidance built for Tennessee transactions.',
  },
  {
    step: '02',
    icon: <CalendarCheck className="w-6 h-6 text-brand-blue" />,
    title: 'We guide them through the process',
    description: 'We walk the buyer through offer preparation, deadlines, inspections, and contract milestones using TAR forms you already know.',
  },
  {
    step: '03',
    icon: <MessageSquare className="w-6 h-6 text-brand-blue" />,
    title: 'You get a prepared counterpart',
    description: 'By closing, you\'re working with an informed, deadline-aware buyer who arrived at the table ready, not one you had to carry.',
  },
];

export default function ForAgentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Hero */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionBadge>For Listing Agents</SectionBadge>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold mt-6 mb-6 leading-[1.08] tracking-tight">
            Unrepresented buyers don&apos;t have to be a headache.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            BuyUnrepped prepares, informs, and keeps unrepped buyers on schedule, so you can focus on closing, not babysitting.
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              We know how this usually goes
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              When an unrepresented buyer shows up, the burden typically falls on you, without any extra compensation or protection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${point.bg} rounded-xl flex items-center justify-center mb-5`}>
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                <p className="text-gray-500 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Helps */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge>How It Works</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              How BuyUnrepped helps
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We step in before the problems start, so by the time a buyer reaches you, the heavy lifting is already done.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 relative overflow-hidden hover:shadow-lg transition-shadow">
                <span className="absolute top-4 right-4 text-8xl font-bold text-gray-100 leading-none select-none">
                  {item.step}
                </span>
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-5 relative z-10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed relative z-10">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Checklist */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <SectionBadge>What This Means for You</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                A cleaner transaction, every time
              </h2>
              <div className="text-lg text-gray-500 space-y-5 leading-relaxed">
                <p>
                  BuyUnrepped is not after your commissions. We&apos;re not a buyer&apos;s agent. We&apos;re a stabilizing resource, one that exists specifically because unrepresented buyers are not going away.
                </p>
                <p>
                  When a buyer comes to you prepared, with the right forms, an understanding of the timeline, and someone keeping them accountable, your job gets easier. Deals are more likely to close. Friction drops. Everyone wins.
                </p>
                <p>
                  We use standard TAR forms throughout. No surprises, no unfamiliar paperwork. Just a smoother path from contract to close.
                </p>
              </div>
            </div>

            {/* Right */}
            <div>
              <p className="font-bold text-lg mb-6">For listing agents, this means:</p>
              <ul className="space-y-4">
                {[
                  'Clearer communication throughout the transaction',
                  'Fewer missed contract deadlines',
                  'Less back-and-forth on process questions',
                  'Reduced confusion about forms and next steps',
                  'TAR forms you already know and expect',
                  'No dual agency gray area',
                  'No commission conflict, we don\'t touch your fee',
                  'A buyer who shows up prepared',
                  'A smoother, faster path to closing',
                  'Less work',
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

      {/* FAQ */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              Common questions from agents
            </h2>
            <p className="text-lg text-gray-500">
              We get it, a new player in a transaction raises questions. Here are the honest answers.
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

      {/* CTA */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-blue to-cyan-700 rounded-3xl p-12 md:p-16 text-center">
            <SectionBadge className="bg-white/20 text-white">Get in Touch</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4">
              Have questions about how it works?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              We&apos;re happy to walk you through how BuyUnrepped supports your transactions, and why listing agents across Tennessee are glad it exists.
            </p>
            <Link
              href="/schedule"
              className="px-8 py-4 bg-white text-brand-blue font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg inline-block"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
