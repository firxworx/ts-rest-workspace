# @workspace/react-ui

Shared React components in an internal package for use by other apps and packages within this workspace.

This package is not configured for building or publishing to a repository like npm.

## Installation

For a local app or package in this project called `target-project` add `@workspace/react-ui` as a dependency using pnpm's `workspace:*` protocol.

```sh
pnpm --filter target-project add @workspace/react-ui@workspace:*
```

Projects in this workspace that import components from this package must ensure that its contents are included in their TailwindCSS configuration so that css for this package's components are included in the build.

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



