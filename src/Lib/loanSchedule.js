// Loan schedule preview (form-e dekhanor jonno).
// Backend-er loan_schedule.php er soman hishab, jate form-e ja dekhay actual schedule-o tai hoy.

export const REPAYMENT_TYPES = [
  { value: 'weekly', label: 'Weekly (Saptahik)' },
  { value: 'half_monthly', label: 'Half-monthly (Ordho-mashik)' },
  { value: 'monthly', label: 'Monthly (Mashik)' },
];

const pad = (n) => String(n).padStart(2, '0');

function addMonths(dateStr, months) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const total = (m - 1) + months;
  const year = y + Math.floor(total / 12);
  const month = ((total % 12) + 12) % 12;
  const lastDay = new Date(year, month + 1, 0).getDate();
  return `${year}-${pad(month + 1)}-${pad(Math.min(d, lastDay))}`;
}

function addDays(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export function installmentDates(loanDate, months, type) {
  const dates = [];
  if (type === 'monthly') {
    for (let k = 1; k <= months; k++) dates.push(addMonths(loanDate, k));
  } else if (type === 'half_monthly') {
    for (let k = 1; k <= months * 2; k++) {
      dates.push(k % 2 === 0 ? addMonths(loanDate, k / 2) : addDays(addMonths(loanDate, (k - 1) / 2), 15));
    }
  } else {
    const n = Math.max(1, Math.round(months * 52 / 12));
    for (let k = 1; k <= n; k++) dates.push(addDays(loanDate, 7 * k));
  }
  return dates;
}

const round2 = (x) => Math.round(x * 100) / 100;

export function previewSchedule(principal, rate, months, type, loanDate) {
  principal = Number(principal);
  rate = Number(rate || 0);
  months = Number(months);
  if (!(principal > 0) || !Number.isInteger(months) || months < 1 || !loanDate) return null;

  const dates = installmentDates(loanDate, months, type);
  const n = dates.length;
  const totalInterest = round2(principal * rate / 100 * months / 12);
  const totalPayable = round2(principal + totalInterest);
  return {
    count: n,
    totalInterest,
    totalPayable,
    installment: round2(totalPayable / n),
    firstDate: dates[0],
    payoffDate: dates[n - 1],
  };
}

// 2027-01-25 -> "January 2027"
export function monthYear(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
