import { defineProject, mergeConfig } from 'vitest/config'
import baseConfig from '../../vitest.config'

/**
 * @see https://vitejs.dev/config/
 * @see https://vitest.dev/guide/workspace#defining-a-workspace
 */
export default mergeConfig(
  baseConfig,
  defineProject({
    // uncomment the following to extend the configuration of a project-level vite config
    // extends: './vite.config.ts',

    test: {
      environment: 'jsdom',
    },
  }),
)
