import { describe, it, expect } from 'vitest'

// pnpm --filter @workspace/react-ui test test/stub.test.ts
describe('@workspace/react-ui test stub', () => {
  it('stub test always passes', () => {
    expect(true).toBe(true)
  })
})
