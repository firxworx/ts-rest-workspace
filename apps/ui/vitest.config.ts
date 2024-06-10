/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineProject, mergeConfig } from 'vitest/config'
import baseConfig from '../../vitest.config'

/**
 * Vitest config that merges from the base config at the root of the workspace.
 *
 * @see https://vitejs.dev/config/
 * @see https://vitest.dev/guide/workspace#defining-a-workspace
 */
export default mergeConfig(
  baseConfig,
  defineProject({
    // extend from this project's vite config
    extends: './vite.config.ts',

    test: {
      globals: true,
      environment: 'jsdom',

      // clearMocks: true,
      // clearScreen: true,

      // uncomment to specify cache directory
      // cache: {
      //   dir: 'node_modules/.vitest',
      // },

      // include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

      // reporters are not supported in a project-level config so this will show an error
      // reporters: ['json'],
    },

    // includeSource: ['src/**/*.ts'],
  }),
)
