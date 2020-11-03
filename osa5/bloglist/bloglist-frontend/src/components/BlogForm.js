import React from 'react'

const BlogForm = ({ handleCreateNewBlog, setBlogTitle, setBlogAuthor, setBlogUrl }) => {
  return (
    <div>
      <form>
        <h3>Create new blog</h3>
        Title:
        <input type='text' onChange={({ target }) => setBlogTitle(target.value)}/>
        <br/>
        Author:
        <input type='text' onChange={({ target }) => setBlogAuthor(target.value)}/>
        <br/>
        Url:
        <input type='text' onChange={({ target }) => setBlogUrl(target.value)}/>
        <br/>
        <button onClick={handleCreateNewBlog}>Create</button>
        <br />
      </form>
    </div>
  )
}

export default BlogForm