import { initServer } from '@ts-rest/fastify'
import { apiContract } from '@workspace/contracts'

const s = initServer()

export const helloContractRouter = s.router(apiContract.hello, {
  getHello: async () => {
    await new Promise((resolve) => setTimeout(resolve, 50))

    return {
      status: 200,
      body: { message: 'Hello, World!' },
    }
  },
})
