import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const user = userEvent.setup()

const blog = {
  author: 'TESTAUTHOR',
  title: 'TESTTITLE',
  likes: 3,
  url: 'http://test.com',
  id: '13245678-abcd-efgh-ijkl-123456789087',
  user: {
    name: 'testuser',
    id: 'testid'
  }

}

test('renders initially title and author, but neither url nor likes', () => {

  render(<Blog blog={blog} />)
  expect(screen.getByTestId('blog-by-author')).toHaveTextContent('TESTTITLE by TESTAUTHOR')
  expect(screen.queryByTestId('url')).toBeNull()
  expect(screen.queryByTestId('likes')).toBeNull()

})

test('after clicking view button, displays url and likes', async () => {
  render(<Blog blog={blog} />)
  await user.click(screen.getByTestId('view-button'))
  expect(screen.getByTestId('blog-by-author')).toHaveTextContent('TESTTITLE by TESTAUTHOR')
  expect(screen.queryByTestId('url')).toHaveTextContent(blog.url)
  expect(screen.queryByTestId('likes')).toHaveTextContent(`likes ${blog.likes}`)
})

test('clicking the like buttons twice calls handleLike twice', async () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} likeBlog={mockHandler}/>)
  await user.click(screen.getByTestId('view-button'))
  await user.click(screen.getByTestId('like-button'))
  await user.click(screen.getByTestId('like-button'))
  expect(mockHandler.mock.calls).toHaveLength(2)
})