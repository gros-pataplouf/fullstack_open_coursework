import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    type: '',
    text: '',
  })
  const [input, setInput] = useState({
    username: '',
    password: '',
  })

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    async function getBlogs () {
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
    }
    getBlogs()

  }, [])

  const likeBlog = async (blog) => {
    await blogsService.like(blog)
    const blogs = await blogsService.getAll()
    setBlogs(blogs)
  }
  const removeBlog = async (blog) => {
    if (window.confirm(`Are you sure to remove ${blog.title} by ${blog.author}?`)) {
      await blogsService.remove(blog)
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
    }
  }

  const addBlog = async (blog) => {
    try {
      const addedBlog = await blogsService.create(blog)
      setMessage({
        type: 'info',
        text: `${addedBlog.title} has been added successfully!`,
      })
      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 2000)
      await blogsService.getAll().then((blogs) => setBlogs(blogs))
      blogFormRef.current.toggleVisibility()
      return addedBlog
    } catch (e) {
      console.error(e.response.data.error)
      setMessage({ type: 'warning', text: e.response.data.error })
      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 2000)
    }
  }

  const blogForm = () => {
    return (
      <Togglable
        buttonShowLabel={'new blog'}
        buttonHideLabel={'cancel'}
        ref={blogFormRef}
      >
        <BlogForm addBlog={addBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Login props={{ user, setUser, input, setInput }} />
      {user && blogForm()}

      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} loggedUserId={user.id} likeBlog={likeBlog} removeBlog={removeBlog} />)}
    </div>
  )
}

export default App
