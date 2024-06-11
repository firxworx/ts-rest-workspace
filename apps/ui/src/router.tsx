import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { IndexPage } from './pages/IndexPage'
import { PostCreatePage, PostUpdatePage, PostViewPage } from './pages/PostPages'
import ErrorPage from './pages/ErrorPage'
import NotFoundPage from './pages/NotFoundPage'

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
        path: '/posts/create',
        element: <PostCreatePage />,
      },
      {
        path: '/posts/:id',
        element: <PostViewPage />,
      },
      {
        path: '/posts/:id/update',
        element: <PostUpdatePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(rootRoutes)
