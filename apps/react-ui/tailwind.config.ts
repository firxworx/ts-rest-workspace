// const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
// const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    './index.html',
    './src/**/*!(*.stories|*.spec|*.test).{ts,tsx,html}',
    // './node_modules/@bitcurve/flint-react-*/dist/**/*.js',
    // ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
