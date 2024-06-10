import { describe, it, expect } from 'vitest'

// pnpm --filter @workspace/data test test/stub.test.ts
describe('@workspace/data test stub', () => {
  it('stub test always passes', () => {
    expect(true).toBe(true)
  })
})
