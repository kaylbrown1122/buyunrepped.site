'use client';

import { FormEvent, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const emailFromQuery = new URLSearchParams(window.location.search).get('email');
    if (emailFromQuery) setEmail(emailFromQuery);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || 'Unable to update email preferences');

      setStatus('success');
      setMessage('You have been unsubscribed from BuyUnrepped marketing email.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to update email preferences');
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy">
      <Header />
      <main id="main-content" className="mx-auto flex min-h-[60vh] max-w-xl items-center px-4 py-20">
        <section className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Email preferences</h1>
          <p className="mt-3 text-gray-600">
            Enter the email address you would like to unsubscribe from BuyUnrepped marketing messages.
          </p>

          {status === 'success' ? (
            <p role="status" className="mt-6 rounded-lg bg-green-50 p-4 text-green-800">
              {message}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label htmlFor="unsubscribe-email" className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <input
                id="unsubscribe-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
              {status === 'error' && <p role="alert" className="text-sm text-red-600">{message}</p>}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-brand-navy px-5 py-3 font-bold text-white disabled:opacity-50"
              >
                {status === 'loading' ? 'Updating…' : 'Unsubscribe'}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
