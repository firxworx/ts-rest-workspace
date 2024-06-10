# @workspace/style

This internal package is home to tools and utilities relevant to styling and theming front-end UI's in the project.

## Features

The primary feature of this package is the famed `cn()` helper function.

`cn()` intelligently merges tailwindcss utility classes by combining the functionality of `tailwind-merge` and `clsx`. It enables powerful customizable component patterns with overridable styles.

## Usage

Apps in this workspace should add this package as a dependency using the `workspace:*` protocol:

```sh
pnpm --filter target-app-name add @workspace/style@workspace:*
```

Then import the `cn()` function in your project:

```ts
import { cn } from '@workspace/style'

export interface MyComponentProps {
  className?: string
}

export function MyComponent({ className }: MyComponentProps) {
  return <div className={cn('text-lg text-red-800', className)} />
}
```

In the above example when using `MyComponent` the `className` prop can be used to override the default styles of the component, e.g.
`<MyComponent className="text-blue-500" />` would render with the `text-lg` and `text-blue-500` classes applied.

This works because `tailwind-merge` recognizes that `text-red-800` and `text-blue-800` are both text color utilities and so applies the last one in the list.

## Supporting Custom CSS Classes

### Adding custom classes to tailwindcss

Custom (non-tailwind) CSS classes should be added to the project via the `addBase()`, `addComponents()`, and/or `addUtilities()` plugin functions that are called in this project's custom tailwind preset.

Registering all custom CSS with tailwind allows classes to be overridden, used with `@apply` directives, and enables support for modifiers such as breakpoints. It enables tailwind to properly build and optimize the output css, avoids specificity issues, and makes project more customizable and easier to maintain.

Refer to the preset in the `@workspace/tailwind` package: `packages/tailwind/preset/index.ts`.

### Customizing `cn()` and `tailwind-merge` to recognize custom classes

If you define custom CSS classes then you should override `cn()` in `src/lib/cn.ts` with a custom `tailwind-merge` function
that is aware of them so it can intelligently merge them with tailwind's built-in utility classes.

If you define custom CSS classes then override `cn()` in `src/lib/cn.ts` of `@workspace/style` (`packages/style`) to use a custom `tailwind-merge` function that is aware of your custom classes so that it can intelligently merge them with tailwind's built-in classes.

For example if you define custom "text-lg-fluid" and want `cn()` to understand that it can be overridden by other "text-{size}" utilities (both the built-in ones and any custom ones you might add) then the `tailwind-merge` function needs to be customized.

Refer to the tailwind-merge docs:

- https://github.com/dcastil/tailwind-merge
- https://github.com/dcastil/tailwind-merge/blob/v2.3.0/docs/configuration.md
