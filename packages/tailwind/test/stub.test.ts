import { describe, it, expect } from 'vitest'

// pnpm --filter @workspace/tailwind test test/stub.test.ts
describe('@workspace/tailwind test stub', () => {
  it('stub test always passes', () => {
    expect(true).toBe(true)
  })
})
