import Fastify, { type FastifyInstance } from 'fastify'
import { app } from './app/app.js'

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ? Number(process.env.PORT) : 3939

const fastify: FastifyInstance = Fastify({ logger: true, disableRequestLogging: false })

await fastify.register(app)

fastify.addHook('onClose', (_instance, done) => {
  process.removeListener('SIGTERM', handleSignal)
  process.removeListener('SIGINT', handleSignal)
  process.removeListener('SIGUSR2', handleSignal)
  process.removeListener('uncaughtException', handleError)
  process.removeListener('unhandledRejection', handleError)

  done()
})

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ host: HOST, port: PORT })
  } catch (error: unknown) {
    fastify.log.error(error)
    process.exit(1)
  }
}

const cleanup = async (): Promise<void> => {
  // add any cleanup code here to cleanup and close as required...
  // e.g. `await Promise.allSettled([...])`

  await new Promise((resolve) => setTimeout(resolve, 10))
}

const exit = async (): Promise<void> => {
  try {
    await fastify.close()
    process.exit(0)
  } catch (error: unknown) {
    fastify.log.error('Error shutting down server')
    fastify.log.error(error)
    process.exit(1)
  }
}

const handleSignal = async (signal: string): Promise<void> => {
  fastify.log.warn(`Received signal ${signal}: attempting graceful shutdown...`)

  await cleanup()
  await exit()
}

const handleError = async (): Promise<void> => {
  fastify.log.warn(`Uncaught exception or promise rejection... attempting graceful shutdown...`)

  await cleanup()
  await exit()
}

process.once('uncaughtException', handleError)
process.once('unhandledRejection', handleError)

process.once('SIGINT', handleSignal) // control+C
process.once('SIGTERM', handleSignal) // exit from lambda/heroku/etc
process.once('SIGUSR2', handleSignal) // nodemon-like utility

await start()
