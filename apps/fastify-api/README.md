# fastify-api

Routes for ts-rest contracts are defined under `src/app/routes/` and loaded to the app in `src/app/app.ts`.

Docs: 

- https://fastify.dev/docs/latest/Reference/Server/
- https://ts-rest.com/docs/core/

## Setup

Ensure `.env` exists in the project folder based on `.env.sample`

By default the API server will run on port `3939` per `env.sample`.
This port is used in the UI's proxy configuration in `vite.config.ts` to proxy requests for `/api` to this server.

## Development

Run `pnpm dev` from the workspace root to start both the API and UI dev servers together with a proxy configuration.

```sh
pnpm dev
```

The UI will run at `http://localhost:3000` and requests to `/api` will be proxied to the API server running at `http://localhost:3939`.

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

This build configuration outputs ESM which is supported in Node 20+. This particular configuration may not be suitable for all projects. It is still common for back-end NodeJS projects to be build as CommonJS for compatibility with older versions of Node, certain libraries, and certain hosting environments.

The compiled build can be run using `node apps/fastify-api/dist/main.js` from the workspace root.

