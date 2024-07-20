import React from "react";
import CommentForm from "./CommentForm";

function Comments({ blog }) {
  return (
    <div>
      <h3>comments</h3>
      {blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment) => {
            return <li key={comment.id}>{comment.text}</li>;
          })}
        </ul>
      ) : (
        <p>no comments yet</p>
      )}
      <CommentForm />
    </div>
  );
}

export default Comments;
