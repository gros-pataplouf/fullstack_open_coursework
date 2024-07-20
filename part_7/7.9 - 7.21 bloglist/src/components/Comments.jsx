import React from 'react'

function Comments({blog}) {
    console.log(blog)
  return (
    <div>
    <h3>comments</h3>
    {blog.comments.length > 0 &&
    (<ul>{
      blog.comments.map(comment => {
        return (
          <li key={comment.id}>{comment.text}</li>
        )
      })
      }</ul>)
}
  </div>
  )
}

export default Comments