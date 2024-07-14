const bcrypt = require('bcryptjs')

class HashUser {
  constructor (username, password, name=null) {
    this.username = username
    this.name = name
    this.passwordHash = bcrypt.hashSync(password, 10)
  }

}

module.exports = HashUser