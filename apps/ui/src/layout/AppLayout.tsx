import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { cn } from '../lib/style-utils'

export interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ className, children }: ContainerProps): JSX.Element {
  return <div className={cn('container mx-auto max-w-6xl px-4 sm:px-6', className)}>{children}</div>
}

export function Logo(): JSX.Element {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg px-3 py-2',
        'border border-dotted border-slate-400 bg-slate-50',
        'text-sm font-thin text-slate-800 opacity-80',
      )}
      aria-hidden="true"
    >
      LOGO
    </div>
  )
}

export function AppLayout(): JSX.Element {
  return (
    <div className="z-0 flex min-h-screen w-full flex-col">
      <nav className="bg-slate-200">
        <Container className="flex h-14 items-center gap-2 sm:gap-4 [&>a]:text-sky-900">
          <Link to="/" aria-label="Logo Home Link">
            <Logo />
          </Link>
          {/*
          // more links here...
          <Link to="/posts" className="block py-2 px-3 font-medium no-underline hover:underline">
            Posts
          </Link>
          */}
        </Container>
      </nav>
      <main className="flex-1 py-6 sm:py-8">
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className="bg-slate-200">
        <Container className="py-4 text-center text-sm text-slate-800/75">
          &copy; {new Date().getFullYear()}&nbsp;Placeholder
        </Container>
      </footer>
    </div>
  )
}
