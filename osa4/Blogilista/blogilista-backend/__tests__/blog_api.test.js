const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('All blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
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
  const blog = new Blog(
    {
      author: 'temp',
      url: 'temp',
      likes: 0
    }
  )

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Blog without URL is not added', async () => {
  const blog = new Blog(
    {
      title: 'temp',
      author: 'temp',
      likes: 0
    }
  )

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close
})