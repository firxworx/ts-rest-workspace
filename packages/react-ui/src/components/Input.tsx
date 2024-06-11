import * as React from 'react'
import { cn } from '@workspace/style'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ className, type, ...props }, ref) {
  return (
    <input
      type={type}
      className={cn(
        'border-input bg-background',
        'placeholder:text-muted-foreground outline-none',
        'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'ring-offset-background focus-visible:ring-P-ring/50 focus-visible:border-input',
        'focus-visible:outline-none focus-visible:ring-2', //
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

// `focus-visible:ring-ring` and `focus-visible:ring-offset-2` have been replaced from shadcn/ui defaults
