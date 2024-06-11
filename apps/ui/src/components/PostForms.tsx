import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type FieldErrors, type SubmitHandler, type UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { zPostUpdateRequestDto, type Post, type PostCreateRequestDto, type PostUpdateRequestDto } from '@workspace/data'
import { Button, Input, Textarea, Label } from '@workspace/react-ui'
import { apiQuery } from '../api/query-client'
import { postKeys } from '../api/query-keys'
import { useTsRestQueryClient } from '@ts-rest/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { DEFAULT_PAGE_SIZE } from '../constants'

export interface PostFormProps {
  post: Post
}

export interface PostFormFieldsCreateProps {
  mode: 'create'
  isLoading?: boolean
  register: UseFormRegister<PostCreateRequestDto>
  errors: FieldErrors<PostCreateRequestDto>
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export interface PostFormFieldsUpdateProps {
  mode: 'update'
  isLoading?: boolean
  register: UseFormRegister<PostUpdateRequestDto>
  errors: FieldErrors<PostUpdateRequestDto>
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

/**
 * react-hook-form's internal types are historically a pain and fluctuate even between point releases.
 * Attempts to create reusable components with generics often fail due to internal type issues however
 * discriminated unions work well to provide strong typing based on the `mode` prop (the _discriminant_).
 */
export type PostFormFieldsProps = PostFormFieldsCreateProps | PostFormFieldsUpdateProps

/**
 * Form to update (mutate) a given post vs. the API.
 * Redirects with replace to the post view page on success.
 */
export function PostUpdateForm({ post }: PostFormProps): JSX.Element {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const tsrQueryClient = useTsRestQueryClient(apiQuery)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostUpdateRequestDto>({
    resolver: zodResolver(zPostUpdateRequestDto),
    defaultValues: post,
  })

  const { mutateAsync: updatePostAsync, isLoading } = apiQuery.posts.updatePost.useMutation({
    onSuccess: async (data) => {
      reset(data.body)

      await queryClient.invalidateQueries(postKeys.all())
      await tsrQueryClient.posts.getPosts.prefetchInfiniteQuery(postKeys.lists(), () => {
        return {
          query: {
            skip: 0,
            take: DEFAULT_PAGE_SIZE,
          },
        }
      })

      navigate(`/posts/${post.id}`, { replace: true })
    },
    onError: async (error) => {
      console.error(error)
      await queryClient.invalidateQueries({ queryKey: postKeys.all() })
    },
  })

  const onSubmit: SubmitHandler<PostUpdateRequestDto> = useCallback(
    async (data) => {
      await updatePostAsync({
        params: { id: post.id },
        body: {
          ...data,
        },
      })
    },
    [updatePostAsync, post.id],
  )

  const handleSubmitAsync: React.FormEventHandler<HTMLFormElement> = useMemo(
    () => handleSubmit(onSubmit),
    [onSubmit, handleSubmit],
  )

  return (
    <PostFormFields
      mode="update"
      register={register}
      errors={errors}
      isLoading={isLoading}
      onSubmit={handleSubmitAsync}
    />
  )
}

export function PostCreateForm(): JSX.Element {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostCreateRequestDto>({
    resolver: zodResolver(zPostUpdateRequestDto),
    defaultValues: { title: '', description: '', content: '' },
  })

  const { mutateAsync: createPostAsync, isLoading } = apiQuery.posts.createPost.useMutation({
    onSuccess: async (data) => {
      reset(data.body)

      await queryClient.invalidateQueries({ queryKey: postKeys.all() })
      navigate('/', { replace: true })
    },
    onError: async (error) => {
      console.error(error)
      await queryClient.invalidateQueries({ queryKey: postKeys.all() })
    },
  })

  const onSubmit: SubmitHandler<PostCreateRequestDto> = useCallback(
    async (data) => {
      await createPostAsync({
        body: {
          ...data,
        },
      })
    },
    [createPostAsync],
  )

  const handleSubmitAsync: React.FormEventHandler<HTMLFormElement> = useMemo(
    () => handleSubmit(onSubmit),
    [onSubmit, handleSubmit],
  )

  return (
    <PostFormFields
      mode="create"
      register={register}
      errors={errors}
      isLoading={isLoading}
      onSubmit={handleSubmitAsync}
    />
  )
}

export function PostFormFields({
  mode: _mode,
  register,
  errors,
  isLoading,
  onSubmit,
}: PostFormFieldsProps): JSX.Element {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
        <Button type="submit" isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  )
}

export function InputError({ children }: React.PropsWithChildren): JSX.Element {
  return <div className="text-destructive text-xs">{children}</div>
}
