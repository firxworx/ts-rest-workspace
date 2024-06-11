import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  LinkButton,
  Separator,
  Spinner,
} from '@workspace/react-ui'
import type { Post } from '@workspace/data'
import { cn } from '@workspace/style'
import { apiQuery } from '../api/query-client'
import { postKeys } from '../api/query-keys'
import { DEFAULT_PAGE_SIZE } from '../constants'

export interface PostListProps {
  pageSize?: number
}

export interface PostItemProps {
  post: Post
  className?: string
}

export function PostList({ pageSize = DEFAULT_PAGE_SIZE }: PostListProps): JSX.Element {
  const { ref: loadMoreRef, inView } = useInView({ threshold: 1 })

  const { isLoading, isFetchingNextPage, data, hasNextPage, fetchNextPage } = apiQuery.posts.getPosts.useInfiniteQuery(
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

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  if (!isLoading && (!data || data.pages.length === 0)) {
    return <div>No posts found</div>
  }

  const posts = data.pages.flatMap((page) => (page.status === 200 ? page.body.items : []))

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch">
        {posts.map(
          (post): JSX.Element => (
            <Link to={`/posts/${post.id}`} key={post.id} className="flex h-full flex-col">
              <PostItem post={post} />
            </Link>
          ),
        )}
      </div>
      <div className="mt-8 flex items-center justify-between gap-2">
        <Button
          variant="default"
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More Posts' : 'No More Posts'}
        </Button>
        <LinkButton variant="default" to="/posts/create">
          Create Post
        </LinkButton>
      </div>
      <div className="mt-24">
        {hasNextPage ? <Separator /> : null}
        <div ref={loadMoreRef} />
      </div>
    </div>
  )
}

function PostItem({ post, className }: PostItemProps): JSX.Element {
  return (
    <Card as="article" className={cn('flex h-full flex-col transition hover:scale-[1.01]', className)}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-2 text-base">{post.description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-2 text-sm">
        {post.tags.map((tag) => (
          <div key={tag} className="rounded-lg bg-slate-200 px-3 py-2">
            {tag}
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}
