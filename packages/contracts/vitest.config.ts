import { defineProject, mergeConfig } from 'vitest/config'
import baseConfig from '../../vitest.config'

/**
 * @see https://vitejs.dev/config/
 * @see https://vitest.dev/guide/workspace#defining-a-workspace
 */
export default mergeConfig(
  baseConfig,
  defineProject({
    // uncomment the following to extend configuration of a project-level vite config
    // extends: './vite.config.ts',

    test: {
      environment: 'jsdom',

      // reporters are not supported in a project-level config so it will show an error
      // reporters: ['json'],
    },
    // includeSource: ['src/**/*.ts'],
  }),
)
