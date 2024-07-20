import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { setBlogInfo } from "../reducers/blogInfoReducer";

const CommentForm = () => {
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState({
    text: "",
  });
  const blog = useSelector(state => state.blogInfo)
  const blogId = blog.id

  const addComment = async (e) => {
    e.preventDefault();
    await blogService.comment(newComment.text, blogId);
    dispatch(setBlogInfo({...blog, comments: blog.comments.concat(newComment) }))
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
