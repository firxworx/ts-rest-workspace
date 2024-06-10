import { isRecord } from '@workspace/common'

/**
 * Return the string error message of the error object returned by react-router-dom's `useRouteError` (v6+) hook.
 *
 * String errors are returned as-is and object errors will return `statusText` or `message` if available, with a
 * fallback to a generic message.
 */
export function getRouteErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error
  }

  if (isRecord(error)) {
    if ('statusText' in error && typeof error.statusText === 'string') {
      return error.statusText
    }

    if ('message' in error && typeof error.message === 'string') {
      return error.message
    }
  }

  return 'An unknown type of route error occurred.'
}
