export default {
  plugins: {
    tailwindcss: {}, // { config: path.join(import.meta.dirname, 'tailwind.config.ts'), }
    '@csstools/postcss-oklab-function': { preserve: true },
    'postcss-discard-comments': {},
    autoprefixer: {},
  },
}
