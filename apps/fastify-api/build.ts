import esbuild from 'esbuild'

/**
 * Build the fastify-app to ESM using esbuild.
 *
 * A `banner` is specified to support CJS `require()`.
 *
 * If you are bundling for AWS Lambda and want to use ESM you must change the output file extension to
 * `.mjs`: `outExtension: { '.js': '.mjs' }` and specify any external dependencies such as aws-sdk using the
 * `external` option.
 *
 * The `@fastify/autoload` plugin is incompatible with bundling as it searches the plugins, routes, etc.
 *
 * For production builds for containerized or serverless environments you may want to avoid using documentation
 * plugins such as `@fastify/swagger`.
 */
await esbuild.build({
  bundle: true,
  entryPoints: ['./src/main.ts'],
  outdir: './dist',
  platform: 'node',
  format: 'esm',
  target: 'node20',
  banner: {
    js: 'import { createRequire } from "module"; import url from "url"; const require = createRequire(import.meta.url); const __filename = url.fileURLToPath(import.meta.url); const __dirname = url.fileURLToPath(new URL(".", import.meta.url));',
  },
})
