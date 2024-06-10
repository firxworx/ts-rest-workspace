import { z, type AnyZodObject } from 'zod'

export type ApiPaginatedResponseMeta = z.infer<typeof zPaginationMeta>

export const zPaginationMeta = z.object({
  count: z.number(),
  skip: z.number(),
  take: z.number(),
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- typescript inference beneficial for generic lib function
export function createPaginatedResponseSchema<ZO extends AnyZodObject>(zSchema: ZO) {
  return z.object({
    items: z.array(zSchema),
    count: z.number(),
    skip: z.number(),
    take: z.number(),
  })
}
