import type { CSSRuleObject } from 'tailwindcss/types/config'

/**
 * Theme list component classes (`.ul`, `.ol`, etc) for use in body copy and prose styles.
 */
export const themeListComponents: CSSRuleObject = {
  '.ul': {
    '@apply list-disc list-outside ms-4': {},
  },

  '.ol': {
    '@apply list-disc list-outside ms-4': {},
  },
}
