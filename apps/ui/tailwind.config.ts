import type { Config } from 'tailwindcss'
import projectPreset from '@workspace/tailwind/preset'

/**
 * Refer to the project preset for the base styles including shadcn/ui palette color variables,
 * custom theme, and plugins.
 *
 * The `content` array includes all workspace packages that match the pattern `react-* to include
 * their styles. Custom classes added by the preset are automatically included in the content.
 *
 * Multiple presets are supported and tailwind intelligently merges them with later presets in the
 * array taking precedence over earlier ones for any conflicting styles.
 *
 * If you do not wish to use the preset _do not_ specify an empty presets array in the config below.
 * Remove it or comment it out entirely instead otherwise tailwind will fail to load any styles.
 *
 * @see @workspace/tailwind/preset
 * @see https://tailwindcss.com/docs/configuration
 */
const tailwindConfig: Config = {
  // this should be a string not an array in the current tailwindcss release
  darkMode: 'class',

  // the project preset specifies plugins, adds base css, defines css variables, customizes tailwind,
  // specifies the tailwind theme
  presets: [projectPreset],

  // content array customized for vite includes contents of any `react-*` packages in the workspace
  content: [
    './index.html',
    './src/**/*!(*.stories|*.spec|*.test).{ts,tsx,html}',
    '../../packages/react-*/src/**/*!(*.stories|*.spec|*.test).{ts,tsx}',
  ],

  // theme customizations specified below will override those of any presets when there are conflicts
  // it is generally more maintainable to revise the preset or add another preset with the desired styles
  theme: {},
}

export default tailwindConfig
