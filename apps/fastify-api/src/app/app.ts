import * as path from 'path'

import type { FastifyInstance } from 'fastify'
import AutoLoad from '@fastify/autoload'

export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions): Promise<void> {
  // add custom code here...

  // to customize error handling in fastify with ts-rest:
  // note that inititServer().registerRouter()'s requestValidationErrorHandler option is equivalent to calling
  // fastify.setErrorHandler(requestValidationErrorHandler(options.requestValidationErrorHandler))
  //
  // @see https://github.com/ts-rest/ts-rest/libs/ts-rest/fastify/src/lib/ts-rest-fastify.ts
  // @see https://ts-rest.com/docs/fastify/

  // load all plugins defined under plugins/ (support plugins used throughout the app)
  await fastify.register(AutoLoad, {
    dir: path.join(import.meta.dirname, 'plugins'),
    options: { ...opts },
  })

  // load all plugins defined under routes/
  await fastify.register(AutoLoad, {
    dir: path.join(import.meta.dirname, 'routes'),
    options: { ...opts },
  })
}
