require('dotenv').config()

const PORT = process.env.PORT
const SECRET = process.env.SECRET
// eslint-disable-next-line no-constant-condition
const MONGO_URL = process.env.NODE_ENV === 'development' || 'test'
  ? process.env.MONGO_URL_TEST
  : process.env.MONGO_URL

module.exports = {
  MONGO_URL,
  PORT,
  SECRET
}
