import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, eraseNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'

import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [input, setInput] = useState({
    username: '',
    password: '',
  })

  const blogFormRef = useRef()

  useEffect(() => {
    console.log("hello user", user)
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogsService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    async function getBlogs () {
      const blogs = await blogsService.getAll()
      dispatch(setBlogs(blogs))
    }
    getBlogs()

  }, [])

  const likeBlog = async (blog) => {
    await blogsService.like(blog)
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
  const removeBlog = async (blog) => {
    if (window.confirm(`Are you sure to remove ${blog.title} by ${blog.author}?`)) {
      await blogsService.remove(blog)
      const blogs = await blogsService.getAll()
      dispatch(setBlogs(blogs))
    }
  }

  const addBlog = async (blog) => {
    try {
      const addedBlog = await blogsService.create(blog)
      dispatch(createNotification({
        type: 'info',
        text: `${addedBlog.title} has been added successfully!`,
      }))
      setTimeout(() => {
        dispatch(eraseNotification())
      }, 2000)
      await blogsService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
      blogFormRef.current.toggleVisibility()
      return addedBlog
    } catch (e) {
      console.error(e.response.data.error)
      dispatch(createNotification({ type: 'warning', text: e.response.data.error }))
      setTimeout(() => {
        dispatch(eraseNotification())
      }, 2000)
    }
  }

  const blogForm = () => {
    return (
      <Togglable
        buttonShowLabel='new blog'
        buttonHideLabel='cancel'
        ref={blogFormRef}
      >
        <BlogForm addBlog={addBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Login props={{ user, setUser, input, setInput }} />
      {user && blogForm()}

      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} loggedUserId={user.id} likeBlog={likeBlog} removeBlog={removeBlog} />)}
    </div>
  )
}

export default App
