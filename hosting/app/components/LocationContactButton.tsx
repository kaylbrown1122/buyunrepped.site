'use client';

import Link from 'next/link';
import { buildContactUrl } from '../../lib/contactUrl';

interface LocationContactButtonProps {
  cityName: string;
  state?: string;
  className?: string;
  children: React.ReactNode;
  message?: string;
}

export default function LocationContactButton({
  cityName,
  state = 'TN',
  className,
  children,
  message,
}: LocationContactButtonProps) {
  const href = buildContactUrl({
    interest: 'Looking to buy in the next 0-6 months',
    city: cityName,
    state,
    message:
      message ||
      `I'm interested in BuyUnrepped in ${cityName}, ${state}. Please share availability and next steps.`,
  });

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
