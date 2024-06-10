import type { Config } from 'tailwindcss'
import projectPreset from '../preset'

const tailwindConfig: Config = {
  // dark mode is controlled via a '.dark' class attribute
  darkMode: 'class',

  // content array optimized for vite and to include contents of any `react-*` packages
  content: [
    './index.html',
    './src/**/*!(*.stories|*.spec|*.test).{ts,tsx,html}',
    '../../packages/react-*/src/**/*!(*.stories|*.spec|*.test).{ts,tsx,html}',
  ],

  // this config centralizes custom theme in the shareable preset
  theme: {
    extend: {},
  },

  // our project preset specifies plugins, adds base css, and defines our tailwind theme
  // warning: never use an empty presets array (remove it entirely if you do not want to add presets)
  presets: [projectPreset],

  // our project's plugin preferences are added in the preset definition
  // plugins: [],
}

export default tailwindConfig
