'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { CalculatorInputs as Inputs } from './types';

interface Props {
  inputs: Inputs;
  displayPrice: string;
  displayDown: string;
  onHomePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownPaymentTypeToggle: (type: 'percent' | 'dollar') => void;
  onLoanTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onInterestRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
}

export default function CalculatorInputsPanel({
  inputs,
  displayPrice,
  displayDown,
  onHomePriceChange,
  onDownPaymentChange,
  onDownPaymentTypeToggle,
  onLoanTypeChange,
  onInterestRateChange,
  onCalculate,
}: Props) {
  return (
    <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/30 flex flex-col justify-center">
      <div className="space-y-6">
        {/* Home Price */}
        <div>
          <label htmlFor="homePrice" className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Home Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-2xl font-bold">$</span>
            </div>
            <input
              type="text"
              id="homePrice"
              className="block w-full pl-10 pr-4 py-4 text-3xl md:text-4xl font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm"
              placeholder="400,000"
              value={displayPrice}
              onChange={onHomePriceChange}
              onKeyDown={(e) => { if (e.key === 'Enter') onCalculate(); }}
            />
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label htmlFor="downPayment" className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Down Payment
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400 font-bold">
                  {inputs.downPaymentType === 'dollar' ? '$' : ''}
                </span>
              </div>
              <input
                type="text"
                id="downPayment"
                className={`block w-full ${inputs.downPaymentType === 'dollar' ? 'pl-8' : 'pl-4'} pr-${inputs.downPaymentType === 'percent' ? '8' : '4'} py-3 text-lg font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm`}
                value={displayDown}
                onChange={onDownPaymentChange}
                onKeyDown={(e) => { if (e.key === 'Enter') onCalculate(); }}
              />
              {inputs.downPaymentType === 'percent' && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-bold">%</span>
                </div>
              )}
            </div>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => onDownPaymentTypeToggle('dollar')}
                className={`px-4 py-3 text-sm font-bold transition-colors ${inputs.downPaymentType === 'dollar' ? 'bg-brand-blue text-white' : 'bg-white text-gray-400 hover:text-brand-navy'}`}
              >
                $
              </button>
              <button
                type="button"
                onClick={() => onDownPaymentTypeToggle('percent')}
                className={`px-4 py-3 text-sm font-bold transition-colors ${inputs.downPaymentType === 'percent' ? 'bg-brand-blue text-white' : 'bg-white text-gray-400 hover:text-brand-navy'}`}
              >
                %
              </button>
            </div>
          </div>
        </div>

        {/* Loan Type */}
        <div>
          <label htmlFor="loanType" className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Loan Type
          </label>
          <select
            id="loanType"
            value={inputs.loanType}
            onChange={onLoanTypeChange}
            className="block w-full py-3 px-4 text-lg font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm appearance-none"
          >
            <option value="conventional">Conventional</option>
            <option value="fha">FHA</option>
            <option value="va">VA</option>
          </select>
        </div>

        {/* Interest Rate */}
        <div>
          <label htmlFor="interestRate" className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Interest Rate
          </label>
          <div className="relative">
            <input
              type="text"
              id="interestRate"
              className="block w-full pl-4 pr-8 py-3 text-lg font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm"
              value={inputs.interestRate}
              onChange={onInterestRateChange}
              onKeyDown={(e) => { if (e.key === 'Enter') onCalculate(); }}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-400 font-bold">%</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={onCalculate}
          className="w-full py-4 bg-brand-blue text-white font-bold rounded-full shadow-lg hover:bg-cyan-700 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
        >
          <Play className="w-5 h-5 fill-current" /> Estimate Closing Costs
        </button>

        <p className="text-center text-sm text-gray-500">
          Based on typical Tennessee buyer closing costs.
        </p>
      </div>
    </div>
  );
}
