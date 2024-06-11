import { initContract, type RouterOptions } from '@ts-rest/core'
import { apiBlogContract } from './features/blog.contract'
import { apiHelloContract } from './features/hello.contract'
import { API_PATH_PREFIX } from './constants'

const c = initContract()

const routerOptions: RouterOptions<typeof API_PATH_PREFIX> = {
  strictStatusCodes: true,
  pathPrefix: API_PATH_PREFIX,

  // uncomment the following example to require headers for every request
  // baseHeaders: z.object({ ... })
}

export const apiContract = c.router(
  {
    posts: apiBlogContract,
    hello: apiHelloContract,
  },
  routerOptions,
)
