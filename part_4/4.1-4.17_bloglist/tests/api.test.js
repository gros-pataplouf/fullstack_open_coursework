/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testData = require('./testData.json')
mongoose.set('bufferTimeoutMS', 30000)

const api = supertest(app)

beforeAll(async () => {
  await Blog.deleteMany({})
  const testEntries = testData.map(entry => new Blog(entry))
  await Promise.all(testEntries.map(entry => entry.save()))
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog list length is length of initial data', async () => {
  const response = await api
    .get('/api/blogs')
  const blogs = response.body
  expect(blogs.length).toBe(testData.length)
})

test('the unique identifier of a blog is the id property', async () => {
  const response = await api
    .get('/api/blogs')
  console.log(response.body)
  const ids = response.body.map(r => r.id)
  ids.forEach(id => {
    expect(id).toBeDefined()
  })
})

test('sending a post request to /api/blogs creates a new blog post', async () => {
  const newBlog = new Blog({
    title: 'JavaScript quirks',
    author: 'Geeky nerds',
    url: 'https://www.js-reexamined.fr',
    likes: 9
  })
  await newBlog.save()
  const response = await api
    .get('/api/blogs')
  expect(response.body.length).toBe(testData.length + 1)
  const titles = response.body.map(r => r.title)
  expect(titles).toContain(newBlog.title)
})

test(' if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = new Blog({
    title: 'JavaScript quirks',
    author: 'Geeky nerds',
    url: 'https://www.js-reexamined.fr'
  })
  const savedBlog = await newBlog.save()
  expect(savedBlog.likes).toBe(0)
})

test(' if title or url properties are missing, backend responds with 400', async () => {
  const newBlog = new Blog({
    author: 'Geeky nerds',
    url: 'https://www.js-reexamined.fr'
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  const newBlog2 = new Blog({
    title: 'Geeky nerds',
    url: 'https://www.js-reexamined.fr'
  })
  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})
