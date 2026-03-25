'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, ChevronDown, ArrowRight, Zap, Shield, TrendingUp, FileText, BarChart3, MessageSquare, CalendarCheck, FileCheck, Clock } from 'lucide-react';

const faqs = [
  { question: "How much do I actually save?", answer: "When a seller lists their home, they may agree to pay a commission that includes compensation for a buyer's agent. If you buy without an agent, that buyer's agent commission doesn't need to be paid. Smart buyers request this as a credit at closing or a reduction in the purchase price." },
  { question: "Is this legal?", answer: "Absolutely. You are never required by law to have a real estate agent. We provide the standard forms and guidance you need to execute the contract legally." },
  { question: "What if things get complicated?", answer: "Our Full Strategy Pass includes access to our staffed licensed REALTORs who are on call to answer specific questions and help you navigate tricky inspection or appraisal issues." },
  { question: "How does BuyUnrepped make money?", answer: "We charge a simple flat fee for our platform. No hidden commissions, no percentage-based fees. You keep the savings." },
];

export default function V2() {
  const [slider, setSlider] = useState(600000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const traditional = slider * 0.03;
  const ours = 3595;
  const savings = traditional - ours;

  return (
    <div className="min-h-screen font-sans bg-white" style={{ color: '#0a0a0a' }}>
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        {/* Background accent shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(57,182,255,0.06) 100%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(247,199,74,0.08) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-bold" style={{ background: '#1b5373', color: 'white' }}>
                <Zap className="w-3 h-3" style={{ color: '#f7c74a' }} />
                Tennessee's Flat-Fee Real Estate Platform
              </div>

              <h1 className="font-black leading-none mb-6" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: '0.95' }}>
                We're not<br />
                your agent.<br />
                <span style={{ WebkitTextStroke: '2px #1b5373', color: 'transparent' }}>We're your</span><br />
                <span style={{ color: '#39b6ff' }}>advantage.</span>
              </h1>

              <p className="text-lg leading-relaxed mb-8" style={{ color: '#4a5568', maxWidth: '440px' }}>
                BuyUnrepped gives confident Tennessee buyers the docs, data, and licensed support to purchase without a 3% buyer's agent commission.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/schedule" className="inline-flex items-center gap-2 px-7 py-4 font-bold rounded-2xl transition-all hover:scale-105" style={{ background: '#1b5373', color: 'white', fontSize: '1rem', boxShadow: '0 8px 24px rgba(27,83,115,0.25)' }}>
                  Schedule a Call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#how-it-works" className="inline-flex items-center gap-2 px-7 py-4 font-bold rounded-2xl" style={{ border: '2px solid #e5e7eb', color: '#374151', fontSize: '1rem' }}>
                  How It Works
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {['Licensed Tennessee Brokerage', 'Flat fee — no percentages', 'State-compliant forms'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#6b7280' }}>
                    <Check className="w-4 h-4" style={{ color: '#23b666' }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Floating Card Stack */}
            <div className="relative flex flex-col gap-4">
              {/* Main savings card */}
              <div className="rounded-3xl p-7" style={{ background: '#1b5373', boxShadow: '0 24px 64px rgba(27,83,115,0.25)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Savings Estimate</div>
                    <div className="font-semibold text-white text-sm">📍 Nashville, TN · $480,000 home</div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(35,182,102,0.2)', color: '#4ade80' }}>Verified</div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="text-xs font-bold mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Traditional (3%)</div>
                    <div className="text-xl font-bold line-through" style={{ color: 'rgba(255,100,100,0.8)' }}>$14,400</div>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(57,182,255,0.15)', border: '1px solid rgba(57,182,255,0.3)' }}>
                    <div className="text-xs font-bold mb-1" style={{ color: '#39b6ff' }}>BuyUnrepped</div>
                    <div className="text-xl font-bold text-white">$3,595</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl text-center" style={{ background: 'rgba(247,199,74,0.15)', border: '1px solid rgba(247,199,74,0.3)' }}>
                  <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#f7c74a' }}>You Keep</div>
                  <div className="text-4xl font-black text-white">$10,805</div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, label: 'Licensed Brokerage' },
                  { icon: FileText, label: 'REALTOR® Forms' },
                  { icon: TrendingUp, label: '$18k+ Avg Saved' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center" style={{ background: '#f8f9fa', border: '1px solid #e5e7eb' }}>
                    <Icon className="w-5 h-5" style={{ color: '#1b5373' }} />
                    <span className="text-xs font-bold" style={{ color: '#374151' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{ background: '#1b5373', padding: '52px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '$18k+', label: 'Average Savings Per Buyer' },
              { value: '$3,595', label: 'Maximum You\'ll Pay' },
              { value: '100%', label: 'State-Compliant Forms' },
              { value: '24/7', label: 'Licensed Expert Access' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-4xl font-black mb-1" style={{ color: '#39b6ff' }}>{s.value}</div>
                <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: '#f0f9ff', color: '#1b5373', border: '1px solid #bae6fd' }}>How It Works</div>
            <h2 className="text-4xl md:text-5xl font-black" style={{ letterSpacing: '-0.03em' }}>Three steps to closing day</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px" style={{ background: 'linear-gradient(90deg, transparent, #39b6ff, #39b6ff, transparent)' }} />

            {[
              { n: '01', title: 'Decide your path', desc: 'Determine whether a full-service agent makes sense — or whether independent buying saves you more money.' },
              { n: '02', title: 'Activate BuyUnrepped', desc: 'We provide structure, docs, tools, and licensed expert access for every phase of your purchase.' },
              { n: '03', title: 'Close with clarity', desc: 'Transactions stay organized and predictable for every party involved. Zero confusion, zero missed deadlines.' },
            ].map((s, i) => (
              <div key={s.n} className="relative text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 relative z-10" style={{ background: i === 1 ? '#1b5373' : 'white', color: i === 1 ? 'white' : '#1b5373', border: i === 1 ? 'none' : '2px solid #1b5373', boxShadow: i === 1 ? '0 8px 32px rgba(27,83,115,0.3)' : 'none' }}>
                  {s.n}
                </div>
                <h3 className="text-xl font-black mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO FEATURES ── */}
      <section className="py-24" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: '#f0f9ff', color: '#1b5373', border: '1px solid #bae6fd' }}>What We Provide</div>
            <h2 className="text-4xl md:text-5xl font-black" style={{ letterSpacing: '-0.03em' }}>Everything you need, nothing you don't.</h2>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[180px]">
            {/* Large card */}
            <div className="col-span-12 md:col-span-5 row-span-2 rounded-3xl p-8 flex flex-col justify-between" style={{ background: '#1b5373' }}>
              <FileText className="w-8 h-8 text-white" />
              <div>
                <h3 className="text-2xl font-black text-white mb-2">REALTOR® Forms</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>Every Tennessee-specific form, state-standardized and listing-agent approved. No guesswork.</p>
              </div>
            </div>

            {/* Medium top-right */}
            <div className="col-span-12 md:col-span-4 rounded-3xl p-7 flex flex-col justify-between" style={{ background: '#39b6ff' }}>
              <BarChart3 className="w-7 h-7 text-white" />
              <div>
                <h3 className="text-lg font-black text-white mb-1">Market Data</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>The same comps agents use, in your hands.</p>
              </div>
            </div>

            {/* Small */}
            <div className="col-span-12 md:col-span-3 rounded-3xl p-6 flex flex-col justify-between bg-white" style={{ border: '1px solid #e5e7eb' }}>
              <MessageSquare className="w-6 h-6" style={{ color: '#1b5373' }} />
              <div>
                <h3 className="text-base font-black mb-1">Expert Support</h3>
                <p className="text-xs" style={{ color: '#6b7280' }}>Licensed on demand.</p>
              </div>
            </div>

            {/* Bottom row small */}
            <div className="col-span-12 md:col-span-3 rounded-3xl p-6 flex flex-col justify-between" style={{ background: '#f7c74a' }}>
              <CalendarCheck className="w-6 h-6" style={{ color: '#0c1f30' }} />
              <div>
                <h3 className="text-base font-black" style={{ color: '#0c1f30' }}>Deadline Mgmt</h3>
                <p className="text-xs" style={{ color: 'rgba(12,31,48,0.6)' }}>Never miss a window.</p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 rounded-3xl p-7 flex flex-col justify-between bg-white" style={{ border: '1px solid #e5e7eb' }}>
              <FileCheck className="w-7 h-7" style={{ color: '#1b5373' }} />
              <div>
                <h3 className="text-lg font-black mb-1">Smart Scripts</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>Agent-approved offer templates for Tennessee transactions.</p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5 rounded-3xl p-8 flex flex-col justify-between" style={{ background: '#0c1f30' }}>
              <Clock className="w-7 h-7" style={{ color: '#39b6ff' }} />
              <div>
                <h3 className="text-xl font-black text-white mb-2">Transaction Management</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>Full coordination from contract to close, mapped and tracked.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: '#f0f9ff', color: '#1b5373', border: '1px solid #bae6fd' }}>Pricing</div>
            <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ letterSpacing: '-0.03em' }}>Simple, flat-fee pricing.</h2>
            <p style={{ color: '#6b7280' }}>No percentages. No surprises. You keep the commission.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Tier 1 */}
            <div className="rounded-3xl p-8" style={{ border: '2px solid #e5e7eb' }}>
              <h3 className="text-xl font-black mb-1">Ready to Submit Offer</h3>
              <p className="text-sm mb-6" style={{ color: '#6b7280' }}>Everything you need to write and submit a competitive offer.</p>
              <div className="text-5xl font-black mb-8">$995<span className="text-lg font-medium" style={{ color: '#9ca3af' }}> /one-time</span></div>
              <Link href="/schedule" className="block w-full py-4 text-center font-bold rounded-2xl mb-8 transition-all hover:scale-[1.02]" style={{ border: '2px solid #1b5373', color: '#1b5373' }}>
                Schedule a Call
              </Link>
              <ul className="space-y-3">
                {['Purchase agreement & REALTOR® forms', 'Offer strategy consultation', 'Smart submission scripts', 'Market data access', 'Email support'].map(t => (
                  <li key={t} className="flex items-center gap-3 text-sm" style={{ color: '#374151' }}>
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#23b666' }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier 2 */}
            <div className="rounded-3xl p-8 relative" style={{ background: '#1b5373', boxShadow: '0 24px 64px rgba(27,83,115,0.25)' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black" style={{ background: '#39b6ff', color: 'white' }}>Most Popular</div>
              <h3 className="text-xl font-black text-white mb-1">Full Strategy Pass</h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>Full transaction coordination from contract to close.</p>
              <div className="text-5xl font-black text-white mb-8">$3,595<span className="text-lg font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}> /one-time</span></div>
              <Link href="/schedule" className="block w-full py-4 text-center font-bold rounded-2xl mb-8 transition-all hover:scale-[1.02]" style={{ background: '#39b6ff', color: 'white' }}>
                Schedule a Call
              </Link>
              <ul className="space-y-3">
                {['Everything in Ready to Submit Offer', 'Full transaction coordination', 'Self-guided app access', 'Deadline management & reminders', 'Licensed REALTOR® on-call access', 'Closing cost analysis'].map(t => (
                  <li key={t} className="flex items-center gap-3 text-sm text-white">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#f7c74a' }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="py-24" style={{ background: '#f8f9fa' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: '#f0f9ff', color: '#1b5373', border: '1px solid #bae6fd' }}>Savings Calculator</div>
            <h2 className="text-4xl font-black mb-2" style={{ letterSpacing: '-0.03em' }}>Calculate your savings</h2>
            <p style={{ color: '#6b7280' }}>Drag to your home price.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 mb-6" style={{ border: '1px solid #e5e7eb', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
            <div className="flex justify-between text-sm mb-3 font-medium" style={{ color: '#9ca3af' }}>
              <span>$250K</span>
              <span className="text-2xl font-black" style={{ color: '#0a0a0a' }}>{slider >= 1000000 ? `$${(slider/1000000).toFixed(1)}M` : `$${(slider/1000).toFixed(0)}K`}</span>
              <span>$3M</span>
            </div>
            <input type="range" min={250000} max={3000000} step={10000} value={slider} onChange={e => setSlider(+e.target.value)} className="w-full" style={{ accentColor: '#39b6ff' }} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 rounded-3xl text-center bg-white" style={{ border: '1px solid #fecaca' }}>
              <div className="text-xs font-black tracking-widest uppercase mb-2 text-red-500">Traditional</div>
              <div className="text-2xl font-black text-red-500">${traditional.toLocaleString()}</div>
              <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>3% commission</div>
            </div>
            <div className="p-6 rounded-3xl text-center" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
              <div className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: '#1b5373' }}>BuyUnrepped</div>
              <div className="text-2xl font-black" style={{ color: '#1b5373' }}>${ours.toLocaleString()}</div>
              <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>Flat fee</div>
            </div>
            <div className="p-6 rounded-3xl text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <div className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: '#16a34a' }}>You Keep</div>
              <div className="text-2xl font-black" style={{ color: '#16a34a' }}>${savings.toLocaleString()}</div>
              <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>Your money</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3" style={{ letterSpacing: '-0.03em' }}>Questions?</h2>
            <p style={{ color: '#6b7280' }}>We've got answers.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e5e7eb' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-bold">{f.question}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: '#1b5373' }} />
                </button>
                {openFaq === i && <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: '#6b7280' }}>{f.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24" style={{ background: '#0c1f30' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-bold" style={{ background: 'rgba(57,182,255,0.15)', color: '#39b6ff', border: '1px solid rgba(57,182,255,0.3)' }}>
            <Zap className="w-3 h-3" /> Free 20-minute consultation
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ letterSpacing: '-0.04em', lineHeight: '1' }}>
            Stop paying 3%.<br />
            <span style={{ color: '#39b6ff' }}>Start keeping it.</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '460px', margin: '0 auto 2.5rem' }}>
            Schedule a free call. We'll walk you through exactly how BuyUnrepped works for your purchase.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/schedule" className="inline-flex items-center gap-2 px-10 py-5 font-black rounded-2xl transition-all hover:scale-105" style={{ background: '#39b6ff', color: 'white', fontSize: '1.1rem', boxShadow: '0 8px 40px rgba(57,182,255,0.3)' }}>
              Schedule a Call <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded-2xl" style={{ border: '2px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '1.1rem' }}>
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
