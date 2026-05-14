export interface AffordabilityInputs {
  annualIncome: number;
  monthlyDebts: number;
  downPaymentType: 'percent' | 'dollar';
  downPaymentValue: number;
  loanTerm: 15 | 30;
  interestRate: number;
  annualTaxRate: number;   // as a percent, e.g. 0.64
  annualInsurance: number; // flat dollar amount
}

export interface AffordabilityScenario {
  label: string;
  frontEndRatio: number;  // e.g. 0.28
  backEndRatio: number;   // e.g. 0.36 | 0.43
  maxHomePrice: number;
  maxLoanAmount: number;
  downPaymentAmount: number;
  maxMonthlyPiti: number;
  monthlyPI: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  hasPmi: boolean;
  frontEndDti: number;   // actual ratio achieved
  backEndDti: number;    // actual ratio achieved
}

export interface AffordabilityResults {
  grossMonthlyIncome: number;
  monthlyDebts: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  conservative: AffordabilityScenario;
  stretch: AffordabilityScenario;
  // The DTI at the recommended price
  isDebtHeavy: boolean; // back-end limits before front-end
}
