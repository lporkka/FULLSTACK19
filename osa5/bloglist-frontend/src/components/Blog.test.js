import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './simpleBlog'

const blog = {
  author: 'Lauri',
  title: 'Laurin blogi',
  likes: 10
}

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    'Laurin blogi', 'Lauri', '10'
  )
})

it('clicking the button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})