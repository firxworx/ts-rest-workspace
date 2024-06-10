# @workspace/react-ui

Shared React components in an internal package for use by other apps and packages within this workspace.

The components are styled using tailwindcss and many are based on https://ui.shadcn.com/ and use https://www.radix-ui.com/.

This package requires that any app or package consuming this preset has the project's tailwind preset added to its tailwind config.

All dependencies are peer dependencies so the consuming project must have them installed as dependencies.

## Installation

For a local app or package in this project called `target-project` add `@workspace/react-ui` as a dependency:

```sh
pnpm --filter target-project add @workspace/react-ui@workspace:*
```

The contents of this package must included in the consuming app's TailwindCSS configuration `contents` array so that its tailwind classes are included in the final CSS output.

Example `tailwind.config.ts` file that includes all `react-*`-named packages in this workspace's `packages` directory:

```ts
import type { Config } from 'tailwindcss'

const tailwindConfig: Config = {
  content: [
    // ... (glob patterns for files within the project containing tailwind classes) ...
  
    // include the contents of all react-* packages in the workspace
    '../../packages/react-*/src/**/*!(*.stories|*.spec|*.test).{ts,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default tailwindConfig
```



