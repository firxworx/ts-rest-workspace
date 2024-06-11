import { initContract, type RouterOptions } from '@ts-rest/core'
import { z } from 'zod'
import { zHelloDto, zUuidParams } from '@workspace/data'
import { HELLO_CONTRACT_PATH_PREFIX } from '../constants'

const c = initContract()

const routerOptions: RouterOptions<typeof HELLO_CONTRACT_PATH_PREFIX> = {
  pathPrefix: HELLO_CONTRACT_PATH_PREFIX,
  strictStatusCodes: true,
}

export const apiHelloContract = c.router(
  {
    getHello: {
      method: 'GET',
      path: '/',
      responses: {
        200: zHelloDto,
        404: z.null(),
      },
      pathParams: zUuidParams,
      query: null,
      summary: 'Get a hello message',
      metadata: { roles: ['guest', 'user'] } as const,
    },
  },
  routerOptions,
)
