import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({
    username: '',
    password: '',
    token: '',
    isLoggedIn: false,
    name: ''
  })
  const [input, setInput] = useState({
    username: '', 
    password: ''
  }) 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Login props={{user, setUser, input, setInput}}/>
      
      {user.isLoggedIn && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App