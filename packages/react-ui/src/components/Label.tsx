import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { type VariantProps } from 'class-variance-authority'
import { labelVariants } from '../variants/label'
import { cn } from '@workspace/style'

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(function Label({ className, ...props }, ref) {
  return <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
})
