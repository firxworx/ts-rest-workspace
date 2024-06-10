import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { IndexPage } from './pages/IndexPage'
import { PostPage } from './pages/PostPage'
import ErrorPage from './pages/ErrorPage'
import { PostScreenLayout } from './layout/PostScreenLayout'
import NotFoundPage from './pages/NotFoundPage'
import { BlankScreenLayout } from './layout/BlankScreenLayout'

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'posts',
        element: <PostScreenLayout />,
        children: [
          {
            path: ':id',
            element: <PostPage context="view" />,
          },
          {
            path: ':id/edit',
            element: <PostPage context="edit" />,
          },
        ],
      },
      {
        path: '*',
        element: <BlankScreenLayout />,
        children: [
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(rootRoutes)
