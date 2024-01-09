import axios from 'axios'
import blogsService from '../services/blogs'
const baseUrl = '/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  blogsService.setToken(response.data.token)
  return response.data
}

export default { login }
