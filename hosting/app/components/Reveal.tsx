'use client';

import { useEffect, useRef, useState, createElement, type ReactNode, type JSX } from 'react';

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

interface RevealProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delayMs?: number;
  [key: string]: unknown;
}

export default function Reveal({ children, as = 'div', className = '', delayMs, style, ...rest }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return createElement(
    as,
    {
      ...rest,
      ref,
      className: `reveal ${isVisible ? 'reveal-visible' : ''} ${className}`.trim(),
      style: delayMs
        ? { ...(style as object | undefined), transitionDelay: `${delayMs}ms` }
        : style,
    },
    children
  );
}
