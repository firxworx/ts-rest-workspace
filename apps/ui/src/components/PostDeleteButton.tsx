import { useNavigate } from 'react-router-dom'
import { Button } from '@workspace/react-ui'
import { apiQuery } from '../api/query-client'

export interface PostDeleteButtonProps {
  postId: string
}

export function PostDeleteButton({ postId }: PostDeleteButtonProps): JSX.Element {
  const navigate = useNavigate()

  const { mutate: deletePost, isLoading } = apiQuery.posts.deletePost.useMutation({
    onSuccess: () => {
      navigate('/', { replace: true })
    },
  })

  return (
    <Button
      variant="outline"
      isLoading={isLoading}
      disabled={isLoading}
      onClick={() =>
        deletePost({
          params: { id: postId },
          body: {}, // empty object requried for content-type (https://github.com/ts-rest/ts-rest/issues/383)
        })
      }
    >
      Delete
    </Button>
  )
}
