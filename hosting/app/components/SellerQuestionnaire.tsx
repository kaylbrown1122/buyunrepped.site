'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

type SellerForm = {
  name: string;
  email: string;
  phone: string;
  seller_property_address: string;
  timeline: string;
  propertyType: string;
  occupancy: string;
  estimatedValue: string;
  mortgageBalance: string;
  condition: string;
  goals: string;
  needs: string[];
};

const initialForm: SellerForm = {
  name: '',
  email: '',
  phone: '',
  seller_property_address: '',
  timeline: '',
  propertyType: '',
  occupancy: '',
  estimatedValue: '',
  mortgageBalance: '',
  condition: '',
  goals: '',
  needs: [],
};

const steps = [
  'Contact',
  'Property',
  'Timing',
  'Goals',
];

const needOptions = [
  'Pricing guidance',
  'Listing preparation',
  'Photography',
  'Contract review',
  'Offer negotiation',
  'Closing coordination',
];

export default function SellerQuestionnaire() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<SellerForm>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const update = (field: keyof SellerForm, value: string | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleNeed = (need: string) => {
    setForm((current) => ({
      ...current,
      needs: current.needs.includes(need)
        ? current.needs.filter((item) => item !== need)
        : [...current.needs, need],
    }));
  };

  const message = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone || 'Not provided'}`,
    `Property address: ${form.seller_property_address}`,
    `Timeline: ${form.timeline || 'Not provided'}`,
    `Property type: ${form.propertyType || 'Not provided'}`,
    `Occupancy: ${form.occupancy || 'Not provided'}`,
    `Estimated value: ${form.estimatedValue || 'Not provided'}`,
    `Mortgage balance: ${form.mortgageBalance || 'Not provided'}`,
    `Condition: ${form.condition || 'Not provided'}`,
    `Needs: ${form.needs.length ? form.needs.join(', ') : 'Not provided'}`,
    `Goals: ${form.goals || 'Not provided'}`,
  ].join('\n');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/lead-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          formType: 'seller_questionnaire',
          interest: 'SELLER QUESTIONNAIRE',
          propertyAddress: form.seller_property_address,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Lead submit failed');
      }

      setStatus('success');
      setForm(initialForm);
      setStep(0);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-green-600" />
        <h2 className="mt-4 text-2xl font-bold text-brand-navy">Seller questionnaire received</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          We will review the property details and follow up with the next best step for your sale.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-xl bg-brand-gold px-6 text-sm font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]"
        >
          Start another questionnaire
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
            Step {step + 1} of {steps.length}
          </p>
          <p className="text-sm font-semibold text-gray-500">{steps[step]}</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-brand-blue transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step === 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" id="seller-name" required>
            <input id="seller-name" required value={form.name} onChange={(event) => update('name', event.target.value)} className={inputClass} />
          </Field>
          <Field label="Email" id="seller-email" required>
            <input id="seller-email" type="email" required value={form.email} onChange={(event) => update('email', event.target.value)} className={inputClass} />
          </Field>
          <Field label="Phone" id="seller-phone">
            <input id="seller-phone" type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} className={inputClass} />
          </Field>
          <Field label="Property address" id="seller-property-address" required>
            <input id="seller-property-address" required value={form.seller_property_address} onChange={(event) => update('seller_property_address', event.target.value)} className={inputClass} />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Property type" id="seller-property-type">
            <select id="seller-property-type" value={form.propertyType} onChange={(event) => update('propertyType', event.target.value)} className={inputClass}>
              <option value="">Select one</option>
              <option>Single-family home</option>
              <option>Townhome</option>
              <option>Condo</option>
              <option>Multi-family</option>
              <option>Land</option>
            </select>
          </Field>
          <Field label="Occupancy" id="seller-occupancy">
            <select id="seller-occupancy" value={form.occupancy} onChange={(event) => update('occupancy', event.target.value)} className={inputClass}>
              <option value="">Select one</option>
              <option>Owner occupied</option>
              <option>Tenant occupied</option>
              <option>Vacant</option>
            </select>
          </Field>
          <Field label="Estimated value" id="seller-estimated-value">
            <input id="seller-estimated-value" value={form.estimatedValue} onChange={(event) => update('estimatedValue', event.target.value)} placeholder="$650,000" className={inputClass} />
          </Field>
          <Field label="Mortgage balance" id="seller-mortgage-balance">
            <input id="seller-mortgage-balance" value={form.mortgageBalance} onChange={(event) => update('mortgageBalance', event.target.value)} placeholder="$320,000" className={inputClass} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Ideal timeline" id="seller-timeline">
            <select id="seller-timeline" value={form.timeline} onChange={(event) => update('timeline', event.target.value)} className={inputClass}>
              <option value="">Select one</option>
              <option>ASAP</option>
              <option>30-60 days</option>
              <option>60-90 days</option>
              <option>3+ months</option>
              <option>Just exploring</option>
            </select>
          </Field>
          <Field label="Current condition" id="seller-condition">
            <select id="seller-condition" value={form.condition} onChange={(event) => update('condition', event.target.value)} className={inputClass}>
              <option value="">Select one</option>
              <option>Move-in ready</option>
              <option>Needs light prep</option>
              <option>Needs repairs</option>
              <option>Major updates needed</option>
            </select>
          </Field>
          <div className="sm:col-span-2">
            <p className="mb-3 text-sm font-bold text-brand-navy">What support do you want?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {needOptions.map((need) => (
                <label key={need} className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-blue">
                  <input type="checkbox" checked={form.needs.includes(need)} onChange={() => toggleNeed(need)} className="size-4 accent-brand-blue" />
                  {need}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <Field label="Anything else we should know?" id="seller-goals">
          <textarea id="seller-goals" rows={7} value={form.goals} onChange={(event) => update('goals', event.target.value)} className={`${inputClass} resize-none`} placeholder="Tell us about your goals, concerns, prep work, or anything unusual about the property." />
        </Field>
      )}

      {status === 'error' && (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Something went wrong. Please try again, or email info@buyunrepped.com.
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          disabled={step === 0 || status === 'loading'}
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 text-sm font-bold text-brand-navy transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-brand-gold px-6 text-sm font-bold text-brand-navy transition-colors hover:bg-[#e8b93d]"
          >
            Next
            <ArrowRight className="size-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-brand-gold px-6 text-sm font-bold text-brand-navy transition-colors hover:bg-[#e8b93d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'loading' && <Loader2 className="size-4 animate-spin" />}
            Submit questionnaire
          </button>
        )}
      </div>
    </form>
  );
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition-all placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20';

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-brand-navy">
        {label} {required && <span className="text-brand-blue">*</span>}
      </label>
      {children}
    </div>
  );
}
