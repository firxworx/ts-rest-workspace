import { Heading } from '@workspace/react-ui'

export default function NotFoundPage(): JSX.Element {
  return (
    <div>
      <Heading as="h1" className="mb-6">
        Not Found
      </Heading>
      <p className="text-lg">Sorry no page exists at this URL.</p>
    </div>
  )
}
