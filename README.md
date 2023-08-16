# Nx with Fastify API and React UI via ts-rest

An [Nx](https://nx.dev) monorepo featuring a [Fastify](https://fastify.dev/) back-end and [React](https://react.dev/) front-end that exchange data via [ts-rest](https://ts-rest.com/).

ts-rest offers comparable benefits to developer experience and developer efficiency vs. [TRPC](https://trpc.io/) except it is implementing using a mature protocol.

## Architecture Value

ts-rest is arguably superior strategic choice for client-server communications in real-world business applications vs. newer protocols such as TRPC and GraphQL.

Real-world companies of all sizes across the vast majority of industries benefit from internet-standards that are widely-supported, well-understood, and straightforward for customers and partners to interface and integrate with.

There is no greater ecosystem of tools, libraries, and expertise than REST-like API's and this is unlikely to change in the foreseeable future.

ts-rest provides developers with a highly productive TRPC-like experience that enhances developer efficiency by eliminating duplication and delivering end-to-end type safety.

## Start the app

To start the development server run `pnpm nx serve react-ui`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
