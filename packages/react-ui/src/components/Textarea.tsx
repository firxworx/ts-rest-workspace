import * as React from 'react'
import { cn } from '@workspace/style'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <textarea
      className={cn(
        'border-input bg-background ring-offset-background',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-P-ring/50 focus-visible:border-input',
        'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm',
        'focus-visible:outline-none focus-visible:ring-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

// note: `focus-visible:ring-ring` and `focus-visible:ring-offset-2` have been replaced from shadcn/ui defaults
