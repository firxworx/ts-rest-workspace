import { useParams } from 'react-router-dom'
import { apiQuery } from '../api/query-client'
import { PostView } from '../components/PostView'
import { postKeys } from '../api/query-keys'
import { Heading, LinkButton, Spinner } from '@workspace/react-ui'
import { PostForm } from '../components/PostForm'
import { PostDeleteButton } from '../components/PostDeleteButton'

export interface PostPageProps {
  context: 'view' | 'edit'
}

export interface PostToolbarProps {
  postId: string
}

/**
 * PostPage resolves the `id` param and fetches the post data from the API then conditionally
 * renders either PostForm or PostView depending on the `context` prop: 'view' or 'edit'.
 */
export function PostPage({ context }: PostPageProps): JSX.Element | null {
  const { id } = useParams()

  if (!id) {
    return null
  }

  const { data, error, isLoading } = apiQuery.getPost.useQuery(
    postKeys.detail(id || ''),
    {
      params: { id: id || '' },
    },
    {
      enabled: id !== undefined,
    },
  )

  if (error) {
    return <div className="strong text-lg">Error fetching post data</div>
  }

  if (!data?.body && isLoading) {
    return <Spinner className="grid place-items-center" />
  }

  return (
    <section>
      {data?.body ? (
        <>
          {context === 'edit' ? (
            <>
              <Heading as="h1" className="mb-8">
                {data.body.title}
              </Heading>
              <PostForm post={data.body} />
            </>
          ) : context === 'view' ? (
            <>
              <PostView post={data.body} />
              <aside className="mt-8 flex items-center justify-between gap-4">
                <PostToolbar postId={data.body.id} />
              </aside>
            </>
          ) : null}
        </>
      ) : null}
    </section>
  )
}

function PostToolbar({ postId }: PostToolbarProps): JSX.Element {
  return (
    <div className="flex items-center gap-4">
      <PostDeleteButton postId={postId} />
      <LinkButton variant="outline" to={`/posts/${postId}/edit`}>
        Edit
      </LinkButton>
    </div>
  )
}
