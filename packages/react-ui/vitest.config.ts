/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineProject, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

import baseConfig from '../../vitest.config'

/**
 * @see https://vitejs.dev/config/
 * @see https://vitest.dev/guide/workspace#defining-a-workspace
 */
export default mergeConfig(
  baseConfig,
  defineProject({
    // cacheDir: 'node_modules/.vite',

    plugins: [react(), tsconfigPaths()],

    // uncomment the following to extend configuration from a project-level vite config
    // extends: './vite.config.ts',

    test: {
      globals: true,
      environment: 'jsdom', // vs 'happy-dom'
      setupFiles: './test/setup.ts',

      // clearMocks: true,
      // clearScreen: true,

      // coverage: {
      //   provider: 'v8',
      //   reporter: ['lcov']
      // },
      // include: ['src/**/*.ts'],
      // exclude: ['node_modules', 'dist', 'coverage', 'test', 'vite.config.ts', 'tailwind.config.ts'],
    },

    // includeSource: ['src/**/*.ts'],
  }),
)
