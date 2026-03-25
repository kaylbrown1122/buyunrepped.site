'use client';

import React from 'react';
import { AffordabilityInputs as Inputs } from './types';

interface Props {
  inputs: Inputs;
  displayIncome: string;
  displayDebts: string;
  displayDown: string;
  displayInsurance: string;
  onIncomeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDebtsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownPaymentTypeToggle: (type: 'percent' | 'dollar') => void;
  onLoanTermChange: (term: 15 | 30) => void;
  onInterestRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInsuranceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({
  id,
  label,
  sublabel,
  prefix,
  suffix,
  value,
  placeholder,
  onChange,
  large,
}: {
  id: string;
  label: string;
  sublabel?: string;
  prefix?: string;
  suffix?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  large?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
        {label}
        {sublabel && <span className="text-gray-300 normal-case font-normal ml-1">{sublabel}</span>}
      </label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className={`text-gray-400 font-bold ${large ? 'text-2xl' : ''}`}>{prefix}</span>
          </div>
        )}
        <input
          type="text"
          id={id}
          className={`block w-full ${prefix ? (large ? 'pl-10' : 'pl-8') : 'pl-4'} ${suffix ? 'pr-8' : 'pr-4'} ${large ? 'py-4 text-3xl md:text-4xl' : 'py-3 text-lg'} font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-gray-400 font-bold">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AffordabilityInputs({
  inputs,
  displayIncome,
  displayDebts,
  displayDown,
  displayInsurance,
  onIncomeChange,
  onDebtsChange,
  onDownPaymentChange,
  onDownPaymentTypeToggle,
  onLoanTermChange,
  onInterestRateChange,
  onInsuranceChange,
}: Props) {
  return (
    <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/30 flex flex-col justify-center">
      <div className="space-y-6">

        {/* Annual Income */}
        <InputField
          id="annualIncome"
          label="Gross Annual Income"
          prefix="$"
          large
          placeholder="120,000"
          value={displayIncome}
          onChange={onIncomeChange}
        />

        {/* Monthly Debts */}
        <InputField
          id="monthlyDebts"
          label="Monthly Debt Payments"
          sublabel="(car, student loans, credit cards)"
          prefix="$"
          placeholder="0"
          value={displayDebts}
          onChange={onDebtsChange}
        />

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
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
                aria-label="Down payment amount"
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
        <InputField
          id="interestRate"
          label="Interest Rate"
          suffix="%"
          value={inputs.interestRate.toString()}
          onChange={onInterestRateChange}
        />

        {/* Annual Insurance */}
        <InputField
          id="insurance"
          label="Annual Homeowners Insurance"
          prefix="$"
          value={displayInsurance}
          onChange={onInsuranceChange}
        />

        <p className="text-xs text-gray-400 leading-relaxed">
          Property tax estimated at Tennessee&apos;s average 0.64% effective rate.
        </p>

      </div>
    </div>
  );
}
