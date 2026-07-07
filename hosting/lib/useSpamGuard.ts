'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Shared honeypot + math-challenge spam guard for lead-capture forms.
 *
 * Honeypot field convention: spread `honeypotFieldProps` onto a real text
 * input, named something a bot would plausibly fill in (e.g. "company"),
 * positioned off-screen (not display:none — some bots skip hidden fields)
 * and marked aria-hidden so screen reader users never encounter it.
 */
export function useSpamGuard() {
  const [question, setQuestion] = useState('');
  const [token, setToken] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const fetchChallenge = useCallback(async () => {
    try {
      const res = await fetch('/api/spam-challenge');
      const data = await res.json();
      setQuestion(data.question);
      setToken(data.token);
    } catch {
      setQuestion('');
      setToken('');
    }
  }, []);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  const refreshChallenge = useCallback(() => {
    setCaptchaAnswer('');
    fetchChallenge();
  }, [fetchChallenge]);

  const honeypotFieldProps = {
    type: 'text' as const,
    name: 'company',
    autoComplete: 'off',
    tabIndex: -1,
    'aria-hidden': true,
    value: honeypot,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHoneypot(e.target.value),
    className: 'absolute left-[-9999px] top-auto w-px h-px overflow-hidden',
  };

  const getPayload = useCallback(
    () => ({
      captchaToken: token,
      captchaAnswer,
      honeypot,
    }),
    [token, captchaAnswer, honeypot]
  );

  return {
    question,
    captchaAnswer,
    setCaptchaAnswer,
    honeypotFieldProps,
    getPayload,
    refreshChallenge,
    isReady: Boolean(token),
  };
}
