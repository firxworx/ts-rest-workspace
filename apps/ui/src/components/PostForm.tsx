import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { zPostUpdateRequestDto, type Post, type PostUpdateRequestDto } from '@workspace/data'
import { apiQuery } from '../api/query-client'
import { Button, Input, Textarea, Label } from '@workspace/react-ui'
import { postKeys } from '../api/query-keys'

export interface PostFormProps {
  post: Post
}

export function PostForm({ post }: PostFormProps): JSX.Element {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostUpdateRequestDto>({
    resolver: zodResolver(zPostUpdateRequestDto),
    defaultValues: post,
  })

  const { mutateAsync: updatePostAsync } = apiQuery.updatePost.useMutation({
    onSuccess: (data) => {
      reset(data.body)
      navigate(`posts/${post.id}`, { replace: true })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: postKeys.detail(post.id) })
    },
  })

  const onSubmit: SubmitHandler<PostUpdateRequestDto> = async (data) => {
    await updatePostAsync({
      params: { id: post.id },
      body: {
        ...data,
      },
    })

    // go back to the post view page on save
    navigate(`/posts/${post.id}`, { replace: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input {...register('title')} />
        {errors.title && <InputError>{errors.title.message}</InputError>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea {...register('description')} />
        {errors.description && <InputError>{errors.description.message}</InputError>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="content">Content</Label>
        <Textarea {...register('content')} />
        {errors.content && <InputError>{errors.content.message}</InputError>}
      </div>

      <div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

export function InputError({ children }: React.PropsWithChildren): JSX.Element {
  return <div className="text-destructive text-sm">{children}</div>
}
