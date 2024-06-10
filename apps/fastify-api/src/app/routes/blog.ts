import type { FastifyInstance } from 'fastify'
import { initServer } from '@ts-rest/fastify'

import { zPost, type Post } from '@workspace/data'
import { apiBlog } from '@workspace/contracts'
import { mockPostFixtureFactory } from '../../helpers/mock-posts'
import { ZodError } from 'zod'

const DEFAULT_SKIP = 0
const DEFAULT_TAKE = 5
const RANDOM_POSTS: Post[] = Array.from({ length: 100 }, () => mockPostFixtureFactory())

const s = initServer()

/**
 * Implement the blog contract as a router using mock data.
 */
export default async function (fastify: FastifyInstance): Promise<void> {
  const router = s.router(apiBlog, {
    getPost: async ({ params: { id } }) => {
      await new Promise((resolve) => setTimeout(resolve, 250))

      const post = RANDOM_POSTS.find((post) => post.id === id)

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

      const skip = query.skip ?? DEFAULT_SKIP
      const take = query.take ?? DEFAULT_TAKE
      const posts = RANDOM_POSTS.slice(skip, skip + take)

      return {
        status: 200,
        body: {
          items: posts,
          count: RANDOM_POSTS.length,
          skip,
          take,
        },
      }
    },
    createPost: async ({ body }) => {
      await new Promise((resolve) => setTimeout(resolve, 250))
      const post = mockPostFixtureFactory(body)

      RANDOM_POSTS.push(post)

      return {
        status: 201,
        body: post,
      }
    },
    updatePost: async ({ params: { id }, body }) => {
      await new Promise((resolve) => setTimeout(resolve, 250))
      const postIndex = RANDOM_POSTS.findIndex((post) => post.id === id)

      if (postIndex === -1) {
        return {
          status: 404,
          body: { error: 'Post not found' },
        }
      }

      try {
        const updatedPost = zPost.parse({ ...RANDOM_POSTS[postIndex], ...body, id })
        RANDOM_POSTS[postIndex] = updatedPost

        return {
          status: 200,
          body: updatedPost,
        }
      } catch (error: unknown) {
        if (error instanceof ZodError) {
          return {
            status: 400,
            body: { error: 'Invalid post data' },
          }
        }
      }

      return {
        status: 500,
        body: { error: 'Internal server error' },
      }
    },
    deletePost: async ({ params: { id } }) => {
      await new Promise((resolve) => setTimeout(resolve, 250))

      const postIndex = RANDOM_POSTS.findIndex((post) => post.id === id)

      if (postIndex === -1) {
        return {
          status: 404,
          body: { error: 'Post not found' },
        }
      }

      RANDOM_POSTS.splice(postIndex, 1)

      // ts-rest and fastify in the past has had an issue sending empty response body for 204 (no-content) responses
      // refer to "content type parsers" in the fastify docs for further details
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
