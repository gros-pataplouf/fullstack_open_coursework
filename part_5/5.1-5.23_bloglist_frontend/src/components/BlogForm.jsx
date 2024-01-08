import { useState } from "react";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogForm = ({ addBlog }) => {
  const [visible, setVisible] = useState(false);
  const [newBlog, setNewBlog] = useState({
    author: "",
    title: "",
    url: "",
  });
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const addNewBlog = async (e) => {
    e.preventDefault();
    try {
      const addedBlog = await addBlog(newBlog);
      setVisible(false);
      setMessage({
        type: "info",
        text: `${addedBlog.title} by ${addedBlog.author} has been added successfully!`,
      });
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);

      setNewBlog({ author: "", title: "", url: "" });
    } catch (e) {
      console.error(e);

      setMessage({ type: "warning", text: e.response.data.error });
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);
    }
  };

  const handleChange = (property) => (e) => {
    setNewBlog({ ...newBlog, [property]: e.target.value });
  };

  return (
    <>
      <Notification message={message} />
      <Togglable
        buttonShowLabel={"new note"}
        buttonHideLabel={"cancel"}
        visible={visible}
        setVisible={setVisible}
      >
        <h1>add a new blog</h1>
        <form onSubmit={addNewBlog}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            value={newBlog.title}
            onChange={handleChange("title")}
          />
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="author"
            value={newBlog.author}
            onChange={handleChange("author")}
          />
          <label htmlFor="author">author</label>
          <input
            type="url"
            name="url"
            placeholder="url"
            value={newBlog.url}
            id="url"
            onChange={handleChange("url")}
          />
          <label htmlFor="url">url</label>
          <button>create</button>
        </form>
      </Togglable>
    </>
  );
};

export default BlogForm;
