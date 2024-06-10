import type { CustomThemeConfig } from 'tailwindcss/types/config'

export type AnimationConfig = Pick<CustomThemeConfig, 'animation' | 'keyframes'>

/**
 * Add animation definitions for the project's preset here.
 */
export const presetAnimations: AnimationConfig = {
  animation: {
    // shadcn accordion
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
  },
  keyframes: {
    // shadcn accordion
    'accordion-down': {
      from: { height: '0' },
      to: { height: 'var(--radix-accordion-content-height)' },
    },
    'accordion-up': {
      from: { height: 'var(--radix-accordion-content-height)' },
      to: { height: '0' },
    },
  },
}
