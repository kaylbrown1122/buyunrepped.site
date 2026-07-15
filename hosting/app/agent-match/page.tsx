'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import Link from 'next/link';
import { Handshake, MessageSquare, UserCheck, ArrowRightLeft } from 'lucide-react';
import Reveal from '../components/Reveal';

const steps = [
  {
    icon: <MessageSquare className="size-5 text-brand-blue" />,
    title: 'You tell me about your goals',
    body: 'Sellers and buyers who want full-service representation: reach out with your price range, areas, timeline, and how you like to work. The more detail, the better the match.',
  },
  {
    icon: <UserCheck className="size-5 text-brand-blue" />,
    title: 'I review and curate',
    body: "I identify 1–3 agents from my trusted network who are genuinely well-suited for your property and situation, not just whoever's available.",
  },
  {
    icon: <ArrowRightLeft className="size-5 text-brand-blue" />,
    title: 'I make the introduction',
    body: 'I send a warm introductory email connecting you both and share relevant context so the conversation starts from a place of understanding, not cold small talk.',
  },
  {
    icon: <Handshake className="size-5 text-brand-blue" />,
    title: 'You take it from there',
    body: 'Interview your match, ask hard questions, and decide. My job is the connection, the relationship and transaction are between you and your agent.',
  },
];

export default function AgentMatchPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Hero */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionBadge>Agent Matchmaking</SectionBadge>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            If you need full-service representation, you deserve an agent who&apos;s actually{' '}
            <span className="text-brand-gold">right for you.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            With thousands of agents in Middle Tennessee, choosing the right one shouldn&apos;t be a coin flip. For{' '}
            <strong className="font-semibold text-brand-navy">sellers</strong>, Kayla connects you with listing
            agents who fit your property, your neighborhood, and your goals. For{' '}
            <strong className="font-semibold text-brand-navy">buyers</strong> who want a full-service buyer&apos;s
            agent, not BuyUnrepped&apos;s flat-fee model, she helps you find someone skilled, ethical, and
            well-matched to how you buy. Over a decade building relationships across this market means every
            introduction is based on fit and track record.
          </p>

          <div className="mt-8 rounded-2xl border border-brand-gold/40 bg-brand-cream p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-navy">My promise to you</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
              This is a merit-based match. I connect you with agents based on their track record, local expertise,
              and fit with your specific situation. If BuyUnrepped receives compensation in connection with a match,
              we will disclose the nature of that relationship before you engage the referred provider. You are free
              to choose any agent.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact?interest=Agent+Matchmaking&role=seller"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-7 text-[15px] font-bold text-brand-navy shadow-sm transition-colors hover:bg-[#e8b93d]"
            >
              Seller: request a match
            </Link>
            <Link
              href="/contact?interest=Agent+Matchmaking&role=buyer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 px-7 text-[15px] font-semibold text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-gray-50"
            >
              Buyer: find a full-service agent
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <Reveal as="section" className="border-t border-gray-100 bg-brand-gray py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">The process</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            How the agent match works
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-blue/10">
                    {step.icon}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-brand-navy">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-600">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-navy p-7 sm:flex-row sm:items-center md:p-8">
            <p className="max-w-md text-[17px] italic leading-snug text-white/90">
              &ldquo;Tell me your goals and I will make a thoughtful introduction to an agent who fits your
              situation.&rdquo;
            </p>
            <Link
              href="/contact?interest=Agent+Matchmaking"
              className="inline-flex shrink-0 min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-7 text-[15px] font-bold text-brand-navy shadow-sm transition-colors hover:bg-[#e8b93d]"
            >
              Let&apos;s discuss your situation
            </Link>
          </div>
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}
