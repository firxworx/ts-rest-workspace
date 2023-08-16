import Fastify, { type FastifyInstance } from 'fastify'
import { app } from './app/app'

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ? Number(process.env.PORT) : 3939

const fastify: FastifyInstance = Fastify({ logger: true })

// ts-rest routes are autoloaded from routes/ via fastify AutoLoad (refer to app.ts)
fastify.register(app)

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ host: HOST, port: PORT })
  } catch (error: unknown) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
