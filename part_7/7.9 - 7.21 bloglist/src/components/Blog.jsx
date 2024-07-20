import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container } from "react-bootstrap";
import {
  createNotification,
  eraseNotification,
} from "../reducers/notificationReducer";
import { deleteBlog } from "../reducers/blogReducer";
import { setBlogInfo } from "../reducers/blogInfoReducer";
import blogsService from "../services/blogs";
import Comments from "./Comments";

const Blog = () => {
  const blog = useSelector((state) => state.blogInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const loggedUserId = loggedUser.id;
  const match = useMatch("/blogs/:id");
  const blogId = match.params.id;
  useEffect(() => {
    async function getBlog(id) {
      const currentBlog = await blogsService.getOne(id);
      dispatch(setBlogInfo(currentBlog));
    }
    getBlog(blogId);
  }, []);

  const like = async (blog) => {
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
    dispatch(setBlogInfo({ ...blog, likes: blog.likes + 1 }));
  };
  const handleRemove = async () => {
    await removeBlog(blog);
    console.log(blogId);
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
        <Button
          onClick={handleRemove}
          data-testid="delete-button"
          className="btn-danger"
        >
          remove
        </Button>
      );
    }
  };
  return (
    blog && (
      <Container data-testid="blog">
        <div>
          <p data-testid="blog-by-author">
            {blog.title} by {blog.author}
          </p>
        </div>
        <p data-testid="url">{blog.url}</p>
        <div>
          <p data-testid="likes">likes {blog.likes}</p>{" "}
          <Button
            onClick={handleLike}
            data-testid="like-button"
            className="btn-primary"
          >
            like
          </Button>
        </div>
        <p data-testid="blog-user-name">{blog.user.name}</p>
        {removeButton()}
        <Comments blog={blog} />
      </Container>
    )
  );
};

export default Blog;
