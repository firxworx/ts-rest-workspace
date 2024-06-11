import { Outlet, Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { SuspenseQueryBoundary } from '../components/SuspenseQueryBoundary'

export function AppLayout(): JSX.Element {
  return (
    <div className="z-0 flex min-h-screen w-full flex-col">
      <header className="flex h-14 items-center bg-slate-200">
        <Container as="nav" className="flex items-center gap-4">
          <Link to="/" aria-label="Home" className="text-sky-900">
            <Logo />
          </Link>
        </Container>
      </header>
      <main className="flex-1 bg-white py-6 sm:py-8">
        <Container>
          <SuspenseQueryBoundary>
            <Outlet />
          </SuspenseQueryBoundary>
        </Container>
      </main>
      <footer className="bg-slate-200">
        <Container className="py-4 text-center text-sm font-medium text-gray-800/75">
          &copy; {new Date().getFullYear()}&nbsp;Placeholder
        </Container>
      </footer>
    </div>
  )
}
