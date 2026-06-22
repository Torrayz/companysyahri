/**
 * Utility Functions.
 * @module lib/utils
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS class names dengan conflict resolution.
 * Menggabungkan `clsx` (conditional classes) dengan `tailwind-merge`
 * (resolves conflicting Tailwind utilities).
 *
 * @param inputs - Class values (string, array, object, conditional)
 * @returns Merged class name string
 *
 * @example
 * ```tsx
 * cn('px-4 py-2', isActive && 'bg-primary', 'px-6')
 * // → 'py-2 px-6 bg-primary' (px-4 di-override oleh px-6)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
