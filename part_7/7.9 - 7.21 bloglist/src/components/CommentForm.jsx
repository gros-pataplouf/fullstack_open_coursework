import { useState } from "react";
import { useMatch } from "react-router-dom";
import blogService from "../services/blogs";

const CommentForm = () => {
  const [newComment, setNewComment] = useState({
    text: "",
  });
  const match = useMatch("/blogs/:id");
  const blogId = match.params.id;

  const addComment = async (e) => {
    e.preventDefault();
    await blogService.comment(newComment.text, blogId);
    setNewComment({ text: "" });
  };

  const handleChange = () => (e) => {
    setNewComment({ ...newComment, text: e.target.value });
  };

  return (
    <>
      <h1>add a new comment</h1>
      <form onSubmit={addComment}>
        <label htmlFor="comment">add your comment</label>
        <textarea
          name="comment"
          id="comment"
          placeholder="comment"
          value={newComment.text}
          onChange={handleChange("comment")}
        />
        <button data-testid="create-button">send</button>
      </form>
    </>
  );
};

export default CommentForm;
