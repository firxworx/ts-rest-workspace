// @ts-check

/**
 * Syncpack helps keep package versions in sync across the monorepo.
 *
 * ```sh
 * pnpm syncpack list-mismatches
 * pnpm syncpack fix-mismatches
 * ```
 * @see https://jamiemason.github.io/syncpack/
 *
 * @type {import("syncpack").RcFile}
 */
const config = {
  versionGroups: [
    {
      label: 'Use workspace protocol for local packages in this pnpm workspace',
      dependencies: ['$LOCAL'],
      dependencyTypes: ['dev', 'prod'],
      pinVersion: 'workspace:*',
    },
    {
      label: 'Ensure peer dependencies are in sync',
      dependencies: ['$LOCAL'],
      dependencyTypes: ['peer'],
      policy: 'sameRange',

      // leave off library peerDeps
      // exclude: ['react', 'react-dom'],
    },

    // ignore peer dependencies for React
    {
      label: 'React',
      dependencies: ['react', 'react-dom'],
      dependencyTypes: ['peer'],
      packages: ['**'],
      isIgnored: true,
    },
  ],
}

export default config
