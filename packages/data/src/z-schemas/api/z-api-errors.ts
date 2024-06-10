import { z } from 'zod'

export interface ContractMessageResponse extends z.infer<typeof zContractMessageResponse> {}
export interface ContractErrorResponse extends z.infer<typeof zContractErrorResponse> {}

export const zContractMessageResponse = z.object({ message: z.string() })
export const zContractErrorResponse = z.object({
  code: z.string().optional(),
  status: z.number(),
  message: z.string(),
  errors: z.array(z.object({ field: z.string(), message: z.string() })).optional(),
})
