import { apiQuery } from '../api/query-client'
import { Spinner } from '@workspace/react-ui'

export interface PostProps {
  postId: string
}

export function Post({ postId }: PostProps): JSX.Element {
  // const navigate = useNavigate()

  const { data, error, isLoading } = apiQuery.getPost.useQuery(
    [`post-${postId}`],
    {
      params: { id: postId },
    },
    {
      networkMode: 'offlineFirst',
      enabled: postId !== undefined,
      onSettled: () => {
        console.log('tried')
      },
      staleTime: 1000 * 60 * 30,
    },
  )

  // not implemented for this example
  // const { mutate: deletePost } = apiQuery.deletePost.useMutation({
  //   onSuccess: () => {
  //     navigate('/')
  //   },
  // })

  if (error) {
    return (
      <div className="prose flex h-full w-full flex-row items-center justify-center">
        <div>
          <h1>Post not found!</h1>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="prose flex h-full w-full flex-row items-center justify-center">
        <div>
          <h1>Loading...</h1>
          <Spinner />
        </div>
      </div>
    )
  }

  const post = data.body

  return (
    <div>
      {post ? (
        <div className="prose mx-auto max-w-none px-2 sm:px-0">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col">
              <h1 className="mb-2 text-3xl font-bold tracking-tighter">{post.title}</h1>
              <h3 className="text-xl font-medium tracking-tight">{post.description}</h3>
            </div>
          </div>
          <p>{post.content}</p>
          <div className="mt-8 flex flex-row gap-2">
            {/*
            // not implemented for this example
            // note: beware of content type json and sending an empty body to the server (will reject)
            <button
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              onClick={() => deletePost({ params: { id: post.id } })}
            >
              Delete
            </button>
            */}
            {/*
            // not implementing for this example
            <Link to={`/post/${post.id}/edit`}>
              <button className="btn">Edit</button>
            </Link>
            */}
          </div>
        </div>
      ) : null}
    </div>
  )
}
