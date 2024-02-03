import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const anecdotes = await axios.get(baseUrl)
    return anecdotes
}

const create = async (anecdoteText) => {
    const anecdote = await axios.post(baseUrl, {content: anecdoteText, votes: 0, id: (100000 * Math.random()).toFixed(0)})
    console.log("just created", anecdote)
    return anecdote
}

export const anecdotesService = { getAll, create }