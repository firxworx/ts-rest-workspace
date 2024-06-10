import type { OptionalConfig } from 'tailwindcss/types/config'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

import typographyPlugin from '@tailwindcss/typography'
import formsPlugin from '@tailwindcss/forms'
import containerQueriesPlugin from '@tailwindcss/container-queries'
import tailwindCssAnimatePlugin from 'tailwindcss-animate'

import { projectColors, shadCnColors } from './theme-extends/colors'
import { getShadcnCssCustomProperties } from './css-properties/shadcn'
import { HTML_BASE_FONT_SIZE_PX, PALETTE_CSS_VARIABLE_PREFIX } from '../constants'
import { themeHeadingComponents } from './theme-layers/components/headings'
import { themeListComponents } from './theme-layers/components/lists'
import { presetAnimations } from './theme-extends/animation'

export const projectPreset: Partial<OptionalConfig> = {
  darkMode: 'class',
  theme: {
    // container per shadcn (https://ui.shadcn.com/docs/installation)
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      mini: '375px',
      xxs: '400px',
      xs: '475px',
      ...defaultTheme.screens,
      '2xl': '1400px', // tailwind's default: 1280px
      // '3xl': '1600px', // tailwind's default: 1536px
    },
  },
  extend: {
    animation: presetAnimations.animation,
    keyframes: presetAnimations.keyframes,

    colors: {
      ...shadCnColors,
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },

      [PALETTE_CSS_VARIABLE_PREFIX]: {
        ...projectColors,
      },
    },
  },
  plugins: [
    // official tailwindcss plugins
    typographyPlugin,
    formsPlugin,
    containerQueriesPlugin,

    // community plugins
    tailwindCssAnimatePlugin,

    // inline plugin definition to specify css custom properties + custom tailwind classes
    plugin(function ({ addBase, addComponents, theme }) {
      const shadcnCssCustomProperties = getShadcnCssCustomProperties(theme)

      addBase({
        ':root': {
          'color-scheme': 'light',
          ...shadcnCssCustomProperties[':root'],
        },
        '.dark': {
          'color-scheme': 'dark',
          ...shadcnCssCustomProperties['.dark'],
        },

        '*': {
          // '@apply border-border': {},
        },

        /**
         * Disable animations and transitions if the user has reduced motion enabled.
         */
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
            'scroll-behavior': 'auto !important',
          },
        },

        html: {
          '@apply antialiased': {},
          fontSize: `${HTML_BASE_FONT_SIZE_PX}px`,
          scrollBehavior: 'smooth',
        },

        body: {
          '@apply font-sans': {},
          // '@apply bg-background text-foreground': {},
          'font-feature-settings': '"rlig" 1, "calt" 1',
        },
      })

      /**
       * Custom utilities can be used with responsive breakpoints.
       *
       * They can be applied using the `@apply` directive in the same way as other tailwind classes.
       */
      // addUtilities({...})

      /**
       * Custom classes registered as tailwindcss components can have their `class` utilities
       * overridden by other tailwindcss classes.
       *
       * They can be applied using the `@apply` directive in the same way as other tailwind classes.
       */
      addComponents({
        // define a common disabled style for inactive elements such as inputs and buttons
        '.cx-disabled': {
          '@apply disabled:pointer-events-none disabled:cursor-default disabled:opacity-50': {},
        },

        ...themeHeadingComponents,
        ...themeListComponents,
      })
    }),
  ],
} satisfies Partial<OptionalConfig>
