import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl)
.then(res => res.data)

export const createAnecdote = (anecdoteText) => axios.post(baseUrl, {content: anecdoteText, votes: 0, id: (100000 * Math.random()).toFixed(0)})
.then(res => res.data)