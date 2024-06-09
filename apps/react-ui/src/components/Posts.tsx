import { Link } from 'react-router-dom'

import { apiQuery } from '../api/query-client'
import { cn } from '../lib/style-utils'

export function Posts(): JSX.Element {
  const PAGE_SIZE = 5

  const { isLoading, data, hasNextPage, fetchNextPage } = apiQuery.getPosts.useInfiniteQuery(
    ['posts'],
    ({ pageParam = { skip: 0, take: PAGE_SIZE } }) => ({
      query: {
        skip: pageParam.skip,
        take: pageParam.take,
      },
    }),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.status === 200
          ? lastPage.body.count > allPages.length * PAGE_SIZE
            ? { take: PAGE_SIZE, skip: allPages.length * PAGE_SIZE }
            : undefined
          : undefined,
      networkMode: 'offlineFirst',
      staleTime: 1000 * 5,
    },
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No posts found</div>
  }

  const posts = data.pages.flatMap((page) => (page.status === 200 ? page.body.items : []))

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {posts.map(
          (post): JSX.Element => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <div className="flex w-full cursor-pointer flex-col gap-4 border border-slate-200 bg-slate-100 p-4 shadow-lg transition hover:scale-105">
                <div className="flex flex-row justify-between">
                  <h2 className="text-xl font-medium tracking-tighter">{post.title}</h2>
                  <div>
                    <div className="avatar placeholder">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                        <span className="text-xs">AZ</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p>{post.description}?</p>
                <div className="flex flex-wrap justify-end gap-2 text-xs">
                  {post.tags.map((tag) => (
                    <div key={tag} className="rounded-lg bg-slate-200 p-2">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ),
        )}
      </div>
      <div className="mt-8">
        <button
          disabled={!hasNextPage}
          className={cn('rounded-md bg-slate-800 px-3 py-2 text-white', { 'btn-disabled': !hasNextPage })}
          onClick={() => fetchNextPage()}
        >
          Load more
        </button>
      </div>
    </div>
  )
}
