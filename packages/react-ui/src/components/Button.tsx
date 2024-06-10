import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@workspace/style'
import { buttonVariants } from '../variants/button'
import { Spinner } from './Spinner'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, type, asChild = false, isLoading, children, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp ref={ref} type={type || 'button'} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {isLoading ? <Spinner className="mr-1.5 text-gray-600 [&>svg]:size-4" /> : null}
      {children}
    </Comp>
  )
})
