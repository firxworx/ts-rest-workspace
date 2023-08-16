import Fastify, { type FastifyInstance } from 'fastify'
import { initServer } from '@ts-rest/fastify'
import { app } from './app/app'

import { apiBlog, type Post } from '@rfx/common-contracts'

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ? Number(process.env.PORT) : 3939

// export const mockPostFixtureFactory = (partial: Partial<Post>): Post => ({
//   id: 'mock-id',
//   title: `Post`,
//   content: `Content`,
//   description: `Description`,
//   published: true,
//   tags: ['tag1', 'tag2'],
//   ...partial,
// })

const fastify: FastifyInstance = Fastify({ logger: true })

fastify.register(app)

// const s = initServer()

// const router = s.router(apiBlog, {
//   getPost: async ({ params: { id } }) => {
//     const post = mockPostFixtureFactory({ id })

//     if (!post) {
//       return {
//         status: 404,
//         body: null,
//       }
//     }

//     return {
//       status: 200,
//       body: post,
//     }
//   },
//   getPosts: async ({ query }) => {
//     const posts = [mockPostFixtureFactory({ id: '1' }), mockPostFixtureFactory({ id: '2' })]

//     return {
//       status: 200,
//       body: {
//         posts,
//         count: 0,
//         skip: query.skip,
//         take: query.take,
//       },
//     }
//   },
//   createPost: async ({ body }) => {
//     const post = mockPostFixtureFactory(body)

//     return {
//       status: 201,
//       body: post,
//     }
//   },
//   updatePost: async ({ body }) => {
//     const post = mockPostFixtureFactory(body)

//     return {
//       status: 200,
//       body: post,
//     }
//   },
//   deletePost: async () => {
//     return {
//       status: 200,
//       body: { message: 'Post deleted' },
//     }
//   },
//   testPathParams: async ({ params }) => {
//     return {
//       status: 200,
//       body: params,
//     }
//   },
// })

// s.registerRouter(apiBlog, router, fastify, {
//   logInitialization: true,
//   // requestValidationErrorHandler: (error, request, reply) => {
//   //   return reply.status(400).send({
//   //     numberOfBodyErrors: error.body?.issues.length,
//   //   })
//   // },
// })

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ host: HOST, port: PORT })
  } catch (error: unknown) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
