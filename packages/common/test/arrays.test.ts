import { describe, it, expect } from 'vitest'
import { deduplicateArray } from '../src/lib/arrays'

// pnpm --filter @workspace/common test test/arrays.test.ts
describe('deduplicateArray', () => {
  it('removes duplicates arrays of numbers', () => {
    const result = deduplicateArray([1, 2, 2, 3, 4, 4, 5])
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('removes duplicates arrays of strings', () => {
    const result = deduplicateArray(['a', 'b', 'b', 'c', 'a'])
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('returns an empty array when input is an empty array', () => {
    const result = deduplicateArray([])
    expect(result).toEqual([])
  })

  it('returns an equivalent array with one element when given a one element array', () => {
    const result = deduplicateArray([1])
    expect(result).toEqual([1])
  })

  it('returns an equivalent array when given an array with unique elements', () => {
    const result = deduplicateArray([1, 2, 3, 4, 5])
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('supports arrays of values compared by reference', () => {
    const obj1 = { id: 1 }
    const obj2 = { id: 2 }
    const arr1 = ['a', 'b']
    const arr2 = ['c', 'd']

    const result1 = deduplicateArray([obj1, obj2, obj1, obj2])
    const result2 = deduplicateArray([arr1, arr2, arr1, arr2])
    const result3 = deduplicateArray([arr1, arr2, obj1, obj2, obj1, obj2, obj1, obj2, arr1, arr2])

    expect(result1).toEqual([obj1, obj2])
    expect(result2).toEqual([arr1, arr2])
    expect(result3).toEqual([arr1, arr2, obj1, obj2])
  })
})
