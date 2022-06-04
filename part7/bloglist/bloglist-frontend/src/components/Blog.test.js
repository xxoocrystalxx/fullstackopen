import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 33,
    user: {
      username: 'cry',
    },
  }
  let currentUser = {
    username: 'cry',
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={currentUser} updateLikes={mockHandler} />
    ).container
  })

  test('renders title', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('React patterns Michael Chan')
    expect(div).not.toHaveTextContent('https://reactpatterns.com/', '33')
  })

  test('url and likes are shown when view button has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('https://reactpatterns.com/', '33')
  })

  test('if the like button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likesButton = screen.getByText('like')
    await user.click(likesButton)
    await user.click(likesButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
