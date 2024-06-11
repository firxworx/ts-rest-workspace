import { z } from 'zod'

/**
 * Blog post based on an example from the official blog.
 */
export interface Post extends z.infer<typeof zPost> {}
export interface PostCreateRequestDto extends z.infer<typeof zPostCreateRequestDto> {}
export interface PostUpdateRequestDto extends z.infer<typeof zPostUpdateRequestDto> {}

export const zPost = z.object({
  id: z.string(),
  title: z.string().trim().min(1),
  description: z.string().nullable(),
  content: z.string().nullable(),
  tags: z.array(z.string()),
})

export const zPostCreateRequestDto = zPost.pick({ title: true, description: true, content: true }).partial({
  description: true,
})

export const zPostUpdateRequestDto = zPost.pick({ title: true, description: true, content: true })
