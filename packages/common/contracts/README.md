# common-contracts

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build common-contracts` to build the library.

The following properties were removed from the nx boilerplate `package.json` while the 'esm' format was added (in addition to 'cjs') to the esbuild configuration in `project.json`. Nx + esbuild should generate the appropriate values at build time.

```json
  "type": "commonjs",
  "main": "./index.cjs",
```

In addition `sideEffects: false` was added to `package.json` to support tree shaking.

## Running unit tests

Run `nx test common-contracts` to execute the unit tests via [Jest](https://jestjs.io).
