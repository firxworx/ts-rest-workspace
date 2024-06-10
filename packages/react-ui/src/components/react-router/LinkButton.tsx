import * as React from 'react'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { cn } from '@workspace/style'
import { buttonVariants } from '../../variants/button'
import type { VariantProps } from 'class-variance-authority'

interface LinkButtonProps extends LinkProps, VariantProps<typeof buttonVariants> {}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(
  { className, variant, size, children, ...restLinkProps },
  ref,
) {
  return (
    <Link
      ref={ref}
      className={cn(buttonVariants({ variant, size }), 'no-underline hover:no-underline', className)}
      {...restLinkProps}
    >
      {children}
    </Link>
  )
})
