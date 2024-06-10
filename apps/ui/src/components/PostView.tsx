import { Heading } from '@workspace/react-ui'
import type { Post } from '@workspace/data'

export interface PostViewProps {
  post: Post | undefined
  isLoading?: boolean
}

export function PostView({ post }: PostViewProps): JSX.Element | null {
  if (!post) {
    return null
  }

  return (
    <article className="mx-auto">
      <header className="mb-8 flex flex-col gap-4">
        <Heading as="h1">{post.title}</Heading>
        <div className="text-xl font-medium tracking-tight">{post.description}</div>
      </header>
      <p className="prose-lg">{post.content}</p>
    </article>
  )
}
