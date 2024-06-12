import { type FastifyInstance, type FastifyPluginAsync } from 'fastify'
import { initServer } from '@ts-rest/fastify'
import { apiContract } from '@workspace/contracts'
import { postsContractRouter } from '../contracts/blog'
import { helloContractRouter } from '../contracts/hello'

/**
 * Implementation of the ts-rest contract on the API side as a "contract router".
 * See the comments which explain additional customization options.
 */
const contract: FastifyPluginAsync = async function (fastify: FastifyInstance): Promise<void> {
  const s = initServer()

  const contractsRouter = s.router(apiContract, {
    posts: postsContractRouter.routes,
    hello: helloContractRouter.routes,
  })

  await fastify.register(s.plugin(contractsRouter), {
    // enable for ts-rest to log routes (warning: uses console.log() instead of fastify.log.info())
    // logInitialization: true,

    // validate reponses against the contract for rigour (throws `ResponseValidationError` with status 500 on mismatch)
    responseValidation: true,

    // example of customizing ts-rest's request validation error and tailoring the response --
    // @see https://ts-rest.com/docs/fastify/#request-validation-error-handling
    //
    // requestValidationErrorHandler: (error: RequestValidationError, _request, _reply) => {
    //   // example using fastify.httpErrors from fastify-sensible plugin
    //   // return fastify.httpErrors.badRequest(`Request validation failed: ${messages.join(', ')}`)
    //   // example custom response
    //   // return reply.status(400).send({
    //   //   status: 400,
    //   //   message: 'Validation failed',
    //   //   errors: err.body?.flatten().fieldErrors,
    //   // })
    //   // tip: zod's `error.flatten()` method can help flatten lists of errors
    // },
  })

  // note: ts-rest docs suggest `s.registerRouter()` however that does not return a promise like s.plugin()
  // await s.registerRouter(apiContract, contractsRouter, fastify, { options })
}

export default contract
