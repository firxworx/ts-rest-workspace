import React from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps): JSX.Element {
  return (
    <div role="alert" className="mx-auto my-8 sm:my-12 max-w-2xl p-4 rounded-md bg-slate-100">
      <p>Something went wrong:</p>
      <pre className="my-4 p-4 rounded-md text-red-800 font-mono">{error.message}</pre>
      <div className="flex gap-4">
        <button onClick={resetErrorBoundary} className="rounded-md px-3 py-2 text-white bg-slate-700">
          Try Again
        </button>
      </div>
    </div>
  )
}

/**
 * @see https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react
 */
export function AppErrorBoundary({ children }: React.PropsWithChildren): JSX.Element {
  const [retryCount, setRetryCount] = React.useState(0)

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => setRetryCount(retryCount + 1)}
      resetKeys={[retryCount]} // resets the error boundary when `retryCount` changes
    >
      {children}
    </ErrorBoundary>
  )
}
