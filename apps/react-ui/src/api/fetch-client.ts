import { initClient } from '@ts-rest/core'

import { apiBlog } from '@rfx/common-contracts'
import { API_URL } from '../constants'

/**
 * Fetch client for the blog API associated with the ts-rest Blog contract.
 */
export const fetchApi = initClient(apiBlog, {
  baseUrl: API_URL,

  // example of adding a header to every request
  baseHeaders: {
    'x-api-key': 'key',
  },
})

// usage examples from the docs repo:
//
// const { body, status } = await fetchApi.createPost({
//   body: {
//     title: 'Post Title',
//     body: 'Post Body',
//   },
// })
//
// if (status === 201) {
//   // body is Post
//   console.log(body)
// } else {
//   // body is unknown
//   console.log(body)
// }
