import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  try {
    return format(new Date(dateString), 'dd MMM yyyy, hh:mm a');
  } catch (e) {
    return dateString;
  }
}

export function formatScore(score: number) {
  return `${Math.round(score)}%`;
}

export function getStatusColor(status: string) {
  switch (status.toUpperCase()) {
    case 'PASS':
    case 'COMPLIANT':
    case 'RESOLVED':
      return 'text-green-700 bg-green-100 border-green-200';
    case 'FAIL':
    case 'NON-COMPLIANT':
    case 'CRITICAL':
      return 'text-red-700 bg-red-100 border-red-200';
    case 'REVIEW':
    case 'PENDING':
    case 'WARNING':
      return 'text-amber-700 bg-amber-100 border-amber-200';
    default:
      return 'text-gray-700 bg-gray-100 border-gray-200';
  }
}
