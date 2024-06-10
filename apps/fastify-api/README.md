# fastify-api

Routes for ts-rest contracts are defined under `src/app/routes/` and loaded to the app in `src/app/app.ts`.

## Setup

Ensure `.env` exists in the project folder based on `.env.sample`

By default the API server will run on port 3939 per `env.sample`.

## Development

It is best to run `pnpm dev` from the workspace root to start both the API and UI dev servers together with a proxy configuration.

```sh
pnpm dev
```

To run only the API server:

```sh
pnpm --filter fastify-api dev
```

## Test

An example test is included in the `test/` directory that tests the '/' route which has a canned example response.

To run this project's tests:

```sh
pnpm --filter fastify-api test
```

## Build

The `build` target in `package.json` runs `esbuild` using the config `build.ts` to bundle the server code.

The compiled build can be run using `node apps/fastify-api/dist/main.js` from the workspace root.

This particular build configuration builds using ESM which is supported in Node 20+. Note that it is still common to build using CommonJS for compatibility with older versions of Node so this configuration may not be suitable for all projects.
