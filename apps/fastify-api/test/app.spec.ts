import Fastify, { type FastifyInstance } from 'fastify'
import { app } from '../src/app/app.js'

describe('GET /', () => {
  let server: FastifyInstance

  beforeEach(async () => {
    server = Fastify()
    await server.register(app)
  })

  it('should respond with a message', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.json()).toEqual({ message: 'Hello API' })
  })
})
