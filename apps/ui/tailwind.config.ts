import type { Config } from 'tailwindcss'
// import { projectPreset } from '@workspace/tailwind'
import { projectPreset } from '../../packages/tailwind/src/preset'

// console.log('this is the preset colors', JSON.stringify(projectPreset.extend?.colors, null, 2))

const tailwindConfig: Config = {
  // ...projectConfig,
  darkMode: 'class',

  // our project preset specifies plugins, adds base css, and defines our tailwind theme
  // warning: never use an empty presets array (remove it entirely if you do not want to add presets)
  presets: [projectPreset],

  // content array optimized for vite and to include contents of any `react-*` packages
  content: [
    './index.html',
    './src/**/*!(*.stories|*.spec|*.test).{ts,tsx,html}',
    '../../packages/react-*/src/**/*!(*.stories|*.spec|*.test).{ts,tsx}',
    // '../../packages/tailwind/src/**/*!(*.stories|*.spec|*.test).{ts,tsx}',
  ],

  // this config centralizes custom theme in the shareable preset
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
}

export default tailwindConfig
