import { createHmac, timingSafeEqual } from 'crypto';

const CHALLENGE_TTL_MS = 10 * 60 * 1000;

function getSecret(): string | null {
  const secret = process.env.SPAM_GUARD_SECRET;
  return secret && secret.trim() ? secret.trim() : null;
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex').slice(0, 32);
}

export function createChallenge(): { question: string; token: string } {
  const secret = getSecret();
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const expires = Date.now() + CHALLENGE_TTL_MS;
  const payload = `${a}.${b}.${expires}`;

  if (!secret) {
    console.warn('SPAM_GUARD_SECRET is not configured; spam challenge is not cryptographically verifiable');
    return { question: `What is ${a} + ${b}?`, token: `${payload}.unsigned` };
  }

  return { question: `What is ${a} + ${b}?`, token: `${payload}.${sign(payload, secret)}` };
}

export type VerifyFailureReason = 'honeypot' | 'expired' | 'invalid_signature' | 'wrong_answer' | 'malformed';
// Deliberately a single shape (not a discriminated union) -- this project's tsconfig has
// `strict: false`, and discriminated-union narrowing on a literal `ok` field requires
// strictNullChecks. An optional `reason` avoids depending on narrowing entirely.
export interface VerifyResult {
  ok: boolean;
  reason?: VerifyFailureReason;
}

export function verifyChallenge(input: {
  token: unknown;
  answer: unknown;
  honeypot: unknown;
}): VerifyResult {
  if (typeof input.honeypot === 'string' && input.honeypot.trim().length > 0) {
    return { ok: false, reason: 'honeypot' };
  }

  if (typeof input.token !== 'string') {
    return { ok: false, reason: 'malformed' };
  }

  const parts = input.token.split('.');
  if (parts.length !== 4) {
    return { ok: false, reason: 'malformed' };
  }

  const [aStr, bStr, expiresStr, providedSig] = parts;
  const a = Number(aStr);
  const b = Number(bStr);
  const expires = Number(expiresStr);

  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(expires)) {
    return { ok: false, reason: 'malformed' };
  }

  if (Date.now() > expires) {
    return { ok: false, reason: 'expired' };
  }

  const secret = getSecret();
  if (secret) {
    const payload = `${aStr}.${bStr}.${expiresStr}`;
    const expectedSig = sign(payload, secret);
    const expectedBuf = new Uint8Array(Buffer.from(expectedSig, 'hex'));
    const providedBuf = new Uint8Array(Buffer.from(providedSig, 'hex'));
    if (
      expectedBuf.length !== providedBuf.length ||
      !timingSafeEqual(expectedBuf, providedBuf)
    ) {
      return { ok: false, reason: 'invalid_signature' };
    }
  } else if (providedSig !== 'unsigned') {
    return { ok: false, reason: 'invalid_signature' };
  } else if (process.env.NODE_ENV === 'production') {
    console.error('SPAM_GUARD_SECRET is not configured in production; rejecting unsigned challenge');
    return { ok: false, reason: 'invalid_signature' };
  } else {
    console.warn('SPAM_GUARD_SECRET is not configured; accepting unsigned challenge (dev fallback only)');
  }

  const answerNum = typeof input.answer === 'string' ? Number(input.answer) : input.answer;
  if (answerNum !== a + b) {
    return { ok: false, reason: 'wrong_answer' };
  }

  return { ok: true };
}
