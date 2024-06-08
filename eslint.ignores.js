// @ts-check

/**
 * eslint next-generation 'flat config' ignores configuration object
 * for import by `eslint.config.js`.
 */
export default {
  ignores: [
    // common ignore patterns
    '**/.*',
    '.git/',
    '**/node_modules/',

    // build artifacts
    '**/build/',
    '**/dist/',
    '**/output/',
    '**/cdk.out/',

    // third-party modules in public (public/pagefind will crash eslint)
    // 'apps/*/public/**',

    // popular frameworks
    // '**/.vite/',
    // '**/.svelte-kit/',
    // '**/.next/',
    // '**/.nuxt/',
    // '**/.astro/*', // could impact virtual files re <script> tagss in `*.astro` files (`*.js` files generated here)
    // '.astro/types.d.ts',

    // common tooling
    '**/coverage/',
    '**/template/',
    '**/storybook-static/',
    '**/types.generated.d.ts',

    // misc
    '**/.cache/',
    '**/.history/',
    '**/.idea/',

    // workflow
    '**/temp/',
    '**/tmp/',
    '**/wip/',
    'notes/*',

    // documentation (uncomment if markdown/mdx docs to be processed by eslint)
    'docs/*',

    // ci/cd pipeline files
    // '**/.github/*',
  ],
}
