const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { MONGO_URL } = require('./utils/config')
const logger = require('./utils/logger')
const { errorHandler } = require('./utils/middleware')

console.log('now connecting to', MONGO_URL)
mongoose.connect(MONGO_URL)
  .then(_response => logger.info('connection successful'))
  .catch(error => logger.error(error))

app.use(cors())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/login', loginRouter)
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV === 'test') {
  console.log('running in test mode')
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

module.exports = app
