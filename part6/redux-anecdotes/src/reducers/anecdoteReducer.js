import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createNew(state, action) {
      state.push(action.payload)
    },
    voted(state, action) {
      const id = action.payload.id
      const newState = state.map((anec) =>
        anec.id !== id ? anec : action.payload
      )
      return newState.sort((x, y) => y.votes - x.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createNew, voted, setAnecdotes } = anecSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecService.createNew(content)
    dispatch(createNew(newAnecdote))
  }
}

export const updateVote = (content) => {
  const changedAnec = { ...content, votes: content.votes + 1 }
  return async (dispatch) => {
    const updatedAnec = await anecService.update(changedAnec)
    dispatch(voted(updatedAnec))
  }
}

export default anecSlice.reducer
