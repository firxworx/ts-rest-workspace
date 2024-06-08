import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

/**
 * @see https://vitest.dev/guide/common-errors
 */
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // uncomment to report test results in json format
    // reporters: ['json'],
  },
})
