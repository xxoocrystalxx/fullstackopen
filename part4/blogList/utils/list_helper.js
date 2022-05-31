const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, value) => (sum += value.likes), 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((previousValue, currentValue) => {
    return currentValue.likes > previousValue.likes
      ? currentValue
      : previousValue
  })
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  let groupByAuthor = blogs.reduce((result, blog) => {
    result[blog.author] ? (result[blog.author] += 1) : (result[blog.author] = 1)
    return result
  }, {})

  const authorWithMostBlog = Object.keys(groupByAuthor).reduce((prev, curr) =>
    groupByAuthor[prev] > groupByAuthor[curr] ? prev : curr
  )

  return {
    author: authorWithMostBlog,
    blogs: groupByAuthor[authorWithMostBlog],
  }
}

const mostLikes = (blogs) => {
  let groupByAuthor = blogs.reduce((result, blog) => {
    result[blog.author]
      ? (result[blog.author] += blog.likes)
      : (result[blog.author] = blog.likes)
    return result
  }, {})

  const authorWithMostLikes = Object.keys(groupByAuthor).reduce((prev, curr) =>
    groupByAuthor[prev] > groupByAuthor[curr] ? prev : curr
  )
  return {
    author: authorWithMostLikes,
    likes: groupByAuthor[authorWithMostLikes],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
