import { defineWorkspace } from 'vitest/config'

/**
 * Reminder: in individual apps/packages use `defineProject()` vs. `definedConfig()` because
 * workspace projects do not support all vitest configuration options.
 *
 * @see https://vitest.dev/guide/workspace
 */
export default defineWorkspace([
  'apps/*',
  'packages/*',
  // 'packages/*/vitest.config.{e2e,unit}.ts',

  {
    // if a global vite config is present you may wish to extend it...
    // extends: './vite.config.js',

    test: {
      // environment: 'jsdom',
      // ... other global test settings
    },
  },
])
