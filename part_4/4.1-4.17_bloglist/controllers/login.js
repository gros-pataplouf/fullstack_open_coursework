const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = express.Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  let passwordMatchesForExistingUser = false
  const matchingUser = await User.findOne({ username })
  if ( matchingUser && password ) {
    passwordMatchesForExistingUser = bcrypt.compareSync(password, matchingUser.passwordHash)
  }
  if (!passwordMatchesForExistingUser) {
    return response.status(401).send({ 'error' : 'invalid username or password' })
  }
  const token = jwt.sign({ username, name: matchingUser.name }, SECRET,  { expiresIn: '1h' })
  return response.status(200).send({ token, username, name: matchingUser.name })
})

module.exports = loginRouter