interface ObjectWithMessage {
  message: string
}

function isObjectWithMessage(error: unknown): error is ObjectWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function toErrorWithMessage(maybeError: unknown): ObjectWithMessage {
  if (isObjectWithMessage(maybeError)) {
    return maybeError
  }

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case of an error stringifying `maybeError` e.g. circular reference
    return new Error(String(maybeError))
  }
}

/**
 * @see https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 */
export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message
}
