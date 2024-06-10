import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import sensible from '@fastify/sensible'

/**
 * The `@fastify/sensible` plugin adds utilities to handle http errors.
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(sensible)
})
