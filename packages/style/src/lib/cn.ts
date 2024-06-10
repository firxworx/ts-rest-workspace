import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * The `cn()` helper for composing class names with TailwindCSS popularized by shadcn/ui.
 * Override this with a custom tailwind-merge function to support any custom class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
