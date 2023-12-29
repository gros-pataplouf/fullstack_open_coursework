const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const { MONGO_URL } = require('./utils/config')
const logger = require('./utils/logger')
const errorHandler = require('./utils/middleware')

console.log('now connecting to', MONGO_URL)
mongoose.connect(MONGO_URL)
  .then(_response => logger.info('connection successful'))
  .catch(error => logger.error(error))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(errorHandler)

module.exports = app
