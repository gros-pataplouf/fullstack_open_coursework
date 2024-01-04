const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { PasswordError, NonUniqueUserError } = require('../utils/customErrors')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password || password.length < 3) {
    throw new PasswordError('Password must be at least 3 characters long')
  }
  const existingUser = await User.find({ username })
  if (existingUser.length) {
    throw new NonUniqueUserError('There is already a user with this username.')
  }
  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)
  const newUser = new User({ username, name, passwordHash })
  const savedUser = await newUser.save()
  response.status(201).send(savedUser)
})

userRouter.get('/', async (_request, response) => {
  const allUsers = await User.find({}).populate('blogs', { author : 1, title : 1 })
  response.status(200).send(allUsers)
})

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', { author : 1, title : 1 })
  response.status(200).send(user)
})

module.exports = userRouter