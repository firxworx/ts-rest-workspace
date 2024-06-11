import { Heading } from '@workspace/react-ui'
import { PostList } from '../components/PostList'
import { Link } from 'react-router-dom'

export function IndexPage(): JSX.Element {
  return (
    <>
      <Heading as="h1">Home</Heading>
      <div className="mb-8 mt-8 flex flex-col gap-4">
        <p>
          This is an example app that uses{' '}
          <Link to="https://ts-rest.com/docs/intro" className="font-medium text-sky-800 no-underline hover:underline">
            ts-rest
          </Link>{' '}
          to define a contract between the back-end and front-end applications.
        </p>
        <p>
          It is housed in a pnpm workspace (monorepo) that demonstrates how to use internal packages to share contracts,
          zod scheamas, react components, and utilities across a workspace.
        </p>
      </div>
      <Heading as="h2" className="mb-6">
        Blog Posts
      </Heading>
      <PostList />
    </>
  )
}
