import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { setBlogInfo } from "../reducers/blogInfoReducer";
import { Container, Button, Form } from "react-bootstrap";

const CommentForm = () => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState({
    text: "",
  });
  const blog = useSelector((state) => state.blogInfo);
  const blogId = blog.id;

  const addComment = async (e) => {
    e.preventDefault();
    await blogService.comment(newComment.text, blogId);
    dispatch(
      setBlogInfo({ ...blog, comments: blog.comments.concat(newComment) }),
    );
    setNewComment({ text: "" });
  };

  const handleChange = () => (e) => {
    setNewComment({ ...newComment, text: e.target.value });
  };

  return (
    <Container>
      <h1 className="fs-4">add a new comment</h1>
      <Form className="d-flex flex-column w-50" onSubmit={addComment}>
        <label htmlFor="comment">add your comment</label>
        <textarea
          name="comment"
          id="comment"
          placeholder="comment"
          value={newComment.text}
          onChange={handleChange("comment")}
        />
        <Button
          className="mx-auto my-4"
          type="submit"
          data-testid="create-button"
        >
          send
        </Button>
      </Form>
    </Container>
  );
};

export default CommentForm;
