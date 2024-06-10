# @workspace/tailwind

Shared configs and the project's [tailwind preset](https://tailwindcss.com/docs/presets).

- `src/configs/tailwind/index.ts` - shared tailwind configuration
- `src/configs/postcss/index.ts` - shared postcss config to use with tailwind
- `src/preset/index.ts` - shared tailwind preset included by the tailwind configuration with theme definition

This project centralizes theme customizations and tailwind behaviour.

## Installation

This package should be added as a dev dependency of consuming projects using the `workspace:*` protocol:

```sh
pnpm --filter my-target-project add -D @workspace/tailwind@workspace:*
```

For portability you may want to mirror this package's `devDependencies` in the `package.json` of your consuming project.

## Usage

```ts
// in tailwind.config.ts
import projectConfig from '@workspace/tailwind/configs/tailwind'

// in postcss.config.ts
import postcssConfig from '@workspace/tailwind/configs/postcss'

// in another preset or a new config file (this preset is already included by @workspace/tailwind/config)
import projectPreset from '@workspace/tailwind/preset'
```

Note the postcss config might have issues with CJS/ESM due to upstream dependency issues. It may be best to copy the contents to a project's `postcss.config.js` file for the time being. 

## Custom CSS Classes

The addition of custom CSS classes to the project is best done via the `addBase()`, `addComponents()`, `addUtilities()`, or `addVariants()` functions in the custom tailwind preset defined in this package: `src/preset/index.ts`.

When custom CSS utilities are added in this way they they are "registered" with tailwind and their individual styles can be overridden. They will also be compatible with tailwind modifiers such as breakpoints.

Adding raw CSS to a project is discouraged as it can lead to specificity issues and make it difficult to maintain the project. It is always best to run everything through tailwindcss when using it on any project.

Many component library docs including the shadcn/ui docs suggest approaches that are not recommended by tailwind and can lead to difficulties when trying to customize styles.

### Custom `cn()` and `tailwind-merge`

If you define custom CSS classes then override `cn()` in `src/lib/cn.ts` of `@workspace/style` (`packages/style`) to use a custom `tailwind-merge` function that is aware of your custom classes so that it can intelligently merge them with tailwind's built-in utility classes.

For example if you define custom "text-lg-fluid" and want it to be overridable by `cn()` then the `tailwind-merge` function must know about it. In other words if you want `cn('text-lg-fluid text-sm')` to produce "text-sm" because it overrides custom font size utility "text-lg-fluid" then a custom `tailwind-merge` function is required.

Refer to the tailwind-merge docs:

- https://github.com/dcastil/tailwind-merge
- https://github.com/dcastil/tailwind-merge/blob/v2.3.0/docs/configuration.md
