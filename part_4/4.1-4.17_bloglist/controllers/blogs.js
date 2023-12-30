const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { BadUpdateError } = require('../utils/customErrors')
blogRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  console.log(blog.user.toString())
  const relatedUser = await User.findById(blog.user.toString())
  relatedUser.blogs.push(result.id)
  console.log(relatedUser)
  await relatedUser.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
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
      throw new BadUpdateError('There is no user with the specified ID.') //this is to avoid that a deleted blog can be re-created by an update
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
