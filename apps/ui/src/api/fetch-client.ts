import { initClient } from '@ts-rest/core'

import { apiContract } from '@workspace/contracts'
import { API_URL } from '../constants'

/**
 * Fetch client powered by react-query for the API implementing the ts-rest contract.
 *
 * @see https://ts-rest.com/docs/core/custom for client customization + custom clients
 * @see https://ts-rest.com/docs/core/fetch for api client documentation
 */
export const fetchApi = initClient(apiContract, {
  baseUrl: API_URL,

  // example of adding a header to every request (refer to the contract that requires this header)
  baseHeaders: {
    'x-api-key': 'key',
  },

  // uncomment to include credentials
  // credentials: 'same-origin',
})
