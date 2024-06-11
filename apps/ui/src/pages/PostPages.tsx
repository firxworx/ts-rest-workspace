import { useNavigate, useParams } from 'react-router-dom'
import { apiQuery } from '../api/query-client'
import { PostView } from '../components/PostView'
import { postKeys } from '../api/query-keys'
import { Heading, LinkButton, Spinner, Separator, ChevronLeftIcon } from '@workspace/react-ui'
import { PostCreateForm, PostUpdateForm } from '../components/PostForms'
import { PostDeleteButton } from '../components/PostDeleteButton'

export interface PostPageProps {
  context: 'view' | 'edit' | 'create'
}

export interface PostToolbarProps {
  postId: string
}

export function PostCreatePage(): JSX.Element {
  return (
    <section>
      <Heading as="h1" className="mb-8">
        Create Post
      </Heading>
      <PostCreateForm />
    </section>
  )
}

export function PostUpdatePage(): JSX.Element | null {
  const { id } = useParams()

  if (!id) {
    return null
  }

  const { data, error, isLoading } = apiQuery.posts.getPost.useQuery(
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
      <Heading as="h1" className="mb-8">
        {data.body.title}
      </Heading>
      <PostUpdateForm post={data.body} />
    </section>
  )
}

export function PostViewPage(): JSX.Element | null {
  const { id } = useParams()
  const navigate = useNavigate()

  if (!id) {
    return null
  }

  const { data, error, isLoading } = apiQuery.posts.getPost.useQuery(
    postKeys.detail(id || ''),
    {
      params: { id: id || '' },
    },
    {
      enabled: id !== undefined,
    },
  )

  if (error) {
    if (error.status === 404) {
      navigate('/404', { replace: true })
      return null
    }

    return <div className="strong text-lg">Error fetching post data</div>
  }

  if (!data?.body && isLoading) {
    return <Spinner className="grid place-items-center" />
  }

  return (
    <>
      <PostView post={data.body} />
      <Separator className="mt-12" />
      <aside className="mt-4 flex items-center justify-between gap-4">
        <PostToolbar postId={data.body.id} />
      </aside>
    </>
  )
}

function PostToolbar({ postId }: PostToolbarProps): JSX.Element {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex-1">
        <LinkButton variant="outline" to={'/'} className="inline-flex items-center">
          <ChevronLeftIcon className="me-1 inline-block size-4" />
          <span className="leading-none">Home</span>
        </LinkButton>
      </div>
      <div className="flex items-center gap-4">
        <PostDeleteButton variant="default" postId={postId} />
        <LinkButton variant="default" to={`/posts/${postId}/update`}>
          Edit
        </LinkButton>
      </div>
    </div>
  )
}
