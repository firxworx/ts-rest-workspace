import { z } from 'zod'

/**
 * Blog post based on an example from the official blog.
 */
export interface HelloDto extends z.infer<typeof zHelloDto> {}

export const zHelloDto = z.object({
  message: z.string(),
})
