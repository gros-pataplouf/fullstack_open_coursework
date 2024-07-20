import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    author: "",
    title: "",
    url: "",
  });

  const addNewBlog = async (e) => {
    e.preventDefault();
    await addBlog(newBlog);
    setNewBlog({ author: "", title: "", url: "" });
  };

  const handleChange = (property) => (e) => {
    setNewBlog({ ...newBlog, [property]: e.target.value });
  };

  return (
    <Card>
      <Card.Body className="p-8 bg-gray">
        <h1 className="fs-4 text-gray">add a new blog</h1>
        <Form className="d-flex flex-column" onSubmit={addNewBlog}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            data-testid="title-input"
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
            data-testid="author-input"
            onChange={handleChange("author")}
          />
          <label htmlFor="author">author</label>
          <input
            type="url"
            name="url"
            placeholder="url"
            value={newBlog.url}
            id="url"
            data-testid="url-input"
            onChange={handleChange("url")}
          />
          <label htmlFor="url">url</label>
          <Button type="submit" data-testid="create-button">
            create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BlogForm;
