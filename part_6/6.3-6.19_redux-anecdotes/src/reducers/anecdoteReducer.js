import { createSlice } from "@reduxjs/toolkit";

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
export default anecdoteSlice.reducer;
