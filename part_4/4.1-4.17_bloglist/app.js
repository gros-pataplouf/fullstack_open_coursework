const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const {MONGO_URL} = require('./utils/config')
const logger = require('./utils/logger')


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


console.log('now connecting to', MONGO_URL)
mongoose.connect(MONGO_URL)
.then(response => logger.info("connection successful"))
.catch(error => logger.error(error))


module.exports = app