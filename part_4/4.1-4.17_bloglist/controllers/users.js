const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)
  const newUser = new User({ username, name, passwordHash })
  const savedUser = await newUser.save()
  response.status(201).send(savedUser)
})

userRouter.get('/', async (_request, response) => {
  const allUsers = await User.find({})
  console.log('all users', allUsers)
  response.status(200).send(allUsers)
})



module.exports = userRouter