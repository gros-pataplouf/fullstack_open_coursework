const jwt = require('jsonwebtoken')


const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError' || error.name === 'PasswordError' || error.name === 'BadUpdateError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'NonUniqueUserError') {
    return response.status(error.status).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: error.message })
  }
  next(error)
}

const authExtractor = (request, response, next) => {
  const authorization = request.headers.authorization
  if (!authorization) {
    return response.status(401).json({ error: 'missing authorization.' })
  }
  const token = authorization.replace('Bearer ', '')
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  request.authorizedUserId = decodedToken.id
  next()
}


module.exports = {
  errorHandler,
  authExtractor
}