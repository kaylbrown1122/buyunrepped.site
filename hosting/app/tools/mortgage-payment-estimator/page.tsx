'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SectionBadge from '../../components/SectionBadge';
import MortgageInputs from './MortgageInputs';
import MortgageResultsPanel from './MortgageResults';
import { MortgageInputs as Inputs, MortgageResults } from './types';
import { calculate } from './calculate';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const DEFAULT_HOME_PRICE = 400000;
const DEFAULT_DOWN_PERCENT = 20;
const DEFAULT_INTEREST_RATE = 6.875;
const DEFAULT_LOAN_TERM = 30;

function defaultPropertyTax(homePrice: number) {
  // Tennessee avg effective rate ~0.64%
  return Math.round(homePrice * 0.0064);
}

function defaultInsurance(homePrice: number) {
  // Rough estimate ~0.5% of home price, min $800
  return Math.max(800, Math.round(homePrice * 0.005));
}

export default function MortgageEstimatorPage() {
  const [inputs, setInputs] = useState<Inputs>({
    homePrice: DEFAULT_HOME_PRICE,
    downPaymentType: 'percent',
    downPaymentValue: DEFAULT_DOWN_PERCENT,
    loanTerm: DEFAULT_LOAN_TERM,
    interestRate: DEFAULT_INTEREST_RATE,
    annualPropertyTax: defaultPropertyTax(DEFAULT_HOME_PRICE),
    annualInsurance: defaultInsurance(DEFAULT_HOME_PRICE),
    monthlyHoa: 0,
  });

  const [displayPrice, setDisplayPrice] = useState(DEFAULT_HOME_PRICE.toLocaleString());
  const [displayDown, setDisplayDown] = useState(DEFAULT_DOWN_PERCENT.toString());
  const [displayTax, setDisplayTax] = useState(defaultPropertyTax(DEFAULT_HOME_PRICE).toLocaleString());
  const [displayInsurance, setDisplayInsurance] = useState(defaultInsurance(DEFAULT_HOME_PRICE).toLocaleString());
  const [displayHoa, setDisplayHoa] = useState('0');
  const [results, setResults] = useState<MortgageResults | null>(null);

  // Recalculate whenever inputs change
  useEffect(() => {
    const r = calculate(inputs);
    setResults(r);
  }, [inputs]);

  const handleHomePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '') {
      setDisplayPrice('');
      setInputs((prev) => {
        const updated = { ...prev, homePrice: 0 };
        // Also update tax/insurance estimates if they haven't been manually touched
        return updated;
      });
      return;
    }
    const num = parseInt(value, 10);
    setDisplayPrice(num.toLocaleString());
    setInputs((prev) => {
      const newTax = defaultPropertyTax(num);
      const newIns = defaultInsurance(num);
      setDisplayTax(newTax.toLocaleString());
      setDisplayInsurance(newIns.toLocaleString());
      return { ...prev, homePrice: num, annualPropertyTax: newTax, annualInsurance: newIns };
    });
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
      if (type === 'percent' && prev.homePrice > 0) {
        const pct = Math.round((prev.downPaymentValue / prev.homePrice) * 100);
        setDisplayDown(pct.toString());
        return { ...prev, downPaymentType: type, downPaymentValue: pct };
      } else if (type === 'dollar' && prev.homePrice > 0) {
        const dollars = Math.round(prev.homePrice * (prev.downPaymentValue / 100));
        setDisplayDown(dollars.toLocaleString());
        return { ...prev, downPaymentType: type, downPaymentValue: dollars };
      }
      return { ...prev, downPaymentType: type };
    });
  }, []);

  const handleLoanTermChange = useCallback((term: 15 | 30) => {
    setInputs((prev) => ({ ...prev, loanTerm: term }));
  }, []);

  const handleInterestRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    const num = parseFloat(raw);
    setInputs((prev) => ({ ...prev, interestRate: isNaN(num) ? 0 : num }));
  }, []);

  const handlePropertyTaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setDisplayTax(raw === '' ? '' : parseInt(raw, 10).toLocaleString());
    const num = parseInt(raw, 10);
    setInputs((prev) => ({ ...prev, annualPropertyTax: isNaN(num) ? 0 : num }));
  }, []);

  const handleInsuranceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setDisplayInsurance(raw === '' ? '' : parseInt(raw, 10).toLocaleString());
    const num = parseInt(raw, 10);
    setInputs((prev) => ({ ...prev, annualInsurance: isNaN(num) ? 0 : num }));
  }, []);

  const handleHoaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setDisplayHoa(raw);
    const num = parseInt(raw, 10);
    setInputs((prev) => ({ ...prev, monthlyHoa: isNaN(num) ? 0 : num }));
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      <main className="pb-20">
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
          <SectionBadge>Mortgage Payment Estimator</SectionBadge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4 leading-tight">
            Estimate your monthly <br />
            <span className="text-brand-blue">mortgage payment.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            See your full PITI payment, principal, interest, taxes, and insurance  - 
            before you make an offer.
          </p>
        </section>

        {/* Calculator Interface */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>

            <div className="grid lg:grid-cols-12 gap-0">
              <MortgageInputs
                inputs={inputs}
                displayPrice={displayPrice}
                displayDown={displayDown}
                displayTax={displayTax}
                displayInsurance={displayInsurance}
                displayHoa={displayHoa}
                onHomePriceChange={handleHomePriceChange}
                onDownPaymentChange={handleDownPaymentChange}
                onDownPaymentTypeToggle={handleDownPaymentTypeToggle}
                onLoanTermChange={handleLoanTermChange}
                onInterestRateChange={handleInterestRateChange}
                onPropertyTaxChange={handlePropertyTaxChange}
                onInsuranceChange={handleInsuranceChange}
                onHoaChange={handleHoaChange}
              />
              <MortgageResultsPanel results={results} />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-24 max-w-4xl mx-auto px-4 text-center">
          <SectionBadge>Understanding Your Payment</SectionBadge>
          <h2 className="text-3xl font-bold mb-6 mt-4">What goes into a mortgage payment?</h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Most buyers focus on the interest rate, but your true monthly payment includes principal,
            interest, property taxes, and homeowners insurance, known as PITI. If your down payment
            is less than 20%, lenders also require private mortgage insurance (PMI) until you build
            enough equity. In Tennessee, the effective property tax rate averages around 0.64%, which
            is among the lowest in the country.
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
