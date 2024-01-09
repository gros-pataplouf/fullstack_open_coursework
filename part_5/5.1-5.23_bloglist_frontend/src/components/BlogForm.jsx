import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    author: '',
    title: '',
    url: '',
  })

  const addNewBlog = async (e) => {
    e.preventDefault()
    await addBlog(newBlog)
    setNewBlog({ author: '', title: '', url: '' })
  }

  const handleChange = (property) => (e) => {
    setNewBlog({ ...newBlog, [property]: e.target.value })
  }

  return (
    <>
      <h1>add a new blog</h1>
      <form onSubmit={addNewBlog}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          value={newBlog.title}
          onChange={handleChange('title')}
        />
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="author"
          value={newBlog.author}
          onChange={handleChange('author')}
        />
        <label htmlFor="author">author</label>
        <input
          type="url"
          name="url"
          placeholder="url"
          value={newBlog.url}
          id="url"
          onChange={handleChange('url')}
        />
        <label htmlFor="url">url</label>
        <button>create</button>
      </form>
    </>
  )
}

export default BlogForm
