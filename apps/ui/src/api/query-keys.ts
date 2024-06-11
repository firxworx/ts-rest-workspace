/**
 * React Query cache keys for blog post contract endpoints.
 */
export const postKeys = {
  all: () => ['posts'] as const,
  lists: () => [...postKeys.all(), 'list'] as const,
  details: () => [...postKeys.all(), 'detail'] as const,
  detail: (id: string) => {
    return [...postKeys.details(), id] as const
  },
}

/**
 * React Query cache keys for hello contract endpoints.
 */
export const helloKeys = {
  all: () => ['hello'] as const,
}
