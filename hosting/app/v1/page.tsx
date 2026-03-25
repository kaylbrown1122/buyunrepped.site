'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, X, ChevronDown, ArrowRight, TrendingDown, Shield, Clock, FileText, BarChart3, MessageSquare, CalendarCheck, FileCheck } from 'lucide-react';

const faqs = [
  { question: "How much do I actually save?", answer: "When a seller lists their home, they may agree to pay a commission that includes compensation for a buyer's agent. If you buy without an agent, that buyer's agent commission doesn't need to be paid. Smart buyers request this as a credit at closing or a reduction in the purchase price." },
  { question: "Is this legal?", answer: "Absolutely. You are never required by law to have a real estate agent. We provide the standard forms and guidance you need to execute the contract legally." },
  { question: "What if things get complicated?", answer: "Our Full Strategy Pass includes access to our staffed licensed REALTORs who are on call to answer specific questions and help you navigate tricky inspection or appraisal issues." },
  { question: "How does BuyUnrepped make money?", answer: "We charge a simple flat fee for our platform. No hidden commissions, no percentage-based fees. You keep the savings." },
];

export default function V1() {
  const [slider, setSlider] = useState(600000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const traditional = slider * 0.03;
  const ours = 3595;
  const savings = traditional - ours;

  return (
    <div className="min-h-screen font-sans" style={{ background: '#F8F5F0', color: '#0c1f30' }}>
      <Header />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0c1f30 0%, #1b5373 60%, #0f3a52 100%)',
          paddingTop: '100px',
          paddingBottom: '100px',
        }}
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #f7c74a 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #39b6ff 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase" style={{ background: 'rgba(247,199,74,0.15)', border: '1px solid rgba(247,199,74,0.3)', color: '#f7c74a' }}>
                Tennessee's Flat-Fee Real Estate Support
              </div>

              <h1 className="font-bold leading-tight mb-6 text-white" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
                Buy your home on<br />
                <span style={{ color: '#f7c74a' }}>your terms.</span><br />
                Keep the commission.
              </h1>

              <p className="mb-10 leading-relaxed" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '480px' }}>
                BuyUnrepped gives unrepresented Tennessee buyers the docs, data, and licensed insight to close confidently — without paying a 3% buyer's agent fee.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/schedule" className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-full transition-all hover:scale-105" style={{ background: '#f7c74a', color: '#0c1f30', fontSize: '1rem', boxShadow: '0 8px 32px rgba(247,199,74,0.35)' }}>
                  Schedule a Call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-full transition-all" style={{ border: '2px solid rgba(255,255,255,0.25)', color: 'white', fontSize: '1rem' }}>
                  View Pricing
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-10">
                {[['Licensed Brokerage', Shield], ['Tennessee-Specific', Check], ['Flat Fee Only', TrendingDown]].map(([label, Icon]: any) => (
                  <div key={label as string} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: '#f7c74a' }} />
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Savings Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)' }}>
                <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Sample Savings Breakdown</div>

                <div className="text-sm font-semibold mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>📍 123 Magnolia Ave, Nashville TN — $480,000</div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)' }}>
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Traditional Agent (3%)</span>
                    <span className="font-bold text-red-400">$14,400</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'rgba(57,182,255,0.1)', border: '1px solid rgba(57,182,255,0.2)' }}>
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>BuyUnrepped</span>
                    <span className="font-bold" style={{ color: '#39b6ff' }}>$3,595</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, rgba(247,199,74,0.2), rgba(247,199,74,0.08))', border: '1px solid rgba(247,199,74,0.35)' }}>
                  <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#f7c74a' }}>You Keep</div>
                  <div className="text-4xl font-bold text-white">$10,805</div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <Check className="w-3 h-3" style={{ color: '#23b666' }} />
                  Licensed brokerage · No hidden fees
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#0c1f30', padding: '48px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '$18k+', label: 'Average Buyer Savings' },
              { value: '100%', label: 'State Compliant Forms' },
              { value: 'Flat Fee', label: 'No Percentage Commissions' },
              { value: '24/7', label: 'Licensed Expert Access' },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#f7c74a' }}>{s.value}</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-24" style={{ background: '#F8F5F0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6" style={{ background: 'rgba(27,83,115,0.1)', color: '#1b5373' }}>Who This Is For</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: '#0c1f30', letterSpacing: '-0.02em' }}>
                Full-service representation<br />isn't for everyone.
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#4a6070' }}>
                You may not need a Realtor to speak on your behalf — but everyone benefits from local, experienced support behind the scenes. You find the home. We help you close it.
              </p>
              <Link href="/schedule" className="inline-flex items-center gap-2 font-bold" style={{ color: '#1b5373' }}>
                See how it works <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: FileText, title: 'Offer Strategy', desc: 'We draft a tailored, Realtor-friendly offer and submission email on your behalf.' },
                { icon: Clock, title: 'Deadline Tracking', desc: 'Every contractual milestone mapped and monitored so nothing slips through.' },
                { icon: MessageSquare, title: 'Licensed Backup', desc: 'Licensed experts on call for tricky inspection and appraisal questions.' },
                { icon: BarChart3, title: 'Market Data Access', desc: 'The same comps and pricing data your agent would use — in your hands.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start p-5 rounded-2xl transition-all hover:shadow-lg" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(27,83,115,0.1)' }}>
                    <item.icon className="w-5 h-5" style={{ color: '#1b5373' }} />
                  </div>
                  <div>
                    <div className="font-bold mb-1" style={{ color: '#0c1f30' }}>{item.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: '#6b7c8d' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0c1f30, #1b5373)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(247,199,74,0.15)', color: '#f7c74a', border: '1px solid rgba(247,199,74,0.3)' }}>How It Works</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>Three steps to closing day</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Decide your path', desc: 'Determine whether a full-service agent makes sense — or whether an independent approach saves you more money and makes more sense for your situation.' },
              { step: '02', title: 'Activate BuyUnrepped', desc: 'We provide structure, tools, state-compliant docs, and on-demand access to licensed professionals for every phase of the purchase.' },
              { step: '03', title: 'Close with clarity', desc: 'Transactions stay organized, informed, and predictable — for you, the listing agent, and every party involved.' },
            ].map((s) => (
              <div key={s.step} className="relative p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-7xl font-bold mb-4 leading-none" style={{ color: 'rgba(247,199,74,0.2)' }}>{s.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24" style={{ background: '#F8F5F0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(27,83,115,0.1)', color: '#1b5373' }}>What We Provide</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#0c1f30', letterSpacing: '-0.02em' }}>Everything you need. Nothing you don't.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: FileText, title: 'REALTOR® Forms', desc: 'Every Tennessee-specific form, state-standardized and listing-agent approved.' },
              { icon: BarChart3, title: 'Market Data', desc: 'Access the same comparable sales data agents use to determine fair value.' },
              { icon: MessageSquare, title: 'Expert Support', desc: 'Licensed professionals available on demand for targeted questions.' },
              { icon: FileCheck, title: 'Smart Scripts', desc: 'Agent-friendly offer submission templates written for Tennessee transactions.' },
              { icon: CalendarCheck, title: 'Transaction Management', desc: 'Critical deadline reminders so you never miss an inspection window.' },
              { icon: TrendingDown, title: 'Cost Analysis', desc: 'Real-time closing cost and savings estimates before you make your offer.' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(27,83,115,0.08)' }}>
                  <f.icon className="w-5 h-5" style={{ color: '#1b5373' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#0c1f30' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7c8d' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAVINGS CALCULATOR ── */}
      <section className="py-24" style={{ background: '#0c1f30' }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(247,199,74,0.15)', color: '#f7c74a', border: '1px solid rgba(247,199,74,0.3)' }}>Savings Calculator</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>See the number for yourself</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Drag to your home price and watch the savings update.</p>
          </div>

          <div className="p-8 rounded-3xl mb-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex justify-between text-sm mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <span>$250K</span>
              <span className="text-2xl font-bold text-white">${slider >= 1000000 ? `${(slider/1000000).toFixed(1)}M` : `${(slider/1000).toFixed(0)}K`}</span>
              <span>$3M</span>
            </div>
            <input type="range" min={250000} max={3000000} step={10000} value={slider} onChange={e => setSlider(+e.target.value)} className="w-full mb-2" style={{ accentColor: '#f7c74a' }} />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)' }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-2 text-red-400">Traditional Agent</div>
              <div className="text-3xl font-bold text-red-400">${traditional.toLocaleString()}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>3% buyer commission</div>
            </div>
            <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(57,182,255,0.1)', border: '1px solid rgba(57,182,255,0.2)' }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#39b6ff' }}>BuyUnrepped</div>
              <div className="text-3xl font-bold" style={{ color: '#39b6ff' }}>${ours.toLocaleString()}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Flat fee · no percentage</div>
            </div>
            <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(247,199,74,0.1)', border: '1px solid rgba(247,199,74,0.3)' }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#f7c74a' }}>You Keep</div>
              <div className="text-3xl font-bold" style={{ color: '#f7c74a' }}>${savings.toLocaleString()}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Back in your pocket</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ background: '#F8F5F0' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3" style={{ color: '#0c1f30', letterSpacing: '-0.02em' }}>Common questions</h2>
            <p style={{ color: '#6b7c8d' }}>Everything you need to know before you get started.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-bold" style={{ color: '#0c1f30' }}>{f.question}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: '#1b5373' }} />
                </button>
                {openFaq === i && <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: '#6b7c8d' }}>{f.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0c1f30, #1b5373)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Ready to keep the<br /><span style={{ color: '#f7c74a' }}>commission?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Schedule a free call with our team. We'll walk you through exactly how BuyUnrepped works for your purchase.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/schedule" className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded-full transition-all hover:scale-105" style={{ background: '#f7c74a', color: '#0c1f30', fontSize: '1.1rem', boxShadow: '0 8px 40px rgba(247,199,74,0.3)' }}>
              Schedule a Call <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded-full" style={{ border: '2px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '1.1rem' }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div style={{ background: '#0c1f30', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px' }}>
        <p className="text-center text-xs max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.25)', lineHeight: '1.6' }}>
          <strong style={{ color: 'rgba(255,255,255,0.4)' }}>Disclaimer:</strong> BuyUnrepped is a licensed real estate brokerage. We do not act as the buyer's agent or enter into a buyer agency relationship. We provide structured, non-representational support using state-standardized REALTOR® forms.
        </p>
      </div>

      <Footer />
    </div>
  );
}
