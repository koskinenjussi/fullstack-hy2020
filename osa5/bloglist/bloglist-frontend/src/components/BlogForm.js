import React from 'react'

const BlogForm = ({ handleCreateNewBlog, setBlogTitle, setBlogAuthor, setBlogUrl }) => {
  return (
    <div>
      <form onSubmit={handleCreateNewBlog}>
        <h3>Create new blog</h3>
        Title:
        <input id='blogTitle' type='text' onChange={({ target }) => setBlogTitle(target.value)}/>
        <br/>
        Author:
        <input id='blogAuthor' type='text' onChange={({ target }) => setBlogAuthor(target.value)}/>
        <br/>
        Url:
        <input id='blogUrl' type='text' onChange={({ target }) => setBlogUrl(target.value)}/>
        <br/>
        <button id='createBlogButton' type='submit'>Create</button>
        <br />
      </form>
    </div>
  )
}

export default BlogForm