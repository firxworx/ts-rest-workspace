/**
 * React Query cache keys for blog post contract endpoints.
 */
export const postKeys = {
  all: () => ['posts'] as const,
  lists: () => ['posts', 'lists'] as const,
  detail: (id: string) => {
    return [...postKeys.all(), id] as const
  },

  // cannot use the same cache key for useQuery + useInfiniteQuery
  // https://tkdodo.eu/blog/effective-react-query-keys#caching-data
  infinite: () => ['infinitePosts'] as const,
}

/**
 * React Query cache keys for hello contract endpoints.
 */
export const helloKeys = {
  all: () => ['hello'] as const,
}
