import { apiQuery } from '../api/query-client'

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
      <div className="prose w-full h-full flex flex-row justify-center items-center">
        <div>
          <h1>Post not found!</h1>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="prose w-full h-full flex flex-row justify-center items-center">
        <div>
          <h1>Loading...</h1>
          <progress className="progress w-56"></progress>
        </div>
      </div>
    )
  }

  const post = data.body

  return (
    <div>
      {post ? (
        <div className="prose max-w-none mx-auto px-2 sm:px-0">
          <div className="flex flex-col gap-4 sm:flex-row mb-10">
            <div className="flex flex-col">
              <h1 className="text-3xl mb-2 font-bold tracking-tighter">{post.title}</h1>
              <h3 className="text-xl font-medium tracking-tight">{post.description}</h3>
            </div>
          </div>
          <p>{post.content}</p>
          <div className="flex flex-row gap-2 mt-8">
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
