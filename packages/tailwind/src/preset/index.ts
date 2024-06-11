import type { OptionalConfig } from 'tailwindcss/types/config'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

import typographyPlugin from '@tailwindcss/typography'
import formsPlugin from '@tailwindcss/forms'
import containerQueriesPlugin from '@tailwindcss/container-queries'
import tailwindCssAnimatePlugin from 'tailwindcss-animate'

import { HTML_BASE_FONT_SIZE_PX, PALETTE_CSS_VARIABLE_PREFIX } from '../constants'

import { projectColors } from './theme-extends/colors-project'
import { shadCnColors } from './theme-extends/colors-shadcn'
import { presetAnimations } from './theme-extends/animation'

import { getShadcnCssCustomProperties } from './css-properties/shadcn'

import { themeHeadingComponents } from './theme-layers/components/headings'
import { themeListComponents } from './theme-layers/components/lists'

export const projectPreset: Partial<OptionalConfig> = {
  darkMode: 'class',
  theme: {
    // container per shadcn/ui preferences https://ui.shadcn.com/docs/installation
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
      '2xl': '1400px', // tailwind's 2xl default: 1280px
      '3xl': '1600px', // tailwind's 3xl default: 1536px
    },
    extend: {
      colors: {
        // shadcn/ui default palette colors
        ...shadCnColors,

        // workspace convention for custom palette colors is to use a namespace prefix e.g. `bg-P-brand`
        [PALETTE_CSS_VARIABLE_PREFIX]: {
          ...projectColors,
        },
      },

      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },

      fontFamily: {
        sans: ['Inter\\ Variable', 'InterFallback', ...defaultTheme.fontFamily.sans],
      },

      animation: presetAnimations.animation,
      keyframes: presetAnimations.keyframes,
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

          // oklch example
          '--P-ring': '79.15% 0.074 232.27',
        },
        '.dark': {
          'color-scheme': 'dark',
          ...shadcnCssCustomProperties['.dark'],

          // oklch example
          '--P-ring': '42.45% 0.077 237.07',
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

        '*': {
          '@apply border-border': {},
        },

        html: {
          '@apply antialiased': {},
          fontSize: `${HTML_BASE_FONT_SIZE_PX}px`,
          scrollBehavior: 'smooth',
        },

        body: {
          '@apply bg-background text-foreground': {},
          'font-feature-settings': '"rlig" 1, "calt" 1',

          // a default line-height (leading-normal) is required to enable fallback fonts to work and avoid CLS
          '@apply font-sans leading-normal': {},

          // fix inter variable's "over italicized" issue (it is controlled by `oblique` in the variable font)
          // https://variablefonts.io/about-variable-fonts/
          em: {
            fontStyle: 'oblique 10deg',
          },
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

export default projectPreset
