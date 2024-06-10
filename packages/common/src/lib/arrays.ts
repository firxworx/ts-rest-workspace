/**
 * Return a new array based on the input array with duplicate values removed.
 * Intended for primitive types and objects that are compared by reference.
 *
 * This is a simple implementation using `Set` and spread so it is best for small arrays.
 */
export function deduplicateArray<T>(input: T[]): T[] {
  return [...new Set(input)]
}
