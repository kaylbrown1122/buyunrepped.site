import { AffordabilityInputs, AffordabilityResults, AffordabilityScenario } from './types';

function monthlyPiFromLoan(loanAmount: number, annualRate: number, termYears: number): number {
  if (loanAmount <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  if (r === 0) return loanAmount / n;
  return (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

function buildScenario(
  label: string,
  frontEndRatio: number,
  backEndRatio: number,
  grossMonthly: number,
  monthlyDebts: number,
  downPaymentAmount: number,
  downPaymentPercent: number,
  annualRate: number,
  termYears: number,
  annualTaxRate: number,
  annualInsurance: number,
): AffordabilityScenario {
  // Max monthly housing payment from front-end ratio
  const maxFrontEnd = grossMonthly * frontEndRatio;
  // Max monthly housing payment from back-end ratio (leaving room for existing debts)
  const maxBackEnd = grossMonthly * backEndRatio - monthlyDebts;
  // Binding constraint
  const maxPiti = Math.max(0, Math.min(maxFrontEnd, maxBackEnd));

  // Estimate monthly non-PI costs as a fraction of home price (unknown yet)
  // We'll iterate: guess home price, compute tax+ins+PMI, back out max P&I
  // Use binary search to find the home price where PITI = maxPiti

  let lo = 0;
  let hi = 5_000_000;

  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const loan = Math.max(0, mid - downPaymentAmount);
    const dp = downPaymentAmount;
    const dpPct = mid > 0 ? (dp / mid) * 100 : downPaymentPercent;
    const monthlyTax = (mid * annualTaxRate) / 100 / 12;
    const monthlyIns = annualInsurance / 12;
    const hasPmi = dpPct < 20;
    const monthlyPmi = hasPmi ? (loan * 0.005) / 12 : 0;
    const pi = monthlyPiFromLoan(loan, annualRate, termYears);
    const piti = pi + monthlyTax + monthlyIns + monthlyPmi;

    if (piti < maxPiti) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  const maxHomePrice = Math.round(lo / 1000) * 1000;
  const maxLoan = Math.max(0, maxHomePrice - downPaymentAmount);
  const dpPct = maxHomePrice > 0 ? (downPaymentAmount / maxHomePrice) * 100 : downPaymentPercent;
  const mTax = Math.round((maxHomePrice * annualTaxRate) / 100 / 12);
  const mIns = Math.round(annualInsurance / 12);
  const hasPmi = dpPct < 20;
  const mPmi = hasPmi ? Math.round((maxLoan * 0.005) / 12) : 0;
  const mPI = Math.round(monthlyPiFromLoan(maxLoan, annualRate, termYears));
  const totalMonthly = mPI + mTax + mIns + mPmi;

  const frontEndDti = grossMonthly > 0 ? totalMonthly / grossMonthly : 0;
  const backEndDti = grossMonthly > 0 ? (totalMonthly + monthlyDebts) / grossMonthly : 0;

  return {
    label,
    frontEndRatio,
    backEndRatio,
    maxHomePrice,
    maxLoanAmount: maxLoan,
    downPaymentAmount,
    maxMonthlyPiti: totalMonthly,
    monthlyPI: mPI,
    monthlyTax: mTax,
    monthlyInsurance: mIns,
    monthlyPmi: mPmi,
    hasPmi,
    frontEndDti,
    backEndDti,
  };
}

export function calculate(inputs: AffordabilityInputs): AffordabilityResults | null {
  const { annualIncome, monthlyDebts, downPaymentType, downPaymentValue,
          loanTerm, interestRate, annualTaxRate, annualInsurance } = inputs;

  if (annualIncome <= 0 || interestRate <= 0) return null;

  const grossMonthly = annualIncome / 12;

  // Compute a fixed down payment dollar amount
  // We don't yet know the home price, so for % type we'll solve for it implicitly
  // For the iterative solver we treat % down as: dp = homePrice * pct / 100
  // We need to handle this in the solver differently for % vs $ down payment

  // For simplicity: if percent, the downPaymentAmount scales with home price.
  // We'll pass downPaymentPercent into the solver instead.
  const isPercent = downPaymentType === 'percent';
  const downPct = isPercent ? downPaymentValue : 0;
  const downFixed = isPercent ? 0 : downPaymentValue;

  // Rebuild solver to handle percent down payment
  function solveWithPct(
    label: string,
    frontEnd: number,
    backEnd: number,
  ): AffordabilityScenario {
    const maxFrontEnd = grossMonthly * frontEnd;
    const maxBackEnd = grossMonthly * backEnd - monthlyDebts;
    const maxPiti = Math.max(0, Math.min(maxFrontEnd, maxBackEnd));

    let lo = 0;
    let hi = 5_000_000;

    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      const dp = isPercent ? mid * (downPct / 100) : downFixed;
      const loan = Math.max(0, mid - dp);
      const dpPctActual = mid > 0 ? (dp / mid) * 100 : downPct;
      const monthlyTax = (mid * annualTaxRate) / 100 / 12;
      const monthlyIns = annualInsurance / 12;
      const hasPmi = dpPctActual < 20;
      const monthlyPmi = hasPmi ? (loan * 0.005) / 12 : 0;
      const pi = monthlyPiFromLoan(loan, interestRate, loanTerm);
      const piti = pi + monthlyTax + monthlyIns + monthlyPmi;

      if (piti < maxPiti) {
        lo = mid;
      } else {
        hi = mid;
      }
    }

    const maxHomePrice = Math.round(lo / 1000) * 1000;
    const dp = isPercent ? Math.round(maxHomePrice * (downPct / 100)) : downFixed;
    const maxLoan = Math.max(0, maxHomePrice - dp);
    const dpPctActual = maxHomePrice > 0 ? (dp / maxHomePrice) * 100 : downPct;
    const mTax = Math.round((maxHomePrice * annualTaxRate) / 100 / 12);
    const mIns = Math.round(annualInsurance / 12);
    const hasPmi = dpPctActual < 20;
    const mPmi = hasPmi ? Math.round((maxLoan * 0.005) / 12) : 0;
    const mPI = Math.round(monthlyPiFromLoan(maxLoan, interestRate, loanTerm));
    const totalMonthly = mPI + mTax + mIns + mPmi;

    const frontEndDti = grossMonthly > 0 ? totalMonthly / grossMonthly : 0;
    const backEndDti = grossMonthly > 0 ? (totalMonthly + monthlyDebts) / grossMonthly : 0;

    return {
      label,
      frontEndRatio: frontEnd,
      backEndRatio: backEnd,
      maxHomePrice,
      maxLoanAmount: maxLoan,
      downPaymentAmount: dp,
      maxMonthlyPiti: totalMonthly,
      monthlyPI: mPI,
      monthlyTax: mTax,
      monthlyInsurance: mIns,
      monthlyPmi: mPmi,
      hasPmi,
      frontEndDti,
      backEndDti,
    };
  }

  const conservative = solveWithPct('Conservative', 0.28, 0.36);
  const stretch = solveWithPct('Stretch', 0.28, 0.43);

  const dpAmount = isPercent
    ? Math.round(conservative.maxHomePrice * (downPct / 100))
    : downFixed;
  const dpPctFinal = conservative.maxHomePrice > 0
    ? (dpAmount / conservative.maxHomePrice) * 100
    : downPct;

  // Is back-end the binding constraint (debt-heavy)?
  const maxFrontEnd = grossMonthly * 0.28;
  const maxBackEnd = grossMonthly * 0.36 - monthlyDebts;
  const isDebtHeavy = maxBackEnd < maxFrontEnd;

  return {
    grossMonthlyIncome: Math.round(grossMonthly),
    monthlyDebts,
    downPaymentAmount: dpAmount,
    downPaymentPercent: dpPctFinal,
    conservative,
    stretch,
    isDebtHeavy,
  };
}
