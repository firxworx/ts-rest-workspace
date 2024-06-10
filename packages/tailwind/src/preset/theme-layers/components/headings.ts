import type { CSSRuleObject } from 'tailwindcss/types/config'

/**
 * Theme heading component classes (`.h1`, `.h2`, etc) for use in body copy and prose styles.
 * Covers all headings `h1`-`h6` plus `th` table headers.
 */
export const themeHeadingComponents: CSSRuleObject = {
  '.h1,.h2,.h3,.h4,.h5,.h6,.th': {
    '@apply text-gray-800/95': {},
  },
  '.h1': {
    '@apply text-5xl font-extrabold': {},
    letterSpacing: '-0.025em',

    strong: {
      '@apply font-extrabold': {},
    },
  },
  '.h2': {
    '@apply text-4xl font-bold': {},
    letterSpacing: '-0.025em',

    strong: {
      '@apply font-extrabold': {},
    },
  },
  '.h3': {
    '@apply text-3xl font-bold': {},
    letterSpacing: '-0.025em',

    strong: {
      '@apply font-extrabold': {},
    },
  },
  '.h4': {
    '@apply text-2xl font-bold': {},
    letterSpacing: '-0.025em',

    strong: {
      '@apply font-extrabold': {},
    },
  },
  '.h5': {
    '@apply text-xl font-semibold': {},
    letterSpacing: '-0.025em',

    strong: {
      '@apply font-extrabold': {},
    },
  },
  '.h6': {
    '@apply text-lg font-semibold': {},
    letterSpacing: '-0.025em',

    strong: {
      '@apply font-bold': {},
    },
  },
  '.th': {
    '@apply font-bold': {},
    letterSpacing: '-0.025em',

    strong: {
      '@apply font-extrabold': {},
    },
  },
}
