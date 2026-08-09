'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useSpamGuard } from '../../lib/useSpamGuard';
import { DEFAULT_LEAD_QUALIFIER } from '../../lib/leadQualifiers';
import LeadQualifierSelect from './LeadQualifierSelect';

const DEFAULT_WAITLIST_SOURCE = 'website_waitlist';

export interface WaitlistOpenOptions {
  source?: string;
  defaultCity?: string;
  defaultState?: string;
  defaultInterestedIn?: string;
  requireLocation?: boolean;
  title?: string;
  description?: string;
}

interface WaitlistModalOptions {
  source: string;
  defaultCity: string;
  defaultState: string;
  defaultInterestedIn: string;
  requireLocation: boolean;
  title: string;
  description: string;
}

const DEFAULT_MODAL_OPTIONS: WaitlistModalOptions = {
  source: DEFAULT_WAITLIST_SOURCE,
  defaultCity: '',
  defaultState: '',
  defaultInterestedIn: DEFAULT_LEAD_QUALIFIER,
  requireLocation: false,
  title: 'Stay in the loop',
  description:
    'BuyUnrepped currently offers early-access services in Middle Tennessee. Join the list for availability updates and buyer resources.',
};

interface WaitlistContextType {
  isOpen: boolean;
  openModal: (options?: string | WaitlistOpenOptions) => void;
  closeModal: () => void;
  modalOptions: WaitlistModalOptions;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

function resolveModalOptions(input?: string | WaitlistOpenOptions): WaitlistModalOptions {
  if (typeof input === 'string') {
    return { ...DEFAULT_MODAL_OPTIONS, source: input.trim() || DEFAULT_WAITLIST_SOURCE };
  }

  return {
    source: input?.source?.trim() || DEFAULT_WAITLIST_SOURCE,
    defaultCity: input?.defaultCity?.trim() || '',
    defaultState: input?.defaultState?.trim() || '',
    defaultInterestedIn: input?.defaultInterestedIn?.trim() || DEFAULT_LEAD_QUALIFIER,
    requireLocation: Boolean(input?.requireLocation),
    title: input?.title?.trim() || DEFAULT_MODAL_OPTIONS.title,
    description: input?.description?.trim() || DEFAULT_MODAL_OPTIONS.description,
  };
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<WaitlistModalOptions>(DEFAULT_MODAL_OPTIONS);

  const openModal = (options?: string | WaitlistOpenOptions) => {
    setModalOptions(resolveModalOptions(options));
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <WaitlistContext.Provider value={{ isOpen, openModal, closeModal, modalOptions }}>
      {children}
      <WaitlistModal />
    </WaitlistContext.Provider>
  );
}

function WaitlistModal() {
  const { isOpen, modalOptions, closeModal } = useWaitlist();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [interestedIn, setInterestedIn] = useState<string>(DEFAULT_LEAD_QUALIFIER);
  const [message, setMessage] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const spamGuard = useSpamGuard();

  useEffect(() => {
    if (isOpen) {
      setCity(modalOptions.defaultCity);
      setState(modalOptions.defaultState);
      setInterestedIn(modalOptions.defaultInterestedIn);
    }
  }, [isOpen, modalOptions.defaultCity, modalOptions.defaultState, modalOptions.defaultInterestedIn]);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setCity('');
    setState('');
    setInterestedIn(DEFAULT_LEAD_QUALIFIER);
    setMessage('');
    setMarketingOptIn(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !marketingOptIn) return;
    if (modalOptions.requireLocation && (!city.trim() || !state.trim())) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          city: city.trim() || undefined,
          state: state.trim() || undefined,
          interestedIn,
          message: message.trim() || undefined,
          marketingOptIn,
          source: modalOptions.source,
          ...spamGuard.getPayload(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        resetForm();
      } else {
        const data = await response.json().catch(() => null);
        spamGuard.refreshChallenge();
        throw new Error(data?.error || 'Failed to submit');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setStatus('idle');
      resetForm();
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onKeyDown={handleKeyDown}>
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-modal-title"
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-lg"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 id="waitlist-modal-title" className="text-2xl font-bold mb-2">You&apos;re on the list!</h2>
            <p className="text-gray-500 mb-6">
              We&apos;ll notify you when BuyUnrepped expands into your market and share buyer resources along the way.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-brand-blue text-white font-bold rounded-full hover:bg-cyan-700 transition-colors"
            >
              Got it
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 id="waitlist-modal-title" className="text-2xl font-bold mb-2">
                {modalOptions.title}
              </h2>
              <p className="text-gray-500">{modalOptions.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input {...spamGuard.honeypotFieldProps} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="waitlist-first-name" className="block text-sm font-bold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="waitlist-first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="waitlist-last-name" className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="waitlist-last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  aria-required="true"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'waitlist-error' : undefined}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                />
              </div>

              {modalOptions.requireLocation && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="waitlist-city" className="block text-sm font-bold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="waitlist-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Your city"
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="waitlist-state" className="block text-sm font-bold text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      id="waitlist-state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="TN"
                      required
                      aria-required="true"
                      maxLength={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all uppercase"
                    />
                  </div>
                </div>
              )}

              <LeadQualifierSelect
                id="waitlist-interested-in"
                value={interestedIn}
                onChange={setInterestedIn}
              />

              <div>
                <label htmlFor="waitlist-message" className="block text-sm font-bold text-gray-700 mb-2">
                  Anything else?
                </label>
                <textarea
                  id="waitlist-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you're looking for — timing, market, questions, anything else."
                  className="w-full resize-none px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-snug text-gray-600">
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                  required
                  className="mt-0.5 size-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
                <span>
                  I agree to receive BuyUnrepped email updates and buyer resources. I can unsubscribe at any time.
                  See our{' '}
                  <Link href="/privacy" className="text-brand-blue underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {spamGuard.question && (
                <div>
                  <label htmlFor="waitlist-captcha" className="block text-sm font-bold text-gray-700 mb-2">
                    Quick check: {spamGuard.question}
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    id="waitlist-captcha"
                    value={spamGuard.captchaAnswer}
                    onChange={(e) => spamGuard.setCaptchaAnswer(e.target.value)}
                    autoComplete="off"
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>
              )}

              {status === 'error' && (
                <p id="waitlist-error" role="alert" className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Keep me posted'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                This consent is for email only and is not consent to marketing calls or texts.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

interface WaitlistButtonProps {
  className?: string;
  children?: React.ReactNode;
  source?: string;
  defaultCity?: string;
  defaultState?: string;
  defaultInterestedIn?: string;
  requireLocation?: boolean;
  title?: string;
  description?: string;
}

export function WaitlistButton({
  className,
  children,
  source,
  defaultCity,
  defaultState,
  defaultInterestedIn,
  requireLocation,
  title,
  description,
}: WaitlistButtonProps) {
  const { openModal } = useWaitlist();
  return (
    <button
      type="button"
      onClick={() =>
        openModal({
          source,
          defaultCity,
          defaultState,
          defaultInterestedIn,
          requireLocation,
          title,
          description,
        })
      }
      className={className}
    >
      {children || 'Join Early Access'}
    </button>
  );
}
