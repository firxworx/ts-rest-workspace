import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Button, type ButtonProps } from '@workspace/react-ui'
import { apiQuery } from '../api/query-client'
import { postKeys } from '../api/query-keys'

export interface PostDeleteButtonProps {
  postId: string
  variant?: ButtonProps['variant']
}

export function PostDeleteButton({ postId, variant = 'outline' }: PostDeleteButtonProps): JSX.Element {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: deletePost, isLoading } = apiQuery.posts.deletePost.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKeys.all() })
      await queryClient.prefetchInfiniteQuery(postKeys.lists())

      navigate('/', { replace: true })
    },
    onError: async (error) => {
      console.error(error)
      await queryClient.invalidateQueries({ queryKey: postKeys.all() })
    },
  })

  return (
    <Button
      variant={variant}
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
