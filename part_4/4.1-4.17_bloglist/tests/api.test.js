const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testData = require('./testData.json')
mongoose.set('bufferTimeoutMS', 30000)

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const testEntries = testData.map(entry => new Blog(entry))
  await Promise.all(testEntries.map(entry => entry.save()))
})


describe('GET /api/blogs', () => {
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
    const ids = response.body.map(r => r.id)
    ids.forEach(id => {
      expect(id).toBeDefined()
    })
  })

})

describe('POST /api/blogs', () => {
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
})

describe('DELETE /api/blogs/:id', () => {
  test('after deletion of valid id, blog list length is decremented by 1', async () => {
    const responseBefore = await api
      .get('/api/blogs')
    const blogToBeDeleted = responseBefore.body[0]
    await api.delete(`/api/blogs/${blogToBeDeleted.id}`)
      .expect(204)
    const responseAfter = await api.get('/api/blogs')
    expect(responseAfter.body.length).toBe(testData.length - 1)
    expect(responseAfter.body.map(elt => elt.title)).not.toContain(blogToBeDeleted.title)
  })
  test('deleting a malformatted id returns a 400', async () => {
    const malformattedId = '123-fake-id'
    await api.delete(`/api/blogs/${malformattedId}`)
      .expect(400)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('the number of likes can be updated by PUT request', async () => {
    const response = await api.get('/api/blogs')
    const postToBeUpdated = response.body[0]
    postToBeUpdated.likes += 1
    await api.put(`/api/blogs/${postToBeUpdated.id}`)
      .send(postToBeUpdated)
      .expect(200)
      .expect(postToBeUpdated)
  })
  test('trying to update a non existing blog returns a 404', async () => {

    const fakeId = '5b486d4057d0e42a3ca9c106'
    const fakePost = {
      title: 'Fake blog',
      author: 'Elisabeth Holmes',
      url: 'http://justafraud.com',
      likes: -1000
    }

    await api.put(`/api/blogs/${fakeId}`)
      .send(fakePost)
      .expect(404)
  })

})


afterAll(async () => {
  await mongoose.connection.close()
})
