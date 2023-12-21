module.exports = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('ValidationError')
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
