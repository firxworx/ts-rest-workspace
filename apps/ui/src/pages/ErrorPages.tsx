import { useRouteError } from 'react-router-dom'
import { getRouteErrorMessage } from '../lib/router'
import { Heading } from '@workspace/react-ui'
import { BackHomeLinkButton } from '../components/BackHomeLinkButton'

export function ErrorPage(): JSX.Element {
  const error = useRouteError()
  console.error(error)

  const errorMessage = getRouteErrorMessage(error)

  return (
    <div id="error-page">
      <Heading as="h1" className="mb-6">
        Error
      </Heading>
      <p>Sorry an unexpected error has occurred.</p>
      <p className="italic">{errorMessage}</p>
    </div>
  )
}

export function NotFoundPage(): JSX.Element {
  return (
    <div id="error-page">
      <Heading as="h1" className="mb-6">
        Not Found
      </Heading>
      <p>Sorry no page exists at this URL.</p>
      <div className="mt-12">
        <BackHomeLinkButton />
      </div>
    </div>
  )
}
