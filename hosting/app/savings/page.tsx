'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionBadge from '../components/SectionBadge';
import { Calculator, DollarSign, ArrowRight, Check, Play } from 'lucide-react';
import Link from 'next/link';
import { BUYUNREPPED_MAX_TOTAL } from '../../lib/fees';

export default function CalculatorPage() {
    const [homePrice, setHomePrice] = useState<number>(0);
    const [displayPrice, setDisplayPrice] = useState<string>('0');
    const [showResults, setShowResults] = useState<boolean>(false);

    // Constants
    const SELLING_AGENT_RATE = 0.03;
    const BUYING_AGENT_RATE = 0.03;
    const BUY_UNREPPED_FEE = BUYUNREPPED_MAX_TOTAL;

    // Handler for input change
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Hide results if user changes input
        if (showResults) setShowResults(false);

        // Remove non-digit characters
        const value = e.target.value.replace(/[^0-9]/g, '');

        if (value === '') {
            setHomePrice(0);
            setDisplayPrice('0');
            return;
        }

        const numberValue = parseInt(value, 10);
        setHomePrice(numberValue);

        // Remove leading zeros for display if user types
        setDisplayPrice(numberValue.toLocaleString());
    };

    const handleCalculate = () => {
        if (homePrice > 0) {
            setShowResults(true);
        }
    };

    // Calculations
    const sellingAgentFee = homePrice * SELLING_AGENT_RATE;
    const buyingAgentFee = homePrice * BUYING_AGENT_RATE;
    const traditionalTotal = sellingAgentFee + buyingAgentFee;

    const buyUnreppedTotal = sellingAgentFee + BUY_UNREPPED_FEE;
    const potentialSavings = buyingAgentFee - BUY_UNREPPED_FEE;

    return (
        <div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
            <Header />

            <main className="pb-20">
                {/* Hero Section */}
                <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
                    <SectionBadge>Savings Calculator</SectionBadge>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4 leading-tight">
                        See how much you could <br />
                        <span className="text-brand-blue">save on your next home.</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Compare a hypothetical buyer-side representation fee with BuyUnrepped&apos;s flat fees. Buyer-agent
                        compensation, seller concessions, credits, and price reductions are negotiated transaction by
                        transaction and are not guaranteed.
                    </p>
                </section>

                {/* Calculator Interface */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden relative">
                        {/* Background Blob */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>

                        <div className="grid lg:grid-cols-12 gap-0">

                            {/* Left Side: Input */}
                            <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/30 flex flex-col justify-center">
                                <div className="mb-8">
                                    <label htmlFor="homePrice" className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                        Enter Home Price
                                    </label>
                                    <div className="relative mb-6">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-400 text-2xl font-bold">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            id="homePrice"
                                            className="block w-full pl-10 pr-4 py-4 text-3xl md:text-4xl font-bold text-brand-navy bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all shadow-sm"
                                            placeholder="0"
                                            value={displayPrice}
                                            onChange={handlePriceChange}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleCalculate();
                                            }}
                                        />
                                    </div>

                                    <button
                                        onClick={handleCalculate}
                                        className="w-full py-4 bg-brand-blue text-white font-bold rounded-full shadow-lg hover:bg-cyan-700 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                                    >
                                        <Play className="w-5 h-5 fill-current" /> Calculate Savings
                                    </button>

                                    <p className="mt-4 text-center text-sm text-gray-500">
                                        Enter an expected purchase price to see an illustrative comparison.
                                    </p>
                                </div>

                                <div className="space-y-6 opacity-70 hover:opacity-100 transition-opacity">
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-brand-blue font-bold text-xs">%</span>
                                            </div>
                                            <h3 className="font-bold text-brand-navy">Buyer Agent Commission</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Buyer-agent compensation is negotiable and varies by listing and
                                            transaction. This calculator uses a hypothetical 3% buyer-side fee.
                                        </p>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm ring-2 ring-brand-blue/5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center">
                                                <span className="text-white font-bold text-xs">$</span>
                                            </div>
                                            <h3 className="font-bold text-brand-navy">BuyUnrepped Fee</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Up to $3,490 in flat fees for the Offer Package and optional Transaction
                                            Management.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Results */}
                            <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center min-h-[600px]">
                                {!showResults ? (
                                    <div className="flex flex-col items-center justify-center text-center h-full opacity-50">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                            <Calculator className="w-10 h-10 text-gray-300" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-300 mb-2">Ready to crunch numbers?</h3>
                                        <p className="text-gray-400 max-w-sm">Enter a home price and click calculate to see your potential breakdown.</p>
                                    </div>
                                ) : (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                            <h3 className="text-2xl font-bold mb-8">Illustrative Fee Comparison</h3>

                                        {/* Bars Chart Visualization */}
                                        <div className="space-y-8 mb-12">

                                            {/* Traditional Route */}
                                            <div>
                                                <div className="flex justify-between text-sm font-bold mb-2">
                                                    <span className="text-gray-500">Traditional Agent Model</span>
                                                    <span className="text-brand-navy">${traditionalTotal.toLocaleString()}</span>
                                                </div>
                                                <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                                                    <div className="h-full bg-gray-400 w-1/2"></div> {/* Selling Agent */}
                                                    <div className="h-full bg-gray-300 w-1/2"></div> {/* Buying Agent */}
                                                </div>
                                                <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 mt-2">
                                                    <span>Seller Agent Commission</span>
                                                    <span>Buyer Agent Commission</span>
                                                </div>
                                            </div>

                                            {/* BuyUnrepped Route */}
                                            <div>
                                                <div className="flex justify-between text-sm font-bold mb-2">
                                                    <span className="text-brand-blue">With BuyUnrepped</span>
                                                    <span className="text-brand-blue">${buyUnreppedTotal.toLocaleString()}</span>
                                                </div>
                                                <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex relative">
                                                    <div
                                                        className="h-full bg-gray-400 transition-all duration-500"
                                                        style={{ width: `${(sellingAgentFee / traditionalTotal) * 100}%` }}
                                                    ></div>
                                                    <div
                                                        className="h-full bg-brand-blue transition-all duration-500"
                                                        style={{ width: `${(BUY_UNREPPED_FEE / traditionalTotal) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex gap-4 text-[10px] uppercase font-bold text-gray-400 mt-2">
                                                    <span>Seller Agent Commission</span>
                                                    <span className="text-brand-blue">BuyUnrepped Fee</span>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Big Savings Reveal */}
                                        <div className="bg-gradient-to-br from-brand-navy to-black rounded-2xl p-8 text-white relative overflow-hidden group mb-12">
                                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                                <DollarSign className="w-32 h-32" />
                                            </div>

                                            <div className="relative z-10">
                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Illustrative Difference</p>
                                                <div className="flex items-baseline gap-2 mb-6">
                                                    <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                                                        ${potentialSavings.toLocaleString()}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    <Link
                                                        href="/pricing"
                                                        className="px-6 py-3 bg-brand-blue hover:bg-cyan-600 text-white font-bold rounded-full transition-all inline-flex items-center justify-center gap-2"
                                                    >
                                                        Start Your Offer <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                    <div className="px-6 py-3 bg-white/10 rounded-full text-sm font-medium flex items-center justify-center gap-2">
                                                        <Check className="w-4 h-4 text-green-400" />
                                                        <span>Instant Calculation</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Detailed Breakdown Table */}
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-6">Detailed Fee Breakdown</h4>
                                            <div className="w-full">
                                                <div className="grid grid-cols-3 border-b border-gray-100 pb-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                    <div className="col-span-1">Fee Type</div>
                                                    <div className="col-span-1 text-right">Traditional</div>
                                                    <div className="col-span-1 text-right text-brand-blue">BuyUnrepped</div>
                                                </div>

                                                <div className="grid grid-cols-3 py-3 border-b border-gray-50 items-center">
                                                    <div className="col-span-1 text-sm font-medium text-gray-600">Seller Agent Commission</div>
                                                    <div className="col-span-1 text-right text-sm font-bold text-gray-900">${sellingAgentFee.toLocaleString()}</div>
                                                    <div className="col-span-1 text-right text-sm font-bold text-gray-900">${sellingAgentFee.toLocaleString()}</div>
                                                </div>

                                                <div className="grid grid-cols-3 py-3 border-b border-gray-50 items-center">
                                                    <div className="col-span-1 text-sm font-medium text-gray-600">Buyer Agent Commission</div>
                                                    <div className="col-span-1 text-right text-sm font-bold text-gray-900">${buyingAgentFee.toLocaleString()}</div>
                                                    <div className="col-span-1 text-right text-sm font-bold text-brand-blue">$0</div>
                                                </div>

                                                <div className="grid grid-cols-3 py-3 border-b border-gray-50 items-center">
                                                    <div className="col-span-1 text-sm font-medium text-gray-600">BuyUnrepped Fee</div>
                                                    <div className="col-span-1 text-right text-sm font-bold text-gray-900">$0</div>
                                                    <div className="col-span-1 text-right text-sm font-bold text-red-500">${BUY_UNREPPED_FEE}</div>
                                                </div>

                                                <div className="grid grid-cols-3 pt-4 items-center">
                                                    <div className="col-span-1 font-bold text-brand-navy">Total Fees</div>
                                                    <div className="col-span-1 text-right font-bold text-gray-900">${traditionalTotal.toLocaleString()}</div>
                                                    <div className="col-span-1 text-right font-bold text-brand-blue">${buyUnreppedTotal.toLocaleString()}</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ / Info Section */}
                <section className="mt-24 max-w-4xl mx-auto px-4 text-center">
                    <SectionBadge>How It Works</SectionBadge>
                    <h2 className="text-3xl font-bold mb-6 mt-4">How does buying unrepresented save you money?</h2>
                    <p className="text-gray-500 leading-relaxed mb-8">
                        This calculator compares a hypothetical buyer-side representation fee with BuyUnrepped&apos;s flat
                        fees. Actual costs and any savings depend on seller compensation practices, negotiation, loan
                        requirements, and your transaction structure.
                        <br /><br />
                        This is an illustration, not a guarantee of savings, a credit, or a price reduction.
                    </p>
                    <Link href="/contact" className="text-brand-blue font-bold hover:underline">
                        Have questions? Talk to an expert
                    </Link>
                </section>

            </main>

            <Footer />
        </div>
    );
}
