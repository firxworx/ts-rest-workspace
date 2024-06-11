# React + Vite UI

React+Vite app showcasing [ts-rest](https://ts-rest.com) contracts with the react-query client plus react-router v6 and tailwindcss.

- `tailwind.config.ts` imports the project tailwindcss preset from `@workspace/tailwind`
- `postcss.config.js` is configured for tailwindcss and adds additional plugins for oklch colors and removing css comments
- `vite.config.ts` includes a proxy configuration that sends requests to `/api` to the `fastify-api` server

Run the UI and API dev servers together by executing `pnpm dev` from the workspace root.

## Tips for ts-rest

### Utility types

`@ts-rest/core` exposes the utility type `ClientInferResponseBody<...>`. Assuming a contract for `things`:

```ts
type ComponentProps = {
  thing: ClientInferResponseBody<typeof contract.things.getThing, 200>;
}
```

### QueryClient helpers

Refer to docs: https://ts-rest.com/docs/react-query#queryclient-helpers

ts-rest provides a hook `useTsRestQueryClient` that returns a query client instance with the correct types for your contracts.

This can help implement react-query patterns such as optimistic updates:

```ts
// ... in a function component
const tsrQueryClient = useTsRestQueryClient(apiClient)

// ... in onSuccess callback of a mutation
apiQueryClient.posts.getPosts.setQueryData(['posts'], (prevPosts) => { ...prevPosts, body: [...oldPosts.body, newPost.body] })
```
