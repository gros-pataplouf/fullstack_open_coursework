const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testData = require('./testData.json')
mongoose.set("bufferTimeoutMS", 30000)

const api = supertest(app)


beforeAll(async() =>  {
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

afterAll(async () => {
    await mongoose.connection.close()
})


