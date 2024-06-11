# React + Vite UI

React+Vite app showcasing [ts-rest](https://ts-rest.com) contracts with the react-query client plus react-router v6 and tailwindcss.

- `tailwind.config.ts` imports the project tailwindcss preset from `@workspace/tailwind`
- `postcss.config.js` is configured for tailwindcss and adds additional plugins for oklch colors and removing css comments
- `vite.config.ts` includes a proxy configuration that sends requests to `/api` to the `fastify-api` server

Run the UI and API dev servers together by executing `pnpm dev` from the workspace root.
