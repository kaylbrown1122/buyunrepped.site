'use client';

import React from 'react';
import { Home, DollarSign, Info } from 'lucide-react';
import { MortgageResults } from './types';
import { BUYUNREPPED_MAX_TOTAL } from '../../../lib/fees';

interface Props {
  results: MortgageResults | null;
}

function ResultRow({
  label,
  value,
  sublabel,
  highlighted,
}: {
  label: string;
  value: string;
  sublabel?: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-3 px-4 rounded-xl ${
        highlighted ? 'bg-brand-blue/5 border border-brand-blue/20' : ''
      }`}
    >
      <div>
        <span className={`text-sm font-bold ${highlighted ? 'text-brand-navy' : 'text-gray-600'}`}>
          {label}
        </span>
        {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
      </div>
      <span
        className={`font-bold tabular-nums ${
          highlighted ? 'text-brand-blue text-xl' : 'text-brand-navy'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function MortgageResultsPanel({ results }: Props) {
  if (!results) {
    return (
      <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center min-h-[600px]">
        <div className="flex flex-col items-center justify-center text-center h-full opacity-50">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Home className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">Estimate your payment</h3>
          <p className="text-gray-400 max-w-sm">
            Enter your home details on the left to see your estimated monthly mortgage payment.
          </p>
        </div>
      </div>
    );
  }

  const {
    loanAmount,
    downPaymentAmount,
    downPaymentPercent,
    monthlyPrincipalAndInterest,
    monthlyPmi,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyHoa,
    totalMonthlyPayment,
    totalInterestPaid,
    totalCostOfLoan,
    hasPmi,
  } = results;

  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-brand-navy to-black rounded-2xl p-8 text-white relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <DollarSign className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">
              Estimated Monthly Payment
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                {fmt(totalMonthlyPayment)}
              </span>
              <span className="text-gray-400 text-lg">/mo</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Loan Amount</p>
                <p className="text-lg font-bold">{fmt(loanAmount)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Down Payment</p>
                <p className="text-lg font-bold">{fmt(downPaymentAmount)}</p>
                <p className="text-xs text-gray-400">{downPaymentPercent.toFixed(1)}%</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Interest</p>
                <p className="text-lg font-bold">{fmt(totalInterestPaid)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <h4 className="font-bold text-brand-navy mb-3">Monthly Breakdown</h4>
        <div className="space-y-1 mb-6">
          <ResultRow label="Principal & Interest" value={fmt(monthlyPrincipalAndInterest)} />
          <ResultRow label="Property Tax" value={fmt(monthlyPropertyTax)} sublabel="Based on your annual estimate" />
          <ResultRow label="Homeowners Insurance" value={fmt(monthlyInsurance)} sublabel="Based on your annual estimate" />
          {hasPmi && (
            <ResultRow
              label="PMI"
              value={fmt(monthlyPmi)}
              sublabel="Required until you reach 20% equity"
            />
          )}
          {monthlyHoa > 0 && (
            <ResultRow label="HOA" value={fmt(monthlyHoa)} />
          )}
          <div className="h-px bg-gray-100 my-2" />
          <ResultRow label="Total Monthly Payment" value={fmt(totalMonthlyPayment)} highlighted />
        </div>

        {/* Loan Summary */}
        <h4 className="font-bold text-brand-navy mb-3">Loan Summary</h4>
        <div className="space-y-1 mb-6">
          <ResultRow label="Total Cost of Loan" value={fmt(totalCostOfLoan)} sublabel="Principal + total interest paid" />
          <ResultRow label="Total Interest Paid" value={fmt(totalInterestPaid)} sublabel="Over the life of the loan" />
        </div>

        {/* PMI notice */}
        {hasPmi && (
          <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-4">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold mb-0.5">PMI applies to your loan</p>
              <p className="text-amber-700 leading-relaxed">
                Your down payment is less than 20%, so private mortgage insurance (PMI) is required.
                PMI can be removed once you reach 20% equity in your home.
              </p>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-4">
          <p className="font-bold mb-1">Estimate Only</p>
          <p className="text-amber-700 leading-relaxed">
            This calculator provides an estimate for planning purposes. Actual payments will vary
            based on your lender, credit score, exact tax assessments, and other factors.
            Contact a lender for a formal quote.
          </p>
        </div>

        {/* BuyUnrepped callout */}
        <div className="bg-brand-navy rounded-xl p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">BuyUnrepped support</p>
          <p className="text-lg font-bold mb-1">Non-representational support for up to ${BUYUNREPPED_MAX_TOTAL.toLocaleString()} in flat fees.</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Buyer-side compensation is negotiable and varies by transaction. BuyUnrepped does not act as your
            buyer&apos;s agent or negotiate on your behalf.
          </p>
        </div>

      </div>
    </div>
  );
}
