import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = loginSlice.actions

export const loggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('LoggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    blogService.setToken(null)
    dispatch(setUser(null))
    window.localStorage.removeItem('LoggedUser')
  }
}

export const login = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('LoggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification('Login successful', 'success', 5))
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 'error', 5))
    }
  }
}

export default loginSlice.reducer
