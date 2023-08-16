# Nx with Fastify API and React UI via ts-rest

An [Nx](https://nx.dev) monorepo featuring a [Fastify](https://fastify.dev/) back-end API and [React](https://react.dev/) front-end that exchange data via [ts-rest](https://ts-rest.com/).

API documentation based on the ts-rest contract is generated via Swagger/OpenAPI.

ts-rest offers comparable benefits to developer efficiency and developer experience vs. [TRPC](https://trpc.io/) except it is implementing using JSON/REST under the hood.

ts-rest includes support for Express/Fastify/NestJS and React/Vue and is designed to support incremental adoption by development teams working with legacy codebases.

### About this Repo

The code in this repo can serve as a reference boilerplate/template for new full-stack projects.

The official examples in the ts-rest repo are somewhat intermixed meanwhile this repo provides a structure that is consistent with a real application. The Fastify API structure is based on the Nx generator boilerplate vs. the example which provides a more scalable foundation to build new features. 

The implementation of the blog is a non-functional mock sourced from examples in the ts-rest GitHub repo: 
https://github.com/ts-rest/ts-rest/tree/main/apps

The UI is created using Vite + React + TypeScript + TailwindCSS. It includes examples of both the fetch-based and react-query-based client libraries provided by ts-rest.

The shared contract between the client + server is defined in `packages/common/contracts`.

## Architecture Value

ts-rest is arguably superior strategic choice for client-server communications in most types of real-world business applications vs. newer protocols such as TRPC, gRPC, and GraphQL.

There can be many advantages to embracing mature, widely-supported, and well-understood protocols that are easy to implement and maintain. 

Internal stakeholders, customers, and partners across any industry can easily integrate with JSON REST API's and the _largest_ ecosystem of software and tools are at their disposal.

ts-rest provides developers with a highly productive TRPC-like experience that enhances developer efficiency and delivers end-to-end type safety: https://ts-rest.com/docs/intro

## Development

### Development Setup

The project assumes a linux/unix environment (Windows users can use WSL2) that includes pnpm and a recent version of NodeJS.

Copy `nx-cloud.env.sample` to create `nx-cloud.env`. 

Consider signing up for an Nx Cloud Account to provide an API key.
If would not like to connect to Nx Cloud, edit `nx.json` and replace the `tasksRunnerOptions` block with the following:

```json
    "tasksRunnerOptions": {
      "default": {
        "runner": "nx/tasks-runners/default",
        "options": {
          "cacheableOperations": ["build", "lint", "test", "e2e"],
        },
      },
    },
```

Copy `.env.sample` to create `.env` for each of: `apps/fastify-api` and `apps/react-ui`.

### Development Workflow

Run `pnpm install` to install dependencies.

Run `pnpm dev` to start the development server for both the API and UI.

The API runs on port 3939 and the UI runs on port 4200.

A proxy configuration in `apps/react-ui/proxy.conf.json` will proxy requests to http://127.0.0.1:4200/api to the back-end API.

If you make a change to the contract it is recommended to restart the development server. If your changes still don't seem to get picked up try rebuilding.

## Build

Run `pnpm build:all` to build the API, UI, and the shared package containing the contract.

The shared contract library is configured as a "publishable" package.

The package's configuration is an example of how to configure Nx's esbuild builder to compile for both CommonJS and ESM.

## Using Nx to Run Tasks

The following is retained from the Nx boilerplate README.

To execute tasks with Nx use the following syntax:

```
pnpm nx <target> <project> <...options>
```

You can also run multiple targets:

```
pnpm nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
pnpm nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`.
Learn more [in the docs](https://nx.dev/core-features/run-tasks).

Check out the [Nx Console extensions](https://nx.dev/nx-console) for VSCode extensions and other tools for working with Nx.

## Set up CI

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

