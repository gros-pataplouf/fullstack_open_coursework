module.exports = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError' || error.name === 'PasswordError' || error.name === 'BadUpdateError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'NonUniqueUserError') {
    return response.status(error.status).json({ error: error.message })
  }
  next(error)
}
