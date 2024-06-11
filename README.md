# ts-rest with Fastify API + React/Vite UI

This pnpm workspace (monorepo) features a working full-stack application created using [ts-rest](https://ts-rest.com/) backed up by [zod](https://zod.dev/) and [@tanstack/react-query](https://tanstack.com/query/latest) for type-safe client-server communication with an RPC-like interface.

- React + Vite front-end with react-router + react-query + tailwindcss + shadcn/ui
- Fastify back-end with pino logger for structured logging

This project is ready to serve as a project boilerplate for new projects to get started quickly.

## Benefits

ts-rest offers comparable benefits to [TRPC](https://trpc.io/) in terms of developer efficiency and developer experience except it uses JSON/REST under the hood instead of a custom stack-specific protocol that's exclusive to TRPC and the TypeScript ecosystem.

This makes ts-rest an ideal choice for real-world business apps that may need to integrate with existing systems or services or offer a public API to customers or partners.

This repo defines ts-rest _contracts_ for blog _posts_ with CRUD operations as well as a simple _hello_ contract to illustrate how to combine multiple contracts. This is a complete working example vs. the partial snippets found in the ts-rest documentation.

The React UI uses the react-query client provided by ts-rest to achieve a type-safe RPC-like client interface with the API that respects the contract definitions.

The legendary [zod](https://zod.dev/) is used in contract definitions to provide data parsing and validation.

This monorepo is flexible and supports swapping out the back-end or front-end stack (or parts of them) with other tools and libraries.

Unlike so many "starters" the setup is fast and `pnpm dev` + `pnpm test` + `pnpm build` actually work!

## Architecture

🧭 This workspace includes

- `packages/common` - shared code and utilities for use by both UI + API
- `packages/contracts` - ts-rest [contract definitions](https://ts-rest.com/docs/core/) implemented by UI + API
- `packages/data` - shared zod schemas and types that define and validate data across the workspace
- `packages/react-ui` - shared react component library with several components customized from shadcn/ui
- `packages/style` - home to the `cn()` css utility and any `tailwind-merge` customizations
- `packages/tailwind` - shared [tailwindcss preset](https://tailwindcss.com/docs/presets) providing a common tailwindcss config

- `apps/ui` - React + Vite SPA using ts-rest's react-query client to call the API
- `apps/fastify-api` - Fastify API server using ts-rest to implement the back-end of the contract

🍬 Assorted goodies include 

- fastify api build with `esbuild` with the dev server running using `tsx watch` for fast iteration
- working `vitest` configuration in all packages including `@testing-library/react` for testing React components
- `supertest` with `vitest` configured in the fastify-api for testing API routes
- workspace `eslint` and `prettier` configuration for efficient linting and formatting without OOM issues
- `syncpack` configuration with support for pnpm's `workspace:` protocol for shared dependencies in the workspace
- `.vscode/settings.json` for VSCode users with recommended settings for the workspace
- each app and package has its own `README.md` with additional information and setup instructions
- comprehensive documentation and comments that don't assume you already know everything about this complex ecosystem

## Get Started 🚀

Copy the local `.env.sample` and create `.env` in both `apps/fastify-api` and `apps/ui`.

You can run the following bash script to do this for you if you're feeling lazy:

```sh
bash ./scripts/setup.sh
```

All scripts in this workspace are intended for unix/linux systems.
Windows users are encouraged to use WSL2 or make the necessary adjustments.

Install dependencies:

```sh
pnpm install
```

### Development Workflow 🦾

Start the development servers of the UI and API:

```sh
pnpm dev
```

The API runs on port `3939` and the UI runs on port `4200`.

A proxy configuration in `apps/ui/vite.config.ts` proxies requests to http://localhost:4200/api to the back-end API.

> [!TIP]
> If you experience ipv4 vs. ipv6 issues on MacOS or Windows you may need to revise `vite.config.ts` and potentially other config files to use `127.0.0.1` instead of `localhost`.

### Running Tests 🧪

Run all tests in the workspace using `vitest`:

```sh
pnpm test
```

All `vitest` configurations work. There are a handful of example tests sprinkled throughout the workspace to help you get started.

### Build

Build the apps:

```sh
pnpm build
```

Once built you can run the API server on its own: `node apps/fastify-api/dist/main.js`.

Refer to the `README.md` files of each app for important information about the builds.

### Running Commands

In pnpm workspaces use the `-r` (recursive) option to run any command against all packages in the workspace. Any project with the target command in its `package.json` will run it. Add the `--stream` option to interleave the output of all the commands.

For example to run type-check: 

```sh
pnpm -r check
```

Use the `--filter` option to target specific packages.

Each app/package is identified by its `name` in its `package.json`. All packages under `packages/` have the _scope_ `@workspace` prefixed to their name e.g. `@workspace/react-ui`.

The following example installs the `@fastify/cors` package as a dependency to the `fastify-api` app:

```sh
pnpm --filter fastify-api add @fastify/cors
```

Refer to the `package.json` files in this workspace for more examples and the [pnpm docs](https://pnpm.io/workspaces) for full details.

All dev dependencies in the root `package.json` are available to all projects in a pnpm workspace. Target the workspace's root `package.json` by adding the `-w` option to commands.

The following example adds a dev dependency (`-D`) to the workspace:

```sh
pnpm add -wD eslint
```

### Managing Dependencies

All of the packages in this workspace are configured as internal packages that directly export `*.ts` or `*.tsx` files without a build/bundle step. This defers the responsibility of compiling and bundling to the build step of any apps that import them.

Any dependencies of packages under `packages/` are listed as both `devDependencies` and `peerDependencies` in their `package.json`.

Any apps (or future packages) with a build step are responsible for including _all_ required dependencies in their `package.json`.

For example: components in `@workspace/react-ui` depend on `@radix-ui/react-slot` so it is listed as both a `devDependency` and as a `peerDependency` in `packages/react-ui/package.json`. Since the React+Vite `ui` app uses `@workspace/react-ui` it must include `@radix-ui/react-slot` as a `dependency` in its `apps/ui/package.json`.

Apps and packages that add other internal workspace packages as dependencies use the `workspace:` protocol to reference them. This ensures that the same version of packages are used in harmony across the workspace.

Refer to the `package.json` files of the apps and packages in the workspace to understand how they all fit together.

Docs: https://pnpm.io/workspaces#workspace-protocol-workspace

## Extending this Boilerplate

The mock blog in this repo is a fully functional CRUD example. It is kept simple and a fresh set of random posts are generated in-memory every time you (re)start the dev server using data from [faker-js](https://fakerjs.dev/).

The API is practically a blank slate for you to add your favourite database tooling to persist data.

Fastify supports almost everything the Node ecosystem offers including [Drizzle](https://orm.drizzle.team/), [Slonik](https://github.com/gajus/slonik), [Prisma](https://www.prisma.io/), [TypeORM](https://typeorm.io/), [Mongoose](https://mongoosejs.com/docs/), and more. 

The Fastify app is a blank slate so it doesn't include any plugins or middleware that might not work in your project. For example it does not include `@fastify/cors` or `@fastify/helmet` in case you intend to deploy to a platform that already provides these features.

If you would rather use a different API framework, ts-rest officially supports [NextJS](https://nextjs.org/), [NestJS](https://nestjs.com/), [Express](https://expressjs.com/), and Serverless with AWS.

ts-rest can also be easily integrated with other frameworks and the community has produced examples with [Hono](https://hono.dev/) ([ts-rest-hono](https://github.com/msutkowski/ts-rest-hono)) and others.

On the client-side ts-rest officially supports [Vue Query](https://ts-rest.com/docs/vue-query), and offers a [fetch client](https://ts-rest.com/docs/core/fetch) that uses the Fetch API without react-query. Custom clients are also supported. The docs provide an example of a [custom client](https://ts-rest.com/docs/core/custom) that uses `axios` instead of `fetch`.

Refer to the [ts-rest docs ](https://ts-rest.com/docs/intro) for more.

## Maintaining the Monorepo

Run `pnpm syncpack list-mismatches` to identify dependency mismatches in the workspace.

If the suggested auto-fixes look safe you can then run `pnpm syncpack fix-mismatches` to sync all package versions.

```sh
pnpm syncpack list-mismatches
pnpm syncpack fix-mismatches
```

Run `pnpm dedupe --check` (a safe operation) from time-to-time to maintain the lockfile and ensure optimized bundle sizes. If the proposed changes look safe run `pnpm dedupe` to apply them.

```sh
pnpm dedupe --check
pnpm dedupe
```

Use `pnpm -r up -i` to update all the packages in the workspace using the interactive installer.
Add the `--latest` option to bump all packages to their latest release versions including those with possibly breaking changes.

```sh
# bump dependencies
pnpm -r up -i

# latest dependencies
pnpm -r up -i --latest
```

In the rare case you experience a lockfile issue run `pnpm install --force` to rebuild the lockfile.

In the very rare case you experience a pnpm store (package cache) issue see: https://pnpm.io/cli/store#prune
