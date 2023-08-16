import { generateOpenApi } from '@ts-rest/open-api'
import { apiBlog } from '@rfx/common-contracts'

/**
 * OpenAPI (Swagger) document for this app generated from the ts-rest `apiBlog` contract.
 */
export const openApiDocument = generateOpenApi(
  apiBlog,
  {
    info: {
      title: 'Posts API',
      version: '0.0.1',
      description: 'Example ts-rest + fastify API with OpenAPI and a mock blog Posts contract.',
    },
  },
  { setOperationId: true },
)
