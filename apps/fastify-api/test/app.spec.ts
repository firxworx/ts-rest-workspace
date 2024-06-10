import Fastify, { type FastifyInstance } from 'fastify'
import { afterAll, beforeAll, test, it, expect, describe } from 'vitest'
import { app } from '../src/app/app.js'
import supertest from 'supertest'

/**
 * Run this test file:
 *
 * ```ts
 * pnpm --filter fastify-api test test/app.spec.ts
 * ```
 *
 * @see https://github.com/vitest-dev/vitest/blob/main/examples/fastify/test/app.test.ts
 */
describe('fastify-api', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = Fastify()
    await server.register(app)
  })

  afterAll(async () => {
    await server.close()
  })

  describe('GET /', () => {
    // test with http injection
    it('should respond with a message', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/',
      })

      expect(response.json()).toEqual({ message: 'Hello API' })
    })

    test('with a running server', async () => {
      await server.ready()
      const response = await supertest(server.server).get('/').expect(200)
      const expectedResponseBody = { message: 'Hello API' }

      expect(response.body).toStrictEqual(expectedResponseBody)
    })
  })
})
