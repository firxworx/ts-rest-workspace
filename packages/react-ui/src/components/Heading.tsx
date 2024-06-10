import React, { useId, forwardRef } from 'react'
import { cn } from '@workspace/style'

export type HeadingLevelProp = Extract<keyof JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  id?: string | undefined
  as: HeadingLevelProp // vs. React.ElementType
  styleAs?: HeadingLevelProp
}

const commonClassNames = 'w-full'

const classMap = new Map<HeadingLevelProp, string>([
  ['h1', 'h1'],
  ['h2', 'h2'],
  ['h3', 'h3'],
  ['h4', 'h4'],
  ['h5', 'h5'],
  ['h6', 'h6'],
])

/**
 * Heading component that renders a heading element with the tailwind theme's utilities applied.
 * Use the `styleAs` prop to render markup for one heading but style it as another.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { id, as: HeadingComponent, styleAs, className, children, ...props },
  ref,
) {
  const ssrId = useId()
  const headingId = id ?? ssrId

  return (
    <HeadingComponent
      ref={ref}
      id={headingId}
      className={cn(classMap.get(styleAs || HeadingComponent), commonClassNames, className)}
      {...props}
    >
      {children}
    </HeadingComponent>
  )
})
