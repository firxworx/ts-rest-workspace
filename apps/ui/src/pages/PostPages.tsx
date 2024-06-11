import { useParams } from 'react-router-dom'
import { apiQuery } from '../api/query-client'
import { PostView } from '../components/PostView'
import { postKeys } from '../api/query-keys'
import { Heading, LinkButton, Spinner } from '@workspace/react-ui'
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
    <>
      <PostView post={data.body} />
      <aside className="mt-8 flex items-center justify-between gap-4">
        <PostToolbar postId={data.body.id} />
      </aside>
    </>
  )
}

// /**
//  * PostPage resolves the `id` param and fetches the post data from the API then conditionally
//  * renders either PostForm or PostView depending on the `context` prop: 'view' or 'edit'.
//  */
// export function PostPage({ context }: PostPageProps): JSX.Element | null {
//   const { id } = useParams()

//   if (!id && (context === 'edit' || context === 'view')) {
//     return null
//   }

//   const { data, error, isLoading } = apiQuery.getPost.useQuery(
//     postKeys.detail(id || ''),
//     {
//       params: { id: id || '' },
//     },
//     {
//       enabled: id !== undefined,
//     },
//   )

//   if (error) {
//     return <div className="strong text-lg">Error fetching post data</div>
//   }

//   if (context !== 'create' && !data?.body && isLoading) {
//     return <Spinner className="grid place-items-center" />
//   }

//   console.log(`postpage created with context `, context)

//   return (
//     <section>
//       {context === 'create' ? (
//         <>
//           <Heading as="h1" className="mb-8">
//             Create Post
//           </Heading>
//           <PostCreateForm />
//         </>
//       ) : data?.body ? (
//         <>
//           {context === 'edit' ? (
//             <>
//               <Heading as="h1" className="mb-8">
//                 {data.body.title}
//               </Heading>
//               <PostUpdateForm post={data.body} />
//             </>
//           ) : context === 'view' ? (
//             <>
//               <PostView post={data.body} />
//               <aside className="mt-8 flex items-center justify-between gap-4">
//                 <PostToolbar postId={data.body.id} />
//               </aside>
//             </>
//           ) : null}
//         </>
//       ) : null}
//     </section>
//   )
// }

function PostToolbar({ postId }: PostToolbarProps): JSX.Element {
  return (
    <div className="flex items-center gap-4">
      <PostDeleteButton postId={postId} />
      <LinkButton variant="outline" to={`/posts/${postId}/update`}>
        Edit
      </LinkButton>
    </div>
  )
}
