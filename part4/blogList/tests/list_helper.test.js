const listHelper = require("../utils/list_helper")
const helper = require("./test_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test("a list of blogs", () => {
    const result = listHelper.totalLikes(helper.blogs)
    expect(result).toBe(36)
  })
})

describe("favorite blog", () => {
  test("when list has only one blog", () => {
    const favorite = {
      title: helper.listWithOneBlog[0].title,
      author: helper.listWithOneBlog[0].author,
      likes: helper.listWithOneBlog[0].likes,
    }
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result).toEqual(favorite)
  })
  test("a list of blogs", () => {
    const result = listHelper.favoriteBlog(helper.blogs)
    const favorite = {
      title: helper.blogs[2].title,
      author: helper.blogs[2].author,
      likes: helper.blogs[2].likes,
    }
    expect(result).toEqual(favorite)
  })
})

describe("author who has most blog", () => {
  test("when list has many blogs", () => {
    const result = listHelper.mostBlogs(helper.blogs)
    const mostBlog = {
      author: "Robert C. Martin",
      blogs: 3,
    }
    expect(result).toEqual(mostBlog)
  })
  test("when list has only one blog", () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    const mostBlog = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    }
    expect(result).toEqual(mostBlog)
  })
})

describe("author who has most likes", () => {
  test("when list has many blogs", () => {
    const result = listHelper.mostLikes(helper.blogs)
    const mostLikes = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    }
    expect(result).toEqual(mostLikes)
  })
  test("when list has only one blog", () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    const mostLikes = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    }
    expect(result).toEqual(mostLikes)
  })
})
