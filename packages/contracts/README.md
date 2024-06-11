# @workspace/contracts

ts-rest contracts for the workspace.

Two contracts are defined to provide a realistic example where apps are likely to have multiple contracts:

- `src/features/blog.contract.ts` - blog contract governing `posts` endpoints
- `src/features/hello.contract.ts` - hello contract governing `hello` endpoints

These contracts are combined into the "root" API contract: `src/contract.ts`.

The API endpoint path prefixes are defined in `src/constants.ts`.

## Docs

https://ts-rest.com/docs/core/
