const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: [true, 'username missing'],
    minLength: [3, 'username must be at least 3 characters long'],
    unique: [true, 'usernames must be unique']
  },
  passwordHash: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})


userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})


module.exports = mongoose.model('User', userSchema)