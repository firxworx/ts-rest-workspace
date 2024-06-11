import { ChevronLeftIcon, LinkButton } from '@workspace/react-ui'

export function BackHomeLinkButton(): JSX.Element {
  return (
    <LinkButton variant="outline" to={'/'} className="inline-flex items-center">
      <ChevronLeftIcon className="me-1 inline-block size-4" />
      <span className="leading-none">Home</span>
    </LinkButton>
  )
}
