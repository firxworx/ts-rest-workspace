import * as React from 'react'
import type { SvgIconProps } from '../../types/props.types'
import { cn } from '@workspace/style'

/**
 * Check icon from lucide.
 * Distributed under Lucide's SIL license https://lucide.dev/license.
 */
export const CheckIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(function CheckIcon(
  { className, ...restSvgProps },
  ref,
): JSX.Element {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-6', className)}
      aria-hidden="true"
      {...restSvgProps}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
})
