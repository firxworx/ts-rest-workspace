import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { router } from './router'
import { queryClient } from './api/react-query-client'
import { AppErrorBoundary } from './layout/AppErrorBoundary'
import { Spinner } from '@workspace/react-ui'

export function App(): JSX.Element {
  return (
    <AppErrorBoundary>
      <React.Suspense fallback={<Spinner />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} fallbackElement={<Spinner />} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </React.Suspense>
    </AppErrorBoundary>
  )
}

export default App
