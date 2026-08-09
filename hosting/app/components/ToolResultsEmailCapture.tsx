'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useSpamGuard } from '../../lib/useSpamGuard';
import { DEFAULT_LEAD_QUALIFIER } from '../../lib/leadQualifiers';
import LeadQualifierSelect from './LeadQualifierSelect';

interface ToolResultsEmailCaptureProps {
  source: string;
  toolLabel: string;
}

export default function ToolResultsEmailCapture({ source, toolLabel }: ToolResultsEmailCaptureProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [interestedIn, setInterestedIn] = useState<string>(DEFAULT_LEAD_QUALIFIER);
  const [message, setMessage] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const spamGuard = useSpamGuard();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !marketingOptIn) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          interestedIn,
          message: message.trim() || undefined,
          marketingOptIn,
          source,
          ...spamGuard.getPayload(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        spamGuard.refreshChallenge();
        throw new Error(data?.error || 'Failed to submit');
      }

      setStatus('success');
      setFirstName('');
      setLastName('');
      setEmail('');
      setInterestedIn(DEFAULT_LEAD_QUALIFIER);
      setMessage('');
      setMarketingOptIn(false);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
        You&apos;re on the list. We&apos;ll send buyer resources and updates to your inbox.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4">
      <p className="text-sm font-bold text-brand-navy">Email me these {toolLabel} results</p>
      <p className="mt-1 text-xs leading-relaxed text-gray-500">
        Optional. Join for buyer resources and updates — your calculator stays usable without signing up.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input {...spamGuard.honeypotFieldProps} />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First name"
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Last name"
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
        <LeadQualifierSelect
          id={`${source}-interested-in`}
          value={interestedIn}
          onChange={setInterestedIn}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 appearance-none bg-white"
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={2}
          placeholder="Anything else you'd like us to know?"
          className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
        <label className="flex cursor-pointer items-start gap-2 text-xs leading-snug text-gray-600">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(event) => setMarketingOptIn(event.target.checked)}
            required
            className="mt-0.5 size-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
          />
          <span>
            I agree to receive BuyUnrepped email updates. See our{' '}
            <Link href="/privacy" className="text-brand-blue underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {spamGuard.question && (
          <div>
            <label htmlFor={`${source}-captcha`} className="mb-1 block text-xs font-semibold text-gray-700">
              Quick check: {spamGuard.question}
            </label>
            <input
              id={`${source}-captcha`}
              type="text"
              inputMode="numeric"
              value={spamGuard.captchaAnswer}
              onChange={(event) => spamGuard.setCaptchaAnswer(event.target.value)}
              autoComplete="off"
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        )}
        {status === 'error' && (
          <p role="alert" className="text-xs text-red-600">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-brand-blue px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending…' : 'Email me these numbers'}
        </button>
      </form>
    </div>
  );
}
