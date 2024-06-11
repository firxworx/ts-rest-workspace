# @workspace/tailwind

This package is home to the shared [tailwind preset](https://tailwindcss.com/docs/presets) for apps and packages to use in their tailwind configuration.

This project centralizes customizations to the tailwind theme, defines global styles and custom CSS properties, adds required plugins, and overal defines how tailwind should work in this workspace.

The preset also effectively installs shadcn/ui using its default palette and configuration: 
https://ui.shadcn.com/docs/installation/manual

Refer to `src/preset/index.ts`.

## Installation

Consuming apps in the workspace should add this package as dev dependency:

```sh
pnpm --filter my-target-project add -D @workspace/tailwind@workspace:*
```

Note: you may want to mirror the `devDependencies` of this package in the `package.json` of your consuming project for portability.

## Usage

After installing the package import it in your app/package's `tailwind.config.ts` file:

```ts
import projectPreset from '@workspace/tailwind/preset'
```

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
