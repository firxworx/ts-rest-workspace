import * as path from 'path'

import { FastifyInstance } from 'fastify'
import AutoLoad from '@fastify/autoload'

export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions): Promise<void> {
  // custom code here
  // ...

  // ------------------------------------------

  // load all plugins defined under plugins/ (support plugins used throughout the app)
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  })

  // load all plugins defined under routes/ (standard non ts-rest routes)
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  })
}
