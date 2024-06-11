import type { TailwindColorsConfig } from '@/types/tailwind.types'

/**
 * Extended palette colors to be imported by the tailwind preset
 * under the `theme.extend.colors.P` namespace.
 *
 * Note focus rings will often be added with an alpha value.
 */
export const projectColors: TailwindColorsConfig = {
  brand: {
    DEFAULT: 'oklch(var(--P-ring) / <alpha-value>)',
  },

  ring: {
    DEFAULT: 'oklch(var(--P-ring) / <alpha-value>)',
  },

  spinner: {
    DEFAULT: 'oklch(var(--P-spinner) / <alpha-value>)',
  },
}
