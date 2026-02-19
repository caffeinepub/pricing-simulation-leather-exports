export function formatCurrency(amount: number): string {
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);
  
  // Format with Indian numbering system
  const formatted = absoluteAmount.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  
  return `${isNegative ? '-' : ''}₹${formatted}`;
}
