# @workspace/contracts

ts-rest contracts for the workspace.

Two contracts are defined to provide a realistic example where apps are likely to have multiple contracts:

- `src/features/blog.contract.ts` - blog contract governing `posts` endpoints
- `src/features/hello.contract.ts` - hello contract governing `hello` endpoints

These contracts are combined into the "root" API contract: `src/contract.ts`.

The API endpoint path prefixes are defined in `src/constants.ts`.

## Docs

https://ts-rest.com/docs/core/

## Example Build

This package has no build step and its `package.json` exports the TypeScript source files directly. It will be built/bundled by the consuming project (app) that imports the package.

If you would like to build this package, presumably as a step towards publishing it to a registry such as npm or GitHub Packages, a working `tsup` configuration is provided that will output both ESM and CJS versions: `tsup.config.ts`.

Publishing enables you to share your contracts with other projects within or even outside of your organization. Note that additional steps are required to publish packages that are not covered here but are well documented by other resources.

You can run the example build script via the `build:tsup` script in `package.json`:

```sh
pnpm --filter @workspace/contracts build:tsup
```

A different script name is intentionally used vs. `build` so that it is differentiated from the workspace `build` command.

The `tsconfig.json` of this package specifies `include: ["src/**/*.ts"]` so that `tsup` is not confused during the build process: otherwise after outputting types for the first ESM/CJS format it processes it'll get confused by the generated `.d.ts` files and fail when working on outputting the second format.
