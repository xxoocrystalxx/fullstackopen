const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const api = supertest(app)
const Blog = require("../models/bloglist")
const bcrypt = require("bcrypt")
const User = require("../models/users")

let tokenUser
const login = async (username, password) => {
  const result = await api
    .post("/api/login")
    .send({ username, password })
    .expect(200)
  return result.body.token
}
describe("when there is initially some blogs saved", () => {
  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = await new User({
      username: "cry",
      name: "crystal",
      passwordHash,
    }).save()

    helper.blogs.forEach((value) => {
      value.user = user.id
    })

    tokenUser = await login(user.username, "sekret")
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObject = helper.blogs.map((b) => new Blog(b))
    const promiseArray = blogObject.map((b) => b.save())
    await Promise.all(promiseArray)
  })

  test("blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
    expect(response.body).toHaveLength(helper.blogs.length)
  })

  test("Verifying the existence of _id", async () => {
    const blogs = await Blog.find({})
    expect(blogs[0].id).toBeDefined()
  })

  describe("creates new blog tests", () => {
    test("creates a new blog post with valid value", async () => {
      const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      }

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${tokenUser}`)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const blogs = await helper.blogsInDb()
      const titles = blogs.map((r) => r.title)
      expect(blogs).toHaveLength(helper.blogs.length + 1)
      expect(titles).toContain("Go To Statement Considered Harmful")
    })

    test("verifies that if the likes property is missing ", async () => {
      const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      }
      const result = await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${tokenUser}`)
        .expect(201)
      expect(result.body.likes).toBeDefined()
      expect(result.body.likes).toBe(0)
    })

    test("verifies that if the title and url properties are missing ", async () => {
      const blogWithoutTitle = {
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      }
      const blogWithoutUrl = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      }
      await api
        .post("/api/blogs")
        .send(blogWithoutTitle)
        .set("Authorization", `bearer ${tokenUser}`)
        .expect(400)
      await api
        .post("/api/blogs")
        .send(blogWithoutUrl)
        .set("Authorization", `bearer ${tokenUser}`)
        .expect(400)
    })
    test("get error if token is missing", async () => {
      const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      }
      const result = await api.post("/api/blogs").send(newBlog).expect(401)

      expect(result.body.error).toContain("invalid token")
    })
  })
  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `bearer ${tokenUser}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)

      const titles = blogsAtEnd.map((r) => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
    test("get error if token are missing", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const result = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.blogs.length)

      expect(result.body.error).toContain("invalid token")
    })

    test("get error if you are not the creator", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      const passwordHash = await bcrypt.hash("sekret", 10)
      const user = await new User({
        username: "giu",
        name: "giugi",
        passwordHash,
      }).save()
      tokenUser = await login(user.username, "sekret")
      const result = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `bearer ${tokenUser}`)
        .expect(403)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.blogs.length)

      expect(result.body.error).toContain("you are not the creator")
    })
  })
  describe("update a blog", () => {
    test("update likes of a blog", async () => {
      const blogs = await helper.blogsInDb()
      blogs[0].likes = 88
      const response = await api.put(`/api/blogs/${blogs[0].id}`).send(blogs[0])
      expect(response.body.likes).toBe(88)
    })
  })
  // test("a specific note can be viewed", async () => {
  //   const notesAtStart = await helper.notesInDb()

  //   const noteToView = notesAtStart[0]

  //   const resultNote = await api
  //     .get(`/api/notes/${noteToView.id}`)
  //     .expect(200)
  //     .expect("Content-Type", /application\/json/)

  //   const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

  //   expect(resultNote.body).toEqual(processedNoteToView)
  // })
})
afterAll(() => {
  mongoose.connection.close()
})
