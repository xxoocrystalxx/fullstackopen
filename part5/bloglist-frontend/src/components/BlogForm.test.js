import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  // const input = screen.getByRole('textbox')
  const title = container.querySelector('#Title')
  const author = container.querySelector('#Author')
  const url = container.querySelector('#Url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'React patterns')
  await user.type(author, 'Michael Chan')
  await user.type(url, 'https://reactpatterns.com/')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('React patterns')

})
