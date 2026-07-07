'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { Copy, Check, Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAppUrl } from '../../lib/appUrl';
import Reveal from '../components/Reveal';

/* ── Instagram reel link ────────────────────────────────────────────── */
function ReelLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue"
    >
      <Instagram className="size-4 text-brand-blue" aria-hidden />
      Watch the Instagram reel
    </a>
  );
}

/* ── Copy-to-clipboard script block ─────────────────────────────────── */
function ScriptBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable, no-op */
    }
  };

  return (
    <div className="relative mt-4 rounded-xl border border-brand-gold/40 bg-brand-cream p-5 pr-14 sm:p-6 sm:pr-16">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">Script</span>
      <p className="mt-2 text-[15px] leading-relaxed text-gray-700">{children}</p>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy script'}
        className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-lg border border-brand-navy/15 bg-white text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-brand-gray focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
      >
        {copied ? <Check className="size-4 text-brand-green" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      </button>
    </div>
  );
}

/* ── Table of contents ──────────────────────────────────────────────── */
const toc = [
  { id: 'schedule', label: 'Schedule the showing' },
  { id: 'drivers-license', label: "They asked for my driver's license" },
  { id: 'loved-it', label: 'After you loved the property' },
  { id: 'agent-time', label: "Agent isn't available then" },
  { id: 'cant-reach', label: "Can't reach the agent" },
  { id: 'wont-answer', label: "They won't answer questions" },
  { id: 'multiple-offers', label: 'They said multiple offers' },
  { id: 'what-wins', label: 'What wins in multiple offers' },
  { id: 'commission', label: 'When to mention commission' },
  { id: 'preapproval', label: 'Pre-approval amount' },
  { id: 'cash', label: "Paying cash, no lender" },
  { id: 'wear', label: 'What to wear' },
  { id: 'dos-donts', label: "At the showing: do's & don'ts" },
  { id: 'find-homes', label: 'Find the agent via Homes.com' },
  { id: 'find-zillow', label: 'Find the agent via Zillow' },
  { id: 'find-redfin', label: 'Find the agent via Redfin' },
];

