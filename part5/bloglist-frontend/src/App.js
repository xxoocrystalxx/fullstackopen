import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

//all passwords are cr987
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortByLikes(blogs)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const sortByLikes = (blogs) => {
    return blogs.sort((x, y) => y.likes - x.likes)
  }
  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('LoggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setNotification({
        message: 'Login successful',
        color: 'success',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUser(user)
    } catch (exception) {
      setNotification({
        message: 'Wrong username or password',
        color: 'error',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const handleLogout = async () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('LoggedUser')
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newblog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newblog))
      setNotification({
        message: `a new blog ${newblog.title} by ${newblog.author} added`,
        color: 'success',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        message: `${exception}`,
        color: 'error',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addLikes = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      const updatedBlogs = blogs.map((b) =>
        b.id !== updatedBlog.id ? b : updatedBlog
      )
      setBlogs(sortByLikes(updatedBlogs))
    } catch (exception) {
      setNotification({
        message: `${exception}`,
        color: 'error',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const remove = async (id) => {
    try {
      await blogService.remove(id)
      const newBlogList = blogs.filter((value) => value.id !== id)
      setBlogs(newBlogList)
      setNotification({
        message: `Blog with id ${id} deleted successful`,
        color: 'success',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        message: `${exception}`,
        color: 'error',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification message={notification} />
          <LoginForm login={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={notification} />
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="create new" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={addLikes}
              handleDelete={remove}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
