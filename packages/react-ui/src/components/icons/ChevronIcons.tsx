import { forwardRef } from 'react'
import { cn } from '@workspace/style'
import type { SvgIconProps } from '../../types/props.types'

/**
 * Chevron left icon with SVG sourced from Lucide Icons with default `size-5` class.
 */
export const ChevronLeftIcon = forwardRef<SVGSVGElement, SvgIconProps>(function ChevronLeftIcon(
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
      className={cn('size-5', className)}
      aria-hidden="true"
      {...restSvgProps}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
})

/**
 * Chevron right icon with SVG sourced from Lucide Icons with default `size-5` class.
 */
export const ChevronRightIcon = forwardRef<SVGSVGElement, SvgIconProps>(function ChevronRightIcon(
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
      className={cn('size-5', className)}
      aria-hidden="true"
      {...restSvgProps}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
})

/**
 * Chevron right icon with SVG sourced from Lucide Icons with default `size-5` class.
 */
export const ChevronDownIcon = forwardRef<SVGSVGElement, SvgIconProps>(function ChevronDownIcon(
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
      className={cn('size-5', className)}
      aria-hidden="true"
      {...restSvgProps}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
})

/**
 * Chevron right icon with SVG sourced from Lucide Icons with default `size-5` class.
 */
export const ChevronUpIcon = forwardRef<SVGSVGElement, SvgIconProps>(function ChevronUpIcon(
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
      className={cn('size-5', className)}
      aria-hidden="true"
      {...restSvgProps}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
})
