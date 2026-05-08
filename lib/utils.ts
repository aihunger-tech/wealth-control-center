import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This is the 'cn' function that is currently missing
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function getPriceColor(value: number) {
  return value >= 0 ? 'text-emerald-400' : 'text-rose-400';
}
