'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';

const postalAddress = '2509 Cruzen St, Nashville, TN 37211';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      <main id="main-content">
        <section className="mx-auto max-w-4xl px-4 pb-8 pt-20 text-center">
          <SectionBadge>Legal</SectionBadge>
          <h1 className="mb-6 mt-4 text-5xl font-bold md:text-6xl">Privacy Policy</h1>
          <p className="text-lg text-gray-500">Updated: July 15, 2026</p>
        </section>

        <section className="py-8 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                This Privacy Policy explains how BuyUnrepped, Inc. (&ldquo;BuyUnrepped,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares information submitted through
                buyunrepped.com. It applies to this marketing website and its contact, waitlist, vendor-resource,
                and scheduling experiences.
              </p>

              <h2 className="mt-12 text-2xl font-bold text-brand-navy">Information we collect</h2>
              <p>We collect information you choose to provide, including:</p>
              <ul>
                <li>your name, email address, interest selection, and message when you contact us;</li>
                <li>your name and email address when you join our email waitlist or unlock vendor resources; and</li>
                <li>information you provide to Calendly when you schedule an appointment.</li>
              </ul>
              <p>
                We also collect limited technical information needed to operate and protect the site, including
                information submitted through our spam-prevention challenge. Our calculators operate in your browser;
                we do not store calculator inputs through this website.
              </p>

              <h2 className="mt-12 text-2xl font-bold text-brand-navy">How we use information</h2>
              <p>We use information to respond to your inquiry, provide requested resources, operate and protect the site, and maintain our records.</p>
              <p>
                We send marketing email only when you affirmatively opt in. Marketing messages may include buyer
                resources, company updates, and service information. You may unsubscribe at any time using the link
                in a marketing email or by contacting us.
              </p>
              <p>
                We do not use this website&apos;s forms to obtain consent for marketing calls or texts. If we offer
                marketing calls or texts in the future, we will request separate consent where required.
              </p>

              <h2 className="mt-12 text-2xl font-bold text-brand-navy">Service providers and disclosures</h2>
              <p>
                We use service providers to operate the site and deliver the services you request. Depending on the
                form or feature you use, this may include Supabase for secure database storage, SendGrid for email
                delivery, Calendly for scheduling, and internal Slack or Discord notifications for our team. These
                providers receive only the information needed to perform their services for us.
              </p>
              <p>
                We may also disclose information when required by law, to protect the rights and safety of
                BuyUnrepped or others, or in connection with a corporate transaction. We do not sell personal
                information for money.
              </p>

              <h2 className="mt-12 text-2xl font-bold text-brand-navy">Third-party scheduling and links</h2>
              <p>
                Scheduling is provided through Calendly. Information you submit in Calendly is also subject to
                Calendly&apos;s privacy practices. This website may link to third-party sites; their privacy practices
                govern information you provide directly to them.
              </p>

              <h2 className="mt-12 text-2xl font-bold text-brand-navy">Your choices and requests</h2>
              <p>
                You may request access to, correction of, or deletion of personal information we hold about you,
                subject to applicable law and record-retention obligations. You may also opt out of marketing email.
                To make a request, email{' '}
                <a href="mailto:info@buyunrepped.com" className="text-brand-blue hover:underline">
                  info@buyunrepped.com
                </a>{' '}
                with the subject line &ldquo;Privacy Request.&rdquo;
              </p>
              <p>
                We will not discriminate against you for exercising privacy rights available under applicable law.
                California residents may have additional rights to know, delete, correct, or limit certain uses of
                personal information; they may submit a request using the contact information below. Tennessee
                residents may have rights under the Tennessee Information Protection Act to the extent it applies to
                our processing; residents of other states may have similar rights under their own state privacy laws.
              </p>

              <h2 className="mt-12 text-2xl font-bold text-brand-navy">Data security and retention</h2>
              <p>
                We use reasonable administrative, technical, and organizational measures designed to protect the
                information we hold. No method of transmission or storage is completely secure. We retain personal
                information only as long as reasonably necessary for the purposes described here, to comply with law,
                resolve disputes, and maintain business records.
              </p>

              <h2 className="mt-12 text-2xl font-bold text-brand-navy">Children&apos;s privacy</h2>
              <p>
                This website and BuyUnrepped&apos;s services are intended for adults. We do not knowingly collect
                personal information from children under 13.
              </p>

              <h2 className="mt-12 text-2xl font-bold text-brand-navy">Changes and contact</h2>
              <p>
                We may update this policy from time to time. We will post the updated date above when we do. Questions
                or requests may be sent to{' '}
                <a href="mailto:info@buyunrepped.com" className="text-brand-blue hover:underline">
                  info@buyunrepped.com
                </a>{' '}
                or mailed to:
              </p>
              <address className="not-italic">
                BuyUnrepped, Inc.
                <br />
                {postalAddress}
              </address>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
