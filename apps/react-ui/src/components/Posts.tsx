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

  const posts = data.pages.flatMap((page) => (page.status === 200 ? page.body.posts : []))

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div className="border border-slate-200 p-4 bg-slate-100 shadow-lg w-full hover:scale-105 transition cursor-pointer">
              <div className="card-body">
                <div className="flex flex-row justify-between">
                  <h2 className="text-xl font-medium tracking-tighter mb-4">{post.title}</h2>
                  <div>
                    <div className="avatar placeholder">
                      <div className="flex items-center justify-center bg-slate-200 rounded-full w-8 h-8">
                        <span className="text-xs">AZ</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p>{post.description}?</p>
                <div className="flex justify-end gap-2 text-xs">
                  {post.tags.map((tag) => (
                    <div key={tag} className="rounded-lg p-2 bg-slate-200">
                      Fashion
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <button
          disabled={!hasNextPage}
          className={cn('bg-slate-800 text-white px-3 py-2 rounded-md', { 'btn-disabled': !hasNextPage })}
          onClick={() => fetchNextPage()}
        >
          Load more
        </button>
      </div>
    </div>
  )
}
