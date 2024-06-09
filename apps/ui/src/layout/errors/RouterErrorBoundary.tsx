import { useRouteError } from 'react-router-dom'
import { getErrorMessage } from '../../lib/error-utils'

export function RouterErrorBoundary(): JSX.Element {
  const error = useRouteError()

  return (
    <section>
      <h1>Router Error Boundary</h1>
      <small>{getErrorMessage(error)}</small>
    </section>
  )
}
