import { z } from 'zod'

export const zGetManyQueryParams = z.object({
  take: z.coerce.number(),
  skip: z.coerce.number(),
  search: z.string().optional(),
})
