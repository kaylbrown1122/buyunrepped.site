import { CalculatorInputs, CalculatorResults, FeeCategory, FeeItem } from './types';
import {
  TN_TRANSFER_TAX_PER_100,
  TN_MORTGAGE_TAX_PER_100,
  PROPERTY_TAX_ANNUAL_RATE,
  ORIGINATION_FEE_RATE,
  APPRAISAL_FEE,
  HOME_INSPECTION_FEE,
  SURVEY_FEE,
  TITLE_SEARCH_FEE,
  ESCROW_CLOSING_FEE,
  CREDIT_REPORT_FEE,
  RECORDING_FEE,
  HOMEOWNERS_INSURANCE_ANNUAL_RATE,
  LENDER_TITLE_INSURANCE_PER_1000,
  OWNER_TITLE_INSURANCE_PER_1000,
} from './defaults';

function fee(id: string, label: string, defaultValue: number, isOptional = false): FeeItem {
  return { id, label, defaultValue: Math.round(defaultValue), overriddenValue: null, isOptional };
}

function getValue(item: FeeItem): number {
  return item.overriddenValue !== null ? item.overriddenValue : item.defaultValue;
}

export function getCategoryTotal(category: FeeCategory): number {
  return category.items.reduce((sum, item) => sum + getValue(item), 0);
}

export function calculate(inputs: CalculatorInputs, existingCategories?: FeeCategory[]): CalculatorResults {
  const { homePrice, downPaymentType, downPaymentValue, interestRate } = inputs;

  const downPaymentAmount =
    downPaymentType === 'percent'
      ? Math.round(homePrice * (downPaymentValue / 100))
      : downPaymentValue;

  const loanAmount = homePrice - downPaymentAmount;

  // Build default categories
  const loanFees: FeeItem[] = [
    fee('origination', 'Loan Origination Fee (1%)', loanAmount * ORIGINATION_FEE_RATE),
    fee('discount-points', 'Discount Points', 0, true),
    fee('credit-report', 'Credit Report', CREDIT_REPORT_FEE),
  ];

  const thirdParty: FeeItem[] = [
    fee('appraisal', 'Appraisal', APPRAISAL_FEE),
    fee('inspection', 'Home Inspection', HOME_INSPECTION_FEE),
    fee('survey', 'Survey', SURVEY_FEE),
  ];

  const annualInsurance = homePrice * HOMEOWNERS_INSURANCE_ANNUAL_RATE;
  const lenderTitleIns = (loanAmount / 1000) * LENDER_TITLE_INSURANCE_PER_1000;
  const ownerTitleIns = (homePrice / 1000) * OWNER_TITLE_INSURANCE_PER_1000;

  const titleEscrow: FeeItem[] = [
    fee('title-search', 'Title Search', TITLE_SEARCH_FEE),
    fee('lender-title-ins', "Lender's Title Insurance", lenderTitleIns),
    fee('owner-title-ins', "Owner's Title Insurance", ownerTitleIns, true),
    fee('escrow-fee', 'Escrow / Closing Fee', ESCROW_CLOSING_FEE),
  ];

  const transferTax = (homePrice / 100) * TN_TRANSFER_TAX_PER_100;
  const mortgageTax = (loanAmount / 100) * TN_MORTGAGE_TAX_PER_100;

  const government: FeeItem[] = [
    fee('recording', 'Recording Fee', RECORDING_FEE),
    fee('transfer-tax', 'TN Transfer Tax', transferTax),
    fee('mortgage-tax', 'TN Mortgage Tax', mortgageTax),
  ];

  const monthlyPropertyTax = (homePrice * PROPERTY_TAX_ANNUAL_RATE) / 12;
  const monthlyInsurance = annualInsurance / 12;
  const dailyInterest = (loanAmount * (interestRate / 100)) / 365;

  const prepaids: FeeItem[] = [
    fee('property-tax-escrow', 'Property Tax (2 months)', monthlyPropertyTax * 2),
    fee('insurance-escrow', 'Homeowners Insurance (14 months)', monthlyInsurance * 14),
    fee('daily-interest', 'Prepaid Interest (~15 days)', dailyInterest * 15),
  ];

  const defaultCategories: FeeCategory[] = [
    { id: 'loan', label: 'Loan Fees', items: loanFees, isExpanded: false },
    { id: 'third-party', label: 'Third-Party Services', items: thirdParty, isExpanded: false },
    { id: 'title-escrow', label: 'Title & Escrow', items: titleEscrow, isExpanded: false },
    { id: 'government', label: 'Government Fees', items: government, isExpanded: false },
    { id: 'prepaids', label: 'Prepaids & Escrow', items: prepaids, isExpanded: false },
  ];

  // Preserve user overrides from existing categories
  const categories = defaultCategories.map((cat) => {
    const existing = existingCategories?.find((ec) => ec.id === cat.id);
    if (!existing) return cat;

    return {
      ...cat,
      isExpanded: existing.isExpanded,
      items: cat.items.map((item) => {
        const existingItem = existing.items.find((ei) => ei.id === item.id);
        if (!existingItem || existingItem.overriddenValue === null) return item;
        return { ...item, overriddenValue: existingItem.overriddenValue };
      }),
    };
  });

  const totalClosingCosts = categories.reduce((sum, cat) => sum + getCategoryTotal(cat), 0);
  const closingCostPercentage = homePrice > 0 ? (totalClosingCosts / homePrice) * 100 : 0;
  const cashToClose = downPaymentAmount + totalClosingCosts;

  return {
    loanAmount,
    categories,
    totalClosingCosts,
    closingCostPercentage,
    cashToClose,
    downPaymentAmount,
  };
}
