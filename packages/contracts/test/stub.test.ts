import { describe, it, expect } from 'vitest'

// pnpm --filter @workspace/contracts test test/stub.test.ts
describe('@workspace/contracts test stub', () => {
  it('stub test always passes', () => {
    expect(true).toBe(true)
  })
})
