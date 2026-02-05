export interface FeeItem {
  id: string;
  label: string;
  defaultValue: number;
  overriddenValue: number | null;
  isOptional: boolean;
}

export interface FeeCategory {
  id: string;
  label: string;
  items: FeeItem[];
  isExpanded: boolean;
}

export interface CalculatorInputs {
  homePrice: number;
  downPaymentType: 'percent' | 'dollar';
  downPaymentValue: number;
  loanType: 'conventional' | 'fha' | 'va';
  interestRate: number;
}

export interface CalculatorResults {
  loanAmount: number;
  categories: FeeCategory[];
  totalClosingCosts: number;
  closingCostPercentage: number;
  cashToClose: number;
  downPaymentAmount: number;
}
