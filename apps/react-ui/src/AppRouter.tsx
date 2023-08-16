import { Outlet, createBrowserRouter, type RouteObject } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { PostPage } from './pages/PostPage'

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts/:id',
        element: <PostPage />,
      },
    ],
  },
]

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Outlet />,

    // per react-router docs it is recommended to use a root error boundary
    // errorElement: <RootErrorBoundary />,
    children: [
      ...publicRoutes,
      {
        path: '*',
        element: <AppLayout />,
        children: [
          {
            path: '*',
            element: <NotFoundScreen />,
          },
        ],
      },
    ],
  },
]

export function NotFoundScreen(): JSX.Element {
  return <div>Not Found</div>
}

export function ErrorScreen(): JSX.Element {
  return <h1 className="text-4xl">Error</h1>
}

export const AppRouter = createBrowserRouter(rootRoutes)
