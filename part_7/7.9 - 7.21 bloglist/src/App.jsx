import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createNotification,
  eraseNotification,
} from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { setUser, logout } from "./reducers/userReducer";
import { Container } from "react-bootstrap";
import Blog from "./components/Blog";
import NavigationMenue from "./components/Nav";
import Login from "./components/Login";
import UserDirectory from "./components/UserDirectory";
import User from "./components/User";
import Notification from "./components/Notification";
import blogsService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
      blogsService.setToken(loggedUser.token);
    }
  }, []);

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogsService.getAll();
      dispatch(setBlogs(blogs));
    }
    getBlogs();
  }, []);

  const addBlog = async (blog) => {
    try {
      const addedBlog = await blogsService.create(blog);
      dispatch(
        createNotification({
          type: "info",
          text: `${addedBlog.title} has been added successfully!`,
        }),
      );
      setTimeout(() => {
        dispatch(eraseNotification());
      }, 2000);
      await blogsService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
      blogFormRef.current.toggleVisibility();
      return addedBlog;
    } catch (e) {
      console.error(e.response.data.error);
      dispatch(
        createNotification({ type: "warning", text: e.response.data.error }),
      );
      setTimeout(() => {
        dispatch(eraseNotification());
      }, 2000);
    }
  };

  const blogForm = () => {
    return (
      <Togglable
        buttonShowLabel="new blog"
        buttonHideLabel="cancel"
        ref={blogFormRef}
      >
        <BlogForm addBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div className="fs-4">
      <NavigationMenue>
        <Login props={{ user, setUser, input, setInput }} />
      </NavigationMenue>
      <Container className="p-8">
        <Notification />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <h2>Blogs</h2>
                {user && blogForm()}
                {user &&
                  blogs.map((blog) => (
                    <div key={blog.id}>
                      <Link to={`blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                      </Link>
                    </div>
                  ))}
              </>
            }
          />
          <Route path="/users" element={user && <UserDirectory />} />
          <Route path="/users/:id" element={user && <User />} />
          <Route path="/blogs/:id" element={user && <Blog />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
