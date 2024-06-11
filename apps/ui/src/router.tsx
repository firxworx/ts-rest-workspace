import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { IndexPage } from './pages/IndexPage'
import { PostCreatePage, PostUpdatePage, PostViewPage } from './pages/PostPages'
import { ErrorPage, NotFoundPage } from './pages/ErrorPages'

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
        path: '/404',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(rootRoutes)
