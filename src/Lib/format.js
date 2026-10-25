// Taka-r format: ৳ 1,250.00
export const money = (value) =>
  '৳ ' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Aajker tarikh YYYY-MM-DD (local time)
export const today = () => new Date().toLocaleDateString('en-CA');
