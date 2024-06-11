import type { TailwindColorsConfig } from '@/types/tailwind.types'
import colors from 'tailwindcss/colors'

/**
 * Extended palette colors to be imported by the tailwind preset
 * under the `theme.extend.colors.P` namespace.
 */
export const projectColors: TailwindColorsConfig = {
  brand: {
    DEFAULT: colors.sky[600],
  },
  ring: {
    DEFAULT: 'oklch(var(--P-ring))',
  },
}
