import type { FastifyInstance, FastifyRequest, FastifyReply, FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line @typescript-eslint/require-await -- standard fastify syntax
const root: FastifyPluginAsync = async (fastify: FastifyInstance, _opts): Promise<void> => {
  fastify.get('/', async function (_request: FastifyRequest, _reply: FastifyReply) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    return { message: 'Hello API' }
  })
}

export default root
