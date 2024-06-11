import { useNavigate } from 'react-router-dom'
import { Button, type ButtonProps } from '@workspace/react-ui'
import { useQueryClient } from '@tanstack/react-query'
import { getErrorMessage } from '@workspace/common'
import { apiQuery } from '../api/query-client'
import { postKeys } from '../api/query-keys'

export interface PostDeleteButtonProps {
  postId: string
  variant?: ButtonProps['variant']
  onDeleteClick?: () => void
}

export function PostDeleteButton({ postId, variant = 'outline', onDeleteClick }: PostDeleteButtonProps): JSX.Element {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    mutate: deletePost,
    isLoading,
    error,
  } = apiQuery.posts.deletePost.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(postKeys.all())
      navigate('/', { replace: true })
    },
    onError: async (error) => {
      console.error(error)
      await queryClient.invalidateQueries({ queryKey: postKeys.all() })
    },
  })

  return (
    <div>
      <Button
        variant={variant}
        isLoading={isLoading}
        disabled={isLoading}
        onClick={() => {
          onDeleteClick?.()

          deletePost({
            params: { id: postId },
            body: {}, // empty object requried for content-type (https://github.com/ts-rest/ts-rest/issues/383)
          })
        }}
      >
        Delete
      </Button>
      {error ? (
        <div role="alert" className="text-destructive text-xs">
          Error: {getErrorMessage(error)}
        </div>
      ) : null}
    </div>
  )
}
