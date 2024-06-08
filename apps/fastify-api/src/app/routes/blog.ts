import type { FastifyInstance } from 'fastify'
import { initServer } from '@ts-rest/fastify'

import { apiBlog, type Post } from '@workspace/contracts'

export const mockPostFixtureFactory = (partial: Partial<Post>): Post => ({
  id: 'mock-id',
  title: `Post`,
  content: `Content`,
  description: `Description`,
  published: true,
  tags: ['tag1', 'tag2'],
  ...partial,
})

/**
 * Implement the blog contract as a router using mock data.
 */
export default async function (fastify: FastifyInstance): Promise<void> {
  const s = initServer()

  const router = s.router(apiBlog, {
    getPost: async ({ params: { id } }) => {
      await new Promise((resolve) => setTimeout(resolve, 250))

      const post = mockPostFixtureFactory({ id })

      if (!post) {
        return {
          status: 404,
          body: null,
        }
      }

      return {
        status: 200,
        body: post,
      }
    },
    getPosts: async ({ query }) => {
      await new Promise((resolve) => setTimeout(resolve, 250))
      const posts = [mockPostFixtureFactory({ id: '1' }), mockPostFixtureFactory({ id: '2' })]

      return {
        status: 200,
        body: {
          posts,
          count: 0,
          skip: query.skip,
          take: query.take,
        },
      }
    },
    createPost: async ({ body }) => {
      await new Promise((resolve) => setTimeout(resolve, 250))
      const post = mockPostFixtureFactory(body)

      return {
        status: 201,
        body: post,
      }
    },
    updatePost: async ({ body }) => {
      await new Promise((resolve) => setTimeout(resolve, 250))
      const post = mockPostFixtureFactory(body)

      return {
        status: 200,
        body: post,
      }
    },
    deletePost: async () => {
      await new Promise((resolve) => setTimeout(resolve, 250))
      return {
        status: 200,
        body: { message: 'Post deleted' },
      }
    },
    testPathParams: async ({ params }) => {
      await new Promise((resolve) => setTimeout(resolve, 50))

      return {
        status: 200,
        body: params,
      }
    },
  })

  await fastify.register(s.plugin(router))
}
