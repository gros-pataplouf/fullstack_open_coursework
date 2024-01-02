const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { authExtractor } = require('../utils/middleware')
const { BadUpdateError } = require('../utils/customErrors')

blogRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1 })
  response.json(blogs)
})

blogRouter.post('/', authExtractor, async (request, response) => {
  const relatedUser = await User.findById(request.authorizedUserId)
  const blog = new Blog({ ...request.body, user: relatedUser.id })
  const result = await blog.save()
  relatedUser.blogs ? relatedUser.blogs.push(result.id) : relatedUser.blogs = [result.id]
  await relatedUser.save()
  response.status(201).send(result)
})

blogRouter.delete('/:id', authExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (request.authorizedUserId !== blogToDelete.user?.toString() ) {
    return response.status(401).send({ error: 'unauthorized deletion attempt' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, url, likes, author, user } = request.body
  const requestedBlog = await Blog.findById(request.params.id)
  if (!requestedBlog) {
    return response.status(404).end() //this is to avoid that a deleted blog can be re-created by an update
  }
  if (user) {
    const relatedUser = await User.findById(user)
    if (!relatedUser) {
      throw new BadUpdateError('There is no user with the specified ID.')
    }
    relatedUser.blogs.push(requestedBlog.id)
    await relatedUser.save()
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, likes, author, url, user }, { new: true, runValidators: true })
    response.status(200).send(updatedBlog)
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, likes, author, url }, { new: true, runValidators: true })
  response.status(200).send(updatedBlog)

})


module.exports = blogRouter
