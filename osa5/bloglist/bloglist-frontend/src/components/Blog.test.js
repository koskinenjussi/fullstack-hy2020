import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from'./Blog'

describe('Blog test', () => {
  const blog = {
    title: 'Cool Title!',
    author: 'Temp Temperson',
    url: 'clickme.org',
  }

  const mockHandler = jest.fn()

  test('Renders title and author, but not url and likes', () => {
    const component = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
        handleDelete={mockHandler}
      />
    )

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('Renders url and likes when view button is pressed', () => {
    const component = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
        handleDelete={mockHandler}
      />
    )

    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)

    expect(component.container).toHaveTextContent('likes')
  })

  test('When pressing like button twice', () => {
    const component = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
      />
    )

    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})