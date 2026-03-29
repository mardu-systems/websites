import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Shared class name merger used across all Mardu frontends.
 *
 * The helper intentionally mirrors the historic app-local implementation so
 * moving components into `@mardu/ui` does not change Tailwind conflict
 * resolution semantics.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
