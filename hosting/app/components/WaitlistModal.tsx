'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { X } from 'lucide-react';
import { useSpamGuard } from '../../lib/useSpamGuard';

interface WaitlistContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <WaitlistContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <WaitlistModal />
    </WaitlistContext.Provider>
  );
}

function WaitlistModal() {
  const { isOpen, closeModal } = useWaitlist();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const spamGuard = useSpamGuard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, ...spamGuard.getPayload() }),
      });

      if (response.ok) {
        setStatus('success');
        setFirstName('');
        setLastName('');
        setEmail('');
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
    // Reset state after animation
    setTimeout(() => {
      setStatus('idle');
      setFirstName('');
      setLastName('');
      setEmail('');
      setErrorMessage('');
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-modal-title"
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close button */}
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
            <h2 id="waitlist-modal-title" className="text-2xl font-bold mb-2">You're on the list!</h2>
            <p className="text-gray-500 mb-6">
              We'll notify you when BuyUnrepped is ready to help you save on your home purchase.
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
              <h2 id="waitlist-modal-title" className="text-2xl font-bold mb-2">Stay in the loop</h2>
              <p className="text-gray-500">
                BuyUnrepped is live in Tennessee today, with more states on the way. Drop your email and
                we&apos;ll keep you posted on new locations and buyer tips.
              </p>
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
                {status === 'loading' ? 'Joining...' : 'Join Early Access'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                We'll never share your email. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// Reusable button component for server components
interface WaitlistButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function WaitlistButton({ className, children }: WaitlistButtonProps) {
  const { openModal } = useWaitlist();
  return (
    <button onClick={openModal} className={className}>
      {children || 'Join Early Access'}
    </button>
  );
}
