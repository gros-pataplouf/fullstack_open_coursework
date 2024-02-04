import { createSlice } from "@reduxjs/toolkit";
import { anecdotesService } from "../services/anecdotes";

const anecdotesAtStart = [];
const initialState = anecdotesAtStart;

const anecdoteSlice = createSlice({
  name: 'anecdote', 
  initialState, 
  reducers: {
    setAnecdotes(state, action) {
      return action.payload.toSorted((a, b) => b.votes - a.votes)
    },
    addAnecdote(state, action){
      console.log(action.payload)
      return state.concat(action.payload)
    }, 
    upvote(state, action) {
      const upvotedAnecdote = state.find(
        (anecdote) => anecdote.id === action.payload,
      );
      const upvotedAnecdoteNew = {
        ...upvotedAnecdote,
        votes: upvotedAnecdote.votes + 1,
      };
      return state
        .toSpliced(state.indexOf(upvotedAnecdote), 1, upvotedAnecdoteNew)
        .toSorted((a, b) => b.votes - a.votes);
    }
  }
})

export const { upvote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  } 
}
export const createAnecdote = (input) => {
  return async dispatch => {
    const anecdote = await anecdotesService.create(input)
    return dispatch(addAnecdote(anecdote))
  }
}
export const upvoteAnecdote = (id) => {
  return async dispatch => {
    await anecdotesService.upvote(id)
    return dispatch(upvote(id))
  }
}

export default anecdoteSlice.reducer;
