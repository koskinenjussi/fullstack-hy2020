import React, { useState, useEffect } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [buttonText, setButtonText] = useState('View')
  const [showBlog, setShowBlog] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const showDetails = { display: showBlog ? '' : 'none' }
  const showDeleteButton = { display: showDelete ? '' : 'none' }

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test' && (user.username === blog.user.username)) {
      setShowDelete(true)
    }
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShowBlog = () => {
    setShowBlog(!showBlog)

    showBlog ? setButtonText('View') : setButtonText('Hide')
  }

  const handleLikeClick = () => {
    handleLike(blog)
  }

  const handleDeleteClick = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      handleDelete(blog)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={handleShowBlog} className='.Button'>{buttonText}</button>
      <div style={showDetails}>
        {blog.url}
        <br />
        likes {blog.likes} <button className='.likeButton' onClick={handleLikeClick}>Like</button>
        <br />
        {blog.author}
        <br />
        <div style={showDeleteButton}>
          <button onClick={handleDeleteClick}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
