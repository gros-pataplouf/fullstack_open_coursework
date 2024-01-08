import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import blogsService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs));
  }, []);



  const addBlog = async (blog) => {
    const addedBlog = await blogsService.create(blog);
    await blogsService.getAll().then((blogs) => setBlogs(blogs));
    return addedBlog;
  };

  return (
    <div>
      <h2>blogs</h2>
      <Login props={{ user, setUser, input, setInput }} />
      {user && <BlogForm addBlog={addBlog} />}

      {user &&
        blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
