import { describe, it, expect } from 'vitest'

// pnpm --filter @workspace/style test test/stub.test.ts
describe('@workspace/style test stub', () => {
  it('stub test always passes', () => {
    expect(true).toBe(true)
  })
})
