'use client';

import React from 'react';
import { MortgageInputs as Inputs } from './types';

interface Props {
  inputs: Inputs;
  displayPrice: string;
  displayDown: string;
  displayTax: string;
  displayInsurance: string;
  displayHoa: string;
  onHomePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownPaymentTypeToggle: (type: 'percent' | 'dollar') => void;
  onLoanTermChange: (term: 15 | 30) => void;
  onInterestRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPropertyTaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInsuranceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHoaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MortgageInputs({
  inputs,
  displayPrice,
  displayDown,
  displayTax,
  displayInsurance,
  displayHoa,
  onHomePriceChange,
  onDownPaymentChange,
  onDownPaymentTypeToggle,
  onLoanTermChange,
  onInterestRateChange,
  onPropertyTaxChange,
  onInsuranceChange,
  onHoaChange,
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
              {inputs.downPaymentType === 'dollar' && (
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-bold">$</span>
                </div>
              )}
              <input
                type="text"
                id="downPayment"
                className={`block w-full ${inputs.downPaymentType === 'dollar' ? 'pl-8' : 'pl-4'} pr-8 py-3 text-lg font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm`}
                value={displayDown}
                onChange={onDownPaymentChange}
              />
              {inputs.downPaymentType === 'percent' && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-bold">%</span>
                </div>
              )}
            </div>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden shadow-sm" role="group" aria-label="Down payment type">
              <button
                type="button"
                onClick={() => onDownPaymentTypeToggle('dollar')}
                aria-pressed={inputs.downPaymentType === 'dollar'}
                className={`px-4 py-3 text-sm font-bold transition-colors ${inputs.downPaymentType === 'dollar' ? 'bg-brand-blue text-white' : 'bg-white text-gray-400 hover:text-brand-navy'}`}
              >
                <span aria-label="Dollar amount">$</span>
              </button>
              <button
                type="button"
                onClick={() => onDownPaymentTypeToggle('percent')}
                aria-pressed={inputs.downPaymentType === 'percent'}
                className={`px-4 py-3 text-sm font-bold transition-colors ${inputs.downPaymentType === 'percent' ? 'bg-brand-blue text-white' : 'bg-white text-gray-400 hover:text-brand-navy'}`}
              >
                <span aria-label="Percentage">%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Loan Term
          </label>
          <div className="flex rounded-xl border border-gray-200 overflow-hidden shadow-sm" role="group" aria-label="Loan term">
            <button
              type="button"
              onClick={() => onLoanTermChange(30)}
              aria-pressed={inputs.loanTerm === 30}
              className={`flex-1 py-3 text-sm font-bold transition-colors ${inputs.loanTerm === 30 ? 'bg-brand-blue text-white' : 'bg-white text-gray-400 hover:text-brand-navy'}`}
            >
              30-year fixed
            </button>
            <button
              type="button"
              onClick={() => onLoanTermChange(15)}
              aria-pressed={inputs.loanTerm === 15}
              className={`flex-1 py-3 text-sm font-bold transition-colors ${inputs.loanTerm === 15 ? 'bg-brand-blue text-white' : 'bg-white text-gray-400 hover:text-brand-navy'}`}
            >
              15-year fixed
            </button>
          </div>
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
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-400 font-bold">%</span>
            </div>
          </div>
        </div>

        {/* Annual Property Tax */}
        <div>
          <label htmlFor="propertyTax" className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Annual Property Tax <span className="text-gray-300 normal-case font-normal">(TN avg ~0.64%)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 font-bold">$</span>
            </div>
            <input
              type="text"
              id="propertyTax"
              className="block w-full pl-8 pr-4 py-3 text-lg font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm"
              value={displayTax}
              onChange={onPropertyTaxChange}
            />
          </div>
        </div>

        {/* Homeowners Insurance */}
        <div>
          <label htmlFor="insurance" className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Annual Homeowners Insurance
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 font-bold">$</span>
            </div>
            <input
              type="text"
              id="insurance"
              className="block w-full pl-8 pr-4 py-3 text-lg font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm"
              value={displayInsurance}
              onChange={onInsuranceChange}
            />
          </div>
        </div>

        {/* HOA */}
        <div>
          <label htmlFor="hoa" className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Monthly HOA <span className="text-gray-300 normal-case font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 font-bold">$</span>
            </div>
            <input
              type="text"
              id="hoa"
              className="block w-full pl-8 pr-4 py-3 text-lg font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm"
              value={displayHoa}
              onChange={onHoaChange}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
