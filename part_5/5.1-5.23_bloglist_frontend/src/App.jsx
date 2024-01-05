import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('isLoggedIn'),
    name: localStorage.getItem('name')
  })

  const [message, setMessage] = useState({
    type: '', 
    text: ''
  })
  const [input, setInput] = useState({
    username: '', 
    password: ''
  }) 
  const [newBlog, setNewBlog] = useState({
    author: '', 
    title: '',
    url: ''
  }) 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Login props={{user, setUser, input, setInput, message, setMessage}}/>
      { user.isLoggedIn && <AddBlog props={{newBlog, setNewBlog, token: user.token, setBlogs, message, setMessage}} /> }
      
      { user.isLoggedIn && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App