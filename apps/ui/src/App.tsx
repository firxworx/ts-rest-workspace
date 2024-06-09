import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AppRouter } from './AppRouter'
import { queryClient } from './lib/react-query-client'
import { AppErrorBoundary } from './layout/errors/AppErrorBoundary'

export function App(): JSX.Element {
  return (
    <AppErrorBoundary>
      <React.Suspense fallback={<div>Loading&hellip;</div>}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider
            router={AppRouter}
            fallbackElement={<div>Loading&hellip;</div>}
            // @todo <SkeletonLayout />
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </React.Suspense>
    </AppErrorBoundary>
  )
}

export default App
