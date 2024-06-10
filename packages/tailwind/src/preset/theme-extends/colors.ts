import type { TailwindColorsConfig } from '@/types/tailwind.types'
import colors from 'tailwindcss/colors'

/**
 * Extended palette colors to be imported by the tailwind preset.
 * These correspond to the default shadcn/ui palette.
 *
 * @see https://ui.shadcn.com/docs/installation
 */
export const shadCnColors: TailwindColorsConfig = {
  // default border
  border: 'hsl(var(--border))',

  // input/select/textarea borders
  input: 'hsl(var(--input))',

  // focus ring
  ring: 'hsl(var(--ring))',

  // body and similar colors
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',

  // primary action button color
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },

  // secondary color for button
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))',
  },

  // destructive actions such as button variant="destructive"
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
  },

  // muted backgrounds on tabslist, skeleton, switch
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },

  // accents such as hover effects on dropdown menu item, select item, etc.
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
  },

  // dropdown menu, hovercard, popover bg + fg
  popover: {
    DEFAULT: 'hsl(var(--popover))',
    foreground: 'hsl(var(--popover-foreground))',
  },

  // cards
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))',
  },
}

/**
 * Extended palette colors to be imported by the tailwind preset
 * under the `theme.extend.colors.P` namespace.
 */
export const projectColors: TailwindColorsConfig = {
  brand: {
    DEFAULT: colors.sky[600],
  },
}
