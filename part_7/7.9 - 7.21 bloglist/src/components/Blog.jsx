import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createNotification,
  eraseNotification,
} from "../reducers/notificationReducer";
import { deleteBlog } from "../reducers/blogReducer";
import blogsService from "../services/blogs";
import Comments from "./Comments";


const Blog = () => {
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const loggedUserId = loggedUser.id;
  const match = useMatch("/blogs/:id");
  const blogId = match.params.id;
  useEffect(() => {
    async function getBlog(id) {
      const blog = await blogsService.getOne(id);
      setBlog(blog);
    }
    getBlog(blogId);
  }, []);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const flexStyle = {
    display: "flex",
    alignItems: "center",
  };

  const buttonStyle = {
    marginLeft: 15,
    height: "min-content",
    padding: "8px 12px",
    backgroundColor: "#3498DB",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const removeButtonStyle = {
    backgroundColor: "#FF5722",
    padding: "8px 12px",
    color: "white",
    border: "none",
    borderRadius: 4,
  };

  const like = async (blog) => {
    console.log(blog)
    await blogsService.like(blog);
  };
  const removeBlog = async (blog) => {
    if (
      window.confirm(`Are you sure to remove ${blog.title} by ${blog.author}?`)
    ) {
      await blogsService.remove(blog);
    }
  };

  const handleLike = async () => {
    await like(blog);
    setBlog({...blog, likes: blog.likes+1})


  };
  const handleRemove = async () => {
    await removeBlog(blog);
    console.log(blogId)
    dispatch(deleteBlog(blogId));
    dispatch(
      createNotification({ type: "warning", text: "Deletion successfull!" }),
    );
    setTimeout(() => {
      dispatch(eraseNotification());
    }, 2000);
    navigate("/");
  };

  const removeButton = () => {
    if (loggedUserId === blog.user.id) {
      return (
        <button
          style={removeButtonStyle}
          onClick={handleRemove}
          data-testid="delete-button"
        >
          remove
        </button>
      );
    }
  };
  return (
    blog && (
      <div data-testid="blog" style={blogStyle}>
        <div style={flexStyle}>
          <p data-testid="blog-by-author">
            {blog.title} by {blog.author}
          </p>
        </div>
        <p data-testid="url">{blog.url}</p>
        <div style={flexStyle}>
          <p data-testid="likes">likes {blog.likes}</p>{" "}
          <button
            style={buttonStyle}
            onClick={handleLike}
            data-testid="like-button"
          >
            like
          </button>
        </div>
        <p data-testid="blog-user-name">{blog.user.name}</p>
        {removeButton()}
        <Comments blog={blog}/>

      </div>
    )
  );
};

export default Blog;
