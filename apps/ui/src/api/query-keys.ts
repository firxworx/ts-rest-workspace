/**
 * React Query cache keys for blog post contract endpoints.
 */
export const postKeys = {
  all: () => ['posts'] as const,
  lists: () => ['posts', 'lists'] as const,
  detail: (id: string) => {
    return [...postKeys.all(), id] as const
  },
}

/**
 * React Query cache keys for hello contract endpoints.
 */
export const helloKeys = {
  all: () => ['hello'] as const,
}
