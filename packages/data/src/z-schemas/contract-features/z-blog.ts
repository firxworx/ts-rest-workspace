import { z } from 'zod'

/**
 * Blog post based on an example from the official blog.
 */
export interface Post extends z.infer<typeof zPost> {}

export const zPost = z.object({
  id: z.string(),
  title: z.string().trim(),
  description: z.string().nullable(),
  content: z.string().nullable(),
  published: z.boolean(),
  tags: z.array(z.string()),
})

export const zPostCreateRequest = zPost
  .pick({ title: true, description: true, content: true, published: true })
  .partial({
    description: true,
    published: true,
  })

export const zPostUpdateRequest = zPost.pick({ title: true, description: true, content: true, published: true })
