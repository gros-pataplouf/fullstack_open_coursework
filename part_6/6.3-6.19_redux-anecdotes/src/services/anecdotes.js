import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const anecdotes = await axios.get(baseUrl)
    return anecdotes.data
}

const create = async (anecdoteText) => {
    console.log("running create method")
    const anecdote = await axios.post(baseUrl, {content: anecdoteText, votes: 0, id: (100000 * Math.random()).toFixed(0)})
    console.log(anecdoteText, anecdote)
    return anecdote.data
}

const upvote = async (id) => {
    const anecdotes = await axios.get(baseUrl)
    const anecdoteToUpvote = anecdotes.data.find(anecdote => anecdote.id === id)
    const newVotes = anecdoteToUpvote.votes + 1
    const anecdote = await axios.put(`${baseUrl}/${id}`, {...anecdoteToUpvote, votes: newVotes})
    return anecdote.data
}

export const anecdotesService = { getAll, create, upvote }