import * as React from 'react'
import { cn } from '@workspace/style'
import { Heading } from './Heading'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as: 'div' | 'section' | 'article' | 'aside'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card({ as, className, ...props }, ref) {
  const Comp = as || 'div'

  return (
    <Comp ref={ref} className={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)} {...props} />
  )
})

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CardHeader(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
})

export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, children, ...props }, ref) {
    return (
      <Heading
        as="h3"
        styleAs="h4"
        ref={ref}
        className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </Heading>
    )
  },
)

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...props }, ref) {
    return <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
  },
)

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CardContent(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
})

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CardFooter(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
})
