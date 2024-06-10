const postcssConfig = {
  plugins: {
    tailwindcss: {},
    '@csstools/postcss-oklab-function': { preserve: true },
    'postcss-discard-comments': {},
    autoprefixer: {},
  },
}

export default postcssConfig
