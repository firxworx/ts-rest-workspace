import type { Config } from 'tailwindcss'

const tailwindConfig: Config = {
  content: [
    './index.html',
    './src/**/*!(*.stories|*.spec|*.test).{ts,tsx,html}',
    '../../packages/react-*/src/**/*!(*.stories|*.spec|*.test).{ts,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default tailwindConfig
