import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { openApiDocument } from '../../document'

/**
 * Swagger/OpenAPI plugin for this app.
 */
export default fp(async function (fastify: FastifyInstance) {
  fastify
    .register(fastifySwagger, {
      swagger: openApiDocument,
    })
    .register(fastifySwaggerUI)
})
