# ts-rest with Fastify API + React/Vite UI

This pnpm workspace (monorepo) features a working full-stack application created using [ts-rest](https://ts-rest.com/) backed up by [zod](https://zod.dev/) and [@tanstack/react-query](https://tanstack.com/query/latest) for type-safe client-server communication.

- React + Vite front-end with react-router + react-query + tailwindcss + shadcn/ui
- Fastify back-end with pino logger for structured logging

This project is ready to serve as a project boilerplate for new projects to get started quickly.

## Benefits

ts-rest offers comparable benefits to [TRPC](https://trpc.io/) in terms of developer efficiency and developer experience except it uses JSON/REST under the hood instead of a custom stack-specific protocol that's exclusive to TRPC and the TypeScript ecosystem.

This repo defines ts-rest _contracts_ for blog _posts_ with CRUD operations as well as a simple _hello_ contract to illustrate how to combine multiple contracts. This is a complete working example vs. the partial snippets found in the ts-rest documentation.

The React UI uses the react-query client provided by ts-rest to achieve a type-safe RPC-like client interface with the API that respects the contract definitions.

The legendary [zod](https://zod.dev/) is used in contract definitions to provide data parsing and validation.

This monorepo is flexible to support swapping out the back-end or front-end stack (or parts of them) with other tools and libraries. 

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

- fastify api build with `esbuild` and the dev server runs using `tsx watch` for fast iteration
- working `vitest` configuration in all packages including `@testing-library/react` for testing React components
- `supertest` with `vitest` configured in the fastify-api for testing API routes
- workspace `eslint` and `prettier` configuration for efficient linting and formatting without OOM issues
- `syncpack` configuration with support for pnpm's `workspace:` protocol for shared dependencies in the workspace
- `.vscode/settings.json` for VSCode users with recommended settings for the workspace
- each app and package has its own `README.md` with additional information and setup instructions

## Get Started 🚀

Copy the local `.env.sample` and create `.env` in both `apps/fastify-api` and `apps/ui`.

If you're feeling lazy you can run the following bash script to do this for you:

```sh
bash ./scripts/setup.sh
```

Please note all scripts in this workspace are intended for unix/linux systems.
Windows users are encouraged to use WSL2 or make the necessary adjustments.

Install package dependencies:

```sh
pnpm install
```

### Development Workflow 🦾

Start the development servers of the UI and API:

```sh
pnpm dev
```

The API runs on port `3939` and the UI runs on port `4200`.

A proxy configuration in `apps/ui/vite.config.ts` will proxy requests to http://localhost:4200/api to the back-end API.

If you experience ipv4 vs. ipv6 issues on MacOS or Windows you may need to revise the `vite.config.ts` and possibly other config files to use `127.0.0.1` instead of `localhost`.

#### Tests 🧪

Run all tests in the workspace using `vitest`:

```sh
pnpm test
```

All `vitest` configurations work. There are a handful of example tests sprinkled throughout the workspace.

## Extending this Boilerplate

The mock blog in this repo is a fully functional CRUD example. It is kept simple and generated in-memory when you start the dev server using data from [faker-js](https://fakerjs.dev/).

The API is nearly a blank slate for you to add your favourite database tooling to persist data.

Fastify supports everything in the Node ecosystem including [Drizzle](https://orm.drizzle.team/), [Slonik](https://github.com/gajus/slonik), [Prisma](https://www.prisma.io/), [TypeORM](https://typeorm.io/), [Mongoose](https://mongoosejs.com/docs/), and more.

If you would rather use a different API framework, ts-rest officially supports [NextJS](https://nextjs.org/), [NestJS](https://nestjs.com/), [Express](https://expressjs.com/), and Serverless with AWS.

It can also be easily integrated with other frameworks and the community has produced examples with [Hono](https://hono.dev/) ([ts-rest-hono](https://github.com/msutkowski/ts-rest-hono)) and others.

On the client-side ts-rest officially supports Vue Query, and offers a fetch client that uses the Fetch API without react-query. Custom clients are also supported. The docs provide an example of a custom client that uses `axios` instead of `fetch`.

Refer to the [ts-rest docs ](https://ts-rest.com/docs/intro) for more.

## Maintaining the Monorepo

Run `pnpm syncpack list-mismatches` to identify dependency mismatches in the workspace.

If the suggested auto-fixes look safe you can then run `pnpm syncpack fix-mismatches` to sync all package versions.

Run `pnpm dedupe --check` (a safe operation) from time-to-time to maintain the lockfile and ensure optimized bundle sizes. If the proposed changes look safe run `pnpm dedupe` to apply them.

Use `pnpm -r up -i` to update all the packages in the workspace.
Add the `--latest` option to bump all packages to their latest release versions including those with possibly breaking changes.
