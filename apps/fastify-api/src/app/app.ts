import type { FastifyInstance } from 'fastify'
import sensiblePlugin from './plugins/sensible'
import rootRoute from './routes/root'
import blogRoute from './routes/blog'

export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions): Promise<void> {
  // register plugins
  await fastify.register(sensiblePlugin, opts)

  // register routes
  await fastify.register(rootRoute, opts)
  await fastify.register(blogRoute, opts)
}

/*
 * Note: to customize error handling in fastify with ts-rest
 *
 * - `inititServer().registerRouter()`'s requestValidationErrorHandler option is equivalent to calling
 *   `fastify.setErrorHandler(requestValidationErrorHandler(options.requestValidationErrorHandler))`
 *
 * @see https://github.com/ts-rest/ts-rest/libs/ts-rest/fastify/src/lib/ts-rest-fastify.ts
 * @see https://ts-rest.com/docs/fastify/
 */
