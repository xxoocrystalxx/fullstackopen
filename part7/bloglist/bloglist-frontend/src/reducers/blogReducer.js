import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const sortByLikes = (blogs) => {
  return blogs.sort((x, y) => y.likes - x.likes)
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createNew(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      const id = action.payload.id
      const newState = state.map((b) => (b.id !== id ? b : action.payload))
      return sortByLikes(newState)
    },
    remove(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { createNew, update, setBlogs, remove } = blogSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(sortByLikes(blogs)))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(createNew(newBlog))
      dispatch(
        setNotification(
          `a new blog ${content.title} by ${content.author} added`,
          'success',
          5
        )
      )
    } catch (e) {
      console.log(e.response.data.error)
      dispatch(setNotification(e.response.data.error, 'error', 5))
    }
  }
}

export const likeABlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.update(content.id, content)
      dispatch(update(newBlog))
      dispatch(setNotification(`Liked ${content.title}!`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.addComment(id, comment)
      dispatch(update(newBlog))
      dispatch(setNotification(`Added comment ${comment}!`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(remove(id))
      dispatch(
        setNotification(`Blog with id ${id} deleted successful`, 'success', 5)
      )
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }
}

export default blogSlice.reducer
