import { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, setBlogs, loggedUserId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }

  const flexStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  const buttonStyle = {
    marginLeft: 15,
    height: 'min-content',
    padding: '8px 12px',
    backgroundColor: '#3498DB',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }

  const removeButtonStyle = {
    backgroundColor: '#FF5722',
    padding: '8px 12px',
    color: 'white',
    border: 'none',
    borderRadius: 4,
  }

  const [showDetails, setShowDetails] = useState(false)
  const toggleDetails = () => setShowDetails(!showDetails)
  const handleLike = async () => {
    await blogsService.like(blog)
    const blogs = await blogsService.getAll()
    setBlogs(blogs)
  }
  const handleRemove = async () => {
    if (window.confirm(`Are you sure to remove ${blog.title} by ${blog.author}?`)) {
      await blogsService.remove(blog)
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
    }
  }
  const removeButton = () => {
    if (loggedUserId === blog.user.id) {
      return <button style={removeButtonStyle} onClick={handleRemove}>remove</button>

    }}
  return showDetails ? (
    <div style={blogStyle}>
      <div style={flexStyle}>
        <p>
          {blog.title} by {blog.author}
        </p>
        <button onClick={toggleDetails} style={buttonStyle}>
            hide
        </button>
      </div>
      <p>{blog.url}</p>
      <div style={flexStyle}>
        <p>likes {blog.likes}</p> <button style={buttonStyle} onClick={handleLike}>like</button>
      </div>
      <p>{blog.user.name}</p>
      {removeButton()}
    </div>
  ) : (
    <div style={blogStyle}>
      <div style={flexStyle}>
        <p>
          {blog.title} by {blog.author}
        </p>
        <button onClick={toggleDetails} style={buttonStyle}>
            view
        </button>
      </div>
    </div>
  )

}

export default Blog
