'use client';

import React from 'react';
import { DollarSign, Info, TrendingUp, AlertTriangle } from 'lucide-react';
import { AffordabilityResults, AffordabilityScenario } from './types';

interface Props {
  results: AffordabilityResults | null;
}

function DtiBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const isOver = value > max;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
        <span className={`text-sm font-bold ${isOver ? 'text-red-500' : 'text-brand-navy'}`}>
          {(value * 100).toFixed(1)}%
          {isOver && <span className="text-red-400 text-xs ml-1">(over limit)</span>}
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-red-400' : color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-end mt-0.5">
        <span className="text-xs text-gray-400">max {(max * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}

function ScenarioCard({
  scenario,
  isRecommended,
}: {
  scenario: AffordabilityScenario;
  isRecommended: boolean;
}) {
  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div
      className={`rounded-2xl p-4 sm:p-6 border-2 transition-all ${
        isRecommended
          ? 'border-brand-blue bg-brand-blue/5'
          : 'border-gray-100 bg-gray-50/50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isRecommended ? 'text-brand-blue' : 'text-gray-400'
            }`}
          >
            {scenario.label}
          </span>
          <p className="text-xs text-gray-400 mt-0.5">
            Up to {(scenario.frontEndRatio * 100).toFixed(0)}% housing /{' '}
            {(scenario.backEndRatio * 100).toFixed(0)}% total DTI
          </p>
        </div>
        {isRecommended && (
          <span className="text-xs bg-brand-blue text-white font-bold px-3 py-1 rounded-full">
            Recommended
          </span>
        )}
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Max Home Price</p>
        <p className={`text-2xl sm:text-3xl font-bold ${isRecommended ? 'text-brand-navy' : 'text-gray-600'}`}>
          {fmt(scenario.maxHomePrice)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-0.5">Monthly Payment</p>
          <p className="font-bold text-brand-navy">{fmt(scenario.maxMonthlyPiti)}/mo</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-0.5">Loan Amount</p>
          <p className="font-bold text-brand-navy">{fmt(scenario.maxLoanAmount)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-0.5">P&amp;I</p>
          <p className="font-bold text-brand-navy">{fmt(scenario.monthlyPI)}/mo</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-0.5">Down Payment</p>
          <p className="font-bold text-brand-navy">{fmt(scenario.downPaymentAmount)}</p>
        </div>
      </div>

      {scenario.hasPmi && (
        <p className="mt-3 text-xs text-amber-600 font-bold">
          + {fmt(scenario.monthlyPmi)}/mo PMI (down payment &lt; 20%)
        </p>
      )}
    </div>
  );
}

export default function AffordabilityResultsPanel({ results }: Props) {
  if (!results) {
    return (
      <div className="lg:col-span-7 p-4 sm:p-8 lg:p-12 bg-white flex flex-col justify-center min-h-[300px] lg:min-h-[700px]">
        <div className="flex flex-col items-center justify-center text-center h-full opacity-50">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <DollarSign className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">See what you can afford</h3>
          <p className="text-gray-400 max-w-sm">
            Enter your income and financial details to get your personalized affordability range.
          </p>
        </div>
      </div>
    );
  }

  const { grossMonthlyIncome, monthlyDebts, conservative, stretch, isDebtHeavy } = results;
  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div className="lg:col-span-7 p-4 sm:p-8 lg:p-12 bg-white flex flex-col justify-center">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">

        {/* Header summary */}
        <div className="bg-gradient-to-br from-brand-navy to-black rounded-2xl p-5 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <TrendingUp className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">
              Your Affordability Range
            </p>
            <div className="flex items-baseline gap-2 sm:gap-3 mb-1 flex-wrap">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {fmt(conservative.maxHomePrice)}
              </span>
              <span className="text-gray-400 text-lg">–</span>
              <span className="text-2xl sm:text-3xl font-bold text-gray-300">
                {fmt(stretch.maxHomePrice)}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Conservative to stretch</p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5 sm:mt-6">
              <div className="bg-white/10 rounded-xl p-2 sm:p-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 leading-tight">Monthly Income</p>
                <p className="text-sm sm:text-lg font-bold truncate">{fmt(grossMonthlyIncome)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 sm:p-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 leading-tight">Monthly Debts</p>
                <p className="text-sm sm:text-lg font-bold truncate">{fmt(monthlyDebts)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 sm:p-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 leading-tight">Down Payment</p>
                <p className="text-sm sm:text-lg font-bold truncate">{fmt(results.downPaymentAmount)}</p>
                <p className="text-xs text-gray-400">{results.downPaymentPercent.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Debt-heavy warning */}
        {isDebtHeavy && (
          <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
            <div>
              <p className="font-bold mb-0.5">Your debts are limiting your buying power</p>
              <p className="text-amber-700 leading-relaxed">
                Your existing monthly debts are the binding constraint. Paying down high-interest
                debt before buying could significantly increase the home price you can afford.
              </p>
            </div>
          </div>
        )}

        {/* Scenario cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <ScenarioCard scenario={conservative} isRecommended={true} />
          <ScenarioCard scenario={stretch} isRecommended={false} />
        </div>

        {/* DTI Breakdown */}
        <div>
          <h4 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
            Debt-to-Income Ratios
            <span className="text-xs font-normal text-gray-400">(at conservative price)</span>
          </h4>
          <div className="space-y-4">
            <DtiBar
              label="Front-end (housing / income)"
              value={conservative.frontEndDti}
              max={0.28}
              color="bg-brand-blue"
            />
            <DtiBar
              label="Back-end (all debts / income)"
              value={conservative.backEndDti}
              max={0.36}
              color="bg-emerald-500"
            />
          </div>
        </div>

        {/* Monthly payment breakdown at conservative */}
        <div>
          <h4 className="font-bold text-brand-navy mb-3">
            Monthly Payment Breakdown
            <span className="text-xs font-normal text-gray-400 ml-2">(at conservative price)</span>
          </h4>
          <div className="space-y-1">
            {[
              { label: 'Principal & Interest', value: conservative.monthlyPI },
              { label: 'Property Tax', value: conservative.monthlyTax },
              { label: 'Homeowners Insurance', value: conservative.monthlyInsurance },
              ...(conservative.hasPmi ? [{ label: 'PMI', value: conservative.monthlyPmi }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-sm font-bold text-brand-navy">{fmt(value)}/mo</span>
              </div>
            ))}
            <div className="h-px bg-gray-100 my-1" />
            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-brand-blue/5 border border-brand-blue/20">
              <span className="text-sm font-bold text-brand-navy">Total Monthly Payment</span>
              <span className="text-lg font-bold text-brand-blue">{fmt(conservative.maxMonthlyPiti)}/mo</span>
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <p className="leading-relaxed">
            These figures use standard lender guidelines (28/36 conservative, 28/43 stretch).
            Your actual approval limit depends on your credit score, lender, and other factors.
            Property tax estimated at Tennessee&apos;s average 0.64% effective rate.
          </p>
        </div>

        {/* BuyUnrepped callout */}
        <div className="bg-brand-navy rounded-xl p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">With BuyUnrepped Full Strategy Pass</p>
          <p className="text-lg font-bold mb-1">Buy up to your budget without paying a buyer&apos;s agent commission.</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            A traditional 3% buyer&apos;s agent commission on a {fmt(conservative.maxHomePrice)} home
            is {fmt(Math.round(conservative.maxHomePrice * 0.03))}. Keep it with BuyUnrepped, flat $3,595.
          </p>
        </div>

      </div>
    </div>
  );
}
