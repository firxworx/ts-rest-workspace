/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineProject, mergeConfig } from 'vitest/config'
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

    plugins: [tsconfigPaths()],
    test: {
      environment: 'node',
    },
  }),
)
