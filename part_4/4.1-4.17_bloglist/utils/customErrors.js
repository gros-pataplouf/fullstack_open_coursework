class PasswordError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
    this.name = 'PasswordError'
  }
}

class NonUniqueUserError extends Error {
  constructor(message) {
    super(message)
    this.status = 403
    this.name = 'NonUniqueUserError'
  }
}

module.exports = { PasswordError, NonUniqueUserError }