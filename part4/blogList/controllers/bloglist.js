const blogRouter = require("express").Router()
const Blog = require("../models/bloglist")

blogRouter.get("/", async (request, response) => {
  const blog = await Blog.find({}).populate("user")
  response.json(blog)
})

blogRouter.post("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "missing or invalid token" })
  }
  const user = request.user
  const blog = new Blog({ ...request.body, user: user.id })

  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.title || !blog.url) {
    return response.status(400).json({
      error: "title or url missing!",
    })
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updateBlog)
})

blogRouter.delete("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "missing or invalid token" })
  }
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
  } else {
    return response.status(403).json({ error: "you are not the creator" })
  }

  response.status(204).end()
})

module.exports = blogRouter
