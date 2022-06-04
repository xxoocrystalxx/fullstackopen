import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { initialize, createBlog } from './reducers/blogReducer'
import { loggedUser } from './reducers/loginReducer'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import User from './components/User'
import usersService from './services/users'
import Menu from './components/Menu'
import Blog from './components/Blog'

const App = () => {
  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blogs)
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize())
  }, [])

  useEffect(() => {
    dispatch(loggedUser())
  }, [])

  useEffect(() => {
    usersService.getAll().then((response) => {
      setUsers(response)
    })
  }, [blogs])

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const matchUser = useMatch('/users/:id')
  const userDetail = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((u) => u.id === matchBlog.params.id)
    : null

  return (
    <div className="container">
      <Menu user={user} />
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <Routes>
            <Route path="/users/:id" element={<User user={userDetail} />} />
            <Route path="/users" element={<UserList users={users} />} />
            <Route
              path="/blogs/:id"
              element={<Blog blog={blog} user={user} />}
            />
            <Route
              path="/"
              element={<BlogList blogFormRef={blogFormRef} addBlog={addBlog} />}
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
