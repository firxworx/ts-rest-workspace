# fastify-api

Routes for ts-rest contracts are defined under `src/app/routes/` and loaded to the app in `src/app/app.ts`.

Docs:

- https://fastify.dev/docs/latest/Reference/Server/
- https://ts-rest.com/docs/core/

To enable response validation for maximum rigour or to customize the error handling refer to where the ts-rest contract routes are added to the fastify app: `src/app/routes/contract`.

Docs: https://ts-rest.com/docs/fastify/#request-validation-error-handling

## Setup

Ensure `.env` exists in the project folder based on `.env.sample`

By default the API server will run on port `3939` per `env.sample`.
This port is used in the UI's proxy configuration in `vite.config.ts` to proxy requests for `/api` to this server.

## Development

Run `pnpm dev` from the workspace root to start both the API and UI dev servers together with a proxy configuration.

```sh
pnpm dev
```

The UI will run at `http://localhost:4200` and requests to `/api` will be proxied to the API server running at `http://localhost:3939` per the proxy configuration in `apps/ui/vite.config.ts`.

To run the API server on its own:

```sh
pnpm --filter fastify-api dev
```

Note that fastify's default routing behaviour treats routes with and without trailing slashes as separate routes.

### Debugging

An advantage of ts-rest is that all contract endpoints are JSON/REST so they can be tested with `curl` or other common API tools such as Insomnia and Postman.

Remember that the example blog contract requires an `x-api-key` header. The header is only validated by zod schema to be a non-empty string.

Here's an example `curl` request to the `/posts/` endpoint:

```
curl -X GET "http://127.0.0.1:3939/api/v1/posts/?skip=0&take=8" \
  -H "Accept: application/json" \
  -H "x-api-key: example"
```

Routes created via ts-rest contract should have a trailing slash in the URL by default.

## Test

An example test is included in the `test/` directory that tests the '/' route which has a canned example response.

To run this project's tests:

```sh
pnpm --filter fastify-api test
```

## Configuration

The API is configured to listen for signals in `src/main.ts` and will attempt to gracefully exit on `SIGINT` (Ctrl+C) and `SIGTERM` (commonly used in container environments and serverless platforms).

If you add a database or connect to other external services be sure to handle these signals appropriately, add any required cleanup code, and use a timeout to ensure the process exits if cleanup takes too long.

Both the fastify and node ecosystem have plugins and libraries to help with gracefully shutting down servers and handling signals.

## Build

The `build` target in `package.json` runs `esbuild` using the config `build.ts` to bundle the server code.

This build configuration outputs ESM which is supported in Node 20+. This particular configuration may not be suitable for all projects. It is still common for back-end NodeJS projects to be build as CommonJS for compatibility with older versions of Node, certain libraries, and certain hosting environments.

The compiled build can be run using `node apps/fastify-api/dist/main.js` from the workspace root.
