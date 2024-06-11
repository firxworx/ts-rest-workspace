import React from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { Button, Heading, LinkButton, Spinner } from '@workspace/react-ui'

export interface SuspenseQueryBoundaryProps extends React.PropsWithChildren {}

/**
 * For queries with `{ suspense: true }` (v4) or `useSuspenseQuery(..)` (v5) this component will
 * conditionally render a loading spinner, catch errors and display a retry button, or render its
 * children if the query is successful.
 */
export function SuspenseQueryBoundary({ children }: SuspenseQueryBoundaryProps): JSX.Element {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorRetryView}>
          <React.Suspense fallback={<Spinner className="flex w-full items-center justify-center" />}>
            {children}
          </React.Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

function ErrorRetryView({ error, resetErrorBoundary }: FallbackProps): JSX.Element {
  return (
    <div role="alert" className="flex flex-col gap-4 rounded-md bg-slate-200 p-4">
      <div className="flex flex-col gap-2">
        <Heading as="h3" styleAs="h6">
          Error
        </Heading>
        {error.message ? <p>{error.message}</p> : null}
      </div>
      <div className="flex gap-2">
        <Button variant="default" onClick={resetErrorBoundary}>
          Retry
        </Button>
        <LinkButton variant="outline" to="/">
          Return to Home
        </LinkButton>
      </div>
    </div>
  )
}
