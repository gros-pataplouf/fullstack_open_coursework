import { useState } from "react";
import blogsService from "../services/blogs";

const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const flexStyle = {
    display: "flex",
  };

  const buttonStyle = {
    marginLeft: 15,
    height: "min-content",
    alignSelf: "center",
  };
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);
  const handleLike = async () => {
    await blogsService.like(blog)
    const blogs = await blogsService.getAll()
    setBlogs(blogs)


  }
  {
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
    );
  }
};

export default Blog;
