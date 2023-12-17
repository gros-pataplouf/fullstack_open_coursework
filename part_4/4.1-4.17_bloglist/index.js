const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const {MONGO_URL, PORT} = require('./utils/config')
const logger = require('./utils/logger')


mongoose.connect(MONGO_URL)
.then(response => logger.info("connection successful"))
.catch(error => logger.error(error))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})