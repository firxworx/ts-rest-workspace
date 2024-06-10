import { cn } from '@workspace/style'

export interface ContainerProps {
  as?: 'div' | 'section' | 'main' | 'article' | 'aside' | 'header' | 'footer' | 'nav'
  children: React.ReactNode
  className?: string
}

export function Container({ as, className, children }: ContainerProps): JSX.Element {
  const Comp = as || 'div'

  return <Comp className={cn('container mx-auto w-full max-w-6xl px-4 sm:px-6', className)}>{children}</Comp>
}
