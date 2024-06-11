import { type FastifyInstance } from 'fastify'
import { initServer } from '@ts-rest/fastify'
import { apiContract } from '@workspace/contracts'
import { postsContractRouter } from '../contracts/blog'
import { helloContractRouter } from '../contracts/hello'

/**
 * Implementation of the ts-rest contract on the API side as a "contract router".
 */
export default async function (fastify: FastifyInstance): Promise<void> {
  const s = initServer()

  const contractsRouter = s.router(apiContract, {
    posts: postsContractRouter.routes,
    hello: helloContractRouter.routes,
  })

  fastify.log.info('registering ts-rest contracts router')
  await fastify.register(s.plugin(contractsRouter))
}
