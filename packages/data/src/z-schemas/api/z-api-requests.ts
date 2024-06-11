import { z } from 'zod'

export const zUuidParams = z.object({
  id: z.string().uuid(),
})

export const zGetManyQueryParams = z.object({
  take: z.coerce.number(),
  skip: z.coerce.number(),
  search: z.string().optional(),
})
