/**
 * The base font size in pixels for the HTML element to define the value of 1rem.
 *
 * In VSCode revise `tailwindCSS.rootFontSize` in `.vscode/settings.json` to match this base font size (in pixels)
 * so that IntelliSense computes the correct pixel values of rem units.
 *
 * Tailwind's default is `16`.
 */
export const HTML_BASE_FONT_SIZE_PX = 16

/**
 * CSS variable prefix to namespace the palette css variables per convention.
 *
 * For example if the value is 'P' then `bg-P-primary` could be a color with key 'primary'
 * under the `theme.extend.colors.P` namespace. Refer to the project's tailwindcss preset.
 */
export const PALETTE_CSS_VARIABLE_PREFIX = 'P'
