const express = require('express')
// const jwt = require('jsonwebtoken')
const loginRouter = express.Router()


loginRouter.post('/', async (_request, response) => {
  return response.status(200).end()
})






module.exports = loginRouter