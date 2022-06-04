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
  },
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (message, info, time) => {
  if (timeID) clearTimeout(timeID)
  return (dispatch) => {
    dispatch(setMessage({ message, info }))
    timeID = setTimeout(() => {
      dispatch(setMessage(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
