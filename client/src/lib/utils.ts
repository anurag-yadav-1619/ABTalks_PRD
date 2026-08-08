import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidGithubUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'github.com' && parsed.pathname.length > 1;
  } catch {
    return false;
  }
}

export function isValidLinkedinUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return (
      (parsed.hostname === 'linkedin.com' || parsed.hostname === 'www.linkedin.com') &&
      parsed.pathname.includes('/posts/')
    );
  } catch {
    return false;
  }
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getDaysRemaining(currentDay: number, totalDays: number): number {
  return totalDays - currentDay;
}

export function getCompletionPercentage(completed: number, total: number): number {
  return Math.round((completed / total) * 1000) / 10;
}
