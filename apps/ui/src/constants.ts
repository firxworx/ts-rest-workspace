if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined')
}

/**
 * Base URL of the back-end API.
 */
export const API_URL = String(import.meta.env.VITE_API_URL)

/**
 * Flag indicating if the app is running in production mode.
 *
 * @see https://vitejs.dev/guide/env-and-mode.html
 */
export const IS_PRODUCTION = import.meta.env.PROD

/**
 * Flag indicating if the app is running in production mode.
 *
 * @see https://vitejs.dev/guide/env-and-mode.html
 */
export const IS_CLIENT = !import.meta.env.SSR

/**
 * Default page size for paginated and infinite queries.
 */
export const DEFAULT_PAGE_SIZE = 6 as const
