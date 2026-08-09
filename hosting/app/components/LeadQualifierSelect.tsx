'use client';

import { DEFAULT_LEAD_QUALIFIER, LEAD_QUALIFIER_OPTIONS } from '../../lib/leadQualifiers';

interface LeadQualifierSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  label?: string;
  className?: string;
}

export default function LeadQualifierSelect({
  id,
  value,
  onChange,
  required = true,
  label = 'What best describes you?',
  className = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all appearance-none bg-white',
}: LeadQualifierSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value || DEFAULT_LEAD_QUALIFIER}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          aria-required={required}
          className={className}
        >
          {LEAD_QUALIFIER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
          aria-hidden="true"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
