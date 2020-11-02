import React, { useState, useEffect } from 'react'

import '../index.css';

import Blog from '../components/Blog'
import Notification from'../components/Notification'

import blogService from '../services/blogs'

const BlogForm = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setblogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationIsError, setNotificationIsError]= useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload(false);
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      })

      setBlogs(blogs.concat(newBlog))

      setNotificationMessage(`New blog "${blogTitle}" by ${blogAuthor} added`)
      setNotificationIsError(false)
      setTimeout(() => {setNotificationMessage(null)}, 5000)

      setblogTitle('')
      setBlogAuthor('')
      setBlogUrl('')

    } catch (exception) {
      setNotificationMessage(`Couldn't create a new blog:\n ${exception}`)
      setNotificationIsError(true)
      setTimeout(() => {setNotificationMessage(null)}, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} isError={notificationIsError} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <form>
        <h3>Create new</h3>
        Title:
        <input type='text' onChange={({ target }) => setblogTitle(target.value)}/>
        <br/>
        Author:
        <input type='text' onChange={({ target }) => setBlogAuthor(target.value)}/>
        <br/>
        Url:
        <input type='text' onChange={({ target }) => setBlogUrl(target.value)}/>
        <br/>
        <button onClick={handleCreateNewBlog}>Create</button>
      </form>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogForm