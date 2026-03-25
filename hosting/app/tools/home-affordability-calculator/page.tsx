'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SectionBadge from '../../components/SectionBadge';
import AffordabilityInputs from './AffordabilityInputs';
import AffordabilityResultsPanel from './AffordabilityResults';
import { AffordabilityInputs as Inputs, AffordabilityResults } from './types';
import { calculate } from './calculate';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const DEFAULT_INCOME = 120000;
const DEFAULT_DEBTS = 0;
const DEFAULT_DOWN_PCT = 20;
const DEFAULT_RATE = 6.875;
const DEFAULT_INSURANCE = 1200;
const TN_TAX_RATE = 0.64; // percent

export default function AffordabilityCalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>({
    annualIncome: DEFAULT_INCOME,
    monthlyDebts: DEFAULT_DEBTS,
    downPaymentType: 'percent',
    downPaymentValue: DEFAULT_DOWN_PCT,
    loanTerm: 30,
    interestRate: DEFAULT_RATE,
    annualTaxRate: TN_TAX_RATE,
    annualInsurance: DEFAULT_INSURANCE,
  });

  const [displayIncome, setDisplayIncome] = useState(DEFAULT_INCOME.toLocaleString());
  const [displayDebts, setDisplayDebts] = useState('0');
  const [displayDown, setDisplayDown] = useState(DEFAULT_DOWN_PCT.toString());
  const [displayInsurance, setDisplayInsurance] = useState(DEFAULT_INSURANCE.toLocaleString());
  const [results, setResults] = useState<AffordabilityResults | null>(null);

  useEffect(() => {
    const r = calculate(inputs);
    setResults(r);
  }, [inputs]);

  const handleIncomeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw === '') {
      setDisplayIncome('');
      setInputs((prev) => ({ ...prev, annualIncome: 0 }));
      return;
    }
    const num = parseInt(raw, 10);
    setDisplayIncome(num.toLocaleString());
    setInputs((prev) => ({ ...prev, annualIncome: num }));
  }, []);

  const handleDebtsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setDisplayDebts(raw === '' ? '' : parseInt(raw, 10).toLocaleString());
    const num = parseInt(raw, 10);
    setInputs((prev) => ({ ...prev, monthlyDebts: isNaN(num) ? 0 : num }));
  }, []);

  const handleDownPaymentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    setDisplayDown(raw);
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      setInputs((prev) => ({ ...prev, downPaymentValue: num }));
    }
  }, []);

  const handleDownPaymentTypeToggle = useCallback((type: 'percent' | 'dollar') => {
    setInputs((prev) => {
      if (type === prev.downPaymentType) return prev;
      // When switching from % to $, we don't know the home price yet — keep value as-is
      if (type === 'dollar') {
        const dollars = results
          ? Math.round(results.conservative.maxHomePrice * (prev.downPaymentValue / 100))
          : prev.downPaymentValue;
        setDisplayDown(dollars.toLocaleString());
        return { ...prev, downPaymentType: type, downPaymentValue: dollars };
      } else {
        const pct = results && results.conservative.maxHomePrice > 0
          ? Math.round((prev.downPaymentValue / results.conservative.maxHomePrice) * 100)
          : 20;
        setDisplayDown(pct.toString());
        return { ...prev, downPaymentType: type, downPaymentValue: pct };
      }
    });
  }, [results]);

  const handleLoanTermChange = useCallback((term: 15 | 30) => {
    setInputs((prev) => ({ ...prev, loanTerm: term }));
  }, []);

  const handleInterestRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    const num = parseFloat(raw);
    setInputs((prev) => ({ ...prev, interestRate: isNaN(num) ? 0 : num }));
  }, []);

  const handleInsuranceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setDisplayInsurance(raw === '' ? '' : parseInt(raw, 10).toLocaleString());
    const num = parseInt(raw, 10);
    setInputs((prev) => ({ ...prev, annualInsurance: isNaN(num) ? 0 : num }));
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      <main className="pb-20">
        {/* Hero */}
        <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
          <SectionBadge>Home Affordability Calculator</SectionBadge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4 leading-tight">
            How much home <br />
            <span className="text-brand-blue">can you afford?</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Enter your income, debts, and down payment to see your personalized
            home price range — based on standard lender guidelines.
          </p>
        </section>

        {/* Calculator */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
            <div className="grid lg:grid-cols-12 gap-0">
              <AffordabilityInputs
                inputs={inputs}
                displayIncome={displayIncome}
                displayDebts={displayDebts}
                displayDown={displayDown}
                displayInsurance={displayInsurance}
                onIncomeChange={handleIncomeChange}
                onDebtsChange={handleDebtsChange}
                onDownPaymentChange={handleDownPaymentChange}
                onDownPaymentTypeToggle={handleDownPaymentTypeToggle}
                onLoanTermChange={handleLoanTermChange}
                onInterestRateChange={handleInterestRateChange}
                onInsuranceChange={handleInsuranceChange}
              />
              <AffordabilityResultsPanel results={results} />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-24 max-w-4xl mx-auto px-4 text-center">
          <SectionBadge>How It Works</SectionBadge>
          <h2 className="text-3xl font-bold mb-6 mt-4">How lenders determine what you can afford</h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Lenders use two ratios to evaluate your mortgage application. The front-end ratio
            limits your monthly housing costs (principal, interest, taxes, and insurance) to
            28% of your gross monthly income. The back-end ratio limits your total monthly
            debt obligations — including the new mortgage — to 36–43% of gross income.
            The lower of these two limits determines your maximum loan. Reducing existing
            debts before buying is one of the most effective ways to increase your buying power.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:underline">
            Have questions? Talk to an expert <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
