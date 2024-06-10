import { Outlet, useParams } from 'react-router-dom'
import { Container } from '../components/Container'
import { SuspenseQueryBoundary } from '../components/SuspenseQueryBoundary'

/**
 * Inner layout for the Posts feature with a react-router Outlet wrapped in a SuspenseQueryBoundary.
 * Intended for rendering within the AppLayout.
 */
export function PostScreenLayout(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  return (
    <Container>
      <SuspenseQueryBoundary>{id ? <Outlet /> : null}</SuspenseQueryBoundary>
    </Container>
  )
}
