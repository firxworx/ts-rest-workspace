import { initContract } from '@ts-rest/core'
import { z } from 'zod'
import {
  createPaginatedResponseSchema,
  zContractErrorResponse,
  zContractMessageResponse,
  zGetManyQueryParams,
  zPost,
  zPostCreateDto,
  zPostUpdateDto,
} from '@workspace/data'

const c = initContract()

export const apiBlog = c.router(
  {
    createPost: {
      method: 'POST',
      path: '/posts',
      responses: {
        201: zPost,
        400: zContractErrorResponse,
      },
      body: zPostCreateDto,
      summary: 'Create a post',
      metadata: { roles: ['user'] } as const,
    },
    updatePost: {
      method: 'PATCH',
      path: `/posts/:id`,
      responses: { 200: zPost, 400: zContractErrorResponse, 404: zContractErrorResponse, 500: zContractErrorResponse },
      body: zPostUpdateDto,
      summary: 'Update a post',
      metadata: {
        roles: ['user'],
        resource: 'post',
        identifierPath: 'params.id',
      } as const,
    },
    deletePost: {
      method: 'DELETE',
      path: `/posts/:id`,
      responses: {
        200: zContractMessageResponse,
        404: zContractErrorResponse,
      },
      body: z.object({}), // @workaround for https://github.com/ts-rest/ts-rest/issues/383,
      summary: 'Delete a post',
      metadata: {
        roles: ['user'],
        resource: 'post',
        identifierPath: 'params.id',
      } as const,
    },
    getPost: {
      method: 'GET',
      path: `/posts/:id`,
      responses: {
        200: zPost,
        404: z.null(),
      },
      query: null,
      summary: 'Get a post by id',
      metadata: { roles: ['guest', 'user'] } as const,
    },
    getPosts: {
      method: 'GET',
      path: '/posts',
      responses: {
        200: createPaginatedResponseSchema(zPost),
      },
      query: zGetManyQueryParams,
      summary: 'Get all posts',
      headers: z.object({
        'x-pagination': z.coerce.number().optional(),
      }),
      metadata: { roles: ['guest', 'user'] } as const,
    },

    // this endpoint helps demonstrate query/path params
    testPathParams: {
      method: 'GET',
      path: '/test/:id/:name',
      pathParams: z.object({
        id: z
          .string()
          .transform(Number)
          .refine((v) => Number.isInteger(v), {
            message: 'Must be an integer',
          }),
      }),
      query: z.object({
        field: z.string().optional(),
      }),
      responses: {
        200: z.object({
          id: z.number().lt(1000),
          name: z.string(),
          defaultValue: z.string().default('hello world'),
        }),
      },
      metadata: { roles: ['guest', 'user'] } as const,
    },
  },
  {
    pathPrefix: '/api/v1',
    strictStatusCodes: true,
    baseHeaders: z.object({
      'x-api-key': z.string(),
    }),
  },
)
