import type { FastifyInstance } from 'fastify'
import sensiblePlugin from './plugins/sensible'
import rootRoute from './routes/root'
import contractRoutes from './routes/contract'

export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions): Promise<void> {
  // register plugins
  await fastify.register(sensiblePlugin, opts)

  // register an example route that's not part of the ts-rest contract
  await fastify.register(rootRoute, opts)

  // register ts-rest contract routes
  await fastify.register(contractRoutes, opts)
}
