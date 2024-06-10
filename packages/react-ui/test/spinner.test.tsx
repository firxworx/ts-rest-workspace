import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from '../src/components/Spinner'

// pnpm --filter @workspace/react-ui test test/spinner.test.ts
describe('Spinner', () => {
  it('renders spinner with default loading text', () => {
    render(<Spinner />)

    const spinnerElement = screen.getByText(/loading/i)
    expect(spinnerElement).toBeInTheDocument()
  })

  it('renders spinner with custom loading text via prop', () => {
    render(<Spinner label="Downloading files" />)

    const spinnerElement = screen.getByText(/Downloading files/i)
    expect(spinnerElement).toBeInTheDocument()
  })

  it('renders a visible component to the screen', () => {
    render(<Spinner />)
    const spinnerElement = screen.getByText(/loading/i)
    expect(spinnerElement).toBeVisible()
  })
})
