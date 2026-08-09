'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Handshake, MessageSquare, Users } from 'lucide-react';
import { buildContactUrl } from '../../lib/contactUrl';

const agentActions = [
  {
    icon: MessageSquare,
    title: 'Request a chat',
    description: 'Email us to set up a short conversation about how BuyUnrepped works on your transactions.',
    href: buildContactUrl({
      interest: 'I just want to chat',
      message: "I'm an agent and would like to schedule a chat about BuyUnrepped.",
    }),
    cta: 'Email to chat',
    primary: true,
  },
  {
    icon: Users,
    title: 'Refer an unrepped buyer',
    description: 'Send a buyer our way when they want structure without a traditional buyer agent.',
    href: buildContactUrl({
      interest: "I'm an agent who is curious",
      message: "I'd like to refer an unrepped buyer.",
    }),
    cta: 'Refer a buyer',
    primary: false,
  },
  {
    icon: Calendar,
    title: 'Book Kayla for weekly meetings',
    description: 'Request a recurring touchpoint for your office, team, or brokerage.',
    href: buildContactUrl({
      interest: "I'm an agent who is curious",
      message: "I'd like to book Kayla for weekly meetings with our team.",
    }),
    cta: 'Request weekly meetings',
    primary: false,
  },
  {
    icon: Handshake,
    title: 'Become a referral partner',
    description: 'We are selective about partnerships and cannot guarantee acceptance.',
    href: buildContactUrl({
      interest: 'Interested in opening my own BuyUnrepped office',
      message: "I'd like to learn about becoming a BuyUnrepped referral partner.",
    }),
    cta: 'Apply to partner',
    primary: false,
  },
] as const;

export default function ForAgentsCta() {
  return (
    <section className="py-16 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-blue to-cyan-700 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">For Agents</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              Work with BuyUnrepped
            </h2>
            <p className="text-lg text-blue-100">
              Email us to request a chat, refer a buyer, book a recurring meeting, or explore a referral partnership.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {agentActions.map(({ icon: Icon, title, description, href, cta, primary }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/15 bg-white/10 p-6 text-left backdrop-blur-sm"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100">{description}</p>
                <Link
                  href={href}
                  className={`mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                    primary
                      ? 'bg-brand-gold text-brand-navy hover:bg-[#e8b93d]'
                      : 'border border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  {cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
