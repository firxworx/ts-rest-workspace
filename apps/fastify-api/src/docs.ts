import { generateOpenApi } from '@ts-rest/open-api'
import { apiBlog } from '@workspace/contracts'

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

// random github search examples
// this guy adds to it -- https://github.com/documenso/documenso/blob/cc43139573ec69461a28bc79d39d7a6a2bfc4950/packages/api/v1/openapi.ts#L4
// has util to patch the openAPI document with apiKey / eader / authorization
// https://github.com/mahadhameed095/blog-api-tsrest-express/blob/bced1e74a8184db9cc66ff6ee03d3deba724bd67/utils.ts#L4
