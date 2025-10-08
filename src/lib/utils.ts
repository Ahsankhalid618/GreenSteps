import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatPoints(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
}

export function calculateLevel(points: number): number {
  // Level calculation: each level requires 1000 * level points
  // Level 1: 0-999 points
  // Level 2: 1000-2999 points
  // Level 3: 3000-5999 points
  // etc.
  return Math.floor(Math.sqrt(points / 1000)) + 1;
}

export function getPointsForNextLevel(points: number): number {
  const currentLevel = calculateLevel(points);
  const nextLevelPoints = Math.pow(currentLevel, 2) * 1000;
  return nextLevelPoints - points;
}

export function getLevelProgress(points: number): number {
  const currentLevel = calculateLevel(points);
  const currentLevelStart = Math.pow(currentLevel - 1, 2) * 1000;
  const nextLevelStart = Math.pow(currentLevel, 2) * 1000;
  const progress = ((points - currentLevelStart) / (nextLevelStart - currentLevelStart)) * 100;
  return Math.min(100, Math.max(0, progress));
}

export function calculateCarbonSaved(actions: any[]): number {
  return actions.reduce((total, action) => total + (action.carbonSaved || 0), 0);
}

export function calculateWaterSaved(actions: any[]): number {
  return actions.reduce((total, action) => total + (action.waterSaved || 0), 0);
}

export function calculateWasteReduced(actions: any[]): number {
  return actions.reduce((total, action) => total + (action.wasteReduced || 0), 0);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
