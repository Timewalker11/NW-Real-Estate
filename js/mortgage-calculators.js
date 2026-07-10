// NW Real Estate and Mortgage — mortgage calculators (payment & affordability)

document.addEventListener('DOMContentLoaded', () => {
  const currency = (value) =>
    Number.isFinite(value)
      ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
      : '$0';

  const monthlyPayment = (loanAmount, annualRatePct, termYears) => {
    const n = termYears * 12;
    const r = annualRatePct / 100 / 12;
    if (loanAmount <= 0 || n <= 0) return 0;
    if (r === 0) return loanAmount / n;
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const paymentForm = document.querySelector('#payment-calculator');
  if (paymentForm) {
    const price = document.querySelector('#pc-price');
    const down = document.querySelector('#pc-down');
    const rate = document.querySelector('#pc-rate');
    const term = document.querySelector('#pc-term');
    const monthlyOut = document.querySelector('#pc-monthly');
    const loanAmountOut = document.querySelector('#pc-loan-amount');
    const totalInterestOut = document.querySelector('#pc-total-interest');

    const update = () => {
      const loanAmount = Math.max(0, (Number(price.value) || 0) - (Number(down.value) || 0));
      const termYears = Number(term.value) || 30;
      const payment = monthlyPayment(loanAmount, Number(rate.value) || 0, termYears);
      const totalPI = payment * termYears * 12;

      monthlyOut.textContent = currency(payment);
      loanAmountOut.textContent = currency(loanAmount);
      totalInterestOut.textContent = currency(totalPI);
    };

    paymentForm.addEventListener('input', update);
    update();
  }

  const affordForm = document.querySelector('#afford-calculator');
  if (affordForm) {
    const income = document.querySelector('#ac-income');
    const debts = document.querySelector('#ac-debts');
    const down = document.querySelector('#ac-down');
    const rate = document.querySelector('#ac-rate');
    const term = document.querySelector('#ac-term');
    const priceOut = document.querySelector('#ac-price');
    const paymentOut = document.querySelector('#ac-payment');
    const loanOut = document.querySelector('#ac-loan');

    const loanAmountForPayment = (payment, annualRatePct, termYears) => {
      const n = termYears * 12;
      const r = annualRatePct / 100 / 12;
      if (payment <= 0 || n <= 0) return 0;
      if (r === 0) return payment * n;
      return (payment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    };

    const update = () => {
      const monthlyIncome = (Number(income.value) || 0) / 12;
      const monthlyDebts = Number(debts.value) || 0;
      const termYears = Number(term.value) || 30;

      const housingLimit = monthlyIncome * 0.28;
      const totalDebtLimit = monthlyIncome * 0.36 - monthlyDebts;
      const maxPayment = Math.max(0, Math.min(housingLimit, totalDebtLimit));

      const maxLoan = loanAmountForPayment(maxPayment, Number(rate.value) || 0, termYears);
      const maxPrice = maxLoan + (Number(down.value) || 0);

      priceOut.textContent = currency(maxPrice);
      paymentOut.textContent = currency(maxPayment);
      loanOut.textContent = currency(maxLoan);
    };

    affordForm.addEventListener('input', update);
    update();
  }
});