export default function PlaybookPage() {
  const appUrl = getAppUrl();

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionBadge>For Buyers · Playbook</SectionBadge>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[64px]">
            Tips, tricks &amp; scripts <span className="text-brand-gold">before the offer</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
            You&apos;re approved. You know your title company. Now it&apos;s time to talk to a listing agent. From
            scheduling the showing, to asking about the property, to submitting an actual offer, we&apos;ve got you
            covered.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-gold px-7 py-3 text-[15px] font-bold text-brand-navy shadow-sm transition-all hover:bg-[#e8b93d]"
            >
              Continue to App
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 px-6 py-3 text-[15px] font-semibold text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-white"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12 lg:px-8">
        {/* Contents */}
        <nav aria-label="Playbook contents" className="mb-10 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">Contents</h2>
          <ul className="mt-4 space-y-2 border-l border-gray-200 pl-4">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[13px] leading-snug text-gray-500 transition-colors hover:text-brand-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Body */}
        <div className="max-w-2xl space-y-12">
          {/* Schedule */}
          <Reveal as="section" id="schedule" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">Schedule the showing</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              First, confirm you&apos;ve got the right agent. If they say yes, you&apos;re the listing agent,
              you&apos;re off to the races.
            </p>
            <ScriptBlock>
              Hi [agent name], my name is [your name]. Are you the listing agent for [property address]? If so,
              I&apos;d love to set up a showing, I won&apos;t be represented by an agent on this purchase. Do you have
              any availability on [ideal showing days]?
            </ScriptBlock>
          </Reveal>

          {/* Driver's license */}
          <Reveal as="section" id="drivers-license" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">The agent asked for my driver&apos;s license. Should I be worried?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              They may ask for a photo of your ID plus pre-approval or proof of funds. This is common practice, it
              helps the agent protect their own safety and their seller&apos;s. Don&apos;t get weird about it! If you can
              afford to buy the house, show them.
            </p>
          </Reveal>

          {/* Loved it */}
          <Reveal as="section" id="loved-it" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">You loved the property, what to say before the offer</h2>
            <div className="mt-5 space-y-3">
              <Bubble who="You">
                Hi again! Thank you so much for taking the time to meet today, I really appreciate it. Do you currently
                have any offers?
              </Bubble>
              <Bubble who="Agent" note>
                They&apos;ll say yes or no. It doesn&apos;t change your response.
              </Bubble>
              <Bubble who="You">
                Great, thank you! I plan to submit an offer as soon as possible, please let me know if you accept
                anything before I can get my ducks in a row. Could you send over any disclosures or association
                documents you have?
              </Bubble>
              <Bubble who="Agent" note>
                They should send what you need.
              </Bubble>
              <Bubble who="You">
                Thanks again! No promises, but does your seller have a preferred closing date or title company? Is there
                anything I should consider including or excluding in the offer?
              </Bubble>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
              After that last response, you should be just about ready to put your offer together.
            </p>
          </Reveal>

          {/* Agent time */}
          <Reveal as="section" id="agent-time" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">The listing agent isn&apos;t available when I want?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Be extra polite and try to find a time that works for both of you. This is all very new to the industry,
              and listing agents aren&apos;t used to showing their own listings yet. An agent may be wary of you, please
              don&apos;t take offense. You&apos;re building trust from a blank slate, so allow for flexibility. They have
              lives too. And keep in mind: a lot of agents don&apos;t love working with unrepresented buyers. That
              doesn&apos;t make them bad people, it&apos;s just new. Be patient.
            </p>
          </Reveal>

          {/* Can't reach */}
          <Reveal as="section" id="cant-reach" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">I can&apos;t get ahold of the agent. What do I do?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              The good (and bad) news: if the agent is unresponsive to you, they&apos;d probably be unresponsive to a
              buyer&apos;s agent too. Your next best bet is to call the agent&apos;s broker or office and let them know
              you can&apos;t reach the agent. <strong className="font-semibold text-brand-navy">Don&apos;t be a jerk</strong>,
              maybe their info is wrong online, maybe they&apos;re on vacation, maybe there was a death in the family. The
              broker should be able to help. If the broker isn&apos;t helpful, that&apos;s not a great sign. Occasionally
              you&apos;ll hit MLS-only listings that are genuinely hard to contact, if you really want in on one of
              those, a traditional agent might have better luck (though they&apos;ll often run into the same wall).
            </p>
          </Reveal>

          {/* Won't answer */}
          <Reveal as="section" id="wont-answer" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">I reached the agent, but they won&apos;t answer my questions.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              It happens, and it usually doesn&apos;t matter whether you&apos;re a buyer or an agent. Sometimes people
              are just rude. All you can do is move forward, make the offer, and hope for the best.
            </p>
          </Reveal>

          {/* Multiple offers */}
          <Reveal as="section" id="multiple-offers" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">They said they have multiple offers. Are they lying?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Tough love: you don&apos;t know that they are. Our brokers have been humbled enough times that we rarely
              ignore a multiple-offer declaration. Do you want the house? Are you willing to risk losing it? If they say
              they have an offer in hand, we think it&apos;s safest to believe them. This applies to new construction
              too.
            </p>
          </Reveal>

          {/* What wins */}
          <Reveal as="section" id="what-wins" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">How do I know what will win in multiple offers?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              You&apos;ve already got leverage by not needing buyer-agent compensation, that&apos;s good. Sometimes you
              can just ask the agent directly.
            </p>
            <ScriptBlock>
              Listen, I don&apos;t want to waste anyone&apos;s time. Can you tell me what it&apos;d take to secure this
              home?
            </ScriptBlock>
          </Reveal>

          {/* Commission */}
          <Reveal as="section" id="commission" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">When should I mention commission?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Don&apos;t. What a listing agent gets paid is between them and their seller, and it shouldn&apos;t affect
              the terms of your offer. By not using an agent, you simply have more leverage than a buyer who is.
            </p>
          </Reveal>

          {/* Pre-approval */}
          <Reveal as="section" id="preapproval" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">My pre-approval is higher than my comfort budget. Will that hurt my negotiating power?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Mixed responses on this one. First: a letter tailored to the property address from your local lender always
              bodes well, it shows you&apos;re working with someone responsive. As for the amount, we&apos;re of the
              mindset that a home is worth what you&apos;re <em>willing</em> to pay, not what you can technically afford.
              So the number you put on the letter can change with the situation. Multiple offers? Show the agent how much
              buying power you have, it makes them more confident you&apos;ll close. Home&apos;s been sitting a week and
              you&apos;re the only one in the ring? Have your lender tailor the letter to your offer price. Lenders do
              this for agents all the time; they want your offer accepted and won&apos;t mind.
            </p>
          </Reveal>

          {/* Cash */}
          <Reveal as="section" id="cash" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">I&apos;m paying cash and don&apos;t have a lender. What do I use?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Great position to be in. It comes down to your privacy comfort. If you just need something for the showing
              and you&apos;re in a hurry, a quick screenshot of the account you&apos;ll be using works. If you have a
              little more time, have your financial advisor or banker write a letter stating you have readily available
              funds in excess of the property value.
            </p>
          </Reveal>

          {/* Wear */}
          <Reveal as="section" id="wear" className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight">What do I wear to the showing?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Whatever you want, just be respectful. Remember, you&apos;re coming to the listing agent with a blank
              slate, so you have to earn credibility. You don&apos;t need a suit, but leave the pajama pants at home and
              keep it tidy. One note: they may ask you to remove your shoes or wear booties. If you&apos;re in stilettos,
              bring heel protectors or be ready to take them off, no one wants to come home to a swiss-cheese floor.
            </p>
          </Reveal>

          {/* Do's & don'ts */}
          <Reveal as="section" id="dos-donts" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">At the showing: do&apos;s &amp; don&apos;ts</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Don&apos;t get it twisted, the listing agent works for the seller. Agents weigh everything when they
              advise on offers. If they have one buyer who seems indifferent and difficult, and another who&apos;s
              genuinely excited, they&apos;ll have more faith in the one who clearly <em>wants</em> it. Moral: it&apos;s
              okay to show that you love the home.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-green/30 bg-brand-green/5 p-5">
                <h4 className="text-sm font-bold uppercase tracking-wide text-[#187a49]">Do</h4>
                <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-gray-600">
                  <li>Compliment the home.</li>
                  <li>If you have questions, ask them.</li>
                  <li>Keep a little distance from the agent, but don&apos;t wander off unless they suggest it, they don&apos;t know you yet, and that&apos;s okay. Don&apos;t take it personally.</li>
                  <li>Be kind if the agent knows less about the home than you expected.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <h4 className="text-sm font-bold uppercase tracking-wide text-red-600">Don&apos;t</h4>
                <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-gray-600">
                  <li>Don&apos;t linger for an hour. A typical showing takes under 30 minutes.</li>
                  <li>Don&apos;t discuss price here, let the offer speak.</li>
                  <li>Don&apos;t talk commission. It&apos;s not your business.</li>
                  <li>Don&apos;t diss the seller, the home, or the style. Not cool.</li>
                  <li>Don&apos;t say anything you wouldn&apos;t want repeated, even outside. Cameras are everywhere.</li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Homes.com */}
          <Reveal as="section" id="find-homes" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">Find the listing agent via Homes.com</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              We&apos;re not affiliated with Homes.com and this isn&apos;t an ad, but we love them for their
              transparency. They connect you to the listing agent directly.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Image
                src="/images/playbook/find-agent-homes-com.png"
                alt="Homes.com listing page with the paid-lead 'Send a Message' card crossed out and the real Listing Agent / Co-Listing Agent panel circled"
                width={2372}
                height={1238}
                className="w-full"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue">Note</span>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                If you use the &ldquo;Send a Message&rdquo; button, it routes through Homes.com&apos;s system and can look
                a little spammy on the agent&apos;s end, they get <strong className="font-semibold text-brand-navy">so
                much spam</strong>, and this feature isn&apos;t common enough for agents to expect it yet. If you
                don&apos;t hear back, use the agent&apos;s listed contact info directly, circled above, in the listing
                details.
              </p>
            </div>
          </Reveal>

          {/* Zillow */}
          <Reveal as="section" id="find-zillow" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">Find the listing agent via Zillow (a little tougher)</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Look for the agent&apos;s own contact info on the listing. If you click the big &ldquo;Request a
              Showing&rdquo; or &ldquo;Contact Agent&rdquo; buttons, your info goes to agents <em>paying</em> Zillow for
              buyer leads, <strong className="font-semibold text-brand-navy">not the listing agent</strong>. Selling
              leads is how Zillow makes money. We&apos;re not knocking it, just explaining it.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Image
                src="/images/playbook/find-agent-zillow.png"
                alt="Zillow listing page with the 'Request a tour' and 'Contact agent' paid-lead buttons crossed out and the real listing agent's name and phone number circled in the listing details"
                width={1634}
                height={1424}
                className="w-full"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue">Note</span>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                We&apos;re here to help you buy without a traditional buyer&apos;s agent, not to waste the time of
                hard-working agents paying for leads. If you don&apos;t intend to hire any of the agents behind that
                &ldquo;Request a Showing&rdquo; button, reach out to the listing agent directly instead, their name
                and number are circled above, in the &ldquo;Listing Provided by&rdquo; line.
              </p>
            </div>
            <ReelLink href="https://www.instagram.com/reel/DJ1tYO5NOki/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" />
          </Reveal>

          {/* Redfin */}
          <Reveal as="section" id="find-redfin" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">Find the listing agent via Redfin</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Redfin is a search tool <em>and</em> a brokerage, which creates a mismatch: request a tour or start an
              offer through the site, and you&apos;re usually connected with a Redfin agent, not the actual listing
              agent. The real listing agent&apos;s name and contact info are further down the page, in the listing
              details.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Image
                src="/images/playbook/find-agent-redfin-1.png"
                alt="Redfin listing page with 'Request showing,' 'Ask a question,' and 'Start an offer' crossed out, and the real 'Listed by' agent name and contact number circled further down the page"
                width={1810}
                height={1414}
                className="w-full"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue">Note</span>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                Don&apos;t use &ldquo;Start an offer&rdquo;, it looks like the fastest path, but it does not go to the
                listing agent.
              </p>
            </div>
            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Image
                src="/images/playbook/find-agent-redfin-2.png"
                alt="Redfin 'Offer terms received' confirmation screen, circled, with a note that this is not the listing agent and sends your info to an agent who has paid for lead generation through Redfin"
                width={2350}
                height={1014}
                className="w-full"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue">Note</span>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                This is what &ldquo;Start an offer&rdquo; actually gets you: a &ldquo;local agent&rdquo; who paid Redfin
                for the lead, not the person who represents the seller.
                <strong className="font-semibold text-brand-navy"> Not the listing agent.</strong> Use the circled
                contact info from the listing details instead.
              </p>
            </div>
            <ReelLink href="https://www.instagram.com/reel/DJ4LUtMN_be/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" />
          </Reveal>

          {/* Vendor list cross-link */}
          <div className="rounded-2xl border border-brand-gold/40 bg-brand-cream p-6">
            <h3 className="text-lg font-bold tracking-tight">Once you&apos;re ready to write the offer</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
              You&apos;ll need a title company and, if you&apos;re financing, a lender. Kayla keeps a running list of who
              she trusts in Middle Tennessee.
            </p>
            <Link
              href="/vendors"
              className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-navy underline decoration-gray-300 underline-offset-4 hover:decoration-brand-blue"
            >
              See Kayla&apos;s title, lender &amp; warranty picks →
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="border-t border-gray-200 pt-8 text-[13px] leading-relaxed text-gray-400">
            Educational only, not legal advice. Listing agents represent sellers. BuyUnrepped is a licensed Tennessee
            brokerage; our flat-fee services do not include buyer agency or negotiation on your behalf.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ── Dialogue bubble ────────────────────────────────────────────────── */
function Bubble({ who, note, children }: { who: string; note?: boolean; children: React.ReactNode }) {
  const isYou = who === 'You';
  return (
    <div className={`flex ${isYou ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
          note
            ? 'border border-dashed border-gray-300 bg-brand-gray italic text-gray-500'
            : isYou
              ? 'bg-brand-navy text-white'
              : 'border border-gray-200 bg-white text-gray-700'
        }`}
      >
        <span className={`mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] ${note ? 'text-gray-400' : isYou ? 'text-brand-gold' : 'text-brand-blue'}`}>
          {who}
        </span>
        {children}
      </div>
    </div>
  );
}
