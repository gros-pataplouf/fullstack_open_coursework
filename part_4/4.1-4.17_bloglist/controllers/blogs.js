const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, url, likes, author } = request.body
  const requestedBlog = await Blog.findById(request.params.id)
  if (!requestedBlog) {
    return response.status(404).end() //this is to avoid that a deleted blog can be re-created by an update
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, likes, author, url }, { new: true, runValidators: true })
  response.status(200).send(updatedBlog)
})


module.exports = blogRouter
