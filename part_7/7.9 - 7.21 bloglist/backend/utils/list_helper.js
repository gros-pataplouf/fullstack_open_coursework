const totalLikes = (blogs) => {
  if (blogs.length) {
    const total = blogs.reduce((a, b) => {
      return a + b.likes
    }, 0)
    return total
  }
  return 0
}

const favoriteBlog = (blogs) => {
  const { title, author, url } = blogs.sort((a, b) => b.likes - a.likes)[0]
  return {
    title,
    author,
    url
  }
}

const mostBlogs = (blogs) => {
  const authorBlogsTable = {}
  let authorWithMostBlogs = ''
  blogs.forEach(blog => {
    if (!authorBlogsTable[blog.author]) {
      authorBlogsTable[blog.author] = 1
    } else {
      authorBlogsTable[blog.author] += 1
    }
    if (authorBlogsTable[authorWithMostBlogs] < authorBlogsTable[blog.author] || authorWithMostBlogs === '') {
      authorWithMostBlogs = blog.author
    }
  })
  return {
    author: authorWithMostBlogs,
    blogs: authorBlogsTable[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  const authorLikesTable = {}
  let authorWithMostLikes = ''
  blogs.forEach(blog => {
    if (!authorLikesTable[blog.author]) {
      authorLikesTable[blog.author] = blog.likes
    } else {
      authorLikesTable[blog.author] += blog.likes
    }
    if (authorLikesTable[authorWithMostLikes] < authorLikesTable[blog.author] || authorWithMostLikes === '') {
      authorWithMostLikes = blog.author
    }
  })
  return {
    author: authorWithMostLikes,
    likes: authorLikesTable[authorWithMostLikes]
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
