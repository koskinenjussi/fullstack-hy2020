const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

describe('When there is an initial list of blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('All blogs are returned as JSON', async () => {
    const response = 
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('Id field is named id', async () => {
    const blogs = await helper.blogsInDb()
    
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
  
  test('If value of likes is unidentified, set it to 0', async () => {
    const blogs = await helper.blogsInDb()
  
    const blogWithNoLikes = new Blog( 
      {
        title: 'temp',
        author: 'temp',
        url: 'temp'
      }
    )
  
    blogs.push(blogWithNoLikes)
  
    blogs.forEach(blog => {
      if (blog.likes === undefined) {
        blog.likes = 0
      }
    })
  
    blogs.forEach(blog => {
      expect(blog.likes).toBeDefined()
    })
  })
  
  test('Blog without title is not added', async () => {
    const blog = {
      author: 'temp',
      url: 'temp',
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  
  test('Blog without URL is not added', async () => {
    const blog = {
      title: 'temp',
      author: 'temp',
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  
  test('Deleted blog post is removed', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`)
    
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).not.toContain(blogToDelete.title)
  })
  
  test('Blog can be updated', async () => {
    const blogs = await api.get('/api/blogs')
  
    const blogToUpdate = blogs.body[0]
  
    const updatedBlog = {
      title: 'Updated Title',
      author: 'Updated Author',
      url: 'Updated url',
      likes: 100,
      id: blogToUpdate.id
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
  
    const updatedBlogFromDb = await api.get(`/api/blogs/${blogToUpdate.id}`)
    expect(updatedBlogFromDb.body).toEqual(updatedBlog)
  
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).not.toContain(blogToUpdate.title)
  })
})

afterAll(() => {
  mongoose.connection.close
})