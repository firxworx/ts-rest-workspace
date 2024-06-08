// @ts-check

/**
 * Project prettier configuration.
 * Another plugin to consider is `prettier-plugin-tailwindcss` if you agree with its more opinionated defaults.
 *
 * @see https://github.com/withastro/prettier-plugin-astro
 * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss
 * @see https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted
 *
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,
  endOfLine: 'lf',
  tailwindFunctions: ['clsx', 'cn'],
  plugins: [
    // uncomment if adding astro
    // 'prettier-plugin-astro',

    // prettier-plugin-tailwindcss must come last when using alongside other plugins (per its README)
    'prettier-plugin-tailwindcss',
  ],
  overrides: [
    // uncomment if adding astro
    // {
    //   files: '*.astro',
    //   options: {
    //     parser: 'astro',
    //   },
    // },
    {
      files: '*.css',
      options: {
        printWidth: 120,
      },
    },
  ],
}
