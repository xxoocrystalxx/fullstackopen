import { createSlice } from '@reduxjs/toolkit'
let timeID
const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage(state, action) {
      return initialState
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
  if (timeID) clearTimeout(timeID)
  return (dispatch) => {
    dispatch(setMessage(message))
    timeID = setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
