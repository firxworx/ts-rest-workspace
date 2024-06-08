# @workspace/contracts

ts-rest contracts for the API.

## Building

There is no build any more... Nx was trashed.

Run `pnpm --filter @workspace/contracts build` to build the library.

The following properties were removed from the nx boilerplate `package.json` while the 'esm' format was added (in addition to 'cjs') to the esbuild configuration in `project.json`. Nx + esbuild should generate the appropriate values at build time.

```json
  "type": "commonjs",
  "main": "./index.cjs",
```

In addition `sideEffects: false` was added to `package.json` to support tree shaking.

## Running unit tests

Run `nx test common-contracts` to execute the unit tests via [Jest](https://jestjs.io).
