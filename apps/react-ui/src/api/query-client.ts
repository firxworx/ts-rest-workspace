import { initQueryClient } from '@ts-rest/react-query'

import { apiBlog } from '@workspace/contracts'
import { API_URL } from '../constants'

/**
 * Client powered by react-query for the blog API associated with the ts-rest Blog contract.
 */
export const apiQuery = initQueryClient(apiBlog, {
  baseUrl: API_URL,

  // example of adding a header to every request
  baseHeaders: {
    'x-api-key': 'key',
  },
})
