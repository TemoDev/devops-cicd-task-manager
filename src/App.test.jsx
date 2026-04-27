import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from './App'

beforeEach(() => {
  // Reset module-level id counter by re-importing — easiest: just render fresh each time
})

describe('Task Manager', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /task manager/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument()
  })

  it('adds a task when the Add button is clicked', () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/add a new task/i)
    const addBtn = screen.getByRole('button', { name: /add task/i })

    fireEvent.change(input, { target: { value: 'Buy groceries' } })
    fireEvent.click(addBtn)

    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(input.value).toBe('')
  })

  it('deletes a task when the delete button is clicked', () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/add a new task/i)
    const addBtn = screen.getByRole('button', { name: /add task/i })

    fireEvent.change(input, { target: { value: 'Write tests' } })
    fireEvent.click(addBtn)

    expect(screen.getByText('Write tests')).toBeInTheDocument()

    const deleteBtn = screen.getByRole('button', { name: /delete task: write tests/i })
    fireEvent.click(deleteBtn)

    expect(screen.queryByText('Write tests')).toBeInTheDocument()
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })
})
