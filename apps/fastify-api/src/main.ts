import Fastify, { type FastifyInstance } from 'fastify'
import { app } from './app/app.js'

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ? Number(process.env.PORT) : 3939

const fastify: FastifyInstance = Fastify({ logger: true })

// ts-rest routes are autoloaded from routes/ via fastify AutoLoad (refer to app.ts)
await fastify.register(app)

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ host: HOST, port: PORT })
  } catch (error: unknown) {
    fastify.log.error(error)
    process.exit(1)
  }
}

await start()

// see closeWithGrace example here https://github.com/jellydn/nft-app/blob/main/server/src/server.ts
// https://github.com/jellydn/nft-app/blob/main/server/src/plugins/cors.ts
// multipart https://github.com/jellydn/nft-app/blob/main/server/src/plugins/multipart.ts

// neat https://github.com/fastify/aws-lambda-fastify/blob/master/README.md
// + https://github.com/fastify/aws-lambda-fastify/issues/89 re lower cold start latency (see readme on it)
