export interface MortgageInputs {
  homePrice: number;
  downPaymentType: 'percent' | 'dollar';
  downPaymentValue: number;
  loanTerm: 15 | 30;
  interestRate: number;
  annualPropertyTax: number;
  annualInsurance: number;
  monthlyHoa: number;
}

export interface MortgageResults {
  loanAmount: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  monthlyPrincipalAndInterest: number;
  monthlyPmi: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCostOfLoan: number;
  hasPmi: boolean;
}
