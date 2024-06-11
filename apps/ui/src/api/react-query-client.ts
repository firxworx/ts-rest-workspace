import { type Query, QueryCache, QueryClient, MutationCache } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      networkMode: 'offlineFirst',
      staleTime: 1000 * 60 * 5, // 5 minutes (note: `Infinity` is 'never stale')
      retry: false,
    },
    mutations: {
      retry: false,
      useErrorBoundary: false, // do not throw errors to the global error boundary
    },
  },
  queryCache: new QueryCache({
    onError: (error: unknown, query: Query): void => {
      // @future log to remote telemetry or observability service (such as sentry or opentelemetry)

      if (import.meta.env.DEV) {
        console.error('queryCache error', error, query)
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown, query: unknown): void => {
      // @future log to remote telemetry or observability service (such as sentry or opentelemetry)

      if (import.meta.env.DEV) {
        console.error('mutationCache error', error, query)
      }
    },
  }),
})
