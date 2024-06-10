import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from '../src/components/Spinner'

// pnpm --filter @workspace/react-ui test test/spinner.test.ts
describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner />)
    const spinnerElement = screen.getByTestId('spinner')
    expect(spinnerElement).toBeInTheDocument()
  })

  it('has the correct class for styling', () => {
    render(<Spinner />)
    const spinnerElement = screen.getByTestId('spinner')
    expect(spinnerElement).toHaveClass('spinner-class') // Replace with your actual class name
  })

  it('is visible on the screen', () => {
    render(<Spinner />)
    const spinnerElement = screen.getByTestId('spinner')
    expect(spinnerElement).toBeVisible()
  })
})
