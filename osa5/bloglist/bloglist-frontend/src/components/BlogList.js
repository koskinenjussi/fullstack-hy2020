import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleDelete, user }) => {
  const sortBlogsByLikesIndescendingOrder = (a, b) => {
    if (a.likes > b.likes) {
      return -1
    } else if (a.likes < b.likes) {
      return 1
    } else {
      return 0
    }
  }

  blogs.sort(sortBlogsByLikesIndescendingOrder)

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      )}
    </div>
  )
}

export default BlogList