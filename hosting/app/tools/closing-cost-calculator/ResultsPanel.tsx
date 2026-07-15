'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, ChevronDown, RotateCcw, FileText, Landmark, Shield, Building2, Wallet } from 'lucide-react';
import { CalculatorResults, FeeCategory, FeeItem } from './types';
import { getCategoryTotal } from './calculate';
import { BUYUNREPPED_MAX_TOTAL } from '../../../lib/fees';

interface Props {
  results: CalculatorResults | null;
  onToggleCategory: (categoryId: string) => void;
  onOverrideItem: (categoryId: string, itemId: string, value: number) => void;
  onResetItem: (categoryId: string, itemId: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'loan': <FileText className="w-5 h-5" />,
  'third-party': <Building2 className="w-5 h-5" />,
  'title-escrow': <Shield className="w-5 h-5" />,
  'government': <Landmark className="w-5 h-5" />,
  'prepaids': <Wallet className="w-5 h-5" />,
};

function FeeItemRow({
  item,
  categoryId,
  onOverride,
  onReset,
}: {
  item: FeeItem;
  categoryId: string;
  onOverride: (categoryId: string, itemId: string, value: number) => void;
  onReset: (categoryId: string, itemId: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const displayValue = item.overriddenValue !== null ? item.overriddenValue : item.defaultValue;

  const handleStartEdit = () => {
    setEditValue(displayValue.toString());
    setEditing(true);
  };

  const handleCommit = () => {
    const parsed = parseInt(editValue.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(parsed)) {
      onOverride(categoryId, item.id, parsed);
    }
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between py-2 pl-10 pr-2 group">
      <span className="text-sm text-gray-600">
        {item.label}
        {item.isOptional && <span className="ml-1 text-xs text-gray-400">(optional)</span>}
      </span>
      <div className="flex items-center gap-2">
        {editing ? (
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-400" aria-hidden="true">$</span>
            <input
              type="text"
              autoFocus
              aria-label={`Edit ${item.label} amount in dollars`}
              className="w-24 text-right text-sm font-bold text-brand-navy border border-brand-blue rounded px-2 py-1 focus:ring-1 focus:ring-brand-blue"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value.replace(/[^0-9]/g, ''))}
              onBlur={handleCommit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCommit();
                if (e.key === 'Escape') setEditing(false);
              }}
            />
          </div>
        ) : (
          <button
            onClick={handleStartEdit}
            aria-label={`Edit ${item.label}: $${displayValue.toLocaleString()}`}
            className={`text-sm font-bold text-right min-w-[80px] px-2 py-1 rounded hover:bg-gray-100 transition-colors ${item.overriddenValue !== null ? 'text-brand-blue' : 'text-brand-navy'}`}
          >
            ${displayValue.toLocaleString()}
          </button>
        )}
        {item.overriddenValue !== null && (
          <button
            onClick={() => onReset(categoryId, item.id)}
            aria-label={`Reset ${item.label} to default`}
            className="p-1 text-gray-400 hover:text-brand-blue transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function CategoryAccordion({
  category,
  onToggle,
  onOverride,
  onReset,
}: {
  category: FeeCategory;
  onToggle: () => void;
  onOverride: (categoryId: string, itemId: string, value: number) => void;
  onReset: (categoryId: string, itemId: string) => void;
}) {
  const total = getCategoryTotal(category);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={category.isExpanded}
        aria-controls={`category-${category.id}`}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center" aria-hidden="true">
            {CATEGORY_ICONS[category.id] || <DollarSign className="w-5 h-5" />}
          </div>
          <span className="font-bold text-brand-navy">{category.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-brand-navy">${total.toLocaleString()}</span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${category.isExpanded ? 'rotate-180' : ''}`} aria-hidden="true" />
        </div>
      </button>

      {category.isExpanded && (
        <div id={`category-${category.id}`} className="border-t border-gray-100 py-2 bg-gray-50/50">
          {category.items.map((item) => (
            <FeeItemRow
              key={item.id}
              item={item}
              categoryId={category.id}
              onOverride={onOverride}
              onReset={onReset}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResultsPanel({ results, onToggleCategory, onOverrideItem, onResetItem }: Props) {
  if (!results) {
    return (
      <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center min-h-[600px]">
        <div className="flex flex-col items-center justify-center text-center h-full opacity-50">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Calculator className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">Estimate your closing costs</h3>
          <p className="text-gray-400 max-w-sm">Enter your home details and click calculate to see a full cost breakdown.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-brand-navy to-black rounded-2xl p-8 text-white relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 p-3 opacity-10" aria-hidden="true">
            <DollarSign className="w-32 h-32" aria-hidden="true" />
          </div>
          <div className="relative z-10">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">
              Estimated Closing Costs
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                ${results.totalClosingCosts.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Down Payment</p>
                <p className="text-xl font-bold">${results.downPaymentAmount.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Cash to Close</p>
                <p className="text-xl font-bold">${results.cashToClose.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Categories */}
        <h4 className="font-bold text-brand-navy mb-4">Cost Breakdown</h4>
        <div className="space-y-3 mb-8">
          {results.categories.map((cat) => (
            <CategoryAccordion
              key={cat.id}
              category={cat}
              onToggle={() => onToggleCategory(cat.id)}
              onOverride={onOverrideItem}
              onReset={onResetItem}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-4">
          <p className="font-bold mb-1">Tennessee Estimate Only</p>
          <p className="text-amber-700 leading-relaxed">
            These figures are estimates based on typical Tennessee closing costs and tax rates.
            Actual costs vary by county, lender, and transaction specifics. Click any line item
            to adjust it. Consult your lender or closing attorney for exact figures.
          </p>
        </div>

        {/* BuyUnrepped callout */}
        <div className="bg-brand-navy rounded-xl p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">BuyUnrepped support</p>
          <p className="text-lg font-bold mb-1">Flat-fee support up to ${BUYUNREPPED_MAX_TOTAL.toLocaleString()}.</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Timeline tools, deadline reminders, and licensed broker support within your purchased scope. This is
            non-representational support, not buyer-agent representation.
          </p>
        </div>
      </div>
    </div>
  );
}
