import { generateOpenApi } from '@ts-rest/open-api'
import { apiBlog } from '@rfx/common-contracts'

export const openApiDocument = generateOpenApi(
  apiBlog,
  {
    info: {
      title: 'Posts API',
      version: '0.0.1',
    },
  },
  { setOperationId: true },
)
