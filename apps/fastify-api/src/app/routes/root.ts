/* eslint-disable @typescript-eslint/require-await -- no await required for trivial route example */
import type { FastifyInstance, FastifyRequest, FastifyReply, FastifyPluginAsync } from 'fastify'

/**
 * Example of a simple fastify route external to the combined ts-rest contract.
 * This can be helpful for healthchecks or other routes that do not necessarily need to be part of a contract.
 */
const root: FastifyPluginAsync = async (fastify: FastifyInstance, _opts): Promise<void> => {
  fastify.get('/', async function (_request: FastifyRequest, _reply: FastifyReply) {
    return { message: 'Hello API' }
  })
}

export default root
