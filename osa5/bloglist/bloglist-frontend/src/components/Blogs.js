import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

import '../index.css'

import Notification from'./Notification'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

import blogService from '../services/blogs'

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([])

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationIsError, setNotificationIsError] = useState(false)
  const [notificationVisible, setNotificationVisible] = useState(false)

  const [blogFormVisible, setblogFormVisible] = useState(false)
  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  const notifications = { display: notificationVisible ? '' : 'none' }

  Notification.propTypes = {
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload(false)
  }

  const getAllBlogs = async () => {
    try {
      setBlogs(await blogService.getAll())
    } catch (exception) {
      setNotificationMessage('Error getting all blogs', exception)
      setNotificationIsError(true)
      setTimeout(() => {setNotificationMessage(null)}, 5000)
    }
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        likes: 0
      })

      setBlogs(blogs.concat(newBlog))

      setNotificationMessage(`New blog "${blogTitle}" by ${blogAuthor} added`)
      setNotificationIsError(false)
      setTimeout(() => {setNotificationMessage(null)}, 5000)

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')

      setblogFormVisible(false)
    } catch (exception) {
      setNotificationMessage(`Couldn't create a new blog: ${exception}`)
      setNotificationIsError(true)
      setNotificationVisible(true)
      setTimeout(() => {setNotificationVisible(false)}, 5000)
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: (blog.likes + 1)
      }

      await blogService.update(blog.id, updatedBlog)

      getAllBlogs()
    } catch (exception) {
      console.log(exception)

      setNotificationMessage(exception)
      setNotificationIsError(true)
      setNotificationVisible(true)
      setTimeout(() => {setNotificationVisible(false)}, 5000)
    }
  }

  const handleDelete = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id)
      getAllBlogs()
    } catch (exception) {
      setNotificationMessage(`Error deleting blog: ${exception}`)
      setNotificationIsError(true)
      setNotificationVisible(true)
      setTimeout(() => {setNotificationVisible(false)}, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <div style={notifications}>
        <Notification message={notificationMessage} isError={notificationIsError} />
      </div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <div style={hideWhenVisible}>
        <button onClick={() => setblogFormVisible(!blogFormVisible)}>New Blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm
          handleCreateNewBlog={handleCreateNewBlog}
          setBlogTitle={setBlogTitle}
          setBlogAuthor={setBlogAuthor}
          setBlogUrl={setBlogUrl}
        />
        <button onClick={() => setblogFormVisible(!blogFormVisible)}>Cancel</button>
      </div>
      <BlogList
        blogs={blogs}
        handleLike={handleLike}
        handleDelete={handleDelete}
        user={user}
      />
    </div>
  )
}

export default Blogs