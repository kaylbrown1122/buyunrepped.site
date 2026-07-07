'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SectionBadge from '../../components/SectionBadge';
import CalculatorInputsPanel from './CalculatorInputs';
import ResultsPanel from './ResultsPanel';
import { CalculatorInputs, CalculatorResults, FeeCategory } from './types';
import { calculate } from './calculate';
import { DEFAULT_DOWN_PAYMENT_PERCENT, DEFAULT_INTEREST_RATE, DEFAULT_HOME_PRICE } from './defaults';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ClosingCostCalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    homePrice: DEFAULT_HOME_PRICE,
    downPaymentType: 'percent',
    downPaymentValue: DEFAULT_DOWN_PAYMENT_PERCENT,
    loanType: 'conventional',
    interestRate: DEFAULT_INTEREST_RATE,
  });
  const [displayPrice, setDisplayPrice] = useState(DEFAULT_HOME_PRICE.toLocaleString());
  const [displayDown, setDisplayDown] = useState(DEFAULT_DOWN_PAYMENT_PERCENT.toString());
  const [results, setResults] = useState<CalculatorResults | null>(null);

  const handleHomePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '') {
      setInputs((prev) => ({ ...prev, homePrice: 0 }));
      setDisplayPrice('');
      return;
    }
    const num = parseInt(value, 10);
    setInputs((prev) => ({ ...prev, homePrice: num }));
    setDisplayPrice(num.toLocaleString());
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    setDisplayDown(raw);
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      setInputs((prev) => ({ ...prev, downPaymentValue: num }));
    }
  };

  const handleDownPaymentTypeToggle = (type: 'percent' | 'dollar') => {
    if (type === inputs.downPaymentType) return;
    // Convert value when switching
    if (type === 'percent' && inputs.homePrice > 0) {
      const pct = Math.round((inputs.downPaymentValue / inputs.homePrice) * 100);
      setInputs((prev) => ({ ...prev, downPaymentType: type, downPaymentValue: pct }));
      setDisplayDown(pct.toString());
    } else if (type === 'dollar' && inputs.homePrice > 0) {
      const dollars = Math.round(inputs.homePrice * (inputs.downPaymentValue / 100));
      setInputs((prev) => ({ ...prev, downPaymentType: type, downPaymentValue: dollars }));
      setDisplayDown(dollars.toLocaleString());
    } else {
      setInputs((prev) => ({ ...prev, downPaymentType: type }));
    }
  };

  const handleLoanTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputs((prev) => ({ ...prev, loanType: e.target.value as CalculatorInputs['loanType'] }));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    const num = parseFloat(raw);
    setInputs((prev) => ({ ...prev, interestRate: isNaN(num) ? 0 : num }));
  };

  const handleCalculate = () => {
    if (inputs.homePrice > 0) {
      setResults(calculate(inputs, results?.categories));
    }
  };

  const handleToggleCategory = (categoryId: string) => {
    if (!results) return;
    setResults({
      ...results,
      categories: results.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat
      ),
    });
  };

  const handleOverrideItem = (categoryId: string, itemId: string, value: number) => {
    if (!results) return;
    const updated: FeeCategory[] = results.categories.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map((item) =>
          item.id === itemId ? { ...item, overriddenValue: value } : item
        ),
      };
    });
    // Recalculate totals
    const totalClosingCosts = updated.reduce(
      (sum, cat) => sum + cat.items.reduce((s, item) => s + (item.overriddenValue !== null ? item.overriddenValue : item.defaultValue), 0),
      0
    );
    setResults({
      ...results,
      categories: updated,
      totalClosingCosts,
      closingCostPercentage: inputs.homePrice > 0 ? (totalClosingCosts / inputs.homePrice) * 100 : 0,
      cashToClose: results.downPaymentAmount + totalClosingCosts,
    });
  };

  const handleResetItem = (categoryId: string, itemId: string) => {
    if (!results) return;
    const updated: FeeCategory[] = results.categories.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map((item) =>
          item.id === itemId ? { ...item, overriddenValue: null } : item
        ),
      };
    });
    const totalClosingCosts = updated.reduce(
      (sum, cat) => sum + cat.items.reduce((s, item) => s + (item.overriddenValue !== null ? item.overriddenValue : item.defaultValue), 0),
      0
    );
    setResults({
      ...results,
      categories: updated,
      totalClosingCosts,
      closingCostPercentage: inputs.homePrice > 0 ? (totalClosingCosts / inputs.homePrice) * 100 : 0,
      cashToClose: results.downPaymentAmount + totalClosingCosts,
    });
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      <main className="pb-20">
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
          <SectionBadge>Closing Cost Calculator</SectionBadge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4 leading-tight">
            Estimate your Tennessee <br />
            <span className="text-brand-blue">closing costs.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Get a detailed breakdown of what you&apos;ll need at the closing table  - 
            from lender fees to state taxes, customized for Tennessee buyers.
          </p>
        </section>

        {/* Calculator Interface */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>

            <div className="grid lg:grid-cols-12 gap-0">
              <CalculatorInputsPanel
                inputs={inputs}
                displayPrice={displayPrice}
                displayDown={displayDown}
                onHomePriceChange={handleHomePriceChange}
                onDownPaymentChange={handleDownPaymentChange}
                onDownPaymentTypeToggle={handleDownPaymentTypeToggle}
                onLoanTypeChange={handleLoanTypeChange}
                onInterestRateChange={handleInterestRateChange}
                onCalculate={handleCalculate}
              />
              <ResultsPanel
                results={results}
                onToggleCategory={handleToggleCategory}
                onOverrideItem={handleOverrideItem}
                onResetItem={handleResetItem}
              />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-24 max-w-4xl mx-auto px-4 text-center">
          <SectionBadge>What Are Closing Costs?</SectionBadge>
          <h2 className="text-3xl font-bold mb-6 mt-4">Common buyer closing costs in Tennessee</h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Closing costs typically range from 2% to 5% of the home price. In Tennessee, buyers
            pay state-specific fees like the transfer tax and mortgage tax, plus standard costs
            for title insurance, inspections, and lender fees. Understanding these costs upfront
            helps you budget confidently and avoid surprises at the closing table.
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
