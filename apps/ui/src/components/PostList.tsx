import { Link } from 'react-router-dom'
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, LinkButton, Spinner } from '@workspace/react-ui'
import type { Post } from '@workspace/data'
import { cn } from '@workspace/style'
import { apiQuery } from '../api/query-client'
import { postKeys } from '../api/query-keys'

export interface PostListProps {
  pageSize?: number
}

export interface PostItemProps {
  post: Post
  className?: string
}

export function PostList({ pageSize = 6 }: PostListProps): JSX.Element {
  const { isLoading, data, hasNextPage, fetchNextPage } = apiQuery.posts.getPosts.useInfiniteQuery(
    postKeys.lists(),
    ({ pageParam = { skip: 0, take: pageSize } }) => ({
      query: {
        skip: pageParam.skip,
        take: pageParam.take,
      },
    }),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.status === 200
          ? lastPage.body.count > allPages.length * pageSize
            ? { take: pageSize, skip: allPages.length * pageSize }
            : undefined
          : undefined,
    },
  )

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  if (!data || data.pages.length === 0) {
    return <div>No posts found</div>
  }

  const posts = data.pages.flatMap((page) => (page.status === 200 ? page.body.items : []))

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {posts.map(
          (post): JSX.Element => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <PostItem post={post} />
            </Link>
          ),
        )}
      </div>
      <div className="mt-8 flex items-center justify-between gap-2">
        <Button variant="default" disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load More Posts
        </Button>
        <LinkButton variant="default" to="/posts/create">
          Create Post
        </LinkButton>
      </div>
    </div>
  )
}

function PostItem({ post, className }: PostItemProps): JSX.Element {
  return (
    <Card as="article" className={cn('transition hover:scale-[1.01]', className)}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{post.description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-2 text-sm">
        {post.tags.map((tag) => (
          <div key={tag} className="rounded-lg bg-slate-200 p-2">
            {tag}
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}
