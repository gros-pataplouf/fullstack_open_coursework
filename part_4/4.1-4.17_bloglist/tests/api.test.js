const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const HashUser = require('./test_helper')
const testBlogs = require('./testBlogs.json')
const testUsers = require('./testUsers.json')

mongoose.set('bufferTimeoutMS', 30000)

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogsForDb = testBlogs.map(entry => new Blog(entry))
  await Promise.all(blogsForDb.map(entry => entry.save()))
  const usersWithHash = testUsers.map(entry => new HashUser(entry.username, entry.password, entry.name))
  const usersForDb = usersWithHash.map(entry => new User(entry))
  await Promise.all(usersForDb.map(entry => entry.save()))
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
    expect(blogs.length).toBe(testBlogs.length)
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
  test('sending a post request to /api/blogs with no token fails', async () => {
    const newBlog = {
      title: 'JavaScript quirks',
      author: 'Geeky nerds',
      url: 'https://www.js-reexamined.fr',
      likes: 9
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('sending a post request to /api/blogs creates a new blog post', async () => {
    const { username, name, password } = testUsers[1]
    const successfulLogin = await api.post('/login').send({ username, password, name })
    const token = JSON.parse(successfulLogin.text).token

    const newBlog = {
      title: 'JavaScript quirks',
      author: 'Geeky nerds',
      url: 'https://www.js-reexamined.fr',
      likes: 9
    }
    const newBlogSaved = await api.post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
    expect(newBlogSaved.status).toBe(201)
    const response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(testBlogs.length + 1)
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(newBlog.title)
  })

  test(' if the likes property is missing from the request, it will default to the value 0', async () => {
    const { username, name, password } = testUsers[1]
    const successfulLogin = await api.post('/login').send({ username, password, name })
    const token = JSON.parse(successfulLogin.text).token
    const newBlog = {
      title: 'JavaScript quirks',
      author: 'Geeky nerds',
      url: 'https://www.js-reexamined.fr'
    }
    const newBlogSaved = await api.post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
    expect(JSON.parse(newBlogSaved.text).likes).toBe(0)
  })

  test(' if title or url properties are missing, backend responds with 400', async () => {
    const { username, name, password } = testUsers[1]
    const successfulLogin = await api.post('/login').send({ username, password, name })
    const token = JSON.parse(successfulLogin.text).token
    const newBlog = new Blog({
      author: 'Geeky nerds',
      url: 'https://www.js-reexamined.fr'
    })
    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
      .expect(400)
    const newBlog2 = new Blog({
      title: 'Geeky nerds',
      url: 'https://www.js-reexamined.fr'
    })
    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog2)
      .expect(400)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('after deletion of valid id, blog list length is decremented by 1', async () => {
    const { username, name, password } = testUsers[1]
    const successfulLogin = await api.post('/login').send({ username, password, name })
    const token = JSON.parse(successfulLogin.text).token
    const newBlog = {
      title: 'TDD is hard',
      author: 'desperatecoder',
      url: 'https://www.redgreenrefactor.ar'
    }
    const blogToBeDeleted = await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
    const responseBefore = await api
      .get('/api/blogs')
    await api.delete(`/api/blogs/${blogToBeDeleted.body.id}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(204)
    const responseAfter = await api.get('/api/blogs')
    expect(responseAfter.body.length).toBe(responseBefore.body.length - 1)
    expect(responseAfter.body.map(elt => elt.title)).not.toContain(blogToBeDeleted.title)
  })
  test('deleting a malformatted id returns a 400', async () => {
    const { username, name, password } = testUsers[1]
    const successfulLogin = await api.post('/login').send({ username, password, name })
    const token = JSON.parse(successfulLogin.text).token
    const malformattedId = '123-fake-id'
    await api.delete(`/api/blogs/${malformattedId}`)
      .set({ 'Authorization': `Bearer ${token}` })
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

describe('/api/users', () => {
  test('a user can be created with username, name, password', async () => {
    const newUser = {
      username: 'patagonia',
      name: 'plouffy',
      password: '1290bea'
    }
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
  })
  test('a GET to api/users/ displays all the users', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(testUsers.length)
  })
  test('creating a user without username returns a 400 and a message', async () => {
    const invalidUser = {
      name: 'pata',
      password: 'XXX123'
    }
    const invalidUserCreation = await api.post('/api/users')
      .send(invalidUser)
    expect(invalidUserCreation.status).toBe(400)
    expect(JSON.parse(invalidUserCreation.text)).toEqual({ error: 'User validation failed: username: username missing' })

  })
  test('creating a user without password returns a 400 and a message', async () => {
    const invalidUser = {
      name: 'pata',
      username: 'XXX123'
    }
    const invalidUserCreation = await api.post('/api/users')
      .send(invalidUser)
    expect(invalidUserCreation.status).toBe(400)
    expect(JSON.parse(invalidUserCreation.text)).toEqual({ error: 'Password must be at least 3 characters long' })
  })

  test('creating a user without too short a password returns a 400 and a message', async () => {
    const invalidUser = {
      name: 'pata',
      username: 'XXX123',
      password: '12'
    }
    const invalidUserCreation = await api.post('/api/users')
      .send(invalidUser)
    expect(invalidUserCreation.status).toBe(400)
    expect(JSON.parse(invalidUserCreation.text)).toEqual({ error: 'Password must be at least 3 characters long' })
  })

  test('creating a user without too short a password returns a 400 and a message', async () => {
    const firstUser = {
      name: 'pata',
      username: 'XXX123',
      password: '1234'
    }
    await api.post('/api/users')
      .send(firstUser)
    const secondUser = {
      name: 'prince charles',
      username: 'XXX123',
      password: '123456'
    }
    const invalidUserCreation = await api.post('/api/users')
      .send(secondUser)
    expect(invalidUserCreation.status).toBe(403)
    expect(JSON.parse(invalidUserCreation.text)).toEqual({ error: 'There is already a user with this username.' })
  })

})

describe('/login', () => {
  test('sending a post request to /login with missing username, or non existing user, or a wrong password, or without a password, returns a 401', async () => {
    const userNoPassword = { ...testUsers[0] }
    delete userNoPassword.password
    const loginNoPassword = await api.post('/login').send(userNoPassword)
    expect(loginNoPassword.status).toBe(401)

    const userNoUsername = { name: testUsers[0].name, password: testUsers[0].password }
    const loginNoUsername = await api.post('/login').send(userNoUsername)
    expect(loginNoUsername.status).toBe(401)

    const userNotFound = { username: 'ghost', password: '123456' }
    const loginUserNotFound = await api.post('/login').send(userNotFound)
    expect(loginUserNotFound.status).toBe(401)

    const userWrongPassword = { ...testUsers[0] }
    userWrongPassword.password = 'wrongPwd'
    const loginWrongPassword = await api.post('/login').send(userWrongPassword)
    expect(loginWrongPassword.status).toBe(401)

  })

  test('sending a POST request to /login with correct username and password returns a token in JSON format and a 200', async () => {
    const { username, password } = testUsers[1]
    const successfulLogin = await api.post('/login').send({ username, password })
    const desiredResponse = {
      username,
      token: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    }
    expect(successfulLogin.status).toBe(200)
    expect(JSON.parse(successfulLogin.text)).toMatchObject(desiredResponse)
  })
})


afterAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await mongoose.connection.close()
})
