import { useRouteError } from 'react-router-dom'
import { getRouteErrorMessage } from '../lib/router'
import { Heading } from '@workspace/react-ui'

export default function ErrorPage(): JSX.Element {
  const error = useRouteError()
  console.error(error)

  const errorMessage = getRouteErrorMessage(error)

  return (
    <div id="error-page">
      <Heading as="h1">Oops!</Heading>
      <p>Sorry an unexpected error has occurred.</p>
      <p className="italic">{errorMessage}</p>
    </div>
  )
}
