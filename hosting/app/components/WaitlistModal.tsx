'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { X } from 'lucide-react';

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
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        throw new Error('Failed to submit');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    closeModal();
    // Reset state after animation
    setTimeout(() => {
      setStatus('idle');
      setEmail('');
      setErrorMessage('');
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold font-serif mb-2">You're on the list!</h2>
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
              <h2 className="text-2xl font-bold font-serif mb-2">Join the Waitlist</h2>
              <p className="text-gray-500">
                Be the first to know when BuyUnrepped launches in Tennessee. Save thousands on your next home purchase.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
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
      {children || 'Join Waitlist'}
    </button>
  );
}
