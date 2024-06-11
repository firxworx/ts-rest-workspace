import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { apiQuery } from '../api/query-client'
import { PostView } from '../components/PostView'
import { postKeys } from '../api/query-keys'
import { Heading, LinkButton, Spinner, Separator } from '@workspace/react-ui'
import { PostCreateForm, PostUpdateForm } from '../components/PostForms'
import { PostDeleteButton } from '../components/PostDeleteButton'
import { BackHomeLinkButton } from '../components/BackHomeLinkButton'

export interface PostPageProps {
  context: 'view' | 'edit' | 'create'
}

export interface PostToolbarProps {
  postId: string
  onDeletePostClick?: () => void
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
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  if (!id) {
    return null
  }

  const { data, error, isLoading } = apiQuery.posts.getPost.useQuery(
    postKeys.detail(id || ''),
    {
      params: { id: id || '' },
    },
    {
      enabled: !!id && !isDeleted,
    },
  )

  if (error && !isLoading) {
    if (error.status === 404 && !isDeleted) {
      return <Navigate to="/404" replace={true} />
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
        <PostToolbar postId={data.body.id} onDeletePostClick={() => setIsDeleted(true)} />
      </aside>
    </>
  )
}

function PostToolbar({ postId, onDeletePostClick }: PostToolbarProps): JSX.Element {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex-1">
        <BackHomeLinkButton />
      </div>
      <div className="flex items-center gap-4">
        <PostDeleteButton variant="default" postId={postId} onDeleteClick={onDeletePostClick} />
        <LinkButton variant="default" to={`/posts/${postId}/update`}>
          Edit
        </LinkButton>
      </div>
    </div>
  )
}
