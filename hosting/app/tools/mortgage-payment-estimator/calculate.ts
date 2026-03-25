import { MortgageInputs, MortgageResults } from './types';

export function calculate(inputs: MortgageInputs): MortgageResults | null {
  const { homePrice, downPaymentType, downPaymentValue, loanTerm, interestRate } = inputs;

  if (homePrice <= 0 || interestRate <= 0) return null;

  const downPaymentAmount =
    downPaymentType === 'percent'
      ? Math.round(homePrice * (downPaymentValue / 100))
      : Math.round(downPaymentValue);

  const downPaymentPercent =
    downPaymentType === 'percent'
      ? downPaymentValue
      : homePrice > 0
      ? (downPaymentValue / homePrice) * 100
      : 0;

  const loanAmount = Math.max(0, homePrice - downPaymentAmount);
  if (loanAmount === 0) return null;

  const monthlyRate = interestRate / 100 / 12;
  const n = loanTerm * 12;

  // P&I using standard amortization formula
  const monthlyPI =
    monthlyRate === 0
      ? loanAmount / n
      : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
        (Math.pow(1 + monthlyRate, n) - 1);

  // PMI: ~0.5% annually of loan amount when LTV > 80%
  const hasPmi = downPaymentPercent < 20;
  const monthlyPmi = hasPmi ? Math.round((loanAmount * 0.005) / 12) : 0;

  const monthlyPropertyTax = Math.round(inputs.annualPropertyTax / 12);
  const monthlyInsurance = Math.round(inputs.annualInsurance / 12);
  const monthlyHoa = inputs.monthlyHoa;

  const totalMonthlyPayment =
    Math.round(monthlyPI) +
    monthlyPmi +
    monthlyPropertyTax +
    monthlyInsurance +
    monthlyHoa;

  const totalInterestPaid = Math.round(monthlyPI * n - loanAmount);
  const totalCostOfLoan = loanAmount + totalInterestPaid + downPaymentAmount;

  return {
    loanAmount,
    downPaymentAmount,
    downPaymentPercent,
    monthlyPrincipalAndInterest: Math.round(monthlyPI),
    monthlyPmi,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyHoa,
    totalMonthlyPayment,
    totalInterestPaid,
    totalCostOfLoan,
    hasPmi,
  };
}
