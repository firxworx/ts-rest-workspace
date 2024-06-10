import { z } from 'zod'

/**
 * Blog post based on an example from the official blog.
 */
export interface Post extends z.infer<typeof zPost> {}
export interface PostCreateRequest extends z.infer<typeof zPostCreateDto> {}
export interface PostUpdateRequest extends z.infer<typeof zPostUpdateDto> {}

export const zPost = z.object({
  id: z.string(),
  title: z.string().trim().min(1),
  description: z.string().nullable(),
  content: z.string().nullable(),
  tags: z.array(z.string()),
})

export const zPostCreateDto = zPost.pick({ title: true, description: true, content: true }).partial({
  description: true,
})

export const zPostUpdateDto = zPost.pick({ title: true, description: true, content: true })
