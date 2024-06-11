import { initQueryClient } from '@ts-rest/react-query'

import { apiContract } from '@workspace/contracts'
import { API_URL } from '../constants'

/**
 * React Query client (`@tanstack/react-query`) for the API implementing the ts-rest contract.
 *
 * @see https://tanstack.com/query
 * @see https://ts-rest.com/docs/react-query
 * @see https://ts-rest.com/docs/core/custom
 */
export const apiQuery = initQueryClient(apiContract, {
  baseUrl: API_URL,

  // example of adding a header to every request (refer to the contract that requires this header)
  baseHeaders: {
    'x-api-key': 'key',
  },

  // uncomment to include credentials
  // credentials: 'same-origin',
})
