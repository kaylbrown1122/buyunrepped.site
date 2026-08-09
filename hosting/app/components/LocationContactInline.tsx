'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useSpamGuard } from '../../lib/useSpamGuard';
import { DEFAULT_LEAD_QUALIFIER } from '../../lib/leadQualifiers';
import LeadQualifierSelect from './LeadQualifierSelect';

interface LocationContactInlineProps {
  formId: string;
  headline: string;
  description: string;
  defaultCity?: string;
  defaultState?: string;
  defaultMessage?: string;
  defaultInterestedIn?: string;
}

export default function LocationContactInline({
  formId,
  headline,
  description,
  defaultCity = '',
  defaultState = '',
  defaultMessage = '',
  defaultInterestedIn = DEFAULT_LEAD_QUALIFIER,
}: LocationContactInlineProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(defaultCity);
  const [state, setState] = useState(defaultState);
  const [interestedIn, setInterestedIn] = useState<string>(defaultInterestedIn);
  const [message, setMessage] = useState(defaultMessage);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const spamGuard = useSpamGuard();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !city.trim() || !state.trim()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const location = `${city.trim()}, ${state.trim().toUpperCase()}`;
    const fullMessage = [
      `Market: ${location}`,
      message.trim() ? message.trim() : 'Please notify me when BuyUnrepped is available in my market.',
    ].join('\n\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          interestedIn,
          message: fullMessage,
          marketingOptIn,
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
      setCity(defaultCity);
      setState(defaultState);
      setInterestedIn(defaultInterestedIn);
      setMessage(defaultMessage);
      setMarketingOptIn(false);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <h2 className="text-xl font-bold text-brand-navy">Message sent!</h2>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-gray-600">
          Thanks for reaching out. We usually reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm md:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brand-navy">{headline}</h2>
        <p className="mx-auto mt-2 max-w-lg text-[15px] leading-relaxed text-gray-600">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4">
        <input {...spamGuard.honeypotFieldProps} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formId}-first-name`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              First name
            </label>
            <input
              id={`${formId}-first-name`}
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div>
            <label htmlFor={`${formId}-last-name`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              Last name
            </label>
            <input
              id={`${formId}-last-name`}
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formId}-city`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              City
            </label>
            <input
              id={`${formId}-city`}
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Your city"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div>
            <label htmlFor={`${formId}-state`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              State
            </label>
            <input
              id={`${formId}-state`}
              type="text"
              value={state}
              onChange={(event) => setState(event.target.value.toUpperCase())}
              placeholder="TN"
              required
              maxLength={2}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 uppercase outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>
        <LeadQualifierSelect
          id={`${formId}-interested-in`}
          value={interestedIn}
          onChange={setInterestedIn}
        />
        <div>
          <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-semibold text-gray-700">
            Anything else?
          </label>
          <textarea
            id={`${formId}-message`}
            rows={3}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us what you need — availability updates, pricing questions, timing, anything else."
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-snug text-gray-600">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(event) => setMarketingOptIn(event.target.checked)}
            className="mt-0.5 size-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
          />
          <span>
            Optional: send me BuyUnrepped email updates and buyer resources. See our{' '}
            <Link href="/privacy" className="text-brand-blue underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {spamGuard.question && (
          <div>
            <label htmlFor={`${formId}-captcha`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              Quick check: {spamGuard.question}
            </label>
            <input
              id={`${formId}-captcha`}
              type="text"
              inputMode="numeric"
              value={spamGuard.captchaAnswer}
              onChange={(event) => spamGuard.setCaptchaAnswer(event.target.value)}
              autoComplete="off"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        )}
        {status === 'error' && (
          <p role="alert" className="text-sm text-red-600">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-xl bg-brand-navy py-3.5 text-[15px] font-bold text-white shadow-sm transition-colors hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </div>
  );
}
