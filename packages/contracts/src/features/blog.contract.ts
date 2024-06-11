import { initContract, type RouterOptions } from '@ts-rest/core'
import { z } from 'zod'
import {
  createPaginatedResponseSchema,
  zContractErrorResponse,
  zContractMessageResponse,
  zGetManyQueryParams,
  zPost,
  zPostCreateRequestDto,
  zPostUpdateRequestDto,
  zUuidParams,
} from '@workspace/data'
import { BLOG_CONTRACT_PATH_PREFIX } from '../constants'

const c = initContract()

const routerOptions: RouterOptions<typeof BLOG_CONTRACT_PATH_PREFIX> = {
  pathPrefix: BLOG_CONTRACT_PATH_PREFIX,
  strictStatusCodes: true,

  // example of requiring certain headers for every request
  baseHeaders: z.object({
    'x-api-key': z.string(),
  }),
}

export const apiBlogContract = c.router(
  {
    createPost: {
      method: 'POST',
      path: '/',
      responses: {
        201: zPost,
        400: zContractErrorResponse,
      },
      body: zPostCreateRequestDto,
      summary: 'Create a post',
      metadata: { roles: ['user'] } as const,
    },
    updatePost: {
      method: 'PATCH',
      path: `/:id`,
      responses: { 200: zPost, 400: zContractErrorResponse, 404: zContractErrorResponse, 500: zContractErrorResponse },
      pathParams: zUuidParams,
      body: zPostUpdateRequestDto,
      summary: 'Update a post',
      metadata: {
        roles: ['user'],
        resource: 'post',
        identifierPath: 'params.id',
      } as const,
    },
    deletePost: {
      method: 'DELETE',
      path: `/:id`,
      pathParams: zUuidParams,
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
      path: `/:id`,
      pathParams: zUuidParams,
      responses: {
        200: zPost,
        404: z.null(),
      },
      query: null,
      summary: 'Get a post by id',
      metadata: { roles: ['guest', 'user'] } as const, // example only
    },
    getPosts: {
      method: 'GET',
      path: '/',
      responses: {
        200: createPaginatedResponseSchema(zPost),
      },
      query: zGetManyQueryParams,
      summary: 'Get all posts',
      headers: z.object({
        'x-pagination': z.coerce.number().optional(),
      }),
      metadata: { roles: ['guest', 'user'] } as const, // example only
    },
  },
  routerOptions,
)
