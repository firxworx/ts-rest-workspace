import { Outlet } from 'react-router-dom'
import { Container } from '../components/Container'

/**
 * Inner general layout that's a blank slate for inner pages.
 * Renders a react-router Outlet within a Container.
 *
 * Intended for rendering within the AppLayout.
 */
export function BlankScreenLayout(): JSX.Element {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}
